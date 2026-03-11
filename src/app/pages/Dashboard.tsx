import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Plus, RotateCcw, Copy, BadgeCheck, Eye, Archive, ShoppingBag,
  MapPin, Clock, AlertCircle, CheckCircle2, Package,
} from 'lucide-react';
import { mockListings, Listing } from '../data/mockListings';
import { useUser } from '../context/UserContext';
import { PublishModal } from '../components/PublishModal';
import { toast } from 'sonner';
import { motion } from 'motion/react';

type TabId = 'active' | 'archived' | 'sold';

// My listings (demo: u_me)
const MY_LISTINGS = mockListings.filter(l => l.seller.id === 'u_me');

const STATS = [
  { label: 'Annonces actives', value: MY_LISTINGS.filter(l => l.status === 'active').length, color: 'text-green-600', bg: 'bg-green-50 border-green-100', icon: Eye },
  { label: 'Archivées (expirées)', value: MY_LISTINGS.filter(l => l.status === 'archived').length, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100', icon: Archive },
  { label: 'Vendues', value: MY_LISTINGS.filter(l => l.status === 'sold').length, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', icon: ShoppingBag },
];

const STATE_LABELS: Record<string, string> = {
  'neuf': 'Neuf', 'comme-neuf': 'Comme neuf', 'bon-etat': 'Bon état', 'usage-visible': 'Usage visible',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getDaysLeft(expiresAt: string) {
  const now = new Date('2026-03-10');
  const d = Math.ceil((new Date(expiresAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return d;
}

interface ListingRowProps {
  listing: Listing;
  onReactivate?: () => void;
  onDuplicate?: () => void;
  onMarkSold?: () => void;
}

function ListingRow({ listing, onReactivate, onDuplicate, onMarkSold }: ListingRowProps) {
  const daysLeft = getDaysLeft(listing.expiresAt);

  const statusBadge = () => {
    if (listing.status === 'active') {
      if (daysLeft <= 3) return <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full"><AlertCircle className="w-3 h-3" />{daysLeft}j restants</span>;
      if (daysLeft <= 10) return <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />{daysLeft}j restants</span>;
      return <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" />Active · {daysLeft}j</span>;
    }
    if (listing.status === 'archived') return <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full"><Archive className="w-3 h-3" />Expirée</span>;
    return <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full"><ShoppingBag className="w-3 h-3" />Vendue</span>;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="flex">
        {/* Image */}
        <div className="w-24 h-24 bg-gray-100 shrink-0 relative">
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
          {listing.status === 'archived' && (
            <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
              <Archive className="w-6 h-6 text-white" />
            </div>
          )}
          {listing.status === 'sold' && (
            <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{listing.title}</h3>
              <div className="flex items-center flex-wrap gap-2 mt-1">
                {statusBadge()}
                <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.city}</span>
                <span className="text-xs text-gray-400">· {STATE_LABELS[listing.state]}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-gray-900">{listing.price}€</div>
              {listing.negotiable && <div className="text-xs text-gray-400">négociable</div>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {listing.status === 'active' && (
              <>
                <Link to={`/annonces/${listing.id}`} className="text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Eye className="w-3.5 h-3.5" /> Voir
                </Link>
                <button onClick={onMarkSold} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50 transition">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Marquer vendu
                </button>
                <button onClick={onDuplicate} className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Copy className="w-3.5 h-3.5" /> Dupliquer
                </button>
              </>
            )}
            {listing.status === 'archived' && (
              <>
                <button onClick={onReactivate} className="text-xs text-[#a07800] font-semibold flex items-center gap-1 px-3 py-1.5 border border-[#FFC107] rounded-lg hover:bg-[#FFC107]/10 bg-yellow-50 transition">
                  <RotateCcw className="w-3.5 h-3.5" /> Réactiver
                </button>
                <button onClick={onDuplicate} className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Copy className="w-3.5 h-3.5" /> Dupliquer
                </button>
              </>
            )}
            {listing.status === 'sold' && (
              <button onClick={onDuplicate} className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <Copy className="w-3.5 h-3.5" /> Dupliquer (resell)
              </button>
            )}
            <span className="text-xs text-gray-400 ml-auto">
              {listing.status === 'active' ? `Expire le ${formatDate(listing.expiresAt)}` : listing.status === 'sold' ? `Vendu · ${formatDate(listing.expiresAt)}` : `Expiré le ${formatDate(listing.expiresAt)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { userStatus } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('active');
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [listings, setListings] = useState(MY_LISTINGS);

  if (userStatus === 'guest') {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="w-20 h-20 bg-[#FFC107]/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-[#a07800]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès réservé aux membres</h1>
        <p className="text-gray-500 mb-6">Rejoignez le club pour gérer vos annonces et accéder à votre tableau de bord.</p>
        <button onClick={() => navigate('/auth')} className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-2xl font-semibold transition">
          Rejoindre le club
        </button>
      </div>
    );
  }

  const tabListings = listings.filter(l => l.status === activeTab);

  const tabs: { id: TabId; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'active', label: 'Actives', icon: Eye, count: listings.filter(l => l.status === 'active').length },
    { id: 'archived', label: 'Archivées', icon: Archive, count: listings.filter(l => l.status === 'archived').length },
    { id: 'sold', label: 'Vendues', icon: ShoppingBag, count: listings.filter(l => l.status === 'sold').length },
  ];

  const handleReactivate = (id: string) => {
    toast.success('Annonce réactivée pour 30 jours ! (démo)');
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'active' as const, expiresAt: '2026-04-10' } : l));
  };

  const handleDuplicate = (id: string) => {
    toast.success('Annonce dupliquée ! Elle apparaît maintenant en brouillon. (démo)');
  };

  const handleMarkSold = (id: string) => {
    toast.success('Annonce marquée comme vendue !');
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'sold' as const } : l));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes annonces</h1>
          {userStatus === 'verified' ? (
            <div className="flex items-center gap-1.5 text-green-600 text-sm mt-0.5 font-medium">
              <BadgeCheck className="w-4 h-4" /> Membre vérifié
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm text-gray-500">Compte non vérifié ·</span>
              <Link to="/auth" className="text-sm text-[#a07800] font-semibold hover:underline">Vérifier maintenant</Link>
            </div>
          )}
        </div>
        <button
          onClick={() => setPublishModalOpen(true)}
          className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Nouvelle annonce
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`rounded-2xl border p-4 ${stat.bg}`}>
              <Icon className={`w-5 h-5 mb-2 ${stat.color}`} />
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Packs promo banner */}
      {userStatus === 'registered' && (
        <div className="bg-gradient-to-r from-[#fffbef] to-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-gray-900 text-sm">Passez membre vérifié</div>
            <div className="text-xs text-gray-500">Affichez votre numéro, accédez à toutes les fonctions</div>
          </div>
          <Link to="/auth" className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition">
            Vérifier
          </Link>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-[#FFC107] text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${activeTab === tab.id ? 'bg-[#FFC107] text-gray-900' : 'bg-gray-100 text-gray-500'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Listings */}
      {tabListings.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {activeTab === 'active' ? <Eye className="w-8 h-8 text-gray-300" /> : activeTab === 'archived' ? <Archive className="w-8 h-8 text-gray-300" /> : <ShoppingBag className="w-8 h-8 text-gray-300" />}
          </div>
          <p className="text-gray-500 font-medium">
            {activeTab === 'active' ? 'Aucune annonce active' : activeTab === 'archived' ? 'Aucune annonce archivée' : 'Aucune vente enregistrée'}
          </p>
          {activeTab === 'active' && (
            <button onClick={() => setPublishModalOpen(true)} className="mt-4 bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm transition">
              Publier ma première annonce
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {tabListings.map((listing) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <ListingRow
                listing={listing}
                onReactivate={() => handleReactivate(listing.id)}
                onDuplicate={() => handleDuplicate(listing.id)}
                onMarkSold={() => handleMarkSold(listing.id)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Archive info */}
      {activeTab === 'archived' && tabListings.length > 0 && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            Les annonces expirées sont conservées 90 jours. Réactivez-les en 1 clic.
            <span className="block mt-0.5 font-medium">La réactivation sera payante en V2 (packs d'annonces).</span>
          </p>
        </div>
      )}

      <PublishModal isOpen={publishModalOpen} onClose={() => setPublishModalOpen(false)} type="sell" />
    </div>
  );
}
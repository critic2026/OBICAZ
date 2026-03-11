import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Search, SlidersHorizontal, MapPin, Plus, ChevronDown,
  Gamepad2, Gift, Bike, Palette, Camera, Music, ArrowLeft, Info, List, Map, Leaf
} from 'lucide-react';
import { mockListings, Listing } from '../data/mockListings';
import { useUser } from '../context/UserContext';
import { useT } from '../i18n/useT';
import { LangToggle } from '../components/LangToggle';
import { motion, AnimatePresence } from 'motion/react';
import { PublishModal } from '../components/PublishModal';
import logo from 'src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"';

// Vetustness: based on days remaining before expiry
// >10 days left → yellow, 4-10 days → orange, ≤3 days → red
function getVetustness(expiresAt: string): 'yellow' | 'orange' | 'red' {
  const now = new Date('2026-03-10');
  const expires = new Date(expiresAt);
  const daysLeft = Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLeft > 10) return 'yellow';
  if (daysLeft > 3) return 'orange';
  return 'red';
}

function getDaysLeft(expiresAt: string): number {
  const now = new Date('2026-03-10');
  const expires = new Date(expiresAt);
  return Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

const VETUSTNESS_COLORS = {
  yellow: { bg: 'bg-[#FFC107]', border: 'border-yellow-600/30', text: 'text-yellow-900', label: '> 10 jours' },
  orange: { bg: 'bg-[#FF9800]', border: 'border-orange-600/30', text: 'text-orange-900', label: '4 – 10 jours' },
  red: { bg: 'bg-[#F44336]', border: 'border-red-600/30', text: 'text-white', label: '≤ 3 jours' },
};

function CategoryIcon({ category, className = 'w-4 h-4' }: { category: string; className?: string }) {
  switch (category) {
    case 'gaming': return <Gamepad2 className={className} />;
    case 'jouets': return <Gift className={className} />;
    case 'sport': return <Bike className={className} />;
    case 'equestre': return <span className="text-sm">🐎</span>;
    case 'arts': return <Palette className={className} />;
    case 'photo': return <Camera className={className} />;
    case 'musique': return <Music className={className} />;
    case 'jardin': return <Leaf className={className} />;
    default: return <MapPin className={className} />;
  }
}

type FilterMode = 'all' | 'sell' | 'buy';
type ViewMode = 'map' | 'list';
const CATEGORIES = ['all', 'gaming', 'jouets', 'sport', 'equestre', 'arts', 'photo', 'musique', 'jardin'] as const;
const CAT_LABELS: Record<string, string> = {
  all: 'Toutes', gaming: 'Gaming', jouets: 'Jouets', sport: 'Sport',
  equestre: 'Équestre', arts: 'Arts', photo: 'Photo', musique: 'Musique', jardin: 'Jardin',
};

export function Radar() {
  const { userStatus } = useUser();
  const tr = useT();
  const r = tr.radar;
  const navigate = useNavigate();
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishType, setPublishType] = useState<'sell' | 'buy'>('sell');
  const [radiusOpen, setRadiusOpen] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState('25 km');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [selectedCat, setSelectedCat] = useState('all');
  const [showLegend, setShowLegend] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  const CAT_LABELS_TR: Record<string, string> = {
    all: r.catAll, gaming: r.catGaming, jouets: r.catJouets,
    sport: r.catSport, equestre: r.catEquestre, arts: r.catArts,
    photo: r.catPhoto, musique: r.catMusique, jardin: r.catJardin,
  };

  const openPublish = (type: 'sell' | 'buy') => {
    setPublishType(type);
    setPublishModalOpen(true);
  };

  const filteredListings = mockListings.filter(l => {
    if (l.status !== 'active') return false;
    if (filterMode === 'sell' && l.type !== 'sell') return false;
    if (filterMode === 'buy' && l.type !== 'buy') return false;
    if (selectedCat !== 'all' && l.category !== selectedCat) return false;
    return true;
  });

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col">
      {/* ── OSM-style Map Background ── */}
      <div className="absolute inset-0 bg-[#f0ebe3]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            {/* Main road grid */}
            <pattern id="roads" width="140" height="140" patternUnits="userSpaceOnUse">
              <rect width="140" height="140" fill="#f0ebe3" />
              {/* Horizontal roads */}
              <rect x="0" y="65" width="140" height="5" fill="#e8e0d5" />
              <rect x="0" y="15" width="140" height="2" fill="#ede8e0" />
              <rect x="0" y="120" width="140" height="2" fill="#ede8e0" />
              {/* Vertical roads */}
              <rect x="65" y="0" width="5" height="140" fill="#e8e0d5" />
              <rect x="15" y="0" width="2" height="140" fill="#ede8e0" />
              <rect x="120" y="0" width="2" height="140" fill="#ede8e0" />
              {/* Blocks */}
              <rect x="17" y="17" width="46" height="46" fill="#e9e3d9" rx="2" />
              <rect x="72" y="17" width="46" height="46" fill="#e9e3d9" rx="2" />
              <rect x="17" y="72" width="46" height="46" fill="#e9e3d9" rx="2" />
              <rect x="72" y="72" width="46" height="46" fill="#e9e3d9" rx="2" />
            </pattern>
            {/* Park / green areas */}
            <pattern id="park" width="300" height="250" patternUnits="userSpaceOnUse">
              <rect x="40" y="30" width="80" height="60" fill="#d4e8c2" rx="6" opacity="0.7" />
              <rect x="180" y="140" width="100" height="70" fill="#d4e8c2" rx="6" opacity="0.5" />
              <rect x="10" y="160" width="60" height="50" fill="#cce0b5" rx="4" opacity="0.6" />
            </pattern>
            {/* Water */}
            <pattern id="water" width="500" height="400" patternUnits="userSpaceOnUse">
              <path d="M 50 200 Q 150 160 250 200 Q 350 240 450 200 L 450 220 Q 350 260 250 220 Q 150 180 50 220 Z" fill="#c8dcee" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roads)" />
          <rect width="100%" height="100%" fill="url(#park)" />
          <rect width="100%" height="100%" fill="url(#water)" />
          {/* Major road diagonal */}
          <line x1="0" y1="60%" x2="100%" y2="40%" stroke="#ddd4c8" strokeWidth="8" />
          <line x1="0" y1="62%" x2="100%" y2="42%" stroke="#ddd4c8" strokeWidth="8" />
          {/* Ring road arcs */}
          <ellipse cx="50%" cy="50%" rx="38%" ry="30%" fill="none" stroke="#e0d8cc" strokeWidth="10" />
        </svg>
      </div>

      {/* User Location Marker (center) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 bg-blue-400/15 rounded-full animate-pulse" />
          <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-500 shadow-md z-10">
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* ── Top Floating Bar ── */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-start gap-3">
        {/* Logo + Back */}
        <div className="hidden md:flex bg-white rounded-2xl p-3 shadow-sm border border-gray-200/80 h-14 items-center gap-2 shrink-0">
          <Link to="/" className="hover:opacity-70 transition">
            <img src={logo} alt="Obicaz" className="h-7 object-contain" />
          </Link>
        </div>
        <Link to="/" className="md:hidden flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-200/80 shrink-0 text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Search + Controls */}
        <div className="flex-1 flex gap-2 h-14">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200/80 flex items-center px-4">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder={r.searchPlaceholder}
              className="flex-1 bg-transparent border-none focus:outline-none px-3 text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          <button className="bg-white rounded-2xl w-14 h-14 shrink-0 shadow-sm border border-gray-200/80 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition">
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          <div className="relative shrink-0">
            <button
              onClick={() => setRadiusOpen(!radiusOpen)}
              className="bg-white rounded-2xl h-14 px-4 shadow-sm border border-gray-200/80 flex items-center gap-2 text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="text-sm">{selectedRadius}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <AnimatePresence>
              {radiusOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-100 min-w-[120px] overflow-hidden py-1 z-40"
                >
                  {['5 km', '10 km', '25 km', '50 km', 'Région'].map((rv) => (
                    <button
                      key={rv}
                      onClick={() => { setSelectedRadius(rv); setRadiusOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${selectedRadius === rv ? 'font-semibold text-[#a07800]' : 'text-gray-700'}`}
                    >
                      {rv}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Map / List toggle + FR/NL */}
        <div className="hidden md:flex items-center gap-2 h-14">
          {/* View mode pill */}
          <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setViewMode('map')}
              title="Vue carte"
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold transition-colors ${
                viewMode === 'map' ? 'bg-[#FFC107] text-gray-900' : 'bg-white text-gray-400 hover:text-gray-600'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Radar</span>
            </button>
            <span className="w-px self-stretch bg-gray-200" />
            <button
              onClick={() => setViewMode('list')}
              title="Vue liste"
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold transition-colors ${
                viewMode === 'list' ? 'bg-[#FFC107] text-gray-900' : 'bg-white text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Parcourir</span>
            </button>
          </div>

          <LangToggle />
        </div>

        {/* Mobile: view toggle */}
        <button
          onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          className="md:hidden flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-200/80 shrink-0 text-gray-700"
          title={viewMode === 'map' ? 'Vue liste' : 'Vue carte'}
        >
          {viewMode === 'map' ? <List className="w-5 h-5" /> : <Map className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Filter Row ── */}
      <div className="absolute top-[4.5rem] left-4 right-4 z-20 mt-2 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200/80 p-1 shrink-0 gap-1">
          {[
            { val: 'all' as FilterMode, label: r.all },
            { val: 'sell' as FilterMode, label: r.sellers },
            { val: 'buy' as FilterMode, label: r.buyers },
          ].map((f) => (
            <button
              key={f.val}
              onClick={() => setFilterMode(f.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterMode === f.val ? 'bg-[#FFC107] text-gray-900 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition shrink-0 border ${selectedCat === cat ? 'bg-[#FFC107] border-yellow-400 text-gray-900 shadow-sm' : 'bg-white border-gray-200/80 text-gray-600 hover:bg-gray-50'}`}
          >
            {cat !== 'all' && <CategoryIcon category={cat} className="w-3.5 h-3.5" />}
            {CAT_LABELS_TR[cat]}
          </button>
        ))}
      </div>

      {/* ── Map Markers ── */}
      <div className="absolute inset-0 pt-32 pb-24 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {filteredListings.map((listing, index) => {
            const top = `${20 + (index * 17 + 3) % 65}%`;
            const left = `${12 + (index * 23 + 5) % 76}%`;
            const vetustness = getVetustness(listing.expiresAt);
            const colors = VETUSTNESS_COLORS[vetustness];
            const daysLeft = getDaysLeft(listing.expiresAt);
            const isSell = listing.type === 'sell';

            return (
              <div
                key={listing.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ top, left }}
              >
                <div className="relative flex flex-col items-center group">
                  {/* Marker pill */}
                  <button
                    onClick={() => setActiveListing(activeListing?.id === listing.id ? null : listing)}
                    className={`
                      flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-md border ${colors.bg} ${colors.border}
                      transition-all hover:scale-110 hover:shadow-lg
                      ${activeListing?.id === listing.id ? 'scale-110 ring-2 ring-offset-1 ring-gray-400' : ''}
                    `}
                  >
                    <CategoryIcon category={listing.category} className={`w-3.5 h-3.5 ${colors.text}`} />
                    <span className={`text-xs font-bold ${colors.text}`}>
                      {listing.price}€
                    </span>
                    {/* Buy marker indicator */}
                    {!isSell && (
                      <span className={`text-[9px] ${colors.text} opacity-80`}>↑</span>
                    )}
                  </button>

                  {/* Stem */}
                  <div className={`w-0.5 h-2 ${colors.bg} opacity-70`} />
                  <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} shadow-sm border border-white/50`} />

                  {/* Desktop popup */}
                  {activeListing?.id === listing.id && (
                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 z-40 hidden md:block w-[300px]">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 8 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden origin-bottom"
                      >
                        {listing.images[0] && (
                          <div className="h-36 bg-gray-100">
                            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${activeListing?.type === 'sell' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                              {activeListing?.type === 'sell' ? r.vente : r.recherche}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              vetustness === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                              vetustness === 'orange' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {daysLeft > 0 ? `${daysLeft} ${r.daysLeft}` : r.expireSoon}
                            </span>
                          </div>
                          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">{listing.title}</h3>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900">{listing.price}€</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{listing.city}
                            </span>
                          </div>
                        </div>
                        <div className="px-3 pb-3">
                          <Link
                            to={`/annonces/${listing.id}`}
                            className="block w-full text-center bg-[#FFC107] hover:bg-yellow-400 text-gray-900 font-semibold py-2 rounded-xl text-sm transition"
                          >
                            {r.viewListing}
                          </Link>
                        </div>
                        {/* Triangle */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile Bottom Card ── */}
      <AnimatePresence>
        {activeListing && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            className="md:hidden absolute bottom-24 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-30 border border-gray-100 pointer-events-auto"
          >
            <div className="flex h-28">
              <div className="w-28 bg-gray-100 shrink-0">
                {activeListing.images[0] ? (
                  <img src={activeListing.images[0]} alt={activeListing.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <CategoryIcon category={activeListing.category} className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm leading-tight pr-2 line-clamp-2">{activeListing.title}</h3>
                    <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{activeListing.city}
                    </p>
                  </div>
                  <button onClick={() => setActiveListing(null)} className="text-gray-400 p-1 -mt-1 -mr-1">✕</button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">{activeListing.price}€</span>
                  <Link
                    to={`/annonces/${activeListing.id}`}
                    className="bg-[#FFC107] text-gray-900 font-semibold px-4 py-1.5 rounded-lg text-sm hover:bg-yellow-400 transition"
                  >
                    {r.view}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LIST VIEW (overlay on top of map) ── */}
      <AnimatePresence>
        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 pt-32 pb-6 z-25 pointer-events-auto overflow-y-auto bg-white/95 backdrop-blur-sm"
          >
            <div className="px-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4 mt-2">
                <h2 className="font-bold text-gray-900">
                  {filteredListings.length} annonce{filteredListings.length > 1 ? 's' : ''} dans le Radar
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredListings.map((listing) => {
                  const vetustness = getVetustness(listing.expiresAt);
                  const colors = VETUSTNESS_COLORS[vetustness];
                  const daysLeft = getDaysLeft(listing.expiresAt);
                  const isSell = listing.type === 'sell';
                  return (
                    <Link
                      key={listing.id}
                      to={`/annonces/${listing.id}`}
                      className="flex gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden group p-3"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        {listing.images[0] ? (
                          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <CategoryIcon category={listing.category} className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSell ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {isSell ? r.vente : r.recherche}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            vetustness === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            vetustness === 'orange' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {daysLeft > 0 ? `${daysLeft}${r.daysLeft.charAt(0)}` : '!'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-[#a07800] transition leading-tight">{listing.title}</h3>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="font-black text-gray-900">{listing.price}€{!isSell && <span className="text-xs font-semibold text-blue-600"> max</span>}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-0.5">
                            <MapPin className="w-3 h-3" />{listing.city}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Legend (bottom-left) ── */}
      <div className="absolute bottom-6 left-4 z-20 pointer-events-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 w-full"
          >
            <Info className="w-4 h-4 text-gray-400" />
            {r.legend}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${showLegend ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showLegend && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 space-y-2 border-t border-gray-50">
                  <p className="text-[10px] uppercase font-semibold text-gray-400 pt-2">Vétusté de l'annonce</p>
                  {(['yellow', 'orange', 'red'] as const).map((v) => (
                    <div key={v} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${VETUSTNESS_COLORS[v].bg} shadow-sm`} />
                      <span className="text-xs text-gray-600">{VETUSTNESS_COLORS[v].label}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-50 pt-2 space-y-1.5">
                    <p className="text-[10px] uppercase font-semibold text-gray-400">Type</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gray-300 border border-white" />
                      <span className="text-xs text-gray-600">Pill simple → Vente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gray-300 border border-white flex items-center justify-center">
                        <span className="text-[8px] text-gray-600">↑</span>
                      </div>
                      <span className="text-xs text-gray-600">Flèche ↑ → Recherche</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Count badge ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm border border-gray-200 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{filteredListings.length}</span> annonce{filteredListings.length > 1 ? 's' : ''} visible{filteredListings.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-4 px-4 py-1 text-[11px] text-gray-400">
          <Link to="/regles" className="hover:text-gray-600 transition pointer-events-auto underline underline-offset-2">
            Règles du club
          </Link>
          <span>·</span>
          <Link to="/cgu" className="hover:text-gray-600 transition pointer-events-auto underline underline-offset-2">
            CGU
          </Link>
          <span>·</span>
          <span>© 2026 Obicaz 🇧🇪</span>
        </div>
      </div>

      {/* ── FAB Publish ── */}
      <div className="absolute bottom-6 right-4 z-20 pointer-events-auto">
        <button
          onClick={() => openPublish('sell')}
          className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 rounded-full h-14 px-6 shadow-lg flex items-center gap-2 font-semibold transition-transform hover:scale-105 border border-yellow-500/20"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          <span className="hidden sm:inline">Publier</span>
        </button>
      </div>

      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        type={publishType}
      />
    </div>
  );
}

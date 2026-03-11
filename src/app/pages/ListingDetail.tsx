import { useParams, Link, useNavigate } from 'react-router';
import {
  ArrowLeft, MapPin, BadgeCheck, Calendar, Package, Phone, MessageSquare,
  AlertCircle, Shield, Eye, EyeOff, Flag, ChevronDown, ChevronUp,
} from 'lucide-react';
import { mockListings } from '../data/mockListings';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { toast } from 'sonner';

export function ListingDetail() {
  const { id } = useParams();
  const { userStatus } = useUser();
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [showPhoneRevealed, setShowPhoneRevealed] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const listing = mockListings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Annonce non trouvée</h1>
        <Link to="/annonces" className="text-[#a07800] hover:underline">Retour aux annonces</Link>
      </div>
    );
  }

  const stateLabels: Record<string, string> = {
    'neuf': 'Neuf', 'comme-neuf': 'Comme neuf', 'bon-etat': 'Bon état', 'usage-visible': 'Usage visible',
  };
  const categoryLabels: Record<string, string> = {
    gaming: 'Gaming', jouets: 'Jouets & Collectibles', sport: 'Sport & Outdoor',
    equestre: 'Équestre', arts: 'Arts & Création', photo: 'Photo & Vidéo', musique: 'Musique',
    jardin: 'Jardin & Nature',
  };

  const canSeePhone = userStatus === 'verified';
  const canContact = userStatus !== 'guest';
  const memberSinceDate = new Date(listing.seller.memberSince);
  const monthsSince = Math.floor((new Date().getTime() - memberSinceDate.getTime()) / (1000 * 60 * 60 * 24 * 30));

  const handleSendMessage = () => {
    if (!message.trim()) { toast.error('Entrez un message'); return; }
    toast.success('Message envoyé ! Le vendeur vous répondra dans sa messagerie.');
    setMessage('');
    setShowContactForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Back */}
        <Link to="/annonces" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Retour aux annonces
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-100">
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Title & Price */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {listing.type === 'buy' && (
                <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  🔍 Recherche d'objet
                </div>
              )}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-3 text-gray-900">{listing.title}</h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      {categoryLabels[listing.category]}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {stateLabels[listing.state]}
                    </span>
                    {listing.seller.verified && (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        <BadgeCheck className="w-3.5 h-3.5" /> Téléphone vérifié
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-black text-gray-900">
                    {listing.price}€{listing.type === 'buy' && <span className="text-xl font-semibold text-blue-600"> max</span>}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {listing.type === 'buy' ? 'Budget maximum' : listing.negotiable ? 'Prix négociable' : 'Prix fixe'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{listing.city}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Description</h2>

              {/* Source language */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {listing.language === 'fr' ? '🇫🇷 Français' : '🇧🇪 Nederlands'}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>

              {/* Auto-translation */}
              {(listing.descriptionNl || listing.description) && (
                <div className="border-t border-gray-100 pt-4">
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="flex items-center gap-2 mb-3 group"
                  >
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                      🤖 Traduction automatique
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-600 flex items-center gap-0.5">
                      {showTranslation ? <><ChevronUp className="w-3 h-3" /> Masquer</> : <><ChevronDown className="w-3 h-3" /> Afficher</>}
                    </span>
                  </button>
                  {showTranslation && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase">
                          {listing.language === 'fr' ? '🇧🇪 Nederlands' : '🇫🇷 Français'}
                        </span>
                      </div>
                      <p className="text-gray-500 leading-relaxed text-sm italic">
                        {listing.language === 'fr' ? listing.descriptionNl : listing.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Report */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition">
                <Flag className="w-3.5 h-3.5" /> Signaler cette annonce
              </button>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5">
            {/* Seller */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">{listing.type === 'buy' ? 'Acheteur' : 'Vendeur'}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-yellow-300 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shrink-0">
                    {listing.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{listing.seller.name}</div>
                    {listing.seller.verified ? (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <BadgeCheck className="w-4 h-4" /> Membre vérifié
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">Membre non vérifié</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  <div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                      <Calendar className="w-3.5 h-3.5" /> Membre depuis
                    </div>
                    <div className="font-semibold text-sm text-gray-900">
                      {monthsSince < 12 ? `${monthsSince} mois` : `${Math.floor(monthsSince / 12)} an${Math.floor(monthsSince / 12) > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                      <Package className="w-3.5 h-3.5" /> Annonces
                    </div>
                    <div className="font-semibold text-sm text-gray-900">{listing.seller.totalListings}</div>
                  </div>
                </div>

                {listing.seller.verified && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                      <Shield className="w-3.5 h-3.5" /> Taux de signalement
                    </div>
                    <div className={`font-bold ${listing.seller.reportRate === 0 ? 'text-green-600' : 'text-orange-500'}`}>
                      {listing.seller.reportRate === 0 ? 'Aucun signalement' : `${(listing.seller.reportRate * 100).toFixed(1)}%`}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
              <h2 className="font-bold text-gray-900 mb-1">Contacter</h2>

              {/* PHONE SECTION */}
              {listing.showPhone ? (
                // Seller SHOWS phone
                canSeePhone ? (
                  // Verified member: reveal phone
                  <div>
                    {showPhoneRevealed ? (
                      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
                        <Phone className="w-5 h-5 text-green-600 shrink-0" />
                        <div>
                          <div className="text-xs text-green-700 font-medium mb-0.5">Numéro vérifié</div>
                          <div className="font-bold text-gray-900">{listing.seller.phone}</div>
                        </div>
                        <button onClick={() => setShowPhoneRevealed(false)} className="ml-auto text-gray-400 hover:text-gray-600">
                          <EyeOff className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPhoneRevealed(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <Eye className="w-5 h-5" /> Voir le numéro
                      </button>
                    )}
                  </div>
                ) : userStatus === 'registered' ? (
                  // Registered but not verified
                  <div className="border-2 border-dashed border-yellow-300 rounded-xl p-4 bg-yellow-50">
                    <Phone className="w-7 h-7 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-700 text-center mb-3">
                      Vérifiez votre téléphone belge pour voir ce numéro.
                    </p>
                    <Link to="/auth" className="block w-full text-center bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm transition">
                      Vérifier mon compte
                    </Link>
                  </div>
                ) : (
                  // Guest
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                    <Phone className="w-7 h-7 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-3">Rejoignez le club pour voir le numéro de téléphone</p>
                    <Link to="/auth" className="block w-full text-center bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm transition">
                      Rejoindre le club
                    </Link>
                  </div>
                )
              ) : (
                // Seller does NOT show phone → message only
                <div className="text-xs text-gray-400 flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2">
                  <Phone className="w-3.5 h-3.5" /> Ce vendeur préfère les messages internes
                </div>
              )}

              {/* MESSAGE SECTION */}
              {canContact ? (
                showContactForm ? (
                  <div className="border border-gray-200 rounded-xl p-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Votre message au vendeur..."
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 mb-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent text-sm resize-none"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleSendMessage} className="flex-1 bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm transition">
                        Envoyer
                      </button>
                      <button onClick={() => setShowContactForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm">
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <MessageSquare className="w-5 h-5" />
                    {listing.type === 'buy' ? 'Proposer un objet' : 'Contacter le vendeur'}
                  </button>
                )
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                  <MessageSquare className="w-7 h-7 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-3">Créez un compte pour contacter ce membre</p>
                  <Link to="/auth" className="block w-full text-center bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm transition">
                    Rejoindre le club
                  </Link>
                </div>
              )}

              {/* Safety notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  <strong>Conseils de sécurité :</strong> Ne payez jamais à l'avance. Privilégiez les échanges en personne dans un lieu public.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
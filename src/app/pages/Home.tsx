import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Search, SlidersHorizontal, Plus, ChevronDown,
  BadgeCheck, Phone, Shield, MapPin, Gamepad2, Bike,
  Gift, Palette, Camera, Music, Star, ChevronRight, Leaf,
} from 'lucide-react';
import { mockListings, Listing } from '../data/mockListings';
import { useUser } from '../context/UserContext';
import { useT } from '../i18n/useT';
import { LangToggle } from '../components/LangToggle';
import { motion, AnimatePresence } from 'motion/react';
import { PublishModal } from '../components/PublishModal';
import logo from 'figma:asset/357d6422865453eaa15dbb3adc1cbd8d88dbac78.png';

// ── MAP COMPONENT (pour membres) ─────────────────────────────────────────────
function MapView() {
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishType, setPublishType] = useState<'sell' | 'buy'>('sell');
  const [radiusOpen, setRadiusOpen] = useState(false);
  const tr = useT();
  const m = tr.map;

  const activeListings = mockListings.filter(l => l.status === 'active');

  return (
    <div className="relative h-full w-full bg-[#e8eaed] overflow-hidden flex flex-col">
      {/* OSM-style Map Background */}
      <div className="absolute inset-0 bg-[#f0ebe3]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="roads" width="140" height="140" patternUnits="userSpaceOnUse">
              <rect width="140" height="140" fill="#f0ebe3" />
              <rect x="0" y="65" width="140" height="5" fill="#e8e0d5" />
              <rect x="0" y="15" width="140" height="2" fill="#ede8e0" />
              <rect x="0" y="120" width="140" height="2" fill="#ede8e0" />
              <rect x="65" y="0" width="5" height="140" fill="#e8e0d5" />
              <rect x="15" y="0" width="2" height="140" fill="#ede8e0" />
              <rect x="120" y="0" width="2" height="140" fill="#ede8e0" />
              <rect x="17" y="17" width="46" height="46" fill="#e9e3d9" rx="2" />
              <rect x="72" y="17" width="46" height="46" fill="#e9e3d9" rx="2" />
              <rect x="17" y="72" width="46" height="46" fill="#e9e3d9" rx="2" />
              <rect x="72" y="72" width="46" height="46" fill="#e9e3d9" rx="2" />
            </pattern>
            <pattern id="park" width="300" height="250" patternUnits="userSpaceOnUse">
              <rect x="40" y="30" width="80" height="60" fill="#d4e8c2" rx="6" opacity="0.7" />
              <rect x="180" y="140" width="100" height="70" fill="#d4e8c2" rx="6" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roads)" />
          <rect width="100%" height="100%" fill="url(#park)" />
          <line x1="0" y1="60%" x2="100%" y2="40%" stroke="#ddd4c8" strokeWidth="8" />
          <ellipse cx="50%" cy="50%" rx="38%" ry="30%" fill="none" stroke="#e0d8cc" strokeWidth="10" />
        </svg>
      </div>

      {/* User location */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-blue-400/20 rounded-full animate-pulse" />
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-500 shadow-sm z-10">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-start gap-3">
        <div className="hidden md:flex bg-white rounded-2xl p-3 shadow-sm border border-gray-200 h-14 items-center shrink-0">
          <Link to="/">
            <img src={logo} alt="Obicaz" className="h-8 object-contain hover:opacity-80 transition-opacity" />
          </Link>
        </div>
        <div className="flex-1 flex gap-2 h-14">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center px-4">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder={m.search}
              className="flex-1 bg-transparent border-none focus:outline-none px-3 text-gray-700 placeholder-gray-400 w-full"
            />
          </div>
          <button className="bg-white rounded-2xl w-14 h-14 shrink-0 shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <div className="relative shrink-0">
            <button
              onClick={() => setRadiusOpen(!radiusOpen)}
              className="bg-white rounded-2xl h-14 px-4 shadow-sm border border-gray-200 flex items-center gap-2 text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              <span className="text-sm">{m.radius}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {radiusOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-100 w-full overflow-hidden py-1 z-30">
                {['5 km', '10 km', '25 km', 'Région'].map((r) => (
                  <button key={r} onClick={() => setRadiusOpen(false)} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <Link
          to="/radar"
          className="hidden md:flex items-center gap-2 bg-white rounded-2xl h-14 px-4 shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition font-medium text-sm shrink-0"
        >
          <MapPin className="w-4 h-4 text-[#a07800]" />
          {m.vente === 'Vente' ? 'Radar' : 'Radar'}
        </Link>
        {/* FR/NL toggle in MapView header */}
        <div className="hidden md:flex items-center h-14">
          <LangToggle />
        </div>
      </div>

      {/* Markers */}
      <div className="absolute inset-0 pt-24 pb-24 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {activeListings.map((listing, index) => {
            const top = `${25 + (index * 17) % 60}%`;
            const left = `${15 + (index * 23) % 70}%`;
            const isSell = listing.type === 'sell';
            return (
              <div key={listing.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group pointer-events-auto" style={{ top, left }}>
                <div className="relative flex flex-col items-center">
                  <div className="bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100 text-[11px] font-bold text-gray-800 mb-1 z-20">
                    {listing.price}€
                  </div>
                  <button
                    onClick={() => setActiveListing(listing)}
                    className={`w-5 h-5 rounded-full shadow-md border-2 border-white transition-transform z-10 ${isSell ? 'bg-red-500' : 'bg-blue-500'} ${activeListing?.id === listing.id ? 'scale-150' : 'hover:scale-125'}`}
                  />
                </div>
                {activeListing?.id === listing.id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pb-4 z-30 w-max hidden md:block">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 w-[320px] origin-bottom"
                    >
                      <div className="w-1/3 bg-gray-100">
                        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-2/3 p-3 flex flex-col justify-between bg-white">
                        <div>
                          <h3 className="font-bold text-sm leading-tight text-gray-900 line-clamp-2">{listing.title}</h3>
                          <div className="font-bold text-md text-gray-900 mt-1">{listing.price}€</div>
                          <div className="text-gray-400 text-xs mt-0.5">{listing.city}</div>
                        </div>
                        <Link to={`/annonces/${listing.id}`} className="mt-3 block w-full text-center bg-[#FFC107] text-gray-900 font-bold py-1.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm">
                          Voir l'annonce
                        </Link>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100 shadow-sm" />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile active card */}
      <AnimatePresence>
        {activeListing && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden absolute bottom-24 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-20 border border-gray-100 pointer-events-auto"
          >
            <div className="flex h-32">
              <div className="w-1/3 bg-gray-200">
                <img src={activeListing.images[0]} alt={activeListing.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm leading-tight pr-2 line-clamp-2">{activeListing.title}</h3>
                    <div className="text-gray-400 text-xs mt-1">{activeListing.city}</div>
                  </div>
                  <button onClick={() => setActiveListing(null)} className="text-gray-400 p-1">✕</button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-lg text-gray-900">{activeListing.price}€</span>
                  <Link to={`/annonces/${activeListing.id}`} className="bg-[#FFC107] text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors text-sm">
                    Voir
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-6 left-4 z-20 pointer-events-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500 border border-red-600/20" />
            <span className="text-sm font-medium text-gray-700">{m.forSale}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-500 border border-blue-600/20" />
            <span className="text-sm font-medium text-gray-700">{m.wanted}</span>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-6 right-4 z-20 pointer-events-auto flex flex-col gap-2 items-end">
        <button
          onClick={() => { setPublishType('sell'); setPublishModalOpen(true); }}
          className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 rounded-full h-14 px-6 shadow-lg flex items-center gap-2 font-bold transition-transform hover:scale-105 border border-yellow-500/20"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          {m.publish}
        </button>
      </div>

      <PublishModal isOpen={publishModalOpen} onClose={() => setPublishModalOpen(false)} type={publishType} />
    </div>
  );
}

// ── LANDING PAGE (pour les invités) ──────────────────────────────────────────
function LandingPage() {
  const navigate = useNavigate();
  const tr = useT();
  const h = tr.hero;
  const cat = tr.categories;
  const trust = tr.trust;
  const rc = tr.radar_cta;
  const f = tr.footer;

  const featuredListings = mockListings.filter(l => l.status === 'active').slice(0, 8);
  const heroListings = mockListings.filter(l => l.status === 'active').slice(0, 4);

  const stateLabels: Record<string, string> = {
    'neuf': tr.listingsPage.stateNew,
    'comme-neuf': tr.listingsPage.stateLikeNew,
    'bon-etat': tr.listingsPage.stateGood,
    'usage-visible': tr.listingsPage.stateVisible,
  };

  const radarMarkers = [
    { top: '22%', left: '30%', price: '450€', color: 'bg-red-500' },
    { top: '45%', left: '62%', price: '85€', color: 'bg-red-500' },
    { top: '65%', left: '25%', price: '12€', color: 'bg-blue-500' },
    { top: '30%', left: '72%', price: '320€', color: 'bg-red-500' },
    { top: '75%', left: '55%', price: '60€', color: 'bg-blue-500' },
    { top: '55%', left: '42%', price: '950€', color: 'bg-red-500' },
  ];

  const CATEGORIES_TRANSLATED = [
    { id: 'gaming', label: cat.gaming, icon: Gamepad2, color: 'bg-purple-100 text-purple-700' },
    { id: 'jouets', label: cat.jouets, icon: Gift, color: 'bg-pink-100 text-pink-700' },
    { id: 'sport', label: cat.sport, icon: Bike, color: 'bg-green-100 text-green-700' },
    { id: 'equestre', label: cat.equestre, icon: ({ className }: { className?: string }) => <span className="text-2xl leading-none">🐎</span>, color: 'bg-amber-100 text-amber-700' },
    { id: 'arts', label: cat.arts, icon: Palette, color: 'bg-orange-100 text-orange-700' },
    { id: 'photo', label: cat.photo, icon: Camera, color: 'bg-blue-100 text-blue-700' },
    { id: 'musique', label: cat.musique, icon: Music, color: 'bg-red-100 text-red-700' },
    { id: 'jardin', label: cat.jardin, icon: Leaf, color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/">
              <img src={logo} alt="Obicaz" className="h-[72px] object-contain hover:opacity-80 transition-opacity" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/annonces" className="text-gray-600 hover:text-gray-900 text-sm font-medium">{tr.nav.browse}</Link>
              <Link to="/radar" className="text-gray-600 hover:text-gray-900 text-sm font-medium">{tr.nav.radar}</Link>
              <a href="#comment" className="text-gray-600 hover:text-gray-900 text-sm font-medium">{tr.nav.howItWorks}</a>
            </nav>
            <div className="flex items-center gap-3">
              {/* ── FR/NL toggle ── */}
              <LangToggle />
              <button onClick={() => navigate('/auth')} className="text-gray-700 hover:text-gray-900 text-sm font-medium px-3 py-2 hidden md:block">
                {tr.nav.login}
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
              >
                {tr.nav.join}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#fffbef] to-white pt-10 pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-x-16 items-center">

            {/* LEFT – Radar map preview */}
            <div className="hidden lg:flex justify-end">
              <div className="w-[260px] h-[260px] rounded-2xl overflow-hidden border border-yellow-200 shadow-md relative bg-[#f0ebe3]">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <pattern id="heroRoads" width="80" height="80" patternUnits="userSpaceOnUse">
                      <rect width="80" height="80" fill="#f0ebe3" />
                      <rect x="0" y="37" width="80" height="4" fill="#e8e0d5" />
                      <rect x="37" y="0" width="4" height="80" fill="#e8e0d5" />
                      <rect x="0" y="10" width="80" height="1.5" fill="#ede8e0" />
                      <rect x="0" y="68" width="80" height="1.5" fill="#ede8e0" />
                      <rect x="10" y="0" width="1.5" height="80" fill="#ede8e0" />
                      <rect x="68" y="0" width="1.5" height="80" fill="#ede8e0" />
                      <rect x="12" y="12" width="23" height="23" fill="#e9e3d9" rx="2" />
                      <rect x="43" y="12" width="23" height="23" fill="#e9e3d9" rx="2" />
                      <rect x="12" y="43" width="23" height="23" fill="#e9e3d9" rx="2" />
                      <rect x="43" y="43" width="23" height="23" fill="#e9e3d9" rx="2" />
                    </pattern>
                    <pattern id="heroPark" width="260" height="260" patternUnits="userSpaceOnUse">
                      <rect x="30" y="20" width="60" height="40" fill="#d4e8c2" rx="6" opacity="0.6" />
                      <rect x="160" y="160" width="70" height="50" fill="#d4e8c2" rx="6" opacity="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#heroRoads)" />
                  <rect width="100%" height="100%" fill="url(#heroPark)" />
                  <line x1="0" y1="55%" x2="100%" y2="42%" stroke="#ddd4c8" strokeWidth="6" />
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-10 h-10 bg-blue-400/20 rounded-full animate-pulse" />
                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-500 shadow-sm z-10">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {radarMarkers.map((m, i) => (
                  <div key={i} className="absolute z-20 flex flex-col items-center" style={{ top: m.top, left: m.left, transform: 'translate(-50%, -50%)' }}>
                    <div className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-100 text-[10px] font-bold text-gray-800 mb-0.5 whitespace-nowrap">
                      {m.price}
                    </div>
                    <div className={`w-3 h-3 rounded-full shadow border-2 border-white ${m.color}`} />
                  </div>
                ))}

                <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex gap-3">
                    <span className="flex items-center gap-1 text-[9px] font-medium text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> {tr.map.vente}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-medium text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> {tr.map.recherche}
                    </span>
                  </div>
                  <div className="bg-[#FFC107]/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-[9px] font-bold text-gray-900 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> Radar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE – Hero text */}
            <div className="text-center max-w-md mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 bg-[#FFC107]/15 text-[#a07800] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-[#FFC107]/30">
                {h.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
                {h.headline1}<br />
                <span className="text-[#a07800]">{h.headline2}</span>
              </h1>
              <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">{h.desc}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition shadow-md shadow-yellow-500/20"
                >
                  {h.cta1}
                </button>
                <Link
                  to="/radar"
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-2xl font-semibold text-lg transition flex items-center justify-center gap-2"
                >
                  {h.cta2} <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-4">{h.noCredit}</p>
            </div>

            {/* RIGHT – Recent listings strip */}
            <div className="hidden lg:flex flex-col gap-2 max-w-[200px]">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{h.recentTitle}</p>
              {heroListings.map((listing) => (
                <Link
                  key={listing.id}
                  to={`/annonces/${listing.id}`}
                  className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group"
                >
                  <div className="w-14 h-14 shrink-0 overflow-hidden bg-gray-100">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="flex-1 min-w-0 py-2 pr-2">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1 leading-tight">{listing.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{listing.city}</p>
                    <p className="text-xs font-black text-gray-900 mt-0.5">{listing.price}€</p>
                  </div>
                </Link>
              ))}
              <Link to="/annonces" className="text-[#a07800] text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
                {h.seeAll} <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANNONCES EN VITRINE ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{tr.listings.recent}</h2>
            <Link to="/annonces" className="text-[#a07800] text-sm font-semibold hover:underline flex items-center gap-1">
              {tr.listings.seeAll} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 relative">
            {featuredListings.map((listing, idx) => (
              <div key={listing.id} className={`relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm ${idx >= 4 ? 'hidden sm:block' : ''}`}>
                {idx >= 2 && (
                  <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/60 flex flex-col items-center justify-center">
                    <div className="bg-[#FFC107] text-gray-900 px-3 py-1.5 rounded-xl font-semibold text-xs shadow">
                      {tr.listings.joinToSee}
                    </div>
                  </div>
                )}
                <div className="h-16 overflow-hidden bg-gray-100">
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {listing.isFeatured && (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-current" /> Top Deal
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{stateLabels[listing.state]}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{listing.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                    <MapPin className="w-3 h-3" /> {listing.city}
                    {listing.seller.verified && (
                      <span className="ml-1 flex items-center gap-0.5 text-green-600">
                        <BadgeCheck className="w-3 h-3" /> {tr.listingCard.verified}
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-gray-900">{listing.price}€
                    {listing.negotiable && <span className="text-xs text-gray-400 font-normal ml-1">· {tr.listingCard.negotiable}</span>}
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-20" />
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate('/auth')} className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-2xl font-semibold transition">
              {tr.listings.joinToSeeAll}
            </button>
          </div>
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{cat.title}</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {CATEGORIES_TRANSLATED.map((c) => {
              const Icon = c.icon;
              return (
                <Link key={c.id} to={`/annonces?cat=${c.id}`} className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-gray-100 bg-white hover:shadow-md transition group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color} group-hover:scale-110 transition`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium text-gray-700 text-center leading-tight">{c.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3 PREUVES DE CONFIANCE ── */}
      <section id="comment" className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{trust.title}</h2>
          <p className="text-gray-500 text-center mb-8">{trust.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: trust.phone_title, desc: trust.phone_desc, color: 'bg-green-50 border-green-100', iconColor: 'text-green-600 bg-green-100' },
              { icon: Shield, title: trust.price_title, desc: trust.price_desc, color: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-600 bg-blue-100' },
              { icon: BadgeCheck, title: trust.bilingual_title, desc: trust.bilingual_desc, color: 'bg-[#FFC107]/10 border-yellow-200', iconColor: 'text-[#a07800] bg-[#FFC107]/20' },
            ].map((point, i) => {
              const Icon = point.icon;
              return (
                <div key={i} className={`rounded-2xl border p-6 ${point.color}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${point.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RADAR CTA ── */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-gradient-to-br from-[#fffbef] to-white border border-yellow-200 rounded-3xl p-8">
            <div className="w-16 h-16 bg-[#FFC107]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#a07800]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{rc.title}</h2>
            <p className="text-gray-500 mb-6">{rc.desc}</p>
            <Link to="/radar" className="inline-flex items-center gap-2 bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-2xl font-semibold transition">
              {rc.btn}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={logo} alt="Obicaz" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-gray-500 text-sm text-center">{f.landingCopyright}</p>
          <div className="flex gap-4 text-sm">
            <Link to="/regles" className="hover:text-white transition">{f.landingFooterLinks[0]}</Link>
            <a href="#" className="hover:text-white transition">{f.landingFooterLinks[1]}</a>
            <a href="#" className="hover:text-white transition">{f.landingFooterLinks[2]}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── EXPORT PRINCIPAL ──────────────────────────────────────────────────────────
export function Home() {
  const { userStatus } = useUser();
  if (userStatus === 'guest') return <LandingPage />;
  return <MapView />;
}
import { useState } from 'react';
import { Filter, X, BadgeCheck, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockListings } from '../data/mockListings';
import { ListingCard } from '../components/ListingCard';
import { useUser } from '../context/UserContext';
import { useT } from '../i18n/useT';

export function Listings() {
  const { userStatus } = useUser();
  const tr = useT();
  const lp = tr.listingsPage;
  const cat = tr.categories;
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    city: '',
    state: 'all',
    language: 'all',
    type: 'all',
  });

  const categoryLabels: Record<string, string> = {
    all: cat.all,
    gaming: cat.gaming,
    jouets: cat.jouets,
    sport: cat.sport,
    equestre: cat.equestre,
    arts: cat.arts,
    photo: cat.photo,
    musique: cat.musique,
    jardin: cat.jardin,
  };

  const stateLabels: Record<string, string> = {
    all: lp.allStates,
    'neuf': lp.stateNew,
    'comme-neuf': lp.stateLikeNew,
    'bon-etat': lp.stateGood,
    'usage-visible': lp.stateVisible,
  };

  let filteredListings = mockListings.filter(l => l.status === 'active');

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredListings = filteredListings.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q)
    );
  }
  if (filters.type !== 'all') filteredListings = filteredListings.filter(l => l.type === filters.type);
  if (filters.category !== 'all') filteredListings = filteredListings.filter(l => l.category === filters.category);
  if (filters.state !== 'all') filteredListings = filteredListings.filter(l => l.state === filters.state);
  if (filters.language !== 'all') filteredListings = filteredListings.filter(l => l.language === filters.language);
  if (filters.minPrice) filteredListings = filteredListings.filter(l => l.price >= parseInt(filters.minPrice));
  if (filters.maxPrice) filteredListings = filteredListings.filter(l => l.price <= parseInt(filters.maxPrice));
  if (filters.city) filteredListings = filteredListings.filter(l => l.city.toLowerCase().includes(filters.city.toLowerCase()));

  const n = filteredListings.length;
  const countLabel = n === 1
    ? `1 ${lp.annonce} ${lp.available}`
    : `${n} ${lp.annonces} ${lp.availables}`;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Guest banner */}
      {userStatus === 'guest' && (
        <div className="bg-gradient-to-r from-[#FFC107] to-yellow-300 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BadgeCheck className="w-5 h-5 text-gray-800" />
                <h2 className="text-lg font-bold text-gray-900">{lp.guestBannerTitle}</h2>
              </div>
              <p className="text-gray-800 text-sm">{lp.guestBannerDesc}</p>
            </div>
            <button
              onClick={() => navigate('/auth')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold text-sm transition whitespace-nowrap"
            >
              {tr.nav.join}
            </button>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex items-center px-4 py-3 shadow-sm">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder={lp.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none px-3 text-gray-700 placeholder-gray-400"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl"
        >
          <Filter className="w-5 h-5" />
          {lp.filterMobile}
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{lp.title}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{countLabel}</p>
        </div>
        <div className="hidden md:flex bg-gray-100 rounded-xl p-1 gap-1">
          {[
            { val: 'all', label: lp.tabAll },
            { val: 'sell', label: lp.tabSell },
            { val: 'buy', label: lp.tabBuy },
          ].map((t) => (
            <button
              key={t.val}
              onClick={() => setFilters({ ...filters, type: t.val })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${filters.type === t.val ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'} md:block md:relative md:w-56 md:flex-shrink-0`}>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-5 md:block">
              <h2 className="font-bold text-gray-900">{lp.filters}</h2>
              <button onClick={() => setShowFilters(false)} className="md:hidden">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Type (mobile) */}
              <div className="md:hidden">
                <label className="block text-sm font-medium text-gray-700 mb-2">{lp.type}</label>
                <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFC107] focus:border-transparent">
                  <option value="all">{lp.tabAll}</option>
                  <option value="sell">{lp.tabSell}</option>
                  <option value="buy">{lp.tabBuy}</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lp.category}</label>
                <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFC107] focus:border-transparent">
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lp.minPrice} / {lp.maxPrice}</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFC107] focus:border-transparent" />
                  <input type="number" placeholder="Max" value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFC107] focus:border-transparent" />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lp.city}</label>
                <input type="text" placeholder={lp.city + '...'} value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFC107] focus:border-transparent" />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lp.condition}</label>
                <select value={filters.state} onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFC107] focus:border-transparent">
                  {Object.entries(stateLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lp.language}</label>
                <select value={filters.language} onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFC107] focus:border-transparent">
                  <option value="all">{lp.allLang}</option>
                  <option value="fr">Français</option>
                  <option value="nl">Nederlands</option>
                </select>
              </div>

              {/* Reset */}
              <button
                onClick={() => setFilters({ category: 'all', minPrice: '', maxPrice: '', city: '', state: 'all', language: 'all', type: 'all' })}
                className="w-full text-sm text-gray-500 hover:text-gray-800 font-medium py-2 border border-gray-200 rounded-xl transition"
              >
                {lp.reset}
              </button>
            </div>
          </div>
        </aside>

        {/* Listings Grid */}
        <div className="flex-1">
          {filteredListings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">{lp.noResults}</p>
              <p className="text-gray-400 text-sm mt-1">{lp.noResultsDesc}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} featured={listing.isFeatured} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
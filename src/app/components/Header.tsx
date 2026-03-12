import { Link, useNavigate } from 'react-router';
import { Search, User, Menu, MapPin, LayoutDashboard, BadgeCheck, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useT } from '../i18n/useT';
import { LangToggle } from './LangToggle';
const logo = "https://images.unsplash.com/photo-1599305090748-3552d9a64fbb?w=100";

export function Header() {
  const { userStatus, setUserStatus } = useUser();
  const tr = useT();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cycleStatus = () => {
    if (userStatus === 'guest') setUserStatus('registered');
    else if (userStatus === 'registered') setUserStatus('verified');
    else setUserStatus('guest');
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Obicaz" className="h-10" />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/annonces" className="text-gray-700 hover:text-gray-900 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition">
              {tr.nav.browse}
            </Link>
            <Link to="/radar" className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition">
              <MapPin className="w-4 h-4 text-[#a07800]" />
              {tr.nav.radar}
            </Link>
            {(userStatus === 'registered' || userStatus === 'verified') && (
              <Link to="/dashboard" className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition">
                <LayoutDashboard className="w-4 h-4" />
                {tr.nav.myListings}
              </Link>
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search icon */}
            <button className="hidden md:flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </button>

            {/* ── FR/NL TOGGLE — always visible ── */}
            <LangToggle />

            {/* Auth buttons */}
            {userStatus === 'guest' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/auth')}
                  className="hidden md:block text-gray-700 hover:text-gray-900 text-sm font-medium px-3 py-2"
                >
                  {tr.nav.login}
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold transition"
                >
                  {tr.nav.join}
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm ${
                    userStatus === 'verified'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {userStatus === 'verified' ? <BadgeCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  <span className="hidden md:inline">
                    {userStatus === 'verified' ? tr.nav.verifiedMember : tr.nav.myAccount}
                  </span>
                  <ChevronDown className="w-3 h-3 hidden md:block" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard className="w-4 h-4" /> {tr.nav.myListings}
                    </Link>
                    {userStatus === 'registered' && (
                      <Link to="/auth" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <BadgeCheck className="w-4 h-4" /> {tr.nav.verifyAccount}
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { cycleStatus(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-400 hover:bg-gray-50"
                    >
                      {tr.nav.demoToggle}
                    </button>
                    <button
                      onClick={() => { setUserStatus('guest'); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      {tr.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            )}

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2">
          <Link to="/annonces" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl font-medium">
            {tr.nav.browse}
          </Link>
          <Link to="/radar" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl font-medium">
            <MapPin className="w-4 h-4 text-[#a07800]" /> {tr.nav.radar}
          </Link>
          {(userStatus === 'registered' || userStatus === 'verified') && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl font-medium">
              <LayoutDashboard className="w-4 h-4" /> {tr.nav.myListings}
            </Link>
          )}
          {userStatus === 'guest' ? (
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-[#FFC107] text-gray-900 py-3 rounded-xl font-semibold mt-2">
              {tr.nav.join}
            </Link>
          ) : (
            <button onClick={() => { setUserStatus('guest'); setMenuOpen(false); }} className="block w-full text-center text-red-600 py-2 font-medium">
              {tr.nav.logout}
            </button>
          )}
        </div>
      )}
    </header>
  );
}

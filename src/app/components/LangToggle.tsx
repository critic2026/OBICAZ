import { useUser } from '../context/UserContext';

interface LangToggleProps {
  className?: string;
}

export function LangToggle({ className = '' }: LangToggleProps) {
  const { preferredLanguage, setPreferredLanguage } = useUser();

  const toggle = () => setPreferredLanguage(preferredLanguage === 'fr' ? 'nl' : 'fr');

  return (
    <button
      onClick={toggle}
      title={preferredLanguage === 'fr' ? 'Passer en NL · Overschakelen naar NL' : 'Passer en FR · Overschakelen naar FR'}
      className={`flex items-center rounded-full border border-gray-300 shadow-sm overflow-hidden select-none hover:shadow-md transition-shadow bg-white ${className}`}
    >
      {/* FR side */}
      <span
        className={`flex items-center justify-center px-3.5 py-1.5 text-sm font-bold transition-colors duration-150 ${
          preferredLanguage === 'fr'
            ? 'bg-[#FFC107] text-gray-900'
            : 'bg-white text-gray-400 hover:text-gray-600'
        }`}
      >
        FR
      </span>
      {/* Divider */}
      <span className="w-px self-stretch bg-gray-200" />
      {/* NL side */}
      <span
        className={`flex items-center justify-center px-3.5 py-1.5 text-sm font-bold transition-colors duration-150 ${
          preferredLanguage === 'nl'
            ? 'bg-[#FFC107] text-gray-900'
            : 'bg-white text-gray-400 hover:text-gray-600'
        }`}
      >
        NL
      </span>
    </button>
  );
}

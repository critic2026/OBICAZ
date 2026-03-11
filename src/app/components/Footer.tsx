import { Link } from 'react-router';
import { BadgeCheck, Shield, Phone } from 'lucide-react';
import { useT } from '../i18n/useT';
import logo from 'https://images.unsplash.com/photo-1555529669-26f9d103abdd?w=100';

export function Footer() {
  const tr = useT();
  const f = tr.footer;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Link to="/">
                <img src={logo} alt="Obicaz" className="h-10 opacity-90 hover:opacity-100 transition-opacity" />
              </Link>
            </div>
            <p className="text-gray-400 text-sm max-w-md mb-4">{f.desc}</p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Phone, label: f.trust1 },
                { icon: Shield, label: f.trust2 },
                { icon: BadgeCheck, label: f.trust3 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                  <item.icon className="w-3 h-3 text-[#FFC107]" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Club */}
          <div>
            <h3 className="text-white font-semibold mb-4">{f.club}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/annonces" className="hover:text-white transition">{f.browseListings}</Link></li>
              <li><Link to="/radar" className="hover:text-white transition">{f.radarMap}</Link></li>
              <li><Link to="/regles" className="hover:text-white transition">{f.rules}</Link></li>
              <li><a href="#" className="hover:text-white transition">{f.howItWorks}</a></li>
              <li><Link to="/auth" className="hover:text-white transition">{f.join}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{f.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">{f.terms}</a></li>
              <li><a href="#" className="hover:text-white transition">{f.privacy}</a></li>
              <li><a href="#" className="hover:text-white transition">{f.legalNotice}</a></li>
              <li><a href="#" className="hover:text-white transition">{f.help}</a></li>
              <li><a href="mailto:contact@obicaz.be" className="hover:text-white transition">contact@obicaz.be</a></li>
            </ul>
          </div>
        </div>

        {/* Club rules teaser */}
        <div id="regles" className="bg-gray-800 rounded-2xl p-5 mb-6">
          <h4 className="text-white font-semibold mb-3">{f.rulesTitle}</h4>
          <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-400">
            <div className="flex gap-2"><span className="text-green-400">✓</span> {f.rule1}</div>
            <div className="flex gap-2"><span className="text-green-400">✓</span> {f.rule2}</div>
            <div className="flex gap-2"><span className="text-red-400">✗</span> {f.rule3}</div>
            <div className="flex gap-2"><span className="text-green-400">✓</span> {f.rule4}</div>
            <div className="flex gap-2"><span className="text-red-400">✗</span> {f.rule5}</div>
            <div className="flex gap-2"><span className="text-green-400">✓</span> {f.rule6}</div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-sm">
          <p>{f.copyright}</p>
          <Link to="/cgu" className="text-[#FFC107] hover:text-yellow-300 text-xs font-semibold transition underline underline-offset-2">
            CGU · Règlement officiel
          </Link>
          <p className="text-xs">{f.prototype}</p>
        </div>
      </div>
    </footer>
  );
}

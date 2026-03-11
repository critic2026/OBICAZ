import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Eye, EyeOff, BadgeCheck, Phone, Shield, CheckCircle2, ScrollText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';
import logo from 'src="https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?w=500"';

// ── RÈGLEMENT (résumé 14 articles) ──────────────────────────────────────────
const CLUB_RULES_SUMMARY = [
  { num: '1', title: "L'esprit d'Obicaz", body: "Obicaz est un club de petites annonces réservé à des membres majeurs, identifiés et responsables. La plateforme repose sur quelques règles simples : honnêteté, clarté, sécurité, respect et bon sens. En utilisant Obicaz, chaque membre s'engage à publier des annonces sincères, à fournir des informations exactes, à respecter les autres membres et à utiliser la plateforme loyalement. Obicaz peut refuser, retirer, masquer, suspendre ou supprimer tout compte, message ou annonce contraire à cet esprit." },
  { num: '2', title: 'Réservé aux personnes majeures', body: "L'inscription sur Obicaz est strictement interdite aux moins de 18 ans. En créant un compte, vous certifiez avoir au moins 18 ans. Toute fausse déclaration sur l'âge peut entraîner la suspension immédiate ou le bannissement définitif du compte." },
  { num: '3', title: 'Informations exactes et compte personnel', body: "Chaque membre doit fournir des informations exactes, complètes et à jour. Sont interdits : les fausses déclarations ; l'usurpation d'identité ; l'utilisation d'un faux numéro, d'un faux profil ou de données appartenant à un tiers ; la création de plusieurs comptes pour contourner une suspension ou un bannissement." },
  { num: '4', title: 'Règles de publication', body: "Chaque annonce doit être réelle, claire, précise et honnête. Il est interdit de publier : une annonce mensongère ou trompeuse ; un faux objet, une fausse recherche ou une fausse disponibilité ; des photos ne correspondant pas à l'objet proposé ; une description volontairement trompeuse ou incomplète ; une annonce sans intention réelle de vendre ou d'acheter ; des doublons abusifs ou du spam." },
  { num: '5', title: 'Prix affiché', body: 'Lorsqu\'un prix est requis, chaque annonce doit afficher un prix réel. Les mentions comme "à discuter", "faire offre" ou "négociable" peuvent être ajoutées, mais elles ne peuvent pas remplacer un prix.' },
  { num: '6', title: "État de l'objet", body: 'Lors de la création de l\'annonce, l\'utilisateur doit obligatoirement indiquer si l\'objet est neuf ou d\'occasion. Tout objet neuf doit être signalé via le bouton "neuf". Tout objet d\'occasion doit être signalé via le bouton "occasion". Toute fausse indication sur l\'état réel du bien constitue une fausse déclaration.' },
  { num: '7', title: 'Mention "vintage"', body: 'Sur Obicaz, sont considérés comme vintage les objets de plus de 25 ans. L\'utilisation trompeuse de la mention "vintage" pour valoriser artificiellement un objet plus récent est interdite.' },
  { num: '8', title: 'Objets interdits', body: "Tout objet, contenu ou service contraire à la loi, à la morale, à l'éthique, à la sécurité ou à l'esprit du club est formellement interdit. Sont notamment interdits : les armes, munitions et objets dangereux ; les objets liés à la drogue ; les objets liés à la pornographie ; les objets liés à la guerre ou à l'univers militaire ; les contenus violents, obscènes, dégradants ou choquants." },
  { num: '9', title: 'Comportements interdits', body: "Sont strictement interdits : les insultes, menaces, intimidations ou harcèlement ; les tentatives d'arnaque ; le phishing ou hameçonnage ; l'envoi de faux liens de paiement, de livraison ou de vérification ; la demande de codes SMS, mots de passe ou données sensibles ; toute tentative de contourner les règles de sécurité ou de modération." },
  { num: '10', title: 'Sécurité des échanges', body: "Pour protéger les membres, les échanges liés aux annonces doivent rester sur Obicaz. Quitter la plateforme pour poursuivre une conversation par SMS, WhatsApp, e-mail, Messenger, Telegram ou tout autre canal externe augmente fortement le risque d'arnaque, de fraude, de phishing et d'usurpation d'identité. Toute conversation ou transaction poursuivie hors d'Obicaz se fait aux seuls risques de l'utilisateur." },
  { num: '11', title: 'Arnaques et phishing', body: "Il est strictement interdit de : demander un code reçu par SMS ; demander un mot de passe ; envoyer un faux lien ; se faire passer pour Obicaz, une banque, un transporteur ou un support client ; exercer une pression urgente pour obtenir un paiement ou une donnée sensible. Toute tentative d'arnaque, de phishing ou de fraude entraîne un bannissement immédiat." },
  { num: '12', title: 'Modération, suspension et bannissement', body: "Obicaz peut à tout moment : refuser une annonce ; supprimer une annonce ; suspendre un compte ; limiter certaines fonctionnalités ; bannir un utilisateur temporairement ou définitivement. Le bannissement peut être immédiat, sans avertissement préalable. Aucun utilisateur ne dispose d'un droit acquis au maintien de son compte ou de ses annonces." },
  { num: '13', title: "Responsabilité de l'utilisateur", body: "Chaque membre reste seul responsable des informations qu'il publie, de la qualification des objets proposés, du contenu de ses annonces, des échanges qu'il engage, des liens, fichiers ou coordonnées qu'il transmet, des paiements, remises en main propre ou expéditions convenus avec d'autres membres. Obicaz est une plateforme d'intermédiation et de modération uniquement." },
  { num: '14', title: "Acceptation du règlement", body: "L'inscription, la connexion, la publication d'une annonce ou l'utilisation de la messagerie impliquent l'acceptation pleine et entière du présent règlement. Obicaz peut modifier ce règlement à tout moment pour renforcer la sécurité, améliorer le fonctionnement du club ou se conformer aux obligations légales." },
];

const ACCEPTANCE_TEXT = `Je certifie avoir au moins 18 ans et avoir lu et accepté le Règlement du Club Obicaz. Je m'engage à fournir des informations exactes, à publier des annonces sincères, à respecter les règles de sécurité de la plateforme et à ne pas proposer d'objet interdit. Je comprends que toute fausse déclaration, tentative d'arnaque, phishing, objet interdit ou contournement des règles peut entraîner la suspension ou le bannissement définitif de mon compte. Je comprends également que toute conversation ou transaction poursuivie hors d'Obicaz se fait à mes seuls risques et qu'Obicaz décline toute responsabilité en cas de fraude, d'arnaque ou de litige lié à ce contournement.`;

type AuthMode = 'lang' | 'choose' | 'login' | 'register' | 'otp' | 'success';

export function Auth() {
  const { setUserStatus, preferredLanguage, setPreferredLanguage } = useUser();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('lang');
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSending, setOtpSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [rulesScrolled, setRulesScrolled] = useState(false);
  const rulesRef = useRef<HTMLDivElement>(null);

  const handleRulesScroll = () => {
    const el = rulesRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 40;
    if (atBottom) setRulesScrolled(true);
  };

  const handleOtpChange = (i: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      const el = document.getElementById(`otp-${i - 1}`);
      el?.focus();
    }
  };

  const handleLogin = () => {
    if (!email || !password) { toast.error('Champs requis'); return; }
    setUserStatus('registered');
    toast.success('Connexion réussie ! Vérifiez votre téléphone pour accéder à toutes les fonctions.');
    navigate('/dashboard');
  };

  const handleRegister = () => {
    if (!email || !password || !phone) { toast.error('Tous les champs sont requis'); return; }
    if (!rulesAccepted) { toast.error('Vous devez accepter le règlement du club'); return; }
    if (!phone.startsWith('+32') && !phone.startsWith('04')) {
      toast.error('Numéro belge requis (+32 ou 04...)');
      return;
    }
    setOtpSending(true);
    setTimeout(() => {
      setOtpSending(false);
      setMode('otp');
      toast.success(`Code envoyé au ${phone}`);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    const code = otp.join('');
    if (code.length < 6) { toast.error('Entrez les 6 chiffres'); return; }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      if (code === '000000') {
        toast.error('Code invalide. Réessayez.');
        return;
      }
      setUserStatus('verified');
      setMode('success');
    }, 1500);
  };

  const steps: { id: AuthMode; label: string }[] = [
    { id: 'register', label: 'Compte' },
    { id: 'otp', label: 'Vérification' },
    { id: 'success', label: 'Activé' },
  ];
  const currentStepIdx = mode === 'success' ? 2 : mode === 'otp' ? 1 : 0;

  return (
    <div className="min-h-full overflow-y-auto bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between max-w-lg mx-auto w-full">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>
        <Link to="/">
          <img src={logo} alt="Obicaz" className="h-8 object-contain hover:opacity-80 transition-opacity" />
        </Link>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">

            {/* ── LANG CHOICE ── */}
            {mode === 'lang' && (
              <motion.div key="lang" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="text-center mb-10">
                  <div className="text-5xl mb-4">🇧🇪</div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Obicaz</h1>
                  <p className="text-gray-500">Marketplace belge · Belgische marktplaats</p>
                </div>

                <p className="text-center text-sm text-gray-500 mb-5 font-medium uppercase tracking-wide">
                  Votre langue préférée · Uw voorkeurstaal
                </p>

                <button
                  onClick={() => { setPreferredLanguage('fr'); setMode('choose'); }}
                  className={`w-full mb-4 relative overflow-hidden rounded-2xl border-2 transition-all duration-200 group ${
                    preferredLanguage === 'fr'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40'
                  }`}
                >
                  <div className="flex items-center gap-5 p-5">
                    <span className="text-5xl leading-none shrink-0">🇫🇷</span>
                    <div className="text-left flex-1">
                      <div className="font-bold text-gray-900 text-lg leading-tight">Je parle français</div>
                      <div className="text-blue-600 font-semibold text-sm mt-0.5">Voir les annonces FR en premier</div>
                      <div className="text-gray-400 text-xs mt-1">Interface en français · Annonces FR prioritaires</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition ${
                      preferredLanguage === 'fr' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {preferredLanguage === 'fr' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setPreferredLanguage('nl'); setMode('choose'); }}
                  className={`w-full relative overflow-hidden rounded-2xl border-2 transition-all duration-200 group ${
                    preferredLanguage === 'nl'
                      ? 'border-red-500 bg-red-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/40'
                  }`}
                >
                  <div className="flex items-center gap-5 p-5">
                    <span className="text-5xl leading-none shrink-0">🇧🇪</span>
                    <div className="text-left flex-1">
                      <div className="font-bold text-gray-900 text-lg leading-tight">Ik spreek Nederlands</div>
                      <div className="text-red-600 font-semibold text-sm mt-0.5">NL-advertenties eerst tonen</div>
                      <div className="text-gray-400 text-xs mt-1">Interface in het Nederlands · NL prioriteit</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition ${
                      preferredLanguage === 'nl' ? 'border-red-500 bg-red-500' : 'border-gray-300'
                    }`}>
                      {preferredLanguage === 'nl' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </button>

                <p className="text-center text-xs text-gray-400 mt-5">
                  Ce choix est modifiable à tout moment dans votre profil · Dit kan altijd worden gewijzigd
                </p>
              </motion.div>
            )}

            {/* ── CHOOSE ── */}
            {mode === 'choose' && (
              <motion.div key="choose" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <button
                  onClick={() => setMode('lang')}
                  className="flex items-center gap-2 mb-8 mx-auto bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-full text-sm text-gray-600 font-medium"
                >
                  <span>{preferredLanguage === 'fr' ? '🇫🇷' : '🇧🇪'}</span>
                  <span>{preferredLanguage === 'fr' ? 'Langue : Français' : 'Taal: Nederlands'}</span>
                  <span className="text-gray-400 text-xs">· modifier</span>
                </button>

                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Rejoindre le club</h1>
                  <p className="text-gray-500">Accès complet à Obicaz · Belgique 🇧🇪</p>
                </div>
                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => setMode('register')}
                    className="w-full bg-[#FFC107] hover:bg-yellow-400 text-gray-900 py-4 rounded-2xl font-semibold text-lg transition shadow-sm"
                  >
                    Créer un compte
                  </button>
                  <button
                    onClick={() => setMode('login')}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-4 rounded-2xl font-semibold text-lg transition"
                  >
                    Se connecter
                  </button>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3">
                  {[
                    { icon: Phone, text: 'Vérification téléphone belge (OTP)' },
                    { icon: Shield, text: 'Données protégées · anti-abus actif' },
                    { icon: BadgeCheck, text: 'Badge "Vérifié" visible par les autres membres' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-7 h-7 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-gray-500" />
                      </div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── LOGIN ── */}
            {mode === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <button onClick={() => setMode('choose')} className="flex items-center gap-1 text-sm text-gray-500 mb-6 hover:text-gray-800">
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
                <h2 className="text-2xl font-bold mb-1">Connexion</h2>
                <p className="text-gray-500 text-sm mb-8">Bon retour dans le club !</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse e-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="vous@exemple.be"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent text-gray-900"
                      />
                      <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-[#FFC107] hover:bg-yellow-400 text-gray-900 py-3.5 rounded-xl font-semibold transition"
                  >
                    Se connecter
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Pas encore membre ?{' '}
                    <button onClick={() => setMode('register')} className="text-[#a07800] font-semibold hover:underline">
                      Rejoindre le club
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── REGISTER ── */}
            {mode === 'register' && (
              <motion.div key="register" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <button onClick={() => setMode('choose')} className="flex items-center gap-1 text-sm text-gray-500 mb-4 hover:text-gray-800">
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>

                {/* Progress */}
                <div className="flex items-center gap-3 mb-8">
                  {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition ${i <= currentStepIdx ? 'bg-[#FFC107] text-gray-900' : 'bg-gray-100 text-gray-400'}`}>
                        {i + 1}
                      </div>
                      <span className={`text-sm ${i <= currentStepIdx ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{s.label}</span>
                      {i < steps.length - 1 && <div className={`flex-1 h-0.5 w-8 ${i < currentStepIdx ? 'bg-[#FFC107]' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-1">Créer mon compte</h2>
                <p className="text-gray-500 text-sm mb-8">Étape 1 sur 2 · Informations de connexion</p>

                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse e-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="vous@exemple.be"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="8 caractères minimum"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
                      />
                      <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Numéro de téléphone belge <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+32 4XX XX XX XX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Utilisé uniquement pour la vérification OTP. Belgique uniquement.
                    </p>
                  </div>

                  {/* ── RÈGLEMENT SCROLLABLE ── */}
                  <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <ScrollText className="w-4 h-4 text-[#a07800] shrink-0" />
                      <span className="text-sm font-semibold text-gray-800">Règlement du Club Obicaz</span>
                      <Link
                        to="/cgu"
                        target="_blank"
                        className="ml-auto flex items-center gap-1 text-xs text-[#a07800] hover:underline font-medium shrink-0"
                      >
                        Version complète <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Articles scrollables */}
                    <div
                      ref={rulesRef}
                      onScroll={handleRulesScroll}
                      className="h-52 overflow-y-auto px-4 py-3 space-y-4 text-xs text-gray-600 leading-relaxed"
                    >
                      {CLUB_RULES_SUMMARY.map((article) => (
                        <div key={article.num}>
                          <p className="font-bold text-gray-800 mb-1">
                            {article.num}. {article.title}
                          </p>
                          <p>{article.body}</p>
                        </div>
                      ))}
                      <div className="pt-2 pb-1 flex items-center gap-2">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-[10px] text-gray-400 font-medium">Fin du règlement</span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                    </div>

                    {/* Hint défilement */}
                    {!rulesScrolled && (
                      <div className="flex items-center justify-center gap-1.5 py-1.5 bg-amber-50 border-t border-amber-100">
                        <span className="text-[10px] text-amber-700 font-medium">↓ Faites défiler pour lire le règlement en entier</span>
                      </div>
                    )}

                    {/* Texte d'acceptation en gras + checkbox */}
                    <div className="px-4 py-4 bg-gray-50 border-t-2 border-gray-200">
                      {/* Acceptance text in bold */}
                      <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3">
                        <p className="text-xs leading-relaxed">
                          <strong className="text-gray-900 font-bold">
                            {ACCEPTANCE_TEXT}
                          </strong>
                        </p>
                      </div>

                      {/* Checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer group select-none">
                        <div className="relative mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={rulesAccepted}
                            onChange={e => setRulesAccepted(e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            rulesAccepted
                              ? 'bg-[#FFC107] border-[#FFC107]'
                              : 'border-gray-300 bg-white group-hover:border-[#FFC107]'
                          }`}>
                            {rulesAccepted && (
                              <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 12 12">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className={`text-xs font-semibold leading-tight transition-colors ${
                          rulesAccepted ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                          Règlement lu et approuvé — j'accepte sans réserve les conditions du Club Obicaz
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleRegister}
                    disabled={otpSending || !rulesAccepted}
                    className="w-full bg-[#FFC107] hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    {otpSending ? (
                      <><span className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />Envoi du code…</>
                    ) : (
                      'Continuer → Vérification'
                    )}
                  </button>

                  {!rulesAccepted && (
                    <p className="text-center text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl py-2 px-3">
                      ☝ Vous devez lire et cocher le règlement pour continuer
                    </p>
                  )}

                  <p className="text-center text-sm text-gray-500">
                    Déjà membre ?{' '}
                    <button onClick={() => setMode('login')} className="text-[#a07800] font-semibold hover:underline">Se connecter</button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── OTP ── */}
            {mode === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="flex items-center gap-3 mb-8">
                  {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition ${i <= currentStepIdx ? 'bg-[#FFC107] text-gray-900' : 'bg-gray-100 text-gray-400'}`}>
                        {i + 1}
                      </div>
                      <span className={`text-sm ${i <= currentStepIdx ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{s.label}</span>
                      {i < steps.length - 1 && <div className={`flex-1 h-0.5 w-8 ${i < currentStepIdx ? 'bg-[#FFC107]' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#FFC107]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-[#a07800]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Vérifie ton numéro</h2>
                  <p className="text-gray-500 text-sm">Code envoyé au <strong>{phone}</strong></p>
                  <p className="text-gray-400 text-xs mt-1">Étape 2 sur 2 · Vérification OTP</p>
                </div>

                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition ${
                        digit ? 'border-[#FFC107] bg-[#FFC107]/10' : 'border-gray-200 focus:border-[#FFC107]'
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center mb-6">
                  <p className="text-amber-800 text-xs">Mode démo : entrez n'importe quel code à 6 chiffres (sauf 000000)</p>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={verifying || otp.join('').length < 6}
                  className="w-full bg-[#FFC107] hover:bg-yellow-400 disabled:opacity-50 text-gray-900 py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  {verifying ? (
                    <><span className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />Vérification…</>
                  ) : (
                    'Vérifier et activer le compte'
                  )}
                </button>
                <button
                  onClick={() => toast.info('Code renvoyé (simulation)')}
                  className="w-full mt-3 text-sm text-gray-500 hover:text-gray-800 py-2 transition"
                >
                  Renvoyer le code
                </button>
              </motion.div>
            )}

            {/* ── SUCCESS ── */}
            {mode === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>

                <h2 className="text-3xl font-black text-gray-900 mb-2">Bienvenue dans le club !</h2>
                <p className="text-gray-500 mb-6">
                  Ton numéro est vérifié. Tu as accès à toutes les fonctions Obicaz.
                </p>

                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
                  <BadgeCheck className="w-4 h-4" /> Membre vérifié · Belgique 🇧🇪
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/radar')}
                    className="w-full bg-[#FFC107] hover:bg-yellow-400 text-gray-900 py-4 rounded-2xl font-semibold text-lg transition shadow-sm"
                  >
                    Voir le radar
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-4 rounded-2xl font-semibold text-lg transition"
                  >
                    Mon espace
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router';
import { ArrowLeft, Shield, Heart, Users, Ban, Lock, AlertTriangle, Star, Package, Gavel, UserCheck, Flag, RefreshCw, CheckCircle2 } from 'lucide-react';
import logo from 'src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"';

const RULES = [
  {
    num: '1',
    icon: Heart,
    color: 'bg-rose-100 text-rose-600',
    border: 'border-rose-100',
    title: "L'esprit d'Obicaz",
    intro: "Obicaz est un club de petites annonces réservé à des membres majeurs, identifiés et responsables. La plateforme repose sur quelques règles simples :",
    items: [
      'Honnêteté',
      'Clarté',
      'Sécurité',
      'Respect',
      'Bon sens',
    ],
    footer: "En utilisant Obicaz, chaque membre s'engage à publier des annonces sincères, à fournir des informations exactes, à respecter les autres membres et à utiliser la plateforme loyalement. Obicaz peut refuser, retirer, masquer, suspendre ou supprimer tout compte, message ou annonce contraire à cet esprit.",
  },
  {
    num: '2',
    icon: UserCheck,
    color: 'bg-blue-100 text-blue-600',
    border: 'border-blue-100',
    title: 'Réservé aux personnes majeures',
    intro: "L'inscription sur Obicaz est strictement interdite aux moins de 18 ans.",
    items: [],
    footer: "En créant un compte, vous certifiez avoir au moins 18 ans. Toute fausse déclaration sur l'âge peut entraîner la suspension immédiate ou le bannissement définitif du compte.",
  },
  {
    num: '3',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-600',
    border: 'border-indigo-100',
    title: 'Informations exactes et compte personnel',
    intro: 'Chaque membre doit fournir des informations exactes, complètes et à jour.',
    items: [
      'Les fausses déclarations',
      "L'usurpation d'identité",
      "L'utilisation d'un faux numéro, d'un faux profil ou de données appartenant à un tiers",
      'La création de plusieurs comptes pour contourner une suspension ou un bannissement',
    ],
    itemsLabel: 'Sont interdits :',
    footer: "Toute atteinte à la fiabilité des informations fournies peut entraîner une sanction immédiate.",
  },
  {
    num: '4',
    icon: Package,
    color: 'bg-amber-100 text-amber-600',
    border: 'border-amber-100',
    title: 'Règles de publication',
    intro: 'Chaque annonce doit être réelle, claire, précise et honnête.',
    items: [
      'Une annonce mensongère ou trompeuse',
      'Un faux objet, une fausse recherche ou une fausse disponibilité',
      'Des photos ne correspondant pas à l\'objet proposé',
      'Une description volontairement trompeuse ou incomplète',
      "Une annonce sans intention réelle de vendre ou d'acheter",
      'Des doublons abusifs ou du spam',
    ],
    itemsLabel: 'Il est interdit de publier :',
    footer: "Obicaz peut supprimer toute annonce jugée floue, trompeuse, nuisible ou non conforme à la qualité attendue du club.",
    itemsNegative: true,
  },
  {
    num: '5',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600',
    border: 'border-yellow-100',
    title: 'Prix affiché',
    intro: "Lorsqu'un prix est requis, chaque annonce doit afficher un prix réel.",
    items: [],
    footer: "Les mentions comme \"à discuter\", \"faire offre\" ou \"négociable\" peuvent être ajoutées, mais elles ne peuvent pas remplacer un prix.",
  },
  {
    num: '6',
    icon: Package,
    color: 'bg-teal-100 text-teal-600',
    border: 'border-teal-100',
    title: 'État de l\'objet : neuf ou occasion',
    intro: "Lors de la création de l'annonce, l'utilisateur doit obligatoirement indiquer si l'objet est :",
    items: [
      'Neuf',
      "D'occasion",
    ],
    footer: "Tout objet neuf doit être signalé via le bouton \"neuf\". Tout objet d'occasion doit être signalé via le bouton \"occasion\". Toute fausse indication sur l'état réel du bien constitue une fausse déclaration et peut entraîner la suppression de l'annonce, la suspension du compte ou le bannissement.",
  },
  {
    num: '7',
    icon: Star,
    color: 'bg-purple-100 text-purple-600',
    border: 'border-purple-100',
    title: 'Mention "vintage"',
    intro: 'Sur Obicaz, sont considérés comme vintage les objets de plus de 25 ans.',
    items: [],
    footer: "L'utilisation trompeuse de la mention \"vintage\" pour valoriser artificiellement un objet plus récent est interdite. Obicaz peut corriger, retirer ou requalifier toute annonce abusive.",
  },
  {
    num: '8',
    icon: Ban,
    color: 'bg-red-100 text-red-600',
    border: 'border-red-100',
    title: 'Objets interdits',
    intro: "Tout objet, contenu ou service contraire à la loi, à la morale, à l'éthique, à la sécurité ou à l'esprit du club est formellement interdit.",
    items: [
      'Les armes, munitions et objets dangereux',
      'Les objets liés de près ou de loin à la drogue',
      'Les objets liés à la pornographie',
      'Les objets liés à la guerre ou à l\'univers militaire',
      'Les contenus violents, obscènes, dégradants ou choquants',
      "Tout objet ou contenu pouvant porter atteinte à la sécurité, à la dignité ou à l'image du club",
    ],
    itemsLabel: 'Sont notamment interdits :',
    itemsNegative: true,
    footer: "La publication de ce type d'objet peut entraîner la suppression immédiate de l'annonce et le bannissement du compte.",
  },
  {
    num: '9',
    icon: AlertTriangle,
    color: 'bg-orange-100 text-orange-600',
    border: 'border-orange-100',
    title: 'Comportements interdits',
    intro: '',
    items: [
      'Les insultes, menaces, intimidations ou harcèlement',
      "Les tentatives d'arnaque",
      'Le phishing ou hameçonnage',
      'L\'envoi de faux liens de paiement, de livraison ou de vérification',
      'La demande de codes SMS, mots de passe ou données sensibles',
      'Toute tentative de contourner les règles de sécurité ou de modération',
      'La reprise de contact après bannissement via un autre compte',
    ],
    itemsLabel: 'Sont strictement interdits :',
    itemsNegative: true,
    footer: "Tout comportement frauduleux, agressif ou dangereux peut entraîner un bannissement immédiat.",
  },
  {
    num: '10',
    icon: Lock,
    color: 'bg-cyan-100 text-cyan-600',
    border: 'border-cyan-100',
    title: 'Sécurité des échanges',
    intro: "Pour protéger les membres, les échanges liés aux annonces doivent rester sur Obicaz.",
    items: [],
    footer: "Quitter la plateforme pour poursuivre une conversation par SMS, WhatsApp, e-mail, Messenger, Telegram ou tout autre canal externe augmente fortement le risque d'arnaque, de fraude, de phishing, d'usurpation d'identité et de litige impossible à vérifier. Toute conversation ou transaction poursuivie hors d'Obicaz se fait aux seuls risques de l'utilisateur. Obicaz se défausse complètement de toute responsabilité en cas de fraude résultant d'un échange volontairement poursuivi hors de la plateforme. Le fait d'inciter d'autres utilisateurs à sortir du site pour contourner les protections d'Obicaz peut entraîner une sanction immédiate.",
  },
  {
    num: '11',
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-600',
    border: 'border-red-100',
    title: 'Arnaques et phishing',
    intro: "Il est strictement interdit de :",
    items: [
      'Demander un code reçu par SMS',
      'Demander un mot de passe',
      'Envoyer un faux lien',
      "Se faire passer pour Obicaz, une banque, un transporteur ou un support client",
      'Exercer une pression urgente pour obtenir un paiement ou une donnée sensible',
    ],
    itemsNegative: true,
    footer: "Toute tentative d'arnaque, de phishing ou de fraude entraîne un bannissement immédiat et peut être signalée aux autorités compétentes.",
  },
  {
    num: '12',
    icon: Gavel,
    color: 'bg-gray-100 text-gray-600',
    border: 'border-gray-100',
    title: 'Modération, suspension et bannissement',
    intro: "Obicaz peut à tout moment :",
    items: [
      'Refuser une annonce',
      'Supprimer une annonce',
      'Suspendre un compte',
      'Limiter certaines fonctionnalités',
      'Bannir un utilisateur temporairement ou définitivement',
    ],
    footer: "Le bannissement peut être immédiat, sans avertissement préalable, en cas de fausse déclaration, objet interdit, fraude ou tentative de fraude, phishing, usurpation d'identité, contournement répété des règles ou comportement dangereux pour la communauté ou pour la plateforme. Aucun utilisateur ne dispose d'un droit acquis au maintien de son compte ou de ses annonces.",
  },
  {
    num: '13',
    icon: UserCheck,
    color: 'bg-green-100 text-green-600',
    border: 'border-green-100',
    title: "Responsabilité de l'utilisateur",
    intro: 'Chaque membre reste seul responsable :',
    items: [
      'Des informations qu\'il publie',
      'De la qualification "neuf", "occasion" ou "vintage"',
      'Des objets proposés',
      'Du contenu de ses annonces',
      'Des échanges qu\'il engage',
      'Des liens, fichiers ou coordonnées qu\'il transmet',
      'Des paiements, remises en main propre ou expéditions convenus avec d\'autres membres',
    ],
    footer: "Obicaz est une plateforme d'intermédiation et de modération. Obicaz n'est ni vendeur, ni acheteur, ni transporteur, ni garant de toutes les transactions entre utilisateurs.",
  },
  {
    num: '14',
    icon: RefreshCw,
    color: 'bg-slate-100 text-slate-600',
    border: 'border-slate-100',
    title: "Acceptation du règlement",
    intro: "L'inscription, la connexion, la publication d'une annonce ou l'utilisation de la messagerie impliquent l'acceptation pleine et entière du présent règlement.",
    items: [],
    footer: "Obicaz peut modifier ce règlement à tout moment pour renforcer la sécurité, améliorer le fonctionnement du club ou se conformer aux obligations légales.",
  },
];

const ACCEPTANCE_TEXT = `Je certifie avoir au moins 18 ans et avoir lu et accepté le Règlement du Club Obicaz. Je m'engage à fournir des informations exactes, à publier des annonces sincères, à respecter les règles de sécurité de la plateforme et à ne pas proposer d'objet interdit. Je comprends que toute fausse déclaration, tentative d'arnaque, phishing, objet interdit ou contournement des règles peut entraîner la suspension ou le bannissement définitif de mon compte. Je comprends également que toute conversation ou transaction poursuivie hors d'Obicaz se fait à mes seuls risques et qu'Obicaz décline toute responsabilité en cas de fraude, d'arnaque ou de litige lié à ce contournement.`;

export function ReglesClub() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <Link to="/">
            <img src={logo} alt="Obicaz" className="h-9 object-contain hover:opacity-80 transition-opacity" />
          </Link>
          <div className="w-16" />
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFC107]/20 text-[#FFC107] px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <Shield className="w-4 h-4" />
            Club Obicaz · Belgique 🇧🇪
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight">
            Règles du Club Obicaz
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Notre club repose sur des règles simples et claires : honnêteté, respect, sécurité et bon sens. Ces règles protègent chaque membre et garantissent la qualité de la plateforme.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-green-400" /> 14 règles
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
              <UserCheck className="w-3 h-3 text-blue-400" /> Membres majeurs uniquement
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
              <Flag className="w-3 h-3 text-[#FFC107]" /> Version V1 · 2026
            </span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">

        {/* Rules list */}
        <div className="space-y-5">
          {RULES.map((rule) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.num}
                className={`bg-white rounded-2xl border-2 ${rule.border} shadow-sm overflow-hidden`}
              >
                {/* Card header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${rule.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-baseline gap-3 flex-1 min-w-0">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider shrink-0">
                      #{rule.num}
                    </span>
                    <h2 className="font-black text-gray-900 leading-tight">{rule.title}</h2>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 py-4 space-y-3">
                  {rule.intro && (
                    <p className="text-gray-700 text-sm leading-relaxed">{rule.intro}</p>
                  )}

                  {rule.itemsLabel && (
                    <p className="text-sm font-semibold text-gray-800">{rule.itemsLabel}</p>
                  )}

                  {rule.items.length > 0 && (
                    <ul className="space-y-2">
                      {rule.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                            rule.itemsNegative
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {rule.itemsNegative ? '✕' : '✓'}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {rule.footer && (
                    <p className="text-gray-500 text-xs leading-relaxed pt-1 border-t border-gray-50">
                      {rule.footer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── TEXTE D'ACCEPTATION ── */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-7 text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#FFC107]/20 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#FFC107]" />
            </div>
            <div>
              <h3 className="font-black text-lg leading-tight">Texte accepté à l'inscription</h3>
              <p className="text-gray-400 text-xs mt-0.5">Obligatoire pour devenir membre du club</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-100 text-sm leading-relaxed">
              {ACCEPTANCE_TEXT}
            </p>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-gray-400 text-xs">
                Ce texte est présenté et doit être coché lors de chaque inscription
              </span>
            </div>
            <Link
              to="/auth"
              className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm transition shrink-0 inline-flex items-center gap-2"
            >
              Rejoindre le club →
            </Link>
          </div>
        </div>

        {/* ── LIEN CGU ── */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <Gavel className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Vous cherchez la version juridique ?</p>
              <p className="text-xs text-gray-400 mt-0.5">CGU complètes rédigées en termes légaux</p>
            </div>
          </div>
          <Link
            to="/cgu"
            className="text-sm font-semibold text-[#a07800] hover:text-yellow-600 transition underline underline-offset-2 shrink-0"
          >
            Lire les CGU officielles →
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 pb-2">
          © 2026 Obicaz · Règlement soumis au droit belge · contact@obicaz.be
        </p>
      </div>
    </div>
  );
}

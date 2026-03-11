import { Link } from 'react-router';
import { ArrowLeft, Shield, ScrollText } from 'lucide-react';
import logo from 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500';

const ARTICLES = [
  {
    num: 'Article 1',
    title: 'Objet',
    body: `Le présent règlement définit les conditions d'accès, d'utilisation, de publication, de modération et de sécurité applicables à la plateforme Obicaz.

Toute personne qui s'inscrit, se connecte, publie une annonce, échange via la messagerie ou utilise un service proposé sur Obicaz reconnaît avoir pris connaissance du présent règlement et l'accepter sans réserve.`,
  },
  {
    num: 'Article 2',
    title: "Condition d'âge",
    body: `L'accès à la plateforme est strictement réservé aux personnes âgées de 18 ans au minimum.

En créant un compte, l'utilisateur déclare et garantit être majeur. Toute déclaration inexacte relative à l'âge constitue un manquement grave autorisant Obicaz à suspendre ou bannir immédiatement le compte concerné, sans préavis.`,
  },
  {
    num: 'Article 3',
    title: 'Véracité des informations fournies',
    body: `L'utilisateur s'engage à fournir, lors de l'inscription et pendant toute la durée d'utilisation de la plateforme, des informations exactes, sincères, complètes et actualisées.

Sont interdits :
• toute fausse déclaration ;
• toute usurpation d'identité ;
• l'utilisation de coordonnées, numéros ou données appartenant à un tiers ;
• la création de comptes multiples dans le but de contourner une limitation, une suspension ou un bannissement ;
• toute manœuvre destinée à tromper Obicaz sur l'identité, l'âge, les coordonnées ou la qualité de l'utilisateur.

Obicaz se réserve le droit de demander toute vérification utile et de prendre toute mesure de restriction, suspension ou bannissement en cas de doute légitime.`,
  },
  {
    num: 'Article 4',
    title: 'Règles applicables aux annonces',
    body: `Toute annonce publiée sur Obicaz doit être réelle, licite, loyale, précise et non trompeuse.

L'utilisateur garantit que :
• l'objet ou la recherche existe réellement ;
• les photographies, descriptions et caractéristiques publiées correspondent au bien concerné ;
• l'annonce ne comporte aucune omission intentionnelle de nature à induire un autre utilisateur en erreur ;
• l'annonce n'a pas pour objet de manipuler, tester artificiellement le marché, générer de faux contacts ou détourner le fonctionnement normal de la plateforme.

Obicaz peut, à sa seule appréciation, refuser, retirer, suspendre, modifier la visibilité ou supprimer toute annonce non conforme.`,
  },
  {
    num: 'Article 5',
    title: 'Prix',
    body: `Lorsque l'affichage d'un prix est requis, l'utilisateur est tenu d'indiquer un prix réel.

Les mentions "faire offre", "à discuter", "négociable" ou toute formule équivalente ne peuvent en aucun cas se substituer à un prix lorsque celui-ci est obligatoire.

Toute indication de prix fictive, mensongère ou destinée à contourner les règles de publication peut entraîner la suppression de l'annonce et une sanction du compte.`,
  },
  {
    num: 'Article 6',
    title: "Qualification de l'état du bien",
    body: `Lors de la création d'une annonce, l'utilisateur est tenu de qualifier l'état du bien au moyen des options prévues par l'interface, notamment : neuf ; occasion.

Tout objet neuf doit être déclaré comme tel via le bouton "neuf".
Tout objet d'occasion doit être déclaré comme tel via le bouton "occasion".

Toute qualification erronée, trompeuse ou mensongère de l'état du bien est constitutive d'une fausse déclaration.`,
  },
  {
    num: 'Article 7',
    title: 'Usage de la mention "vintage"',
    body: `Sur Obicaz, la qualification "vintage" est réservée aux objets âgés de plus de 25 ans.

L'utilisateur s'interdit d'utiliser cette qualification de façon abusive, trompeuse ou fantaisiste. Obicaz peut retirer, requalifier ou supprimer toute annonce faisant un usage abusif de cette mention.`,
  },
  {
    num: 'Article 8',
    title: 'Objets, contenus et services interdits',
    body: `Il est strictement interdit de publier, rechercher, proposer, promouvoir ou faciliter sur Obicaz tout objet, contenu ou service contraire à la loi, à la morale ou à l'éthique, dangereux, violent, obscène, dégradant ou choquant, ou incompatible avec l'image, la sécurité ou l'esprit de la plateforme.

Sont notamment interdits, sans que cette liste soit limitative :
• les armes, munitions et objets dangereux ;
• les objets liés directement ou indirectement à la drogue ;
• les objets liés à la pornographie ;
• les objets liés à la guerre ou à l'univers militaire ;
• tout contenu à caractère violent, obscène, haineux ou dégradant.

Obicaz demeure seul juge de l'interprétation et de l'application de cette interdiction, sous réserve du droit applicable.`,
  },
  {
    num: 'Article 9',
    title: 'Comportements prohibés',
    body: `Sont prohibés sur la plateforme :
• le harcèlement, les menaces, insultes ou intimidations ;
• les tentatives d'escroquerie ou d'abus de confiance ;
• le phishing, l'hameçonnage, les faux formulaires, les faux liens de paiement, de livraison ou de vérification ;
• toute demande injustifiée de données sensibles, notamment codes SMS, mots de passe, coordonnées bancaires ou pièces d'identité hors procédure officielle ;
• le contournement des systèmes de modération, de sécurité ou de vérification ;
• la création ou l'utilisation d'un nouveau compte après suspension ou bannissement.

Tout comportement suspect, frauduleux ou dangereux peut donner lieu à une mesure immédiate de restriction ou d'exclusion.`,
  },
  {
    num: 'Article 10',
    title: 'Sécurité des échanges et communications externes',
    body: `Obicaz met à disposition des outils de communication destinés à sécuriser les échanges entre utilisateurs.

L'utilisateur reconnaît expressément que le fait de poursuivre volontairement un échange hors de la plateforme, notamment par téléphone, SMS, e-mail, WhatsApp, Messenger, Telegram ou tout autre canal externe, l'expose à un risque accru de fraude, de phishing, d'usurpation d'identité, de pression ou de contestation probatoire.

En conséquence, toute conversation, négociation, transmission d'information, de document, de lien ou de paiement effectuée hors d'Obicaz l'est aux risques exclusifs de l'utilisateur.

Obicaz décline toute responsabilité pour tout dommage, perte, fraude, litige, vol de données, usurpation, phishing ou préjudice financier résultant directement ou indirectement d'un échange volontairement poursuivi hors de la plateforme.

Le fait, pour un utilisateur, d'inciter un autre utilisateur à quitter la plateforme afin d'échapper aux contrôles, protections ou mécanismes de sécurité d'Obicaz constitue un manquement grave au présent règlement.`,
  },
  {
    num: 'Article 11',
    title: 'Modération et sanctions',
    body: `Obicaz dispose d'un pouvoir discrétionnaire de modération destiné à assurer la sécurité, la qualité et l'intégrité de la plateforme.

À ce titre, Obicaz peut notamment :
• refuser la publication d'une annonce ;
• retirer une annonce déjà publiée ;
• restreindre certaines fonctionnalités ;
• suspendre temporairement un compte ;
• bannir définitivement un utilisateur.

Ces mesures peuvent être prises avec ou sans avertissement préalable, notamment en cas de fausse déclaration, publication d'un objet interdit, tentative d'arnaque, phishing, contournement des règles de sécurité, récidive, ou comportement portant atteinte à la communauté ou à la réputation de la plateforme.

Aucun utilisateur ne peut se prévaloir d'un droit acquis au maintien de son compte, de ses annonces ou de ses accès.`,
  },
  {
    num: 'Article 12',
    title: "Responsabilité de l'utilisateur",
    body: `L'utilisateur demeure seul responsable :
• des informations qu'il publie ;
• de la véracité de ses déclarations ;
• de la qualification des biens proposés ;
• des objets mis en ligne ;
• des échanges engagés avec d'autres utilisateurs ;
• des fichiers, liens, coordonnées ou documents transmis ;
• des modalités de paiement, de remise en main propre, d'envoi ou d'exécution convenues avec d'autres utilisateurs.

Obicaz agit exclusivement comme plateforme d'intermédiation et de modération. Obicaz n'intervient pas comme vendeur, acheteur, mandataire, transporteur, expert, dépositaire ou garant des transactions conclues entre utilisateurs.`,
  },
  {
    num: 'Article 13',
    title: 'Signalement',
    body: `Tout utilisateur est invité à signaler sans délai à Obicaz toute annonce suspecte, tout objet interdit, toute tentative d'arnaque, de phishing ou tout comportement contraire au présent règlement.

Obicaz reste libre des suites données aux signalements reçus.`,
  },
  {
    num: 'Article 14',
    title: 'Modification du règlement',
    body: `Obicaz se réserve le droit de modifier à tout moment le présent règlement afin de renforcer la sécurité, d'adapter le fonctionnement de la plateforme ou de se conformer aux obligations légales et réglementaires applicables.

La version opposable est celle publiée sur la plateforme au moment de son utilisation.`,
  },
];

const ACCEPTANCE_TEXT = `Je certifie être âgé d'au moins 18 ans. Je reconnais avoir lu et accepté sans réserve le Règlement et les conditions d'utilisation d'Obicaz. Je m'engage à fournir des informations exactes, à ne publier aucun objet interdit, à ne commettre aucune fausse déclaration, à respecter les règles de sécurité de la plateforme et à ne pas contourner ses outils de communication. Je reconnais qu'en cas d'échange poursuivi hors d'Obicaz, j'agis à mes seuls risques et qu'Obicaz décline toute responsabilité en cas de fraude, phishing, arnaque, perte financière ou litige lié à ce contournement.`;

export function CGU() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
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

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Title block */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-14 h-14 bg-[#FFC107]/15 rounded-2xl flex items-center justify-center shrink-0 mt-1">
            <ScrollText className="w-7 h-7 text-[#a07800]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">
              Règlement &amp; CGU d'Obicaz
            </h1>
            <p className="text-gray-500 text-sm">
              Conditions générales d'utilisation · Version officielle · En vigueur dès l'inscription
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-700 font-medium">Version V1 · 2026 · 🇧🇪 Belgique</span>
            </div>
          </div>
        </div>

        {/* Intro box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-amber-900 text-sm leading-relaxed">
            <strong>En utilisant Obicaz</strong>, vous acceptez l'intégralité des présentes conditions. L'inscription, la connexion, la publication d'une annonce ou l'utilisation de la messagerie valent acceptation sans réserve.
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {ARTICLES.map((article) => (
            <div key={article.num} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-bold text-[#a07800] uppercase tracking-wider bg-[#FFC107]/15 px-2.5 py-1 rounded-lg shrink-0">
                  {article.num}
                </span>
                <h2 className="font-bold text-gray-900">{article.title}</h2>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {article.body}
              </div>
            </div>
          ))}
        </div>

        {/* Clause d'acceptation — encadrée, bien visible */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#FFC107] shrink-0" />
            <h3 className="font-bold text-lg">Clause d'acceptation à l'inscription</h3>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            {ACCEPTANCE_TEXT}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-gray-400 text-xs">Cette clause est présentée et doit être acceptée lors de chaque inscription.</span>
            <Link
              to="/auth"
              className="bg-[#FFC107] hover:bg-yellow-400 text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm transition shrink-0"
            >
              Rejoindre le club →
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-8 pb-4">
          © 2026 Obicaz · Règlement soumis au droit belge · contact@obicaz.be
        </p>
      </div>
    </div>
  );
}

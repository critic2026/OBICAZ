# Obicaz - Guide de démonstration

## 🎯 Fonctionnalités implémentées

### Navigation
- **Page d'accueil** (`/`) : Hero, catégories, section sécurité, nouvelles annonces, top deals
- **Liste des annonces** (`/annonces`) : Filtres avancés, cartes d'annonces
- **Détail d'annonce** (`/annonces/:id`) : Photos, description bilingue, infos vendeur, CTAs

### Système d'utilisateurs (simulé)
**Cliquez sur le bouton utilisateur en haut à droite** pour basculer entre 3 états :
1. **Invité (guest)** : Contenu partiellement masqué, CTAs pour s'inscrire
2. **Inscrit (registered)** : Accès complet aux annonces, peut contacter les vendeurs
3. **Vérifié (verified)** : Peut voir les numéros de téléphone des vendeurs

### Bilinguisme FR/NL
- Chaque annonce affiche sa description dans la langue originale
- Une traduction automatique est affichée en dessous avec un label "Traduction automatique"
- Les filtres permettent de filtrer par langue

### Sécurité & Qualité
- ✅ Badges de vérification pour les vendeurs
- ✅ Affichage du taux de signalement
- ✅ Prix obligatoire affiché partout (pas de "gratuit" ou "faire offre")
- ✅ Option "Prix négociable" visible si activée
- ✅ Messages de sécurité sur les pages de détail

### Filtres avancés
- Catégorie (Gaming, Jouets, Sport, Équestre, Arts)
- Fourchette de prix (min/max)
- Localisation (recherche par ville)
- État (Neuf, Comme neuf, Bon état, Usage visible)
- Langue (FR/NL)

## 🧪 Comment tester

1. **Testez les états utilisateur** : Cliquez sur le bouton utilisateur dans le header pour passer de Invité → Inscrit → Vérifié
2. **Parcourez les annonces** : Utilisez les filtres sur `/annonces`
3. **Consultez les détails** : Cliquez sur une annonce pour voir tous les détails
4. **Observez les restrictions** : En mode "Invité", certaines fonctionnalités sont masquées

## 📊 Données de démonstration

8 annonces de test dans différentes catégories :
- PlayStation 5 (Gaming)
- Lego Star Wars (Jouets)
- Vélo de route Specialized (Sport)
- Selle équestre (Équestre)
- Machine à coudre Singer (Arts)
- Nintendo Switch OLED (Gaming)
- Collection Funko Pop Marvel (Jouets)
- Skateboard électrique (Sport)

## 🇧🇪 Spécificités belges

- Interface multilingue FR/NL
- Villes belges dans les annonces (Bruxelles, Liège, Gand, Anvers, etc.)
- Mention "Belgique uniquement" dans le footer

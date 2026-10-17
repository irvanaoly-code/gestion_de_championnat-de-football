# Footboard Championship

Application de gestion d'un championnat de football avec dashboard, équipes, buteurs, entraîneurs, arbitres et stades.

En local, les données sont enregistrées dans `data/footboard.sqlite`. Sur Vercel, aucune variable d'environnement personnalisée n'est obligatoire : sans base distante, l'application utilise une base mémoire temporaire. Les comptes et les autres données peuvent alors disparaître au redémarrage ou différer d'une instance à l'autre. Les tables et collections initiales sont créées automatiquement au premier appel de l'API.

Node.js 22.5 ou une version ultérieure est nécessaire pour les outils locaux d'import et de réinitialisation de mot de passe.

## Installation

1. Ouvrez un terminal dans le dossier du projet.
2. Installez les dépendances :
   npm install
3. Démarrez l'application :
   npm start
4. Ouvrez l'URL suivante dans le navigateur :
   http://localhost:3000/ouvrage.html

## Développement

- Mode veille : npm run dev

## Déploiement sur Vercel

Le déploiement fonctionne sans ajouter de variable d'environnement. Pour conserver durablement les comptes et les données entre redémarrages et instances, une base distante libSQL/Turso et une clé JWT stable sont toutefois nécessaires. Si vous choisissez cette option :

1. Créez une base distante libSQL/Turso et générez son URL et son jeton d'accès.
2. Dans les paramètres du projet Vercel, ajoutez ces variables d'environnement pour les environnements à déployer :
   - `TURSO_DATABASE_URL` : URL de la base distante.
   - `TURSO_AUTH_TOKEN` : jeton d'accès à cette base.
   - `JWT_SECRET` : secret aléatoire long et stable, conservé confidentiel. Ne le changez pas entre les déploiements, sinon les sessions actives seront invalidées.
3. Déployez le projet avec Node.js 22. La page racine sert `ouvrage.html` et `api/[...path].js` transmet les routes `/api/*` au serveur Express (durée maximale : 30 secondes). `/api/health` indique si le stockage persistant est configuré. En local, `npm start` continue d'utiliser le fichier SQLite du dossier `data`.

## Réinitialiser un mot de passe

Pour réinitialiser un compte de la base SQLite locale, lancez `npm run reset-password` dans le dossier du projet. Saisissez l’adresse e-mail déjà inscrite, puis choisissez et confirmez un nouveau mot de passe. La saisie du mot de passe est masquée dans le terminal. Cette commande ne modifie pas la base distante configurée sur Vercel.

## Fonctionnalités

- classement automatique
- gestion des équipes
- gestion des entraîneurs
- gestion des arbitres
- gestion des stades
- tableau des meilleurs buteurs
- API REST Express
- stockage SQLite local et libSQL/Turso distant sur Vercel (équipes, matchs, buteurs, entraîneurs, arbitres, stades, installations et cartons)

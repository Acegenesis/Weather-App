# Weather App - Migration vers Nuxt 3

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec votre clé API OpenWeatherMap :

```env
NUXT_PUBLIC_API_KEY=votre_cle_api_openweathermap
```

Vous pouvez obtenir une clé API gratuite sur [OpenWeatherMap](https://openweathermap.org/api).

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview
```

## Changements apportés lors de la migration

### Structure des fichiers
- `src/` → Structure Nuxt 3 standard
- `src/views/HomeView.vue` → `pages/index.vue`
- `src/components/` → `components/`
- `src/assets/` → `assets/`

### Modifications du code
- Utilisation de `$fetch` au lieu d'axios pour les appels API
- Utilisation des composables Nuxt (`useRuntimeConfig`, `onMounted`, `ref`)
- Configuration via `nuxt.config.ts`
- Variables d'environnement via `runtimeConfig`

### Fonctionnalités
- Auto-import des composants
- Optimisation automatique des images
- Support TypeScript
- Hot Module Replacement (HMR)
- Génération statique possible avec `npm run generate`

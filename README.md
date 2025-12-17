# TP MongoClient

Une API REST Node.js construite avec Express et MongoDB pour gérer et interroger des données de produits.

## 📋 Description

Ce projet démontre l'intégration de MongoDB avec Node.js, avec une gestion de produits dotée de capacités de requêtes avancées, de pagination, de filtrage et de pipelines d'agrégation.

## 🚀 Fonctionnalités

- **Liste de produits** : Obtenir des produits avec pagination, filtrage et tri
- **Recherche** : Recherche en texte intégral dans les titres et descriptions de produits
- **Filtrage par catégorie** : Filtrer les produits par catégorie
- **Statistiques** : Statistiques agrégées par catégorie, produits les mieux notés et analyses par marque
- **Initialisation des données** : Remplir la base de données avec des données d'exemple depuis l'API DummyJSON

## 📦 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (instance locale ou cloud)
- npm ou yarn

## 🛠️ Installation

1. Clonez le dépôt et naviguez vers le répertoire du projet :

   ```bash
   cd "TP MongoClient"
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :

   ```env
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=nom_de_votre_base_de_donnees
   ```

4. Initialisez la base de données avec des produits d'exemple :

   ```bash
   npm run seed
   ```

5. Démarrez le serveur de développement :
   ```bash
   npm start
   ```

Le serveur s'exécutera sur `http://localhost:3000`

## 📡 Points d'API

### GET /api/products

Obtenir une liste paginée de produits avec filtrage et tri optionnels.

**Paramètres de requête :**

- `page` (nombre, par défaut : 1) : Numéro de page
- `limit` (nombre, par défaut : 10) : Nombre d'éléments par page
- `category` (chaîne) : Filtrer par catégorie
- `search` (chaîne) : Rechercher dans le titre et la description
- `sort` (chaîne) : Champ de tri (préfixer avec `-` pour décroissant, ex : `-price`)

**Exemple :**

```bash
GET /api/products?page=1&limit=10&category=smartphones&search=apple&sort=-price
```

**Réponse :**

```json
{
  "page": 1,
  "limit": 10,
  "total": 50,
  "products": [...]
}
```

### GET /api/products/stats

Obtenir des statistiques agrégées sur les produits.

**Réponse :**

```json
{
  "statsByCategory": [
    {
      "categoryName": "smartphones",
      "totalProducts": 10,
      "averagePrice": 799.99,
      "maxPrice": 1299.99,
      "minPrice": 299.99
    }
  ],
  "bestProducts": [
    {
      "title": "Product Name",
      "price": 999.99,
      "rating": 4.9
    }
  ],
  "brandStats": [
    {
      "_id": "Apple",
      "totalStock": 500,
      "totalValue": 150000
    }
  ]
}
```

## 🗂️ Structure du projet

```
TP MongoClient/
├── routes/
│   └── products.js      # Routes et contrôleurs de produits
├── server.js            # Configuration du serveur Express
├── seedProducts.js      # Script d'initialisation de la base de données
├── package.json         # Dépendances du projet
├── .env                 # Variables d'environnement (non suivies)
└── README.md           # Ce fichier
```

## 🛢️ Schéma de la base de données

La collection de produits suit ce schéma :

```javascript
{
  title: String,
  description: String,
  price: Number,
  category: String,
  brand: String,
  stock: Number,
  rating: Number,
  // ... autres champs de l'API DummyJSON
}
```

## 📜 Scripts disponibles

- `npm start` - Démarrer le serveur avec nodemon (redémarrage automatique lors de changements)
- `npm run seed` - Remplir la base de données avec des produits d'exemple depuis DummyJSON

## 🔧 Technologies utilisées

- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **MongoDB Native Driver** - Client de base de données
- **dotenv** - Gestion des variables d'environnement
- **nodemon** - Redémarrage automatique en développement

## 📝 Notes

- Le script d'initialisation récupère les produits depuis [DummyJSON](https://dummyjson.com/products)
- Tous les produits existants sont supprimés avant l'initialisation
- L'API utilise des pipelines d'agrégation MongoDB pour les statistiques

## 👨‍💻 Auteur

Sohail Charef - GLSID

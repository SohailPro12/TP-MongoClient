# TP MongoClient

A Node.js REST API built with Express and MongoDB for managing and querying product data.

## 📋 Description

This project demonstrates MongoDB integration with Node.js, featuring product management with advanced querying capabilities, pagination, filtering, and aggregation pipelines.

## 🚀 Features

- **Product Listing**: Get products with pagination, filtering, and sorting
- **Search**: Full-text search across product titles and descriptions
- **Category Filtering**: Filter products by category
- **Statistics**: Aggregated statistics by category, top-rated products, and brand analytics
- **Data Seeding**: Populate database with sample data from DummyJSON API

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   cd "TP MongoClient"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=your_database_name
   ```

4. Seed the database with sample products:

   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### GET /api/products

Get a paginated list of products with optional filtering and sorting.

**Query Parameters:**

- `page` (number, default: 1): Page number
- `limit` (number, default: 10): Items per page
- `category` (string): Filter by category
- `search` (string): Search in title and description
- `sort` (string): Sort field (prefix with `-` for descending, e.g., `-price`)

**Example:**

```bash
GET /api/products?page=1&limit=10&category=smartphones&search=apple&sort=-price
```

**Response:**

```json
{
  "page": 1,
  "limit": 10,
  "total": 50,
  "products": [...]
}
```

### GET /api/products/stats

Get aggregated statistics about products.

**Response:**

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

## 🗂️ Project Structure

```
TP MongoClient/
├── routes/
│   └── products.js      # Product routes and controllers
├── server.js            # Express server configuration
├── seedProducts.js      # Database seeding script
├── package.json         # Project dependencies
├── .env                 # Environment variables (not tracked)
└── README.md           # This file
```

## 🛢️ Database Schema

The products collection follows this schema:

```javascript
{
  title: String,
  description: String,
  price: Number,
  category: String,
  brand: String,
  stock: Number,
  rating: Number,
  // ... other fields from DummyJSON API
}
```

## 📜 Available Scripts

- `npm start` - Start the server with nodemon (auto-restart on changes)
- `npm run seed` - Populate the database with sample products from DummyJSON

## 🔧 Technologies Used

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **MongoDB Native Driver** - Database client
- **dotenv** - Environment variable management
- **nodemon** - Development auto-restart

## 📝 Notes

- The seed script fetches products from [DummyJSON](https://dummyjson.com/products)
- All existing products are deleted before seeding
- The API uses MongoDB aggregation pipelines for statistics

## 👨‍💻 Author

Created for XML/Database coursework at ENSET - S3

## 📄 License

ISC

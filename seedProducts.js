import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function seed() {
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const productsCol = db.collection("products");

  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  await productsCol.deleteMany({});
  await productsCol.insertMany(data.products);

  console.log("Produits seedés !");
  await client.close();
}

seed();

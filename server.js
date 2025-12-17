import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();

app.locals.db = client.db(process.env.DB_NAME);

app.use("/api/products", productRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));

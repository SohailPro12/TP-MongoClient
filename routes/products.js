import express from "express";
const router = express.Router();


router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  const {
    page = 1,
    limit = 10,
    category,
    search,
    sort
  } = req.query;

  const match = {};

  if (category) match.category = category;

  if (search) {
    match.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  const skip = (page - 1) * limit;

  const sortObj = {};
  if (sort) {
    sortObj[sort.replace("-", "")] = sort.startsWith("-") ? -1 : 1;
  }

  const products = await db.collection("products")
    .find(match)
    .sort(sortObj)
    .skip(Number(skip))
    .limit(Number(limit))
    .toArray();

  const total = await db.collection("products").countDocuments(match);

  res.json({
    page: Number(page),
    limit: Number(limit),
    total,
    products
  });
});

router.get("/stats", async (req, res) => {
  const db = req.app.locals.db;

  const statsByCategory = await db.collection("products").aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: "$price" },
        maxPrice: { $max: "$price" },
        minPrice: { $min: "$price" }
      }
    },
    { $sort: { averagePrice: -1 } },
    {
      $project: {
        _id: 0,
        categoryName: "$_id",
        totalProducts: 1,
        averagePrice: 1,
        maxPrice: 1,
        minPrice: 1
      }
    }
  ]).toArray();

  const bestProducts = await db.collection("products").aggregate([
    { $match: { price: { $gt: 500 } } },
    { $sort: { rating: -1 } },
    { $limit: 5 },
    {
      $project: {
        _id: 0,
        title: 1,
        price: 1,
        rating: 1
      }
    }
  ]).toArray();

  const brandStats = await db.collection("products").aggregate([
    {
      $group: {
        _id: "$brand",
        totalStock: { $sum: "$stock" },
        totalValue: {
          $sum: { $multiply: ["$price", "$stock"] }
        }
      }
    }
  ]).toArray();

  res.json({
    statsByCategory,
    bestProducts,
    brandStats
  });
});

export default router;

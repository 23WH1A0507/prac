const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* GET all */
router.get("/", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

/* SEARCH */
router.get("/search", async (req, res) => {
  const q = req.query.query;

  const data = await Product.find({
    name: { $regex: q, $options: "i" }
  });

  res.json(data);
});

/* ADD */
router.post("/", async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const p = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(p);
});

/* DELETE (ADDED - IMPORTANT) */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;

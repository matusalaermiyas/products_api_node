const router = require("express").Router();
const mongoose = require("mongoose");

const Favorites = require("../models/favorites");

// Create or update a favorite
router.post("/", async (req, res) => {
  const { token } = req;

  if (!mongoose.isValidObjectId(req.body.productId))
    return res.status(400).send("Invalid object id");

  let result = await Favorites.findOne({
    product_id: req.body.productId,
    user_id: token.userId,
  });

  if (!result) {
    result = new Favorites({
      user_id: token.userId,
      product_id: req.body.productId,
      isFavorite: true,
    });

    result = await result.save();

    return res.status(200).send(result);
  }

  result.isFavorite = !result.isFavorite;

  await result.save();

  return res.status(200).send(result);
});

// Get all favorites
router.get("/", async (req, res) => {
  const { token } = req;

  const favorites = await Favorites.find({ user_id: token.userId });

  return res.status(200).send(favorites);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid object id");

  const favorites = await Favorites.findOne({ product_id: req.params.id });

  return res.status(200).send(favorites);
});

module.exports = router;

const Joi = require("joi");
const route = require("express").Router();
const mongoose = require("mongoose");

const Products = require("../models/product");

const isAuthenticated = require("../middlewares/isAuthenticated");

const schema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().max(500).required(),
  price: Joi.number().required().default(0.0),
  imageUrl: Joi.string().required(),
});

// Get all products
route.get("/", async (req, res) => {
  const products = await Products.find({});

  res.send(products);
});

// Get single product
route.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid id");

  const product = await Products.findById(req.params.id);

  res.send(product);
});

// Create a product
route.post("/", isAuthenticated, async (req, res) => {
  const { error } = schema.validate({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  if (error) return res.status(400).send(error.details[0].message);
  const { token } = req;

  const product = new Products({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    user_id: token.userId,
  });

  await product.save();

  res.send(product);
});

// Update a product
route.put("/:id", isAuthenticated, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid id");

  const { error } = schema.validate({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const { token } = req;

  const product = await Products.findOneAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    user_id: token.userId,
  });

  res.send(product);
});

// Delete a product
route.delete("/:id", isAuthenticated, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid id");

  const { token } = req;
  const productToDelete = await Products.findById(req.params.id);

  if (token.userId != productToDelete.user_id)
    return res.status(403).send("You are not the owner of this product");

  await productToDelete.remove();

  res.status(200).send(productToDelete);
});

module.exports = route;

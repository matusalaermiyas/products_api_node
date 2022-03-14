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

route.get("/", async (req, res) => {
  const products = await Products.find({});

  res.send(products);
});

route.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid id");

  const product = await Products.findById(req.params.id);

  res.send(product);
});

route.post("/", isAuthenticated, async (req, res) => {
  const { error } = schema.validate({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  if (error) return res.status(400).send(error.details[0].message);

  const product = new Products({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  await product.save();

  res.send(product);
});

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

  const product = await Products.findOneAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  res.send(product);
});

route.delete("/:id", isAuthenticated, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid id");

  const product = await Products.findOneAndDelete(req.params.id);

  res.send(product);
});

module.exports = route;

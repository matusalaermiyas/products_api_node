const router = require("express").Router();
const Joi = require("joi");

const Orders = require("../models/orders");

router.get("/", async (req, res) => {
  const { token } = req;

  const orders = await Orders.find({ user_id: token.userId });

  return res.status(200).send(orders);
});

router.post("/", async (req, res) => {
  const { token } = req;

  const items = req.body.items.map(item => ({
    price: item.price,
    title: item.title,
    quantity: item.quantity,
  }));

  let newOrder = new Orders({
    user_id: token.userId,
    items,
    quantity: req.body.quantity,
    price: req.body.price,
  });

  newOrder = await newOrder.save();

  return res.status(200).send(newOrder);
});

module.exports = router;

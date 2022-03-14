const mongoose = require("mongoose");

const { cartSchema } = require("../models/carts");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  items: {
    type: [cartSchema],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderedDate: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Orders = mongoose.model("order", orderSchema);

module.exports = Orders;

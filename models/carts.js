const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// const Carts = new mongoose.model("cart", cartSchema);

module.exports = {
  cartSchema,
  //   Carts,
};

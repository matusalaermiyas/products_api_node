const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

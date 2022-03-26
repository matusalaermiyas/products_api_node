const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
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

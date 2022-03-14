const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  product_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const Favorite = mongoose.model("favorite", favoriteSchema);

module.exports = Favorite;

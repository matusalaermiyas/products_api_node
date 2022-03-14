const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

const jwt = require("jsonwebtoken");
const Joi = require("joi");

const login = require("express").Router();
const register = require("express").Router();

const User = require("../models/user");

login.post("/", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });

  if (!user) return res.status(404).send("Incorrect username or password");

  if (!user.password === req.body.password)
    return res.status(404).send("Incorrect username or password");

  const token = jwt.sign({ userId: user._id }, "123456", {
    expiresIn: "1h",
  });

  return res.send(token);
});

register.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    password: Joi.string().max(500).required(),
  });

  const { error } = schema.validate({
    name: req.body.name,
    password: req.body.password,
  });

  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    password: req.body.password,
  });

  user = await user.save();

  res.send(user);
});

module.exports = {
  login,
  register,
};

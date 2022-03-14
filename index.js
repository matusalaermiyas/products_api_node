const express = require("express");
const mongoose = require("mongoose");

const invalidApi = require("./routes/invalidApi");
const invalidJson = require("./middlewares/invalidJson");
const shop = require("./routes/shop");
const { login, register } = require("./routes/auth");
const orders = require("./routes/orders");
const favorites = require("./routes/favorites");
const isAuthenticated = require("./middlewares/isAuthenticated");

// mongoose
//   .connect(
//     "mongodb://ubmmtlqya5dtxqexbr5w:cOpPG9SywrXleM2iMWVV@bck2kmqdhniaa9q-mongodb.services.clever-cloud.com:27017/bck2kmqdhniaa9q"
//   )
//   .then(() => console.log("Connected to mongodb"))
//   .catch(error => console.log(error));

mongoose
  .connect("mongodb://localhost:27017/shop_app")
  .then(() => console.log("Connected to mongodb"))
  .catch(error => console.log(error));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/products", shop);
app.use("/login", login);
app.use("/register", register);
app.use("/orders", isAuthenticated, orders);
app.use("/favorites", isAuthenticated, favorites);
app.use(invalidApi);
app.use(invalidJson);

app.listen(process.env.PORT || 4000);

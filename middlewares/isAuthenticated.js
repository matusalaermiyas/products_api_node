const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.header("x-auth-token"))
    return res.status(400).send("No token provided");

  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, "123456");

    req.token = decoded;

    next();
  } catch (exception) {
    res.status(400).send("Invalid token provided");
  }
};

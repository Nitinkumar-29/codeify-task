const jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).send({ error: "Please use correct credentials" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = fetchUser;

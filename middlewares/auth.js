const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT verification error:", err);
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized: invalid token" });
  }

  req.user = payload;
  return next();
};

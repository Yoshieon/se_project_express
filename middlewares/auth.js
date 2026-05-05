const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/constants");
const { JWT_SECRET } = require("../utils/config");
const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }

  req.user = payload;
  next();
};

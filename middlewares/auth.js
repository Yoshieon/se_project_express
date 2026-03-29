const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const openRoute = (req) => {
  const publicPaths = [
    { path: "/signin", method: "POST" },
    { path: "/signup", method: "POST" },
    { path: "/items", method: "GET" },
  ];

  return publicPaths.some(
    (route) => route.path === req.path && route.method === req.method
  );
};

module.exports = (req, res, next) => {
  if (openRoute(req)) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Authorization required" });
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

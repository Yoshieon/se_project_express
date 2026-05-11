const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const NotFoundError = require("../errors/not-found-error");
const {
  validateUserBody,
  validateAuthBody,
} = require("../middlewares/validation");
const { login, createUser } = require("../controllers/users");

router.post("/signin", validateAuthBody, login);
router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;

const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/not-found-error");
const { celebrate, Joi } = require("celebrate");

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.post(
  "/users",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  login
);

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().uri().optional(),
    }),
  }),
  createUser
);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;

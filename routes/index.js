const router = require("express").Router();
const clothingItem = require("./clothingItem");

const userRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;

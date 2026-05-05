const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

router.use(require("../middlewares/auth"));

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;

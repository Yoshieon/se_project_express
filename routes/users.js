const router = require("express").Router();
const { getUser, getCurrentUser, updateUser } = require("../controllers/users");

router.use(require("../middlewares/auth"));

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;

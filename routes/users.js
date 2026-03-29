const router = require("express").Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);
router.get("/:userId", getUser);

module.exports = router;

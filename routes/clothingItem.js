const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");
const { validateCardBody, validateItemId } = require("../middlewares/validation");

// CRUD

// Read
router.get("/", getItems);

// Auth required for the rest
router.use(require("../middlewares/auth"));

// Create
router.post("/", validateCardBody, createItem);

// Delete
router.delete("/:itemId", validateItemId, deleteItem);

// Like
router.put("/:itemId/likes", validateItemId, likeClothingItem);

// Dislike
router.delete("/:itemId/likes", validateItemId, dislikeClothingItem);

module.exports = router;

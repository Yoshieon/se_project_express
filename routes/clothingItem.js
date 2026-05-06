const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

// CRUD

// Read
router.get("/", getItems);

// Auth required for the rest
router.use(require("../middlewares/auth"));

// Create
router.post("/", validateCardBody, createClothingItem);

// Delete
router.delete("/:itemId", validateItemId, deleteItem);

// Like
router.put("/:itemId/likes", validateItemId, likeClothingItem);

// Dislike
router.delete("/:itemId/likes", validateItemId, dislikeClothingItem);

module.exports = router;

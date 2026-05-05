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
router.post("/", validateClothingItem, createClothingItem);

// Update
router.put("/:itemId", updateItem);

// Delete
router.delete("/:itemId", deleteItem);

// Like
router.put("/:itemId/likes", likeClothingItem);

// Dislike
router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;

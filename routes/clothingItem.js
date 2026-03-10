const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

//CRUD

//Create
router.post("/", createItem);

//Read

router.get("/", getItems);

//Update

router.put("/:itemId", updateItem);

//Delete

router.delete("/:itemId", deleteItem);

//Like

router.put("/:itemId/likes", likeClothingItem);

//Dislike

router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;

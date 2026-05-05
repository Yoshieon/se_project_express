const ClothingItem = require("../models/clothingItem");
const {
  ERROR_CODES,
  BadRequestError,
  NotFoundError,
} = require("../utils/constants");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(e);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      next(e);
    });
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(e);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(ERROR_CODES.FORBIDDEN)
          .send({ message: "Forbidden: not the owner" });
      }
      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) =>
        res.send(deletedItem)
      );
    })
    .catch((e) => {
      if (e.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(e);
      }
    });
};

const likeClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(e);
      }
    });
};

const dislikeClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
};

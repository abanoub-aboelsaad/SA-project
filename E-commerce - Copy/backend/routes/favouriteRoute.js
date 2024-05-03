import express from "express";
import {
  addProductToFavourite,
  getAllFavourite,
  deleteProduct,
} from "../controllers/favouriteController.js";

const router = express.Router();

// Route to get all favorite products for a user
router.get("/:userId", getAllFavourite);

// Route to add a product to favorites for a user
router.post("/:userId", addProductToFavourite);

// Route to delete a product from favorites for a user
router.delete("/:userId/:id", deleteProduct);

export default router;

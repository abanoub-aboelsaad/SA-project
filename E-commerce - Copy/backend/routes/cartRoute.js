import express from "express";
import {
  addProductToCart,
  getAllCart,
  deleteProduct,
} from "../controllers/cartController.js";

const router = express.Router();

// Route to get all cart items for a specific user
router.get("/:userId", getAllCart);

// Route to add a product to a user's cart
router.post("/:userId", addProductToCart);

// Route to delete a product from a user's cart
router.delete("/:userId/:productId", deleteProduct);

export default router;

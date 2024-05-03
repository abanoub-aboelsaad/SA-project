// routes/productRoutes.js

import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET a single product by ID
router.get("/:productId", getSingleProduct);

// POST add a new product
router.post("/", addProduct);

// DELETE a product by ID
router.delete("/:id", deleteProduct);

// PUT update a product by ID
router.put("/:id", updateProduct);

export default router;

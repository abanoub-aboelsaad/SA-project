// controllers/productController.js

import ProductModel from "../models/productModel.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find({});
    if (allProducts && allProducts.length > 0) {
      res.send(allProducts);
    } else {
      res.json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single product by ID
export const getSingleProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const singleProduct = await ProductModel.findOne({ _id: productId });

    if (singleProduct) {
      res.send(singleProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  const {
    productType,
    productName,
    productPrice,
    productDetails,
    productPhoto,
  } = req.body;

  try {
    const productAdded = await ProductModel.create({
      productType,
      productName,
      productPrice,
      productDetails,
      productPhoto,
    });

    res.status(201).send({
      success: true,
      message: "Product added successfully",
      productAdded,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await ProductModel.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";

export const getAllCart = async (req, res) => {
  const userId = req.params.userId;
  const cart = await cartModel.find({ user_id: userId });
  res.status(200).json(cart);
};

export const addProductToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newProduct = await cartModel.create({ ...req.body, user_id: userId });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const objectId = mongoose.Types.ObjectId(productId);
    const deleteProduct = await cartModel.findOneAndDelete({ user_id: userId, _id: objectId });

    if (deleteProduct) {
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

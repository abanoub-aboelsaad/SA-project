import express from "express";
import {
  registerController,
  loginController,getProfileByIdController,updateProfileByIdController
} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

// Route to get a user's profile by ID
router.get("/profile/:userId", getProfileByIdController);

// Route to update a user's profile by ID
router.put("/profile/:userId", updateProfileByIdController);

export default router;

import express from "express";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

// PUT /api/users/update/:id → update user profile
router.put("/update/:id", updateUser);

export default router;

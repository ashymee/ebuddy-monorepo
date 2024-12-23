import { UserController } from "@controller/userController";
import { authMiddleware } from "@middleware/authMiddleware";
import { Router } from "express";
import "module-alias/register";

const router = Router();
const userController = new UserController();

// Define routes for user data
router
  .get("/fetch-user-data", authMiddleware, userController.getUsers) // Route to fetch users data
  .get("/fetch-user-data/:id", authMiddleware, userController.getUser) // Route to fetch user data
  .put("/update-user-data/:id", authMiddleware, userController.updateUser) // Route to update user data
  .delete("/delete-user-data/:id", authMiddleware, userController.deleteUser); // Route to delete user data

export default router;

import { User } from "@repo/entities/user";
import { UserRepository } from "@repository/userRepository";
import { Request, Response } from "express";

const userRepo = new UserRepository();

export class UserController {
  /**
   * Controller function to create new user data
   * @param req - Request object
   * @param res - Response object
   */

  /**
   * Controller function to fetch user data by specifying the user ID
   * @param req - Request object
   * @param res - Response object
   */
  async getUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    try {
      const userData = await userRepo.fetchUserData(id); // Call repository function to fetch data
      if (!userData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data", error });
    }
  }

  /**
   * Controller function to fetch all user data
   * @param req - Request object
   * @param res - Response object
   */
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const userData = await userRepo.fetchUsersData(); // Call repository function to fetch data
      if (!userData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data", error });
    }
  }

  /**
   * Controller function to update user data by specifying the user ID
   * @param req - Request object
   * @param res - Response object
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const data: Partial<User> = req.body; // Extract the updated data from the request body

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    try {
      await userRepo.updateUserData(id, data); // Call repository function to update data
      res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating user data", error });
    }
  }

  /**
   *  Controller function to delete user data by specifying the user ID
   * @param req - Request object
   * @param res - Response object
   */
  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    try {
      await userRepo.deleteUserData(id); // Call repository function to delete data
      res.status(200).json({ message: "User data deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user data", error });
    }
  }
}

import { generateToken } from "@config/jwtUtils";
import { User } from "@entities/user";
import { AuthRepository } from "@repository/authRepository";
import { Request, Response } from "express";
import * as admin from "firebase-admin";

const authRepo = new AuthRepository();

/**
 * Controller for user registration
 * @param req - Request object
 * @param res - Response object
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, nationality, phone } = req.body;

  try {
    // Validate uniqueness of email and name
    if (await authRepo.isEmailInUse(email)) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    if (await authRepo.isNameInUse(name)) {
      res.status(400).json({ message: "Name already in use" });
      return;
    }

    // Create User object
    const newUser: User = {
      name,
      email,
      nationality,
      phone,
    };

    // Register user and get UID
    const userId = await authRepo.registerUser(newUser, password);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

/**
 * Controller for user login
 * @param req - Request object
 * @param res - Response object
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({
      email: "Email is required",
      password: "Password is required",
    });
  }

  try {
    // Sign in with Firebase Authentication
    const user = await admin.auth().getUserByEmail(email);

    // Generate a JWT token
    const token = generateToken(user.uid);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: "Invalid email or password", error });
  }
};

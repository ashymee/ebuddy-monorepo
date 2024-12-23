import "dotenv/config";
import jwt from "jsonwebtoken";

// Secret key for signing JWT tokens (ensure this is stored securely in a real application)
const SECRET_KEY = process.env.JWT_SECRET!;

/**
 * Generates a JWT token for a user
 * @param userId - User's unique ID
 * @returns - JWT token
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" }); // Token expires in 1 hour
};

/**
 * Verifies the validity of a JWT token
 * @param token - JWT token
 * @returns - Decoded token payload
 */
export const verifyToken = (token: string): string | object => {
  return jwt.verify(token, SECRET_KEY);
};

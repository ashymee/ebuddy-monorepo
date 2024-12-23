import { verifyToken } from "@config/jwtUtils";
import { NextFunction, Request, Response } from "express";

/**
 * Simple authentication middleware to validate request token
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = verifyToken(token); // Verify token
    req.body.userId = (decoded as any).userId; // Attach userId to request for further processing
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid token", error });
  }
};

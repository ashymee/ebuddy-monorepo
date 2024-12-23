import { db } from "@config/firebaseConfig";
import { User } from "@repo/entities/user";
import * as admin from "firebase-admin";

export class AuthRepository {
  /**
   * Check if a user exists by email in Firebase Authentication
   * @param email - Email to check
   * @returns True if user exists, false otherwise
   */
  async isEmailInUse(email: string): Promise<boolean> {
    try {
      await admin.auth().getUserByEmail(email);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if a user exists by name in Firestore USERS collection
   * @param name - Name to check
   * @returns True if user exists, false otherwise
   */
  async isNameInUse(name: string): Promise<boolean> {
    const snapshot = await admin
      .firestore()
      .collection("USERS")
      .where("name", "==", name)
      .get();
    return !snapshot.empty;
  }

  /**
   * Register a new user in Firebase Authentication and Firestore
   * @param user - User data
   * @param password - Password for Firebase Authentication
   * @returns The UID of the created user
   */
  async registerUser(user: User, password: string): Promise<string> {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: user.email,
      password,
      displayName: user.name,
    });

    // Save user data in Firestore USERS collection
    const userRef = db.collection("USERS").doc();
    await userRef.set(user); // Create a new document with provided data

    return userRecord.uid;
  }

  /**
   * Get user data from Firestore USERS collection by UID
   * @param uid - User UID
   * @returns User data
   */
  async getUserData(uid: string): Promise<User | null> {
    const doc = await db.collection("USERS").doc(uid).get();
    return doc.exists ? (doc.data() as User) : null;
  }
}

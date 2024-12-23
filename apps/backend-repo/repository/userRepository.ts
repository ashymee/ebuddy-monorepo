import { db } from "@config/firebaseConfig";
import { User } from "@entities/user";
import * as admin from "firebase-admin";

export class UserRepository {
  /**
   * Function to update user data in the Firestore USERS collection
   * @param userId - User ID
   * @param data - User data to update
   */
  async updateUserData(userId: string, data: Partial<User>): Promise<void> {
    const userRef = db.collection("USERS").doc(userId);
    await userRef.update(data); // Update the Firestore document with provided data
  }

  /**
   * Function to fetch user data from the Firestore USERS collection
   * @param userId - User ID
   * @returns - The user data
   */
  async fetchUserData(userId: string): Promise<User | null> {
    const userRef = db.collection("USERS").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return null; // If document doesn't exist, return null
    }

    return doc.data() as User; // Return the user data
  }

  // get users
  async fetchUsersData(): Promise<User[]> {
    const users: User[] = [];
    const snapshot = await db.collection("USERS").get();

    snapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });

    return users;
  }

  /**
   * Function to delete user data from the Firestore USERS collection
   * @param userId - User ID
   */
  async deleteUserData(userId: string): Promise<void> {
    const userRef = db.collection("USERS").doc(userId);
    await userRef.delete(); // Delete the Firestore document

    // Delete user from Firebase Authentication
    await admin.auth().deleteUser(userId);
  }

  /**
   * Function to create a new user document in the Firestore USERS collection
   * @param data - User data to create
   * @returns - The ID of the newly created user document
   */
  async createUserData(data: User): Promise<string> {
    const userRef = db.collection("USERS").doc();
    await userRef.set(data); // Create a new document with provided data
    return userRef.id; // Return the ID of the newly created document
  }
}
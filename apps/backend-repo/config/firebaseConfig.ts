import "dotenv/config";
import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccount";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

export const db = admin.firestore(); // Firestore instance to interact with Firestore database

import serviceAccount from "@config/serviceAccount.json";
import "dotenv/config";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.DB_URL,
});

export const db = admin.firestore(); // Firestore instance to interact with Firestore database

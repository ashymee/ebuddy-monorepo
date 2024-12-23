import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchUserData = async () => {
  const userDoc = collection(db, "USERS");
  const userSnapshot = await getDocs(userDoc);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
};

export const updateUserData = async (userId: string, newData: User) => {
  const userRef = doc(db, "userId", userId);

  await updateDoc(userRef, newData as { [x: string]: any });
  const userDoc = doc(db, "USERS");

  return userDoc.id ? true : false;
};

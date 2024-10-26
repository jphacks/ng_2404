import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

type PostProps = {
  event: string;
  converted: string;
  tags: string[];
};

export const addPost = async ({ event, converted, tags }: PostProps) => {
  try {
    await addDoc(collection(db, "posts"), {
      event: event,
      converted: converted,
      favoriteNum: 0,
      timestamp: serverTimestamp(),
      tags: tags,
    });
  } catch (e) {
    console.error(e);
  }
};

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

type PostProps = {
  event: string;
  converted: string;
  tags: string[];
  userId?: string;
};

export type Post = {
  id: string;
  event: string;
  converted: string;
  tags: string[];
  date: string;
  // userId: string;
  // 他の必要なフィールドを追加
};

export const addPost = async ({
  event,
  converted,
  tags,
  userId,
}: PostProps) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      event: event,
      converted: converted,
      favoriteNumber: 0,
      date: new Date().toDateString(),
      tags: tags,
      userId: userId,
    });
  } catch (e) {
    console.error(e);
  }
};

export const getAllPost = async () => {
  try {
    const postCollection = collection(db, "posts");
    const postSnapshot = await getDocs(postCollection);
    const posts = postSnapshot.docs.map((doc) => ({
      id: doc.id,
      event: doc.data().event,
      converted: doc.data().converted,
      tags: doc.data().tags,
      date: doc.data().date,
      ...doc.data(),
    }));
    return posts;
  } catch (e) {
    console.error(e);
    return [];
  }
};
// ユーザーの投稿を取得する関数
export const getPostsById = async (userId: string): Promise<Post[]> => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      event: doc.data().event,
      converted: doc.data().converted,
      tags: doc.data().tags,
      date: doc.data().date,
      userId: doc.data().userId,
    }));

    return posts;
  } catch (e) {
    console.error("Error getting user posts:", e);
    return [];
  }
};
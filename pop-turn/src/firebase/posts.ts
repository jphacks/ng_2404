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
import router from "next/router";

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

export const getAllPost = async (tags: string[]) => {
  try {
    const postsRef = collection(db, "posts");
    let q;

    if (tags.length > 0) {
      q = query(postsRef, where("tags", "array-contains-any", tags));
    } else {
      q = query(postsRef);
    }
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
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
export const getPostsById = async (userId: string,tags: string[]): Promise<Post[]> => {
  try {
    const postsRef = collection(db, "posts");
    let q;

    if (tags.length > 0) {
      q = query(postsRef, where("userId", "==", userId), where("tags", "array-contains-any", tags));
    } else {
      q = query(postsRef, where("userId", "==", userId));
    }
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

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
  favoriteNumber?: number;
  userId?: string;
};

export type Post = {
  id: string;
  event: string;
  converted: string;
  tags: string[];
  date: string;
  favoriteNumber: number;
  userId: string;
  // 他の必要なフィールドを追加
};

export const addPost = async ({
  event,
  converted,
  tags,
  userId,
  favoriteNumber,
}: PostProps) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      event: event,
      converted: converted,
      favoriteNumber: favoriteNumber || 0,
      date: new Date()
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "年")
        .replace(/年(\d{2})年/, "年$1月")
        .replace(/月(\d{2})$/, "月$1日"),
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
      userId: doc.data().userId,
      favoriteNumber: doc.data().favoriteNumber,
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
      favoriteNumber: doc.data().favoriteNumber,
    }));

    return posts;
  } catch (e) {
    console.error("Error getting user posts:", e);
    return [];
  }
};

export const addFav = async (postId: string, userId: string) => {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    const post = postSnap.data();
    if (post) {
      await setDoc(postRef, {
        ...post,
        favoriteNumber: post.favoriteNumber + 1,
      });
    }
  }
  const userFavdataRef = doc(db, "usersFav", userId);
  const userFavSnap = await getDoc(userFavdataRef);
  if (userFavSnap.exists()) {
    const userFavData = userFavSnap.data();
    if (userFavData && Array.isArray(userFavData.postIds)) {
      await setDoc(userFavdataRef, {
        postIds: [...userFavData.postIds, postId],
        userId: userId,
      });
    }
  } else {
    await setDoc(userFavdataRef, {
      postIds: [postId],
      userId: userId,
    });
  }
};

export const removeFav = async (postId: string, userId: string) => {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    const post = postSnap.data();
    if (post) {
      await setDoc(postRef, {
        ...post,
        favoriteNumber: post.favoriteNumber - 1,
      });
    }
  }
  const userFavdataRef = doc(db, "usersFav", userId);
  const userFavSnap = await getDoc(userFavdataRef);
  if (userFavSnap.exists()) {
    const userFavData = userFavSnap.data();
    if (userFavData && Array.isArray(userFavData.postIds)) {
      await setDoc(userFavdataRef, {
        postIds: userFavData.postIds.filter((id) => id !== postId),
        userId: userId,
      });
    }
  }
};

export const getFavPosts = async (userId: string): Promise<Post[]> => {
  try {
    const userFavdataRef = doc(db, "usersFav", userId);
    const userFavSnap = await getDoc(userFavdataRef);
    if (userFavSnap.exists()) {
      const userFavData = userFavSnap.data();
      if (userFavData && Array.isArray(userFavData.postIds)) {
        const posts = userFavData.postIds.map(async (postId: string) => {
          const postRef = doc(db, "posts", postId);
          const postSnap = await getDoc(postRef);
          if (postSnap.exists()) {
            const post = postSnap.data();
            return {
              id: postSnap.id,
              event: post.event,
              converted: post.converted,
              tags: post.tags,
              date: post.date,
              userId: post.userId,
              favoriteNumber: post.favoriteNumber,
            };
          }
        });
        const resolvedPosts = await Promise.all(posts);
        return resolvedPosts.filter((post): post is Post => post !== undefined);
      }
    }
    return [];
  } catch (e) {
    console.error("Error getting user posts:", e);
    return [];
  }
};

export const isUserFavThisPost = async (postId: string, userId: string) => {
  const userFavdataRef = doc(db, "usersFav", userId);
  const userFavSnap = await getDoc(userFavdataRef);
  if (userFavSnap.exists()) {
    const userFavData = userFavSnap.data();
    if (userFavData && Array.isArray(userFavData.postIds)) {
      return userFavData.postIds.includes(postId);
    }
  }
  return false;
};

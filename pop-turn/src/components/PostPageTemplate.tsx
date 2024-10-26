import React, { useEffect, useState } from "react";
import CardComponent from "./card";
import { Flex, Box } from "@chakra-ui/react";
import { getAllPost, getPostsById, Post } from "@/firebase/posts";
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";

type PostPageTemplateProps = {
  type: "Posts" | "MyPosts" | "Favorites";
};

export const PostPageTemplate = (props: PostPageTemplateProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // ユーザーの認証状態を監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let fetchedPosts: Post[] = [];

        switch (props.type) {
          case "Posts":
            fetchedPosts = await getAllPost();
            console.log(fetchedPosts);
            break;
          case "MyPosts":
            if (user?.uid) {
              // getPostsByUserIdという関数を作成する必要があります
              fetchedPosts = await getPostsById(user.uid);
            }
            break;
          case "Favorites":
            if (user?.uid) {
              // getFavoritePostsという関数を作成する必要があります
              fetchedPosts = await getFavoritePosts(user.uid);
            }
            break;
        }

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (props.type === "Posts" || user) {
      fetchPosts();
    }
  }, [props.type, user]); // type または user が変更されたときに再実行

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (props.type !== "Posts" && !user) {
    return <div>Please log in to view this content</div>;
  }

  return (
    <Flex
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      {posts.map((post) => (
        <Box key={post.id} width="48%" mb="4">
          <CardComponent
            event={post.event}
            converted={post.converted}
            tags={post.tags}
            date={post.date}
            isFavorited={false}
            FavoritedNumber={0}
          />
        </Box>
      ))}
    </Flex>
  );
};

// 必要な追加関数

const getFavoritePosts = async (userId: string): Promise<Post[]> => {
  // Firestoreからユーザーのお気に入り投稿を取得する実装
  return [];
};

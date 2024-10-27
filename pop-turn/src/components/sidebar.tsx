import { Button, Container, Divider, Flex, Tag, TagLeftIcon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { FaPlus } from "react-icons/fa6";
import { LuMinus } from "react-icons/lu";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { signOutUser } from "@/firebase/auth";

type Props = {
  currentPage: "Posts" | "MyPosts" | "Favorites";
};

export const Sidebar = (props: Props) => {
  const [nonactiveTags, setNonactiveTags] = useState([
    "恋愛",
    "学業",
    "友人",
    "職場",
    "不安",
    "日常",
    "将来",
    "健康",
    "家族",
  ])
  const [activeTags, setActiveTags] = useState([])
  const router = useRouter();
  const { currentPage } = props;

  useEffect(() => {
    const queryTags = router.query.tags as string;
    if (queryTags) {
      const tagsArray = queryTags.split(",");
      setActiveTags(tagsArray);
      setNonactiveTags(nonactiveTags.filter(tag => !tagsArray.includes(tag)));
    }
  }, [router.query.tags]);

  useEffect(() => {
    const query = { ...router.query, tags: activeTags.join(",") };
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  }, [activeTags]);

  const toggleTag = (tag: string, isActive: boolean) => {
    if (isActive) {
      setActiveTags(activeTags.filter(t => t !== tag));
      setNonactiveTags([...nonactiveTags, tag]);
    } else {
      setNonactiveTags(nonactiveTags.filter(t => t !== tag));
      setActiveTags([...activeTags, tag]);
    }
  };

  const renderButton = (href: string, label: string, isActive: boolean) => (
    <NextLink
      href={{
        pathname: href,
        query: { ...router.query, tags: activeTags.join(",") },
      }}
      passHref
    >
      <Button
        as="a"
        w={"11rem"}
        bgColor={isActive ? "orange.50" : "transparent"}
        borderRadius={"0.4rem"}
        cursor={"pointer"}
        p={"1.5rem 0"}
        textDecoration="none"
      >
        <Text
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={35}
          color={isActive ? "orange.500" : "black"}
        >
          {label}
        </Text>
      </Button>
    </NextLink>
  );

  return (
    <Flex
      flexDirection={"column"}
      w={"13rem"}
      h={"100%"}
      bgColor={"orange.100"}
      alignItems={"center"}
      gap={"3"}
      position={"fixed"}
      top={0}
    >
      <Text fontSize={38} fontWeight={"bold"} m={"1rem 0"}>
        POP TURN
      </Text>
      {renderButton("/Posts", "Posts", currentPage === "Posts")}
      {renderButton("/Posts/MyPosts", "MyPosts", currentPage === "MyPosts")}
      {renderButton(
        "/Posts/Favorites",
        "Favorites",
        currentPage === "Favorites"
      )}

      <Container
        w={"11rem"}
        bgColor={"colors.orange.100"}
        flexGrow={1}
        p={0}
        display={"flex"}
      >
        <Flex flexDirection={"column"} w={"11rem"} gap={"0"} alignItems={"left"}>
          <Text fontSize={15}>タグで絞り込み</Text>
          <Container w={"11rem"} h={"100%"} bgColor={"white"} borderRadius={"0.2rem"} m={0} px={2} pt={2}>
          {activeTags.map((tag) => (
            <Tag key={tag} variant='solid' colorScheme='orange' m={1} cursor={"pointer"} onClick={() => toggleTag(tag, true)}>
              <TagLeftIcon boxSize='12px' as={LuMinus} />
              {tag}
            </Tag>
          ))}
          <Divider m={"1rem 0"} h={"5px"} variant={"dashed"} colorScheme="black"/>
          {nonactiveTags.map((tag) => (
            <Tag key={tag} variant='solid' colorScheme='gray' m={1} cursor={"pointer"} onClick={() => toggleTag(tag, false)}>
              <TagLeftIcon boxSize='12px' as={FaPlus} />
              {tag}
            </Tag>
          ))}
          </Container>
        </Flex>
      </Container>

      <Button
        w={"11rem"}
        bgColor={"orange.400"}
        borderRadius={"0.2rem"}
        cursor={"pointer"}
        p={"0.5rem 0"}
        colorScheme="orange"
        as={NextLink}
        href="/Input"
      >
        <Text
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={30}
          color={"white"}
        >
          投稿する
        </Text>
      </Button>
      <Button
        w={"11rem"}
        cursor={"pointer"}
        mb={"0.5rem"}
        pt={"1rem"}
        bgColor={"transparent"}
      >
        <Text
          textAlign={"center"}
          mb={"1rem"}
          fontWeight={"bold"}
          fontSize={30}
          color={"black"}
          onClick={signOutUser}
        >
          ログアウト
        </Text>
      </Button>
    </Flex>
  );
};

export default Sidebar;

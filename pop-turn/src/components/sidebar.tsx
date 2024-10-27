import { Button, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

type Props = {
  currentPage: "Posts" | "MyPosts" | "Favorites";
};

export const Sidebar = (props: Props) => {
  const { currentPage } = props;

  const renderButton = (href: string, label: string, isActive: boolean) => (
    <Button
      as={NextLink}
      href={href}
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
        {/* 
        <Flex flexDirection={"column"} w={"15vw"} gap={"0"} alignItems={"left"}>
          <Text fontSize={15}>タグで絞り込み</Text>
          <Container w={"13vw"} h={"100%"} bgColor={"white"} borderRadius={"0.2rem"} m={0}>
          </Container>
        </Flex>
        */}
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
        >
          ログアウト
        </Text>
      </Button>
    </Flex>
  );
};

export default Sidebar;

import { Button, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'

type Props={
  currentPage: "Posts" | "MyPosts" | "Favorites";
}

const sidebar = (props:Props) => {
  const {currentPage} = props;
  return (
    <Flex flexDirection={"column"} w={"15vw"} h={"100vh"} bgColor={"orange.100"} alignItems={"center"} gap={"3"}>
      <Text fontSize={38} fontWeight={"bold"} m={"1rem 0"}>POP TURN</Text>
      <Button w={"13vw"} bgColor={currentPage === "Posts" ? "orange.50" : "transparent"} borderRadius={"0.4rem"} cursor={"pointer"} p={"1.5rem 0"}>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={35} color={currentPage === "Posts" ? "orange.500" : "black"}>Posts</Text>
      </Button>
      <Button w={"13vw"} bgColor={currentPage === "MyPosts" ? "orange.50" : "transparent"} borderRadius={"0.4rem"} cursor={"pointer"} p={"1.5rem 0"}>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={35} color={currentPage === "MyPosts" ? "orange.500" : "black"}>MyPosts</Text>
      </Button>
      <Button w={"13vw"} bgColor={currentPage === "Favorites" ? "orange.50" : "transparent"} borderRadius={"0.4rem"} cursor={"pointer"} p={"1.5rem 0"}>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={35} color={currentPage === "Favorites" ? "orange.500" : "black"}>Favorites</Text>
      </Button>
      
      <Container w={"13vw"} bgColor={"colors.orange.100"} flexGrow={1} p={0} display={"flex"}>
        {/*
        <Flex flexDirection={"column"} w={"15vw"} gap={"0"} alignItems={"left"}>
          <Text fontSize={15}>タグで絞り込み</Text>
          <Container w={"13vw"} h={"100%"} bgColor={"white"} borderRadius={"0.2rem"} m={0}>
          </Container>
        </Flex>
        */}
      </Container>
      
      <Button w={"13vw"} bgColor={"orange.400"} borderRadius={"0.2rem"} cursor={"pointer"} p={"0.5rem 0"} colorScheme='orange'>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={30} color={"white"}>投稿する</Text>
      </Button>
      <Button w={"13vw"} cursor={"pointer"} mb={"0.5rem"} pt={"1rem"} bgColor={"transparent"} >
        <Text textAlign={"center"} mb={"1rem"} fontWeight={"bold"} fontSize={30} color={"black"}>ログアウト</Text>
      </Button>
    </Flex>
  )
}

export default sidebar
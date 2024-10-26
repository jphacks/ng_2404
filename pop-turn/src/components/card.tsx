'use client'
import { Card, CardHeader, CardBody, Container, Flex, Icon, Text, Divider, Tag } from "@chakra-ui/react";
import { HiEmojiSad } from "react-icons/hi";
import { AiFillRobot } from "react-icons/ai";
import { Inter } from 'next/font/google'
import { SlCalender } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
 
const inter = Inter({ subsets: ['latin'] })

type props={
  event: string;   //入力した元の出来事
  converted: string;   //AIによって変換された出来事
  tags: string[];   //出来事に関連するタグ
  date: Date;   //出来事が起こった日付
  isFavorited: boolean;   //いいねに登録されているかどうか
  FavoritedNumber: number;   //いいねに登録されている数 他人の投稿をみるときは使わない
  setisFavorited: React.Dispatch<React.SetStateAction<boolean>> | null;   //いいねを押したときの挙動
}

export default function CardComponent(props: props) {
  const { event, converted, tags, date, isFavorited,FavoritedNumber,setisFavorited } = props;
  return (
      <Flex flexDirection={"column"} alignItems={"center"} my={5} >
        <Card bgColor={"orange.50"} border={"1px solid black"} w={"30rem"}>
          <CardHeader>
            <Container bgColor={"white"} borderRadius={"10px"} shadow={"xs"} pt={"0.3rem"}>
              <Flex justifyContent={"left"} mt={"1"}>
                <Icon fontSize={"24px"} color={"orange.500"}>
                  <HiEmojiSad />
                </Icon>
                <Text color={"orange.600"} fontSize={"md"}  fontWeight={"bold"}>出来事</Text>
              </Flex>
              <Text color={"orange.800"} fontSize={"1.5rem"} fontFamily={inter.className}>{event}</Text>
            </Container>
          </CardHeader>

          <CardBody mt={0}>
            <Container bgColor={"orange.100"} borderRadius={"10px"} shadow={"xs"} pt={"0.3rem"}>
              <Flex justifyContent={"left"} mt={"1"}>
                <Icon fontSize={"24px"} color={"orange.500"}>
                  <AiFillRobot />
                </Icon>
                <Text color={"orange.600"} fontSize={"1rem"} fontWeight={"bold"}>ポップ調に変換</Text>
              </Flex>
              <Text color={"orange.800"} fontSize={"1.5rem"} fontFamily={inter.className} >{converted}</Text>
            </Container>
            <Container>

              <Divider m={"1rem 0"} h={"2px"} />

              <Flex gap={"2"}>
                {tags.map(tag => <Tag colorScheme={"orange"} key={tag}>{tag}</Tag>)}
                </Flex>
              <Flex mt={"0.5rem"} gap={"1"}>
                <Icon fontSize={"24px"} color={"orange.500"}>
                  <SlCalender />
                </Icon>
                <Flex justifyContent={"space-between"} w={"100%"}>
                  <Text color={"orange.800"} fontSize={"1rem"} fontFamily={inter.className} textAlign={"center"}>
                  {new Date(date).toISOString().slice(0, 10)}
                  </Text>
                  <Flex gap={4}>
                    <Text color={"orange.800"} fontSize={"1rem"} fontFamily={inter.className} textAlign={"center"}>
                      {FavoritedNumber}
                    </Text>
                    <Icon fontSize={"24px"} color={isFavorited ? "pink.300" : "gray.500"} onClick={() => setisFavorited(!isFavorited)}>
                      <FaHeart />
                    </Icon>
                  </Flex>
                </Flex>
              </Flex>
            </Container>
          </CardBody>
        </Card>
      </Flex>
  );
}

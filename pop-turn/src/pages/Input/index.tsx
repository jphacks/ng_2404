import { Button, Text, Input, Flex } from "@chakra-ui/react";
import { color } from "framer-motion";

import React, { useState, useEffect } from "react";
import { SiConvertio } from "react-icons/si";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { TagPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { addPost } from "@/firebase/posts";
import router from "next/router";
import { userAgent } from "next/server";
import { auth } from "@/firebase/config";
import withAuth from "@/firebase/withAuth";

const data = [
  "恋愛",
  "学業",
  "友人",
  "職場",
  "不安",
  "日常",
  "将来",
  "健康",
  "家族",
].map((item) => ({ label: item, value: item }));

function Home() {
  const colors = require("tailwindcss/colors");
  const [event, setEvent] = useState("");
  const [converted, setConverted] =
    useState("ここにAIからの返答が表示されます");
  const [tags, setTags] = useState<string[]>([]);

  {
    /* 
      const [loading, setLoading] = useState<boolean>(true)
      useEffect(() => {
        const getData = async () => {
          setLoading(true)
          const result = await ChatGPTからデータを取得する関数
          setConverted(result)
          setLoading(false)
        }
        getData()
      })

      if (loading) {
        return <div>Loading...</div>
      }
    */
  }

  const sendToConvert = async (e: React.FormEvent<HTMLFormElement>) => {
    {
      /* 入力した出来事eventをChatGPTに渡す  */
    }
    e.preventDefault();
    console.log("event:", event);

    try {
      // const result = await ChatGPTからデータを取得する関数(event)
      //仮の返答
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result =
        "今日は少し寝坊しちゃって、学校で先生に注意をもらうことになったけれど、そのおかげで気づきがたくさんあったよ！いつも通りのリズムで過ごしていると気がつかないことも、こうやって少し違う一日を迎えると新鮮に感じるものだね。次回は時間に余裕をもって行動できるように、自分のペースを工夫して、もっとスムーズな一日のスタートを目指そうと思う。毎日のリズムが自分の成長に繋がるって感じた、そんな日になったよ！"; // 仮の返答
      setConverted(result);
    } catch (e) {
      console.error(e);
    }
  };

  const sendToPost = async (e: React.FormEvent<HTMLFormElement>) => {
    {
      /* 元の出来事と変換された出来事と(付与されたタグ)をfirebaseに渡す */
    }
    e.preventDefault();
    console.log("event:", event);
    console.log("converted:", converted);
    console.log("tags:", tags);
    try {
      await addPost({ event, converted, tags, userId: auth.currentUser?.uid });
      console.log("投稿しました");
      router.push("/Posts/MyPosts");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-screen bg-orange-100 flex items-center justify-center">
      <div className="h-3/4 w-3/4 bg-orange-50 rounded-xl px-16 py-8 flex flex-col">
        <form onSubmit={sendToConvert} className="w-full">
          <p className="font-semibold text-[1.2rem]">ネガティブな出来事</p>
          <Input
            variant="flushed"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="mb-4 bg-white"
            placeholder="ポップに変換してほしい出来事を書いてみよう"
            w={"100%"}
          />
          <Flex
            justifyContent={"space-between"}
            w={"full"}
            alignItems={"center"}
            pr={"10"}
          >
            <p className="font-semibold text-[1.2rem]">AIが言い換えた文章</p>
            <Button
              background={colors.orange[300]}
              colorScheme="orange"
              type="submit"
              rightIcon={<SiConvertio />}
              w={"40"}
            >
              変換
            </Button>
          </Flex>
        </form>
        <form
          onSubmit={sendToPost}
          className="w-full flex flex-col justify-between h-full"
        >
          <div className="w-full h-auto min-h-40 bg-white rounded-xl mt-2 px-3 pt-3 flex-grow">
            {converted}
          </div>
          <Flex w={"full"} alignItems={"center"} mt={4}>
            <IoPricetagsOutline />
            <Text mr={3}>タグ</Text>
            <TagPicker
              disabled={converted === "ここにAIからの返答が表示されます"}
              data={data}
              value={tags}
              onChange={setTags}
              style={{ flexGrow: 1 }}
              menuMaxHeight={150}
            />
          </Flex>
          <Flex justifyContent={"space-between"} my={3} gap={2}>
            <Button
              background={colors.gray[300]}
              colorScheme="gray"
              onClick={() => {
                // キャンセルボタンの処理
              }}
            >
              キャンセル
            </Button>
            <Button
              disabled={converted === "ここにAIからの返答が表示されます"}
              background={colors.orange[300]}
              colorScheme="orange"
              type="submit"
              mr={"10"}
              w={"40"}
              rightIcon={<FaArrowAltCircleRight />}
            >
              投稿
            </Button>
          </Flex>
        </form>
      </div>
    </div>
  );
}

export default withAuth(Home);

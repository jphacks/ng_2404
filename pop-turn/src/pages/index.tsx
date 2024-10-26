import { Button, Center } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Home() {
  const colors = require("tailwindcss/colors");
  return (
    <div className="h-screen bg-orange-100 flex justify-center">
      <div className="mt-20">
        <h1 className="text-9xl font-black">POP TURN</h1>
        <Center>
          <div className="mt-10 flex flex-col space-y-4">
            <Button
              background={colors.orange[300]}
              colorScheme="orange"
              color="white"
              width="230px"
              height="70px"
              as={NextLink}
              href="/Auth/Login"
              borderRadius="15px"
            >
              <p className="text-2xl">ログイン</p>
            </Button>
            <Button
              background={colors.orange[300]}
              colorScheme="orange"
              color="white"
              width="230px"
              height="70px"
              as={NextLink}
              href="/Auth/Register"
              borderRadius="15px"
            >
              <p className="text-2xl">新規登録</p>
            </Button>
          </div>
        </Center>
      </div>
    </div>
  );
}

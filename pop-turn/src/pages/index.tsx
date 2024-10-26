import { Button, Center } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="h-full w-hull bg-orange-100">
      <Center>
        <h1>Title</h1>
        <div className="flex flex-col space-y-4">
          <Button>ログイン</Button>
          <Button>新規登録</Button>
        </div>
      </Center>
    </div>
  );
}

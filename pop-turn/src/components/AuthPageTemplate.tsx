import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

type AuthPageTemplateProps = {
  type: "login" | "register";
};

export const AuthPageTemplate = (props: AuthPageTemplateProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);
  };
  return (
    <div className="h-80 w-1/2 bg-orange-50 rounded-xl px-10 pt-6 ">
      <h1 className="text-5xl mb-5 ">
        {props.type === "login" ? "ログイン" : "新規登録"}
      </h1>
      <form onSubmit={send}>
        <p>メールアドレス</p>
        <Input
          variant="flushed"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 bg-white"
        />
        <p>パスワード</p>
        <Input
          variant="flushed"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-6 flex items-center justify-end">
          <Button colorScheme="orange" type="submit">
            {props.type === "login" ? "ログイン" : "確認メールを送信"}
          </Button>
        </div>
      </form>
    </div>
  );
};

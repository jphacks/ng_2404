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
    <div>
      <h1 className="text-[10rem]">
        {props.type === "login" ? "ログイン" : "新規登録"}
      </h1>
      <form onSubmit={send}>
        <p>メールアドレス</p>
        <Input
          value={email}
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>パスワード</p>
        <Input
          value={password}
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">
          {props.type === "login" ? "ログイン" : "確認メールを送信"}
        </Button>
      </form>
    </div>
  );
};

import { AuthUserProps } from "@/firebase/auth";
import { Button, Input } from "@chakra-ui/react";
import router, { Router } from "next/router";
import { useState } from "react";

type AuthPageTemplateProps = {
  type: "login" | "register";
  authFunction: ({ email, password }: AuthUserProps) => void;
};

export const AuthPageTemplate = (props: AuthPageTemplateProps) => {
  const colors = require("tailwindcss/colors");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);
    try {
      await props.authFunction({ email, password });
      console.log(`${props.type === "login" ? "ログイン" : "登録"}成功`);
      props.type === "register"
        ? router.push("/Auth/Login")
        : router.push("/Posts");
    } catch (error) {
      // console.error("ログイン失敗:", error);
      if ((error as { code: string }).code === "auth/email-already-in-use") {
        alert(
          "このメールアドレスは既に使用されています。ログインしてください。"
        );
        router.push("/Auth/Login");
      } else {
        alert("登録に失敗しました。もう一度お試しください。");
      }
    }
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 bg-white"
          required
        />
        <p>パスワード</p>
        <Input
          variant="flushed"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 bg-white"
          required
          minLength={6}
        />
        <div className="mt-1 flex items-center justify-end">
          <Button
            background={colors.orange[300]}
            colorScheme="orange"
            type="submit"
          >
            {props.type === "login" ? "ログイン" : "確認メールを送信"}
          </Button>
        </div>
      </form>
    </div>
  );
};

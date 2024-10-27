const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

// CORS設定
app.use(
  cors({
    origin: "*", // 必要に応じてオリジンを設定
    methods: ["GET", "POST", "OPTIONS"], // 必要なHTTPメソッド
    allowedHeaders: ["Content-Type", "Authorization"], // 許可するヘッダー
  })
);

// OpenAI APIキーを環境変数から取得
const OPENAI_API_KEY = process.env.CHATGPT_APIKEY;

// OpenAI APIを呼び出して褒め言葉を生成する関数
async function generateCompliment(combinedString) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "入力された文章に対して別の観点で褒めてください",
          },
          {
            role: "user",
            content: combinedString,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI APIエラー:", error);
    return "褒め言葉を生成できませんでした。";
  }
}

// Firebase Functionsのエンドポイント
app.post("/process-message", async (req, res) => {
  const message = req.body.message;
  const compliment = await generateCompliment(message);
  res.json({ response: compliment });
});

// Firebase Functions でエクスポート
exports.api = onRequest(app);

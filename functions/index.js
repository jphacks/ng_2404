const functions = require("firebase-functions");
const express = require("express");
const path = require("path");

const app = express();

// 静的ファイルの提供設定
app.use(express.static(path.join(__dirname, "../public"))); // 正しいパスに修正

// ルートにアクセスがあった場合に index.html を提供する
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 他のパスを `/` にリダイレクトする（任意）
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Firebase Functions でエクスポート
exports.api = functions.https.onRequest(app);

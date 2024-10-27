// explicitly import each trigger
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const express = require("express");
const path = require("path");

const app = express();

// 静的ファイルの提供設定
app.use(
  express.static(path.join(__dirname, "../public"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// `script.js` が置かれているディレクトリも静的提供の対象にする
app.use(
  "/static",
  express.static(path.join(__dirname, "../"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// Firebase Functions でエクスポート
exports.api = onRequest(app);

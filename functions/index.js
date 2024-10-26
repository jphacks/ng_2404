// explicitly import each trigger
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const express = require("express");
const path = require("path");

const app = express();

// �ÓI�t�@�C���̒񋟐ݒ�
app.use(
  express.static(path.join(__dirname, "../public"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// `script.js` ���u����Ă���f�B���N�g�����ÓI�񋟂̑Ώۂɂ���
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

// ���[�g�ɃA�N�Z�X���������ꍇ�� index.html ��񋟂���
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ���̃p�X�����_�C���N�g
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Firebase Functions �ŃG�N�X�|�[�g
exports.api = onRequest(app);

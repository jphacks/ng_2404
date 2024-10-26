const functions = require("firebase-functions");
const express = require("express");
const path = require("path");

const app = express();

// �ÓI�t�@�C���̒񋟐ݒ�
app.use(express.static(path.join(__dirname, "../public"))); // �������p�X�ɏC��

// ���[�g�ɃA�N�Z�X���������ꍇ�� index.html ��񋟂���
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ���̃p�X�� `/` �Ƀ��_�C���N�g����i�C�Ӂj
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Firebase Functions �ŃG�N�X�|�[�g
exports.api = functions.https.onRequest(app);

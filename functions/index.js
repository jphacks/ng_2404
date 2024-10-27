const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

// CORS�ݒ�
app.use(
  cors({
    origin: "*", // �K�v�ɉ����ăI���W����ݒ�
    methods: ["GET", "POST", "OPTIONS"], // �K�v��HTTP���\�b�h
    allowedHeaders: ["Content-Type", "Authorization"], // ������w�b�_�[
  })
);

// OpenAI API�L�[�����ϐ�����擾
const OPENAI_API_KEY = process.env.CHATGPT_APIKEY;

// OpenAI API���Ăяo���ĖJ�ߌ��t�𐶐�����֐�
async function generateCompliment(combinedString) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "���͂��ꂽ���͂ɑ΂��ĕʂ̊ϓ_�ŖJ�߂Ă�������",
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
    console.error("OpenAI API�G���[:", error);
    return "�J�ߌ��t�𐶐��ł��܂���ł����B";
  }
}

// Firebase Functions�̃G���h�|�C���g
app.post("/process-message", async (req, res) => {
  const message = req.body.message;
  const compliment = await generateCompliment(message);
  res.json({ response: compliment });
});

// Firebase Functions �ŃG�N�X�|�[�g
exports.api = onRequest(app);

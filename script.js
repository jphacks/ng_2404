// Firebase SDK のインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase 初期化
fetch("http://localhost:3000/firebase-config")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch Firebase config");
    }
    return response.json();
  })
  .then((firebaseConfig) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // サインアップ関数
    window.signUp = function () {
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          document.getElementById("signup-result").textContent =
            "サインアップ成功: " + userCredential.user.email;
          window.location.href = "messages.html"; // メッセージページにリダイレクト
        })
        .catch((error) => {
          document.getElementById("signup-result").textContent =
            "エラー: " + error.message;
        });
    };

    // サインイン関数
    window.signIn = function () {
      const email = document.getElementById("signin-email").value;
      const password = document.getElementById("signin-password").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("サインイン成功: " + userCredential.user.email);
          document.getElementById("signin-result").textContent =
            "サインイン成功: " + userCredential.user.email;
          window.location.href = "messages.html"; // メッセージページにリダイレクト
        })
        .catch((error) => {
          console.error("サインインエラー:", error.message);
          document.getElementById("signin-result").textContent =
            "エラー: " + error.message;
        });
    };
  })
  .catch((error) => console.error("Firebase Config Fetch Error:", error));

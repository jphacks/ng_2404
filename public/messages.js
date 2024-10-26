// Firebase SDK のインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // すべての必要なメソッドをインポート

// Firebase 初期化
fetch("http://localhost:3000/firebase-config")
  .then((response) => response.json())
  .then((firebaseConfig) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // ログイン状態を確認
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("ログインが必要です");
        window.location.href = "index.html"; // ログインページにリダイレクト
      }
    });

    // メッセージ送信関数
    window.sendMessage = function () {
      const messageInput = document.getElementById("message-input");

      if (!messageInput) {
        console.error("メッセージ入力要素が見つかりません");
        return;
      }

      const message = encodeURIComponent(messageInput.value);

      if (message === "") {
        alert("メッセージを入力してください");
        return;
      }

      addDoc(collection(db, "messages"), {
        text: message,
        timestamp: new Date(),
      })
        .then(() => {
          alert("メッセージを送信しました");
          messageInput.value = ""; // 送信後に入力フィールドをクリア
        })
        .catch((error) => {
          alert("エラー: " + error.message);
        });
    };

    // メッセージのリアルタイムリスナーを設定
    const messagesList = document.getElementById("messages-list");
    if (!messagesList) {
      console.error("メッセージ一覧要素が見つかりません");
      return;
    }

    onSnapshot(collection(db, "messages"), (snapshot) => {
      messagesList.innerHTML = ""; // リストをリセット
      snapshot.forEach((doc) => {
        const message = decodeURIComponent(doc.data().text); // デコードして表示
        const messageElement = document.createElement("p");
        messageElement.innerHTML = message;
        messagesList.appendChild(messageElement);
      });
    });
  })
  .catch((error) => console.error("Firebase Config Fetch Error:", error));

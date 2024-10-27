from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('CHATGPT_APIKEY')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # CORSを許可

def generate_compliment(combined_string):
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "入力された文章に対して別の観点で褒めてください",
                },
                {
                    "role": "user",
                    "content": combined_string
                }
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI APIエラー: {e}")
        return "褒め言葉を生成できませんでした。"

@app.route("/process-message", methods=["POST"])
def process_message():
    try:
        data = request.get_json()
        message = data.get("message", "")

        # 受け取ったメッセージを元に褒め言葉を生成
        compliment = generate_compliment(message)

        return jsonify({"response": compliment})
    except Exception as e:
        print(f"Flaskサーバーエラー: {e}")
        return jsonify({"error": f"Internal Server Error: {e}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

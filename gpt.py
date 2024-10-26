import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('CHATGPT_APIKEY')

def generate_compliment(combined_string):
    response = openai.ChatCompletion.create(
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
    return response.choices[0].message['content']

# 使用例
# combined_string = "テストで0点を取った"
# compliment = generate_compliment(combined_string)
# print(compliment)
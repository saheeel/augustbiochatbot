from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from config import GEMINI_API_KEY

app = Flask(__name__)

# Configure the Gemini API
genai.configure(api_key=GEMINI_API_KEY)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    # Add context about August Biomedical products
    prompt = f"You are a chatbot for August Biomedical organic body care products. Answer the following question: {user_message}"
    
    # Generate a response using the Gemini API
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    
    return jsonify({'response': response.text})

if __name__ == '__main__':
    app.run(debug=True)
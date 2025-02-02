from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_ollama.llms import OllamaLLM
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_community.chat_message_histories import ChatMessageHistory
import re

app = Flask(__name__)
CORS(app)  # Enable CORS

# Initialize chat history
chat_history = ChatMessageHistory()
chat_history.add_message(SystemMessage(content="You are a helpful AI medical assistant. Only answer medical queries."))

# Initialize model
model = OllamaLLM(model="monotykamary/medichat-llama3")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI medical assistant that provides answers related to health."),
    MessagesPlaceholder(variable_name="messages")
])
output_parser = StrOutputParser()

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        
        if not data or "message" not in data:
            return jsonify({"error": "Message field is required"}), 400
            
        user_message = data["message"].strip()
        if not user_message:
            return jsonify({"error": "Message cannot be empty"}), 400

        # Process message
        chat_history.add_message(HumanMessage(content=user_message))
        chain = prompt | model | output_parser
        response = chain.invoke({"messages": chat_history.messages[1:]})
        
        # Clean and store response
        cleaned_response = re.sub(r'function\(\)\s*{[^}]*}', '', response)
        chat_history.add_message(SystemMessage(content=cleaned_response))
        
        return jsonify({"reply": cleaned_response})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)  # Run Flask on port 5001
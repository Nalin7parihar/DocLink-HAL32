import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import './App.css'
import React from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      const botReply = { text: "I'm still learning!", sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (

    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={msg.sender === "user" ? "message user" : "message bot"}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          <Send size={16} />
        </button>
      </div>
    </div>
    
  );
}
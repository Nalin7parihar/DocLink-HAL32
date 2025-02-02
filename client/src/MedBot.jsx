import React, { useState } from "react";
import axios from "axios";

const MedBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault(); // Handle both button clicks and form submissions
    
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    const userMessage = { sender: "user", text: input.trim() };
    
    // Optimistically update UI with user message
    setMessages(prev => [...prev, userMessage]);
    setInput(""); // Clear input immediately after sending
    
    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: userMessage.text
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        // 30 second timeout
      });

      if (response.data && response.data.reply) {
        setMessages(prev => [...prev, {
          sender: "bot",
          text: response.data.reply
        }]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setError(
        error.response?.data?.error || 
        error.message || 
        "Failed to get response from the medical bot"
      );
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "I apologize, but I'm having trouble connecting to the server. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Messages Container */}
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={sendMessage}
          className="border-t border-gray-200 p-4 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask a medical question..."
            className="flex-1 min-w-0 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 h-10 px-4 py-2"
          >
            Send
          </button>
        </form>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}
    </div>
  );
};

export default MedBot;
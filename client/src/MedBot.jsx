import { useState } from "react";
import axios from "axios";
import React from "react";

const MedBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://localhost:4000/chat", { message: input });
            setMessages([...messages, userMessage, { sender: "bot", text: response.data.reply }]);
        } catch (error) {
            setMessages([...messages, userMessage, { sender: "bot", text: "Error fetching response" }]);
        }
        setInput("");
    };

    return (
        <div className="p-4 max-w-lg mx-auto border rounded-lg shadow-lg mt-5">
            <div className="h-64 overflow-y-auto p-2 border-b">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <span className="px-3 py-1 bg-gray-200 rounded-lg">{msg.text}</span>
                    </div>
                ))}
            </div>
            <div className="flex mt-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                />
                <button onClick={sendMessage} className="ml-2 bg-primary text-white px-3 py-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default MedBot;
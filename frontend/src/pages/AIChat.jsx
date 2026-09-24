import React, { useState } from "react";
import api from "../api/axios.js";

const suggestions = [
  "Aaj ki sales kitni hui?",
  "Kaunsa product low stock mein hai?",
  "Is month sabse zyada kya bika?",
  "Mujhe monthly summary do",
];

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Namaste! Main aapka business assistant hoon. Mujhse business ke baare mein kuch bhi poochiye 🙂" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data } = await api.post("/ai/ask", { message: text });
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Kuch gadbad ho gayi. Backend/Groq API key check karo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col h-[calc(100vh-64px)]">
      <h2 className="text-xl font-semibold mb-4">💬 AI Business Assistant</h2>

      <div className="flex-1 bg-white rounded-xl shadow-sm p-4 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                m.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">AI soch raha hai...</p>}
      </div>

      {/* Quick suggestion buttons - beginner users ke liye helpful */}
      <div className="flex flex-wrap gap-2 mb-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-100"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apna sawaal type karein..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg">Send</button>
      </form>
    </div>
  );
};

export default AIChat;

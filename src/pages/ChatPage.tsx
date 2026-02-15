import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      const response = await axios.post("http://localhost:3000/chat", { 
        message: userMessage.text 
      });
      
      const botMessage: Message = {
        sender: "bot",
        text: response.data.message
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 shadow-2xl backdrop-blur-sm border-b border-orange-500/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                ☕ Chai Pe Charcha
              </h2>
              <p className="text-orange-100 text-sm">with Hitesh Choudhary</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-orange-100">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-bounce">☕</div>
              <p className="text-orange-300 text-lg">Koi sawaal? Chai ki tarah garam ho!</p>
              <p className="text-orange-400/60 text-sm mt-2">Type your message to start...</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4 animate-slideInUp`}
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-5 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.02] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-br-sm"
                    : "bg-white/10 backdrop-blur-md text-orange-50 border border-orange-500/20 rounded-bl-sm"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="flex items-center gap-2 mb-1 text-orange-300 text-xs">
                    <span>Hitesh</span>
                  </div>
                )}
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                  {msg.text}
                </p>
                <div className={`text-xs mt-1 ${msg.sender === "user" ? "text-orange-100" : "text-orange-400/60"}`}>
                  {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white/10 backdrop-blur-md border border-orange-500/20 text-orange-50 px-5 py-3 rounded-2xl rounded-bl-sm shadow-lg">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-slate-900/50 backdrop-blur-md border-t border-orange-500/20 px-4 py-4 shadow-2xl">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                className="w-full bg-white/5 backdrop-blur-sm border border-orange-500/30 text-orange-50 placeholder-orange-400/40 px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none shadow-lg transition-all duration-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
                placeholder="Type kariye... Shift+Enter for new line"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-orange-400/40 text-xs mt-2 text-center">
            Powered by ChatGPT • Made with ☕ by Arsh
          </p>
        </form>
      </div>
    </div>
  );
}
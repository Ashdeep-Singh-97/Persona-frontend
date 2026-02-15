import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 146, 60, 0.4), transparent 40%)`
        }}
      />

      {/* Decorative blobs - using Tailwind animate-pulse instead */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-2000"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Chai icon */}
        <div className="mb-8 animate-bounce">
          <div className="text-9xl drop-shadow-2xl">☕</div>
        </div>

        {/* Title */}
        <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 mb-4 text-center leading-tight tracking-tight">
          Chai Pe Charcha
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-orange-800/80 mb-2 text-center font-medium tracking-wide">
          with Hitesh Choudhary
        </p>
        
        <p className="text-base md:text-lg text-orange-700/60 mb-12 text-center max-w-md font-light">
          Coding, chai aur conversation - ek saath!
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/chat")}
          className="group relative px-12 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Start Chatting
            <svg 
              className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </button>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {[
            { emoji: "🔥", title: "Hinglish Vibes", desc: "Desi style me tech talks" },
            { emoji: "💻", title: "Code Expert", desc: "Coding doubts solve karo" },
            { emoji: "🎯", title: "Smart AI", desc: "Powered by ChatGPT" }
          ].map((feature, i) => (
            <div 
              key={i}
              className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-200/50 opacity-0 animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">{feature.title}</h3>
              <p className="text-orange-700/70 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
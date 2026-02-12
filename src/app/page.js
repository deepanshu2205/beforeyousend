"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("Brutal");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const loadingMessages = [
    "Judging your message...",
    "Checking cringe levels...",
    "Scanning for desperation...",
    "Consulting sales demons...",
    "Evaluating conversion probability..."
  ];

  const handleRoast = async () => {
    if (!message) return;

    const random =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

    setLoadingText(random);
    setLoading(true);
    setResult("");

    const res = await fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, tone }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  const roast = result.split("WHY IT FAILS:")[0]?.replace("ROAST:", "").trim();
  const whyFails = result.split("WHY IT FAILS:")[1]?.split("IMPROVED VERSION:")[0]?.trim();
  const improved = result.split("IMPROVED VERSION:")[1]?.split("SCORES:")[0]?.trim();
  const scores = result.split("SCORES:")[1]?.trim()?.split("\n");

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-yellow-500/10 blur-3xl rounded-full -top-64 left-1/2 -translate-x-1/2"></div>

      {/* Navbar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12 sm:mb-20">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          beforeyousend<span className="text-yellow-400">.ai</span>
        </h1>
      </div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
          Stop sending
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            {" "}weak cold DMs.
          </span>
        </h2>
        <p className="text-gray-400 mt-4 sm:mt-6 text-base sm:text-lg">
          Paste your message. Get roasted. Send the improved version.
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-3xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">

        <textarea
          className="w-full h-40 sm:h-44 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 focus:border-yellow-400 focus:outline-none text-white resize-none text-base sm:text-lg"
          placeholder="Paste your cold DM here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-between items-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
          <span className="hidden sm:block">Keep it concise. Short DMs convert better.</span>
          <span className={message.length > 300 ? "text-red-400" : ""}>
            {message.length}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 sm:mt-8 gap-4">
          <select
            className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl px-4 py-2 text-white focus:outline-none focus:border-yellow-400 w-full sm:w-auto"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Brutal</option>
            <option>Mentor</option>
            <option>Professional</option>
          </select>

          <button
            onClick={handleRoast}
            className="bg-yellow-400 text-black font-semibold px-6 sm:px-8 py-3 rounded-xl hover:bg-yellow-300 transition w-full sm:w-auto"
          >
            {loading ? loadingText : "Roast My Message"}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 space-y-6 sm:space-y-8">

          {/* ROAST */}
          <div className="border border-red-500/30 bg-red-500/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h3 className="text-red-400 text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              🔥 ROAST
            </h3>
            <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
              {roast}
            </p>
          </div>

          {/* WHY IT FAILS */}
          <div className="border border-yellow-500/30 bg-yellow-500/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              📉 WHY IT FAILS
            </h3>
            <div className="text-gray-200 whitespace-pre-wrap text-base sm:text-lg">
              {whyFails}
            </div>
          </div>

          {/* IMPROVED VERSION */}
          <div className="border border-green-500/30 bg-green-500/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-green-400 text-lg sm:text-xl font-bold">
                ✅ IMPROVED VERSION
              </h3>
              <button
                onClick={() => navigator.clipboard.writeText(improved)}
                className="text-xs bg-green-500/20 border border-green-500/40 text-green-300 px-3 py-1 rounded-full"
              >
                Copy
              </button>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-4 sm:p-6 text-base sm:text-lg text-gray-100 whitespace-pre-wrap">
              {improved}
            </div>
          </div>

          {/* SCORES */}
          <div className="border border-white/10 bg-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              📊 SCORES
            </h3>

            <div className="space-y-4">
              {scores?.map((line, index) => {
                const value = parseInt(line.match(/\d+/)?.[0] || 0);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-1">
                      <span>{line.split(":")[0]}</span>
                      <span>{value}/10</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-500"
                        style={{ width: `${value * 10}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </main>
  );
}

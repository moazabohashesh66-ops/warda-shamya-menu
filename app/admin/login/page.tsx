"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    if (password === "147") {
      localStorage.setItem("admin", "ok");
      window.location.href = "/admin";
    } else {
      setError("❌ كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120806]">
      <div className="bg-white/10 p-8 rounded-3xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white text-center">🛠️ لوحة الإدارة</h1>
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white mt-5"
        />
        {error && <p className="text-red-400 mt-3">{error}</p>}
        <button
          onClick={login}
          className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl mt-5"
        >
          دخول
        </button>
      </div>
    </div>
  );
}
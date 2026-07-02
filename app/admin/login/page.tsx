"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    setError("");

    console.log("🔑 محاولة الدخول بكلمة المرور:", password);

    if (password === "147") {
      console.log("✅ تم تسجيل الدخول بنجاح!");
      localStorage.setItem("admin", "ok");
      router.push("/admin");
    } else {
      console.log("❌ كلمة المرور غير صحيحة");
      setError("❌ كلمة المرور غير صحيحة");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120806]">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          🛠️ لوحة الإدارة
        </h1>
        
        <input
          type="password"
          placeholder="🔑 كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-white/40 outline-none focus:border-yellow-500 transition"
          disabled={loading}
        />
        
        {error && (
          <p className="text-red-400 mt-3 text-center font-semibold">
            ❌ {error}
          </p>
        )}
        
        <button
          onClick={login}
          disabled={loading}
          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition hover:scale-105 disabled:opacity-50 shadow-lg shadow-yellow-500/20"
        >
          {loading ? "⏳ جاري الدخول..." : "🚪 دخول"}
        </button>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin !== "ok") {
      window.location.href = "/admin/login";
      return;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#120806] text-white">
        ⏳ جاري التحقق...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120806] p-5 text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        🛠️ لوحة التحكم
      </h1>
      <p className="text-white/60">✅ تم تسجيل الدخول بنجاح</p>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/api/menu", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("فشل تحميل البيانات");
        }

        const data = await response.json();
        console.log("✅ البيانات المستلمة:", data);
        setMenuData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("تعذر تحميل المنيو، يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120806]">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-yellow-500/30"></div>
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-white">جاري تحميل المنيو...</h2>
            <p className="text-white/50">يرجى الانتظار قليلاً</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#120806]">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-3xl p-10 text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-red-400 text-2xl font-bold mb-3">حدث خطأ</h2>
            <p className="text-white/60 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-500 hover:bg-yellow-400 transition px-6 py-3 rounded-xl text-black font-bold"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#120806] via-[#1a0d08] to-[#24120a]">
      <Navbar />
      <Hero />
      <section className="relative py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#facc1520,transparent_70%)] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <CategoryGrid categories={menuData} />
        </div>
      </section>
    </main>
  );
}
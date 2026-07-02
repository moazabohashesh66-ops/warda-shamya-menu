"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120806]">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh] text-white/60">
          ⏳ جاري التحميل...
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
          
          {/* ===== زر الدخول للأدمن ===== */}
          <div className="mt-10 text-center">
            <Link
              href="/admin/login"
              className="inline-block px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/60 hover:text-yellow-400 hover:border-yellow-400/40 transition-all duration-300 text-sm"
            >
              ⚙️ إدارة المطعم
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
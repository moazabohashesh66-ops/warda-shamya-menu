"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0e0a]">
        <div className="text-white/60 text-xl">⏳ جاري تحميل المنيو...</div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <CategoryGrid menuData={menuData} />
    </>
  );
}
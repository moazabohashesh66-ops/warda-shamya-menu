"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductsPanel from "@/components/ProductsPanel";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setCategories(data.categories || []);
    };

    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#120806] via-[#1a0d08] to-black">
      <Navbar />
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <CategoryGrid
          categories={categories}
          onSelect={setSelected}
        />
      </div>

      {selected && (
        <ProductsPanel
          category={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}
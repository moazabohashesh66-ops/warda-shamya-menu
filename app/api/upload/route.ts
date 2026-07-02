"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();

        const cats = data.categories || [];

        setCategories(cats);
        setSelected(cats.length > 0 ? cats[0] : null);
      } catch (err) {
        console.log("MENU ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#120806] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60">Loading Menu...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#120806] via-[#1a0d08] to-[#24120a] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-yellow-400 text-xl font-bold mb-4">
          Categories
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap border transition-all duration-300
                ${
                  selected?.id === cat.id
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 mt-10 pb-20">

        <h2 className="text-white/80 text-lg mb-6">
          {selected?.name || "Products"}
        </h2>

        {!selected || !selected.products || selected.products.length === 0 ? (
          <p className="text-white/50">No products available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {selected.products.map((p: any) => (
              <div
                key={p.id}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >

                {/* NAME */}
                <h3 className="text-lg font-bold group-hover:text-yellow-400 transition">
                  {p.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-white/50 text-sm mt-2 line-clamp-2">
                  {p.description}
                </p>

                {/* PRICE */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-yellow-400 font-bold text-lg">
                    {p.price} EGP
                  </span>

                  {!p.is_available && (
                    <span className="text-red-400 text-xs">
                      Not Available
                    </span>
                  )}
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}
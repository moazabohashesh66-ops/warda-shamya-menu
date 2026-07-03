"use client";

import { useState } from "react";

export default function ProductsPanel({ category, onClose }: any) {
  const [search, setSearch] = useState("");

  const filtered = category?.products?.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center px-4">
      
      <div className="w-full max-w-3xl bg-[#1a0d08] border border-white/10 rounded-3xl p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-white/60 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-yellow-400 text-2xl font-bold text-center">
          {category?.name}
        </h2>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن منتج..."
          className="w-full mt-6 mb-4 p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
        />

        {/* Products */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {filtered?.length ? (
            filtered.map((p: any) => (
              <div
                key={p.id}
                className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10"
              >
                <div>
                  <h3 className="text-white font-bold">
                    {p.name}
                  </h3>
                  <p className="text-white/40 text-sm">
                    {p.description}
                  </p>
                </div>

                <div className="text-yellow-400 font-bold">
                  {p.price} EGP
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/50 text-center">
              لا توجد نتائج
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

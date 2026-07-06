"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MenuPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.category as string;
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((cat: any) => cat.id === categoryId);
        setCategory(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0e0a]">
        <div className="text-white/60 text-xl">⏳ جاري التحميل...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0e0a]">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold text-red-400">القسم غير موجود</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-full font-bold"
          >
            رجوع
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0e0a] pt-16">
      {/* صورة الغلاف */}
      <div className="relative h-40 md:h-56 w-full">
        <Image
          src={category.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop"}
          alt={category.name}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl md:text-5xl mb-1">{category.icon}</div>
            <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
            <p className="text-white/50 text-sm mt-1">{category.nameEn}</p>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs hover:bg-white/30 transition"
        >
          ← رجوع
        </button>
      </div>

      {/* المنتجات */}
      <div className="max-w-6xl mx-auto px-3 py-6">
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {category.products?.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/5"
            >
              <div className="relative h-32 w-full bg-gray-800/50">
                <Image
                  src={product.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"}
                  alt={product.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover"
                />
                {product.isPopular && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">
                    🔥
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-1.5 right-1.5 bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">
                    جديد
                  </span>
                )}
              </div>
              
              <div className="p-2.5">
                <h3 className="text-sm font-bold text-white/90 mb-0.5 line-clamp-1">
                  {product.name}
                </h3>
                
                {product.size && (
                  <p className="text-[10px] text-blue-400 font-semibold">📏 {product.size}</p>
                )}
                {product.weight && (
                  <p className="text-[10px] text-blue-400 font-semibold">⚖️ {product.weight}</p>
                )}
                
                <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-white/5">
                  <span className="text-lg font-bold text-yellow-400">
                    {product.price} ج.م
                  </span>
                  {product.isAvailable ? (
                    <button className="bg-yellow-500 text-black px-2.5 py-1 rounded-full text-[10px] font-bold hover:bg-yellow-400 transition">
                      طلب
                    </button>
                  ) : (
                    <span className="text-red-400 text-[10px] font-semibold">غير متوفر</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.category as string;

  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item: any) => item.id === categoryId);
        setCategory(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#120806]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
          className="text-yellow-400 text-5xl"
        >
          🍽️
        </motion.div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#120806]">
        <div className="text-white text-2xl">القسم غير موجود</div>
      </div>
    );
  }

  const filteredProducts = category.products?.filter((product: any) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120806] via-[#1a0e0a] to-[#2d1408]">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={
            category.image && category.image.trim()
              ? category.image
              : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
          }
          alt={category.name}
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#120806]" />

        <button
          onClick={() => router.push("/")}
          className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 text-white hover:bg-yellow-500 hover:text-black transition-all z-10"
        >
          ← رجوع
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-7xl"
          >
            {category.icon}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl font-bold mt-4"
          >
            {category.name}
          </motion.h1>

          <p className="text-yellow-400 mt-2 tracking-widest">
            {category.nameEn}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-5 mt-10">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 ابحث عن أي صنف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/10
              py-4
              pr-14
              pl-5
              text-white
              placeholder:text-white/40
              outline-none
              focus:border-yellow-500
              transition
            "
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
            🔎
          </span>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="
                group
                overflow-hidden
                rounded-3xl
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                shadow-2xl
                hover:border-yellow-500/40
                hover:shadow-yellow-500/20
                transition-all
                duration-500
              "
            >
              {/* Product Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={
                    product.image && product.image.trim()
                      ? product.image
                      : "https://images.unsplash.com/photo-1544025162-d76694265947?w=900"
                  }
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-700
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {product.isPopular && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-xl">
                    🔥 الأكثر طلبًا
                  </span>
                )}

                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-xl">
                    جديد
                  </span>
                )}
              </div>

              {/* Product Content */}
              <div className="p-5">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-white text-xl font-bold leading-7">
                    {product.name}
                  </h3>
                  <div className="text-yellow-400 whitespace-nowrap">⭐ 4.9</div>
                </div>

                <p className="text-white/60 text-sm leading-7 mt-4 min-h-[55px]">
                  {product.description || "وصف المنتج غير متوفر."}
                </p>

                {(product.size || product.weight) && (
                  <div className="mt-4 space-y-2">
                    {product.size && (
                      <div className="text-blue-300 text-sm">📏 {product.size}</div>
                    )}
                    {product.weight && (
                      <div className="text-blue-300 text-sm">⚖️ {product.weight}</div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center mt-6 pt-5 border-t border-white/10">
                  <div>
                    <div className="text-white/40 text-xs">السعر</div>
                    <div className="text-yellow-400 text-3xl font-bold">
                      {product.price} ج.م
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/201013839628?text=${encodeURIComponent(
                      `السلام عليكم، أريد طلب ${product.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      bg-yellow-500
                      hover:bg-yellow-400
                      text-black
                      px-6
                      py-3
                      rounded-full
                      font-bold
                      transition-all
                      duration-300
                      hover:scale-105
                      shadow-lg
                    "
                  >
                    اطلب الآن
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-20 px-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="
            max-w-4xl
            mx-auto
            rounded-[40px]
            bg-white/5
            backdrop-blur-2xl
            border
            border-white/10
            p-10
            text-center
            shadow-2xl
          "
        >
          <motion.div
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2
            }}
            className="text-6xl"
          >
            🍽️
          </motion.div>

          <h2 className="mt-5 text-4xl font-bold text-yellow-400">
            نتمنى لكم وجبة شهية ❤️
          </h2>

          <p className="text-white/60 leading-9 mt-6 max-w-2xl mx-auto">
            جميع الأسعار قابلة للتحديث.
            <br />
            يتم تجهيز الطلبات بأعلى جودة وأفضل المكونات.
            <br />
            يسعدنا خدمتكم في أي وقت.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <a
              href="https://wa.me/201013839628"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-10
                py-4
                rounded-full
                bg-green-500
                hover:bg-green-600
                text-white
                font-bold
                shadow-xl
                hover:scale-105
                transition-all
              "
            >
              💬 واتساب
            </a>

            <button
              onClick={() => router.push("/")}
              className="
                px-10
                py-4
                rounded-full
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                font-bold
                shadow-xl
                hover:scale-105
                transition-all
              "
            >
              ⬅ الرجوع للأقسام
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
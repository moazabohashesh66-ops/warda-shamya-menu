"use client";

import Image from "next/image";
import { Product } from "@/data/menuData";
import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#241510] shadow-xl"
    >
      <div className="relative h-60">

        <Image
          src={product.image || "/images/foods/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        {product.isPopular && (
          <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white flex items-center gap-1">
            <Flame size={14} />
            الأكثر طلباً
          </div>
        )}

        {product.isNew && (
          <div className="absolute right-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white flex items-center gap-1">
            <Sparkles size={14} />
            جديد
          </div>
        )}

      </div>

      <div className="space-y-4 p-6">

        <h3 className="text-2xl font-bold text-white">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm leading-7 text-white/60">
            {product.description}
          </p>
        )}

        {(product.size || product.weight) && (
          <div className="text-yellow-400 text-sm">
            {product.size && <>📏 {product.size}</>}
            {product.weight && <> • ⚖️ {product.weight}</>}
          </div>
        )}

        <div className="flex items-center justify-between">

          <span className="text-3xl font-black text-[#F4C16D]">
            {product.price} ج.م
          </span>

          <button
            disabled={!product.isAvailable}
            className={`rounded-xl px-5 py-2 font-bold transition ${
              product.isAvailable
                ? "bg-[#F4C16D] text-black hover:scale-105"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            {product.isAvailable ? "اطلب الآن" : "غير متاح"}
          </button>

        </div>

      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

interface MenuCategoriesProps {
  categories: any[];
}

export default function MenuCategories({ categories }: MenuCategoriesProps) {
  return (
    <section className="py-20 px-4 bg-[#1a0e0a]" id="menu">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-yellow-400/60 font-bold text-sm tracking-[6px]">قائمتنا</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            اكتشف أشهى الأطباق 🍽️
          </h2>
          <div className="w-20 h-0.5 bg-yellow-400/50 mx-auto mt-4 rounded-full"></div>
          <p className="text-white/40 mt-4 text-lg font-light">
            تشكيلة متنوعة من المأكولات السورية الأصيلة
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
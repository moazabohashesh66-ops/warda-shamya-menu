"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { menuData } from "@/data/menuData";

const colors = [
  "from-red-500 to-orange-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
  "from-teal-500 to-cyan-500",
  "from-rose-500 to-red-500",
];

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E1A12] mb-4">
            قائمتنا 🍽️
          </h2>
          <p className="text-gray-600 text-lg">
            اكتشف أشهى المأكولات السورية
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Link
                href={`/menu/${category.id}`}
                className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative h-32 w-full bg-gray-200">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center`}>
                      <span className="text-6xl">{category.icon}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-[#2E1A12]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.products.length} صنف
                  </p>
                  <div className="mt-3 inline-block px-4 py-1 bg-yellow-500 text-black text-sm rounded-full font-semibold">
                    استكشف
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const colors = [
  "from-red-500 to-orange-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
  "from-teal-500 to-cyan-500",
  "from-rose-500 to-red-500",
];

export default function HomeCategories({ menuData }: { menuData: any[] }) {
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
          {menuData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Link
                href={`/menu/${category.id}`}
                className="block bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/5 group"
              >
                <div className="relative h-44 w-full bg-gray-800/50 overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center`}>
                      <span className="text-7xl">{category.icon}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-white/90 group-hover:text-yellow-400 transition">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/40 mt-1">
                    {category.products.length} صنف
                  </p>
                  <div className="mt-3 inline-block px-5 py-1.5 bg-yellow-500 text-black text-sm rounded-full font-semibold group-hover:bg-yellow-400 transition">
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
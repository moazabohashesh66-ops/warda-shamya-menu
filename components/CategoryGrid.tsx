"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

const gradients = [
  "from-[#8B1E1E] to-[#D97706]",
  "from-[#14532D] to-[#16A34A]",
  "from-[#1E3A8A] to-[#2563EB]",
  "from-[#6D28D9] to-[#9333EA]",
  "from-[#9F1239] to-[#E11D48]",
  "from-[#0F766E] to-[#06B6D4]",
];

export default function CategoryGrid({ categories = [] }: { categories: any[] }) {
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="text-center py-20 text-white/40">
        <p className="text-2xl mb-2">📭</p>
        <p>لا توجد أقسام لعرضها</p>
        <p className="text-sm mt-2 text-white/20">يرجى إضافة أقسام من لوحة التحكم</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-8 px-4">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2 text-yellow-400 text-sm font-semibold">
            <Sparkles size={16} />
            قائمة الطعام
          </div>

          <h2 className="mt-5 text-3xl md:text-4xl font-black text-white">
            منيو <span className="text-yellow-400">وردة شامية</span>
          </h2>

          <p className="mt-3 text-white/50 text-base max-w-xl mx-auto">
            اختر القسم الذي ترغب في تصفحه واستمتع بأشهى الأطباق السورية.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .45,
                delay: index * .08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
            >
              <Link
                href={`/menu/${category.id}`}
                className="
                group
                block
                overflow-hidden
                rounded-2xl
                border
                border-yellow-500/10
                bg-white/[0.04]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-yellow-500/40
                hover:shadow-[0_20px_50px_rgba(0,0,0,.45)]
                "
              >
                {/* Image */}
                <div className="relative h-44 md:h-52 overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width:768px)50vw,(max-width:1200px)33vw,25vw"
                      className="
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-110
                      "
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${
                        gradients[index % gradients.length]
                      } flex items-center justify-center`}
                    >
                      <span className="text-7xl">{category.icon}</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120806] via-black/30 to-transparent" />

                  {/* Icon */}
                  <div className="
                  absolute
                  top-4
                  left-4
                  w-12
                  h-12
                  rounded-2xl
                  bg-black/35
                  backdrop-blur-xl
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  ">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="
                  text-lg
                  font-bold
                  text-white
                  transition
                  group-hover:text-yellow-400
                  ">
                    {category.name}
                  </h3>

                  <p className="
                  mt-1
                  text-sm
                  text-white/40
                  ">
                    {category.products?.length || 0} صنف
                  </p>

                  <div className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  ">
                    <span
                      className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-gradient-to-r
                      from-yellow-500
                      to-orange-500
                      px-4
                      py-1.5
                      text-xs
                      font-bold
                      text-black
                      transition
                      group-hover:from-yellow-400
                      group-hover:to-orange-400
                      "
                    >
                      استعرض
                    </span>

                    <ArrowLeft
                      size={18}
                      className="
                      text-yellow-400
                      transition-all
                      duration-300
                      group-hover:-translate-x-1
                      "
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
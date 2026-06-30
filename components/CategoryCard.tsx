"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    nameEn: string;
    icon: string;
    image?: string;
    products: any[];
  };
  index: number;
}

const gradients = [
  "from-[#8B1E1E] to-[#D97706]",
  "from-[#14532D] to-[#16A34A]",
  "from-[#1E3A8A] to-[#2563EB]",
  "from-[#6D28D9] to-[#9333EA]",
  "from-[#9F1239] to-[#E11D48]",
];

export default function CategoryCard({
  category,
  index,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -8,
      }}
      className="h-full"
    >
      <Link
        href={`/menu/${category.id}`}
        className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,.35)]"
      >
        {/* Image */}

        <div className="relative h-56 overflow-hidden">

          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${
                gradients[index % gradients.length]
              } flex items-center justify-center`}
            >
              <span className="text-7xl">
                {category.icon}
              </span>
            </div>
          )}

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#120806] via-[#120806]/40 to-transparent" />

          {/* Icon */}

          <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-black/35 backdrop-blur-xl flex items-center justify-center border border-white/10">

            <span className="text-3xl">
              {category.icon}
            </span>

          </div>

        </div>

        {/* Content */}

        <div className="p-6">

          <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition">

            {category.name}

          </h2>

          <p className="mt-2 text-sm text-white/50">

            اضغط لاستعراض جميع الأصناف

          </p>

          <div className="mt-6 flex items-center justify-between">

            <span className="rounded-full bg-yellow-500 px-5 py-2 text-sm font-bold text-black transition group-hover:bg-yellow-400">

              استعرض القسم

            </span>

            <ArrowLeft
              className="text-yellow-400 transition duration-300 group-hover:-translate-x-2"
              size={22}
            />

          </div>

        </div>
      </Link>
    </motion.div>
  );
}
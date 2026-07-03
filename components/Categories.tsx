"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Categories({ categories = [] }: any) {
  return (
    <section
      id="menu"
      className="py-12 md:py-16 px-4 max-w-7xl mx-auto"
    >
      {/* Title */}

      <div className="text-center mb-10">

        <h2 className="text-3xl md:text-5xl font-black text-white">
          أقسام
          <span className="text-yellow-400"> المنيو</span>
        </h2>

        <p className="text-white/50 mt-3">
          اختر القسم الذي ترغب في تصفحه
        </p>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

        {categories.map((cat: any, i: number) => (

          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              duration: .45,
            }}
            whileHover={{
              y: -8,
            }}
          >

            <Link href={`/menu/${cat.id}`}>

              <div
                className="
                group
                relative
                h-60
                rounded-3xl
                overflow-hidden
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                hover:border-yellow-500/30
                transition-all
                duration-500
                hover:shadow-[0_20px_45px_rgba(0,0,0,.35)]
                "
              >

                {/* Image */}

                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#120806] via-black/20 to-transparent" />

                {/* Icon */}

                <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-black/30 backdrop-blur-xl flex items-center justify-center border border-white/10">

                  <span className="text-2xl">
                    {cat.icon}
                  </span>

                </div>

                {/* Content */}

                <div className="absolute bottom-0 left-0 right-0 p-5">

                  <h3 className="text-white text-xl font-bold">

                    {cat.name}

                  </h3>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-yellow-400 text-sm font-semibold">

                      استعرض القسم

                    </span>

                    <ArrowLeft
                      size={18}
                      className="text-yellow-400 transition group-hover:-translate-x-2"
                    />

                  </div>

                </div>

              </div>

            </Link>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

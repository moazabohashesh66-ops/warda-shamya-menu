"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

type Category = {
  id: string;
  name: string;
  name_en?: string;
  image?: string;
  icon?: string;
};

const gradients = [
  "from-[#8B1E1E] to-[#D97706]",
  "from-[#14532D] to-[#16A34A]",
  "from-[#1E3A8A] to-[#2563EB]",
  "from-[#6D28D9] to-[#9333EA]",
  "from-[#9F1239] to-[#E11D48]",
  "from-[#0F766E] to-[#06B6D4]",
];

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section
      id="categories"
      className="relative overflow-hidden py-24 px-6"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-yellow-500/10 blur-[170px]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-orange-500/10 blur-[170px]" />

      </div>

      <div className="relative max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-20"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 text-yellow-400 font-bold">

            <Sparkles size={18} />

            أقسام المنيو

          </div>

          <h2 className="mt-8 text-5xl lg:text-6xl font-black text-white">

            اختر قسمك المفضل

          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-white/60 leading-9">

            جميع الأقسام يتم تحديثها مباشرة من لوحة التحكم
            بدون الحاجة لإعادة نشر الموقع.

          </p>

        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category, index) => (

            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .08,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="group"
            >

              <Link
                href={`/menu/${category.id}`}
                className="
                block
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.05]
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:border-yellow-500/50
                hover:shadow-[0_20px_60px_rgba(0,0,0,.5)]
                "
              >

                {/* الصورة */}

                <div className="relative h-64 overflow-hidden">

                  {category.image ? (

                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="
                      object-cover
                      transition-all
                      duration-700
                      group-hover:scale-110
                      "
                    />

                  ) : (

                    <div
                      className={`w-full h-full bg-gradient-to-br ${
                        gradients[index % gradients.length]
                      } flex items-center justify-center`}
                    >

                      <span className="text-7xl">
                        {category.icon || "🍽️"}
                      </span>

                    </div>

                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#120806] via-black/20 to-transparent" />

                  <div
                    className="
                    absolute
                    top-5
                    left-5
                    w-14
                    h-14
                    rounded-2xl
                    bg-black/40
                    backdrop-blur-xl
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <span className="text-2xl">
                      {category.icon || "🍴"}
                    </span>

                  </div>

                </div>

                {/* المحتوى */}

                <div className="p-7">

                  <h3
                    className="
                    text-2xl
                    font-black
                    text-white
                    group-hover:text-yellow-400
                    transition
                    "
                  >
                    {category.name}
                  </h3>

                  <p className="mt-3 text-white/55 leading-7">

                    اضغط للدخول واستعراض جميع الأصناف الخاصة بهذا القسم.

                  </p>

                  <div className="mt-8 flex items-center justify-between">

                    <span
                      className="
                      inline-flex
                      items-center
                      rounded-full
                      bg-gradient-to-r
                      from-yellow-500
                      to-orange-500
                      px-6
                      py-3
                      text-black
                      font-black
                      "
                    >
                      استعراض القسم
                    </span>

                    <ArrowLeft
                      className="
                      text-yellow-400
                      transition-all
                      duration-300
                      group-hover:-translate-x-2
                      "
                      size={22}
                    />

                  </div>

                </div>

              </Link>

            </motion.div>

          ))}        </div>

        {/* رسالة عند عدم وجود أقسام */}

        {categories.length === 0 && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
            mt-20
            rounded-3xl
            border
            border-yellow-500/20
            bg-white/5
            backdrop-blur-xl
            p-16
            text-center
            "
          >

            <div className="text-7xl mb-6">
              🍽️
            </div>

            <h3 className="text-4xl font-black text-white">
              لا توجد أقسام حالياً
            </h3>

            <p className="mt-5 text-white/60 text-lg">
              يمكنك إضافة الأقسام من لوحة التحكم،
              وستظهر هنا مباشرة بدون إعادة نشر الموقع.
            </p>

          </motion.div>

        )}

      </div>

    </section>
  );
}
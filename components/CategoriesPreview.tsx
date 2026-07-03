"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: string;
}

interface Category {
  id: string;
  name: string;
  image?: string;
  icon: string;
  products: Product[];
}

export default function CategoriesPreview() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <section
      id="categories"
      className="py-28 bg-[#120806]"
    >
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div>

            <span className="text-yellow-400 font-bold">

              MENU

            </span>

            <h2 className="text-5xl font-black text-white mt-3">

              أقسام المنيو

            </h2>

            <p className="text-white/60 mt-5">

              اختر القسم الذى يناسبك

            </p>

          </div>

          
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.slice(0, 6).map((category, index) => (

            <motion.div
              key={category.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * .12,
              }}
              whileHover={{
                y: -12,
              }}
            >

              <Link
                href={`/menu/${category.id}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl block"
              >

                <div className="relative h-60">

                  <Image
                    src={
                      category.image ||
                      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200"
                    }
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-6 right-6">

                    <div className="text-5xl">

                      {category.icon}

                    </div>

                  </div>

                </div>

                <div className="p-7">

                  <h3 className="text-2xl font-bold text-white">

                    {category.name}

                  </h3>

                  <p className="text-white/50 mt-3">

                    {category.products.length} منتج

                  </p>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

        <div className="text-center mt-16 lg:hidden">

          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold"
          >
            عرض المنيو

            <ArrowLeft size={18} />

          </Link>

        </div>

      </div>
    </section>
  );
}

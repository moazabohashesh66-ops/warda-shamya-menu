"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  isPopular?: boolean;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

export default function PopularProducts() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const products = useMemo(() => {
    const all = categories.flatMap((category) =>
      category.products.map((product) => ({
        ...product,
        categoryId: category.id,
      }))
    );

    const popular = all.filter((p) => p.isPopular);

    return (popular.length ? popular : all).slice(0, 8);
  }, [categories]);

  return (
    <section
      id="popular"
      className="py-28 bg-gradient-to-b from-[#1a0c08] to-[#120806]"
    >
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-5 py-2">

            <Flame size={18} className="text-red-400" />

            <span className="text-red-300 font-semibold">

              الأكثر طلباً

            </span>

          </div>

          <h2 className="text-5xl font-black text-white mt-8">

            أشهر الأكلات

          </h2>

          <p className="text-white/60 mt-6 max-w-2xl mx-auto">

            أشهر المنتجات التي يطلبها عملاؤنا يومياً.

          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product, index) => (

            <motion.div
              key={product.id}
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
                delay: index * 0.08,
              }}
              whileHover={{
                y: -10,
              }}
              className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl"
            >

              <div className="relative h-56 overflow-hidden">

                <Image
                  fill
                  alt={product.name}
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1544025162-d76694265947?w=1000"
                  }
                  className="object-cover hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">

                  <Star
                    size={14}
                    fill="black"
                  />

                  مميز

                </div>

              </div>

              <div className="p-6">

                <h3 className="text-white text-xl font-bold">

                  {product.name}

                </h3>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-yellow-400 font-black text-2xl">

                    {product.price} ج

                  </span>

                  <Link
                    href="/menu"
                    className="bg-yellow-500 hover:bg-yellow-400 transition text-black px-4 py-2 rounded-xl font-bold"
                  >
                    اطلب الآن
                  </Link>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

        <div className="text-center mt-16">

          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-8 py-4 rounded-2xl"
          >

            مشاهدة المنيو بالكامل

            <ArrowLeft size={20} />

          </Link>

        </div>

      </div>
    </section>
  );
}

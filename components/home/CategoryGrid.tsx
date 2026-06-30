"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: string;
}

interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  image?: string;
  products: Product[];
}

interface Props {
  categories: Category[];
}

export default function CategoryGrid({ categories = [] }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-5 py-12">

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {categories.map((category, index) => (

          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -10 }}
          >

            <Link href={`/menu/${category.id}`}>

              <div className="group relative overflow-hidden rounded-3xl h-[320px] cursor-pointer shadow-2xl">

                <Image
                  src={
                    category.image ||
                    "https://images.unsplash.com/photo-1544025162-d76694265947?w=900"
                  }
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-5 right-5 text-5xl">
                  {category.icon}
                </div>

                <div className="absolute bottom-6 right-6 left-6">

                  <h2 className="text-white text-3xl font-bold">
                    {category.name}
                  </h2>

                  <p className="text-yellow-400">
                    {category.nameEn}
                  </p>

                  <div className="mt-5 flex justify-between items-center">

                    <span className="text-white/80">
                      {category.products.length} صنف
                    </span>

                    <span className="bg-yellow-500 text-black px-5 py-2 rounded-full font-bold group-hover:bg-white transition">
                      عرض القائمة →
                    </span>

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
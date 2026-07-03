"use client";

import { Category } from "@/data/menuData";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface Props {
  category: Category;
}

export default function CategorySection({ category }: Props) {
  return (
    <section className="py-20">

      <div className="mb-10 flex items-center gap-4">

        <span className="text-5xl">
          {category.icon}
        </span>

        <div>

          <h2 className="text-4xl font-bold text-white">
            {category.name}
          </h2>

          <p className="text-white/50">
            {category.products.length} منتج
          </p>

        </div>

      </div>

      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      >

        {category.products.map((product)=>(
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </motion.div>

    </section>
  );
}

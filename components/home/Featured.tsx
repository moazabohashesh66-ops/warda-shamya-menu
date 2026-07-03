"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

const meals = [
  {
    id: 1,
    name: "شاورما فراخ",
    price: "120 ج.م",
    image: "/images/foods/shawarma.jpg",
  },
  {
    id: 2,
    name: "ميكس جريل",
    price: "280 ج.م",
    image: "/images/foods/grill.jpg",
  },
  {
    id: 3,
    name: "بيتزا بيبروني",
    price: "190 ج.م",
    image: "/images/foods/pizza.jpg",
  },
  {
    id: 4,
    name: "كريسبي برجر",
    price: "165 ج.م",
    image: "/images/foods/burger.jpg",
  },
];

export default function Featured() {
  return (
    <section className="bg-[#1A120B] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center text-4xl font-bold text-white"
        >
          ⭐ الأكثر طلباً
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >

              <div className="relative h-64">

                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />

                <button className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white backdrop-blur">
                  <Heart size={18} />
                </button>

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white">
                  {meal.name}
                </h3>

                <p className="mt-3 text-2xl font-bold text-[#F4C16D]">
                  {meal.price}
                </p>

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F4C16D] py-3 font-bold text-black transition hover:scale-105">
                  <ShoppingCart size={20} />
                  اطلب الآن
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

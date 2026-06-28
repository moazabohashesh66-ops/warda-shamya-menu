"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  products: Product[];
}

export default function Categories() {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {

    async function loadMenu() {

      const res = await fetch("/api/menu");
      const data = await res.json();

      if (Array.isArray(data)) {
        setCategories(data);
      }

    }

    loadMenu();

  }, []);


  return (
    <section className="py-20 px-4 bg-[#140c08]">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            أقسام المنيو
          </h2>

          <p className="text-white/60 mt-3">
            اختر القسم وشاهد كل الأصناف
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((category) => (

            <Link
              key={category.id}
              href={`/menu/${category.id}`}
              className="
              group rounded-3xl overflow-hidden
              bg-[#241510]
              border border-white/10
              hover:border-yellow-400
              transition
              "
            >

              {category.image && (

                <div className="relative h-48">

                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                  />

                </div>

              )}


              <div className="p-6 flex justify-between items-center">


                <div className="flex gap-5 items-center">


                  {!category.image && (
                    <span className="text-5xl">
                      {category.icon}
                    </span>
                  )}


                  <div>

                    <h3 className="text-2xl font-bold text-white">
                      {category.name}
                    </h3>

                    <p className="text-white/60">
                      {category.products?.length || 0} منتج
                    </p>

                  </div>


                </div>


                <ChevronLeft
                  size={32}
                  className="text-yellow-400"
                />


              </div>


            </Link>

          ))}


        </div>

      </div>

    </section>
  );
}
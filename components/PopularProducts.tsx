"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useMenu } from "@/hooks/useMenu";

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
  const { categories, isLoading, error } = useMenu();

if (isLoading) {
  return null;
}

if (error) {
  return null;
}

  const products = useMemo(() => {
    const safeCategories = Array.isArray(categories) ? categories : [];

    const all = safeCategories.flatMap((category) =>
      (category.products ?? []).map((product) => ({
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
      {/* باقي JSX كما هو بدون أي تغيير */}
    </section>
  );
}
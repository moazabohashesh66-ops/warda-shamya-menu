"use client";

import { Menu, Search } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#2B1810]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-[#F4C16D]">
            🌹 وردة شامية
          </h1>
          <p className="text-xs text-white/60">
            Syrian Restaurant
          </p>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden gap-8 text-white lg:flex">
          <a href="#" className="transition hover:text-[#F4C16D]">الرئيسية</a>
          <a href="#" className="transition hover:text-[#F4C16D]">المنيو</a>
          <a href="#" className="transition hover:text-[#F4C16D]">العروض</a>
          <a href="#" className="transition hover:text-[#F4C16D]">تواصل</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <button className="rounded-full bg-white/10 p-3 text-white transition hover:bg-[#F4C16D] hover:text-black">
            <Search size={20} />
          </button>

          <button className="rounded-full bg-[#F4C16D] p-3 text-black transition hover:scale-110 lg:hidden">
            <Menu size={22} />
          </button>

        </div>

      </div>
    </motion.header>
  );
}
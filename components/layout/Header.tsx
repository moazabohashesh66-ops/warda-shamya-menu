"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-2 sm:py-3">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="
            bg-[#1b0f0a]/85
            backdrop-blur-xl
            border border-white/10
            rounded-2xl
            shadow-2xl
            px-4 py-2 sm:px-6 sm:py-3
            flex items-center justify-between
          "
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="
              w-10 h-10 sm:w-12 sm:h-12
              rounded-xl
              bg-yellow-500
              flex items-center justify-center
              text-2xl sm:text-3xl
              shadow-lg
            ">
              🌹
            </div>
            <div className="flex flex-col leading-none">
              <h1 className="text-white text-sm sm:text-base font-bold">
                وردة <span className="text-yellow-400">شامية</span>
              </h1>
              <p className="text-yellow-400/80 text-[8px] sm:text-[10px] tracking-wider">
                SYRIAN RESTAURANT
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-white/80 font-medium text-xs sm:text-sm">
            <Link href="/" className="hover:text-yellow-400 transition-colors duration-300 relative group">
              الرئيسية
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#menu" className="hover:text-yellow-400 transition-colors duration-300 relative group">
              المنيو
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-yellow-400 transition-colors duration-300 relative group">
              عن المطعم
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-yellow-400 transition-colors duration-300 relative group">
              تواصل
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white/80 hover:text-yellow-400 transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.nav>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mt-2
              bg-[#1b0f0a]/95
              backdrop-blur-xl
              rounded-2xl
              p-4
              md:hidden
              flex flex-col
              gap-3
              text-white/80
              text-sm
            "
          >
            <Link onClick={closeMenu} href="/" className="hover:text-yellow-400 transition py-1">
              الرئيسية
            </Link>
            <Link onClick={closeMenu} href="/#menu" className="hover:text-yellow-400 transition py-1">
              المنيو
            </Link>
            <Link onClick={closeMenu} href="/about" className="hover:text-yellow-400 transition py-1">
              عن المطعم
            </Link>
            <Link onClick={closeMenu} href="/contact" className="hover:text-yellow-400 transition py-1">
              تواصل
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}

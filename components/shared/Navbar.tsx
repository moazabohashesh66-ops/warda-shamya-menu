"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#1a0e0a]/95 backdrop-blur-xl shadow-2xl border-b border-white/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-10 md:h-12">
          {/* الشعار */}
          <Link href="/" className="flex items-center space-x-1.5 group">
            <span className="text-xl md:text-2xl">🌹</span>
            <div>
              <span className="font-bold text-sm md:text-base tracking-wide text-white">
                وردة <span className="text-yellow-400">شامية</span>
              </span>
              <div className="text-[5px] md:text-[7px] tracking-[2px] text-white/40 font-light leading-none">
                SYRIAN CUISINE
              </div>
            </div>
          </Link>

          {/* الروابط */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/" 
              className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-xs tracking-wide relative group"
            >
              الرئيسية
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#menu" 
              className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-xs tracking-wide relative group"
            >
              المنيو
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: .5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#120806]/90 backdrop-blur-2xl shadow-2xl border-b border-yellow-500/20"
            : "bg-[#120806]/70 backdrop-blur-xl border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition">
              🌹
            </div>

            <div>

              <h1 className="text-white text-xl font-bold">
                وردة
                <span className="text-yellow-400"> شامية</span>
              </h1>

              <p className="text-white/40 text-xs">
                Authentic Syrian Restaurant
              </p>

            </div>
          </Link>

          {/* Desktop */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              href="/"
              className="text-white/70 hover:text-yellow-400 transition"
            >
              الرئيسية
            </Link>

            <Link
              href="#menu"
              className="text-white/70 hover:text-yellow-400 transition"
            >
              المنيو
            </Link>

            <Link
              href="/admin"
              className="bg-yellow-500 hover:bg-yellow-400 transition px-5 py-2 rounded-xl font-semibold text-black flex items-center gap-2"
            >
              <ShieldCheck size={18} />
              لوحة التحكم
            </Link>

          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </motion.nav>

      {/* Mobile Menu */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            className="fixed top-20 left-4 right-4 md:hidden z-40"
          >

            <div className="rounded-3xl bg-[#1a0e0a]/95 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl">

              <div className="flex flex-col gap-5">

                <Link
                  href="/"
                  onClick={closeMenu}
                  className="text-white hover:text-yellow-400 transition"
                >
                  🏠 الرئيسية
                </Link>

                <Link
                  href="#menu"
                  onClick={closeMenu}
                  className="text-white hover:text-yellow-400 transition"
                >
                  📋 المنيو
                </Link>

                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="bg-yellow-500 text-black rounded-xl py-3 text-center font-bold hover:bg-yellow-400 transition"
                >
                  🛠️ لوحة التحكم
                </Link>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      <div className="h-20" />
    </>
  );
}
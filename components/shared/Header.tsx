"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      <div className="max-w-7xl mx-auto px-4 pt-4">

        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .5 }}
          className={`
          transition-all duration-300
          rounded-3xl
          border
          px-6
          py-3
          flex
          items-center
          justify-between
          ${
            scrolled
              ? "bg-[#120806]/95 backdrop-blur-2xl border-yellow-500/20 shadow-[0_15px_50px_rgba(0,0,0,.45)]"
              : "bg-[#1b0f0a]/80 backdrop-blur-xl border-white/10"
          }
          `}
        >

          {/* Logo */}

          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >

            <div
              className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-br
              from-yellow-400
              to-yellow-600
              flex
              items-center
              justify-center
              text-2xl
              shadow-xl
              group-hover:scale-110
              transition
              "
            >
              🌹
            </div>

            <div>

              <h1 className="text-white font-bold text-lg">
                وردة
                <span className="text-yellow-400"> شامية</span>
              </h1>

              <p className="text-[10px] tracking-[3px] text-yellow-400/70">
                SYRIAN RESTAURANT
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
              href="/#menu"
              className="text-white/70 hover:text-yellow-400 transition"
            >
              المنيو
            </Link>

            <Link
              href="/about"
              className="text-white/70 hover:text-yellow-400 transition"
            >
              عن المطعم
            </Link>

            <Link
              href="/contact"
              className="text-white/70 hover:text-yellow-400 transition"
            >
              تواصل
            </Link>

          </div>

          {/* Right */}

          <div className="hidden md:flex items-center gap-3">

            <Link
              href="/admin"
              className="
              bg-white/10
              hover:bg-white/20
              text-white
              rounded-xl
              px-4
              py-2
              transition
              flex
              items-center
              gap-2
              "
            >
              <ShieldCheck size={18} />
              الإدارة
            </Link>

            <Link
              href="/#menu"
              className="
              bg-yellow-500
              hover:bg-yellow-400
              rounded-xl
              px-5
              py-2
              font-bold
              text-black
              flex
              items-center
              gap-2
              transition
              "
            >
              <ShoppingBag size={18} />
              اطلب الآن
            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className="
            md:hidden
            w-11
            h-11
            rounded-xl
            bg-white/10
            text-white
            flex
            items-center
            justify-center
            "
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </motion.nav>

        <AnimatePresence>

          {open && (

            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="
              md:hidden
              mt-3
              rounded-3xl
              bg-[#1b0f0a]/95
              backdrop-blur-2xl
              border
              border-white/10
              shadow-2xl
              overflow-hidden
              "
            >

              <div className="flex flex-col">

                <Link onClick={closeMenu} href="/" className="px-6 py-4 hover:bg-white/5 transition">
                  الرئيسية
                </Link>

                <Link onClick={closeMenu} href="/#menu" className="px-6 py-4 hover:bg-white/5 transition">
                  المنيو
                </Link>

                <Link onClick={closeMenu} href="/about" className="px-6 py-4 hover:bg-white/5 transition">
                  عن المطعم
                </Link>

                <Link onClick={closeMenu} href="/contact" className="px-6 py-4 hover:bg-white/5 transition">
                  تواصل
                </Link>

                <div className="border-t border-white/10 p-4">

                  <Link
                    href="/admin"
                    className="block text-center bg-white/10 rounded-xl py-3 text-white mb-3"
                    onClick={closeMenu}
                  >
                    لوحة التحكم
                  </Link>

                  <Link
                    href="/#menu"
                    className="block text-center bg-yellow-500 rounded-xl py-3 text-black font-bold"
                    onClick={closeMenu}
                  >
                    اطلب الآن
                  </Link>

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

      <div className="h-24" />

    </header>
  );
}
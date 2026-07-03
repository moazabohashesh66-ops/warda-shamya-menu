"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  // 🔥 Smooth scroll احترافي
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    closeMenu();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#120806]/95 backdrop-blur-xl shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={55}
            height={55}
            priority
            className="rounded-full"
          />

          <div className="leading-tight">
            <h1 className="text-white font-black text-xl">وردة شامية</h1>
            <p className="text-yellow-400 text-xs">Syrian Restaurant</p>
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-8">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-white hover:text-yellow-400 transition"
          >
            الرئيسية
          </button>

          <button
            onClick={() => scrollTo("categories")}
            className="text-white hover:text-yellow-400 transition"
          >
            المنيو
          </button>

          <button
            onClick={() => scrollTo("popular")}
            className="text-white hover:text-yellow-400 transition"
          >
            الأكثر طلباً
          </button>

          <a
            href="https://wa.me/201013839628"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition"
          >
            واتساب
          </a>

          <Link
            href="/admin"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold transition"
          >
            لوحة التحكم
          </Link>

        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#120806] border-t border-yellow-500/20">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="block w-full text-right px-6 py-5 text-white hover:bg-yellow-500/10"
          >
            الرئيسية
          </button>

          <button
            onClick={() => scrollTo("categories")}
            className="block w-full text-right px-6 py-5 text-white hover:bg-yellow-500/10"
          >
            المنيو
          </button>

          <button
            onClick={() => scrollTo("popular")}
            className="block w-full text-right px-6 py-5 text-white hover:bg-yellow-500/10"
          >
            الأكثر طلباً
          </button>

          <a
            href="https://wa.me/201013839628"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="block px-6 py-5 text-white hover:bg-yellow-500/10"
          >
            واتساب
          </a>

          <Link
            href="/admin"
            onClick={closeMenu}
            className="block px-6 py-5 bg-yellow-500 text-center text-black font-bold"
          >
            لوحة التحكم
          </Link>

        </div>
      )}
    </header>
  );
}
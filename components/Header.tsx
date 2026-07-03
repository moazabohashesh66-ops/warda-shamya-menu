"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {

  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      <div className="
        mx-auto max-w-7xl
        px-4 py-4
      ">

        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="
          bg-[#1b0f0a]/80
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          shadow-2xl
          px-6 py-4
          flex items-center justify-between
          "
        >

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="
              w-12 h-12
              rounded-2xl
              bg-yellow-500
              flex items-center
              justify-center
              text-2xl
            ">
              🌹
            </div>

            <div>
              <h1 className="
              text-white text-xl font-bold
              ">
                وردة شامية
              </h1>

              <p className="
              text-yellow-400 text-xs
              ">
                Syrian Restaurant
              </p>

            </div>

          </Link>


          {/* Links */}

          <div className="
          hidden md:flex
          gap-8
          text-white/80
          font-semibold
          ">

            <Link 
            className="hover:text-yellow-400 transition"
            href="/">
              الرئيسية
            </Link>

            <Link
            className="hover:text-yellow-400 transition"
            href="/menu">
              المنيو
            </Link>

            <Link
            className="hover:text-yellow-400 transition"
            href="/#about">
              عن المطعم
            </Link>

            <Link
            className="hover:text-yellow-400 transition"
            href="/#contact">
              تواصل
            </Link>

          </div>


          {/* Button */}

          <button className="
          hidden md:block
          bg-yellow-500
          text-[#1b0f0a]
          px-6 py-3
          rounded-full
          font-bold
          hover:scale-105
          transition
          ">
            اطلب الآن
          </button>


          {/* Mobile */}

          <button
          onClick={()=>setOpen(!open)}
          className="md:hidden text-white"
          >

            {open ? <X/> : <Menu/>}

          </button>


        </motion.nav>


        {open && (

          <div className="
          mt-3
          bg-[#1b0f0a]/95
          rounded-3xl
          p-5
          md:hidden
          text-white
          space-y-4
          ">

            <Link href="/">الرئيسية</Link>
            <Link href="/menu">المنيو</Link>
            <Link href="/#about">عن المطعم</Link>

          </div>

        )}

      </div>

    </header>
  );
}

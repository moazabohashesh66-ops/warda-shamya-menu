"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-[#1a0e0a] via-[#2E1A12] to-[#1a0e0a] flex items-center justify-center pt-12">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 bg-black/20"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl mb-3"
        >
          🌹
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl md:text-5xl font-extrabold text-white tracking-wider"
        >
          وردة شامية
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-1 text-sm md:text-lg tracking-[4px] text-yellow-300/70 font-light"
        >
          FOR SYRIAN CUISINE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-3 h-0.5 w-16 bg-yellow-400/50 mx-auto rounded-full"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-3 max-w-2xl text-white/60 mx-auto leading-relaxed text-sm"
        >
          استمتع بأشهى المأكولات السورية مع أفضل جودة وطعم أصيل
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-5"
        >
          <button
            onClick={() => {
              const menuSection = document.getElementById('menu');
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                router.push('/#menu');
              }
            }}
            className="rounded-full bg-yellow-500 px-6 py-2.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
          >
            🍽 استكشف المنيو
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <div className="w-4 h-7 border border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-yellow-400/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
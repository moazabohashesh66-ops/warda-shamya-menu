"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Clock3,
  Truck,
  ChefHat,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#120806] flex items-center">

      {/* Background */}

      <div className="absolute inset-0">

        <Image
          src="/images/hero.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover opacity-20 scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#120806] via-[#120806]/90 to-[#120806]/40" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,.12),transparent_35%)]" />

      </div>

      {/* Glow */}

      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-yellow-500/10 blur-[170px]" />

      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            {/* Logo */}

            <motion.div
              initial={{ opacity: 0, scale: .7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .7 }}
              className="mb-8"
            >

              <div className="relative w-44 h-44 rounded-full bg-white/5 border border-yellow-500/30 backdrop-blur-xl shadow-[0_0_80px_rgba(255,193,7,.25)] overflow-hidden">

                <Image
  src="/images/logo.png"
  alt="Logo"
  fill
  priority
  className="object-contain p-5 drop-shadow-[0_0_35px_rgba(255,193,7,.55)]"
/>

              </div>

            </motion.div>

            {/* Badge */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-8"
            >

              <Sparkles className="text-yellow-400" size={18} />

              <span className="text-yellow-300 font-medium">
                أفضل مطعم سوري في المنطقة
              </span>

            </motion.div>

            {/* Title */}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3 }}
              className="text-5xl lg:text-7xl font-black leading-tight"
            >

              <span className="text-white">
                الطعم السوري
              </span>

              <br />

              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                الحقيقي
              </span>

            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5 }}
              className="mt-8 text-white/70 leading-9 text-lg max-w-xl"
            >
              استمتع بأشهى المشويات والشاورما والمناقيش والبيتزا
              والمقبلات السورية الطازجة، مع جودة عالية وسرعة
              في التحضير وتوصيل سريع لجميع المناطق.
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .7 }}
              className="flex flex-wrap gap-5 mt-12"
            >

              <a
  href="#categories"
  className="group bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,193,7,.35)]"
>
  تصفح المنيو

  <ArrowLeft
    size={20}
    className="group-hover:-translate-x-1 transition"
  />
</a>
              <a
                href="#popular"
                className="px-8 py-4 rounded-2xl border border-white/15 backdrop-blur-lg bg-white/5 text-white hover:border-yellow-400 hover:text-yellow-400 transition-all"
              >
                الأكثر طلباً
              </a>

            </motion.div>            {/* Features */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-5 mt-14"
            >

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-yellow-400/40 transition-all duration-300">

                <Clock3 className="text-yellow-400 mb-3" size={26} />

                <h3 className="text-white font-bold text-lg">
                  سريع
                </h3>

                <p className="text-white/60 text-sm mt-1">
                  تجهيز خلال دقائق
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-yellow-400/40 transition-all duration-300">

                <Truck className="text-yellow-400 mb-3" size={26} />

                <h3 className="text-white font-bold text-lg">
                  توصيل
                </h3>

                <p className="text-white/60 text-sm mt-1">
                  لجميع المناطق
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-yellow-400/40 transition-all duration-300">

                <ChefHat className="text-yellow-400 mb-3" size={26} />

                <h3 className="text-white font-bold text-lg">
                  جودة
                </h3>

                <p className="text-white/60 text-sm mt-1">
                  مكونات طازجة يومياً
                </p>

              </div>

            </motion.div>

          </div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .4 }}
            className="relative hidden lg:flex justify-center items-center"
          >

            <div className="relative w-[560px] h-[560px]">

              
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >

                <Image
                  src="/images/foods.png"
                  alt="Food"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_60px_rgba(255,193,7,.45)]"
                />

              </motion.div>

              <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-3xl -z-10" />

            </div>

          </motion.div>

        </div>

      </div>      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#120806] to-transparent pointer-events-none" />

      {/* Decorative Blurs */}
      <div className="absolute top-24 right-20 w-24 h-24 rounded-full bg-yellow-400/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-24 w-32 h-32 rounded-full bg-red-500/10 blur-3xl animate-pulse" />

      {/* Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#1A0F0C"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
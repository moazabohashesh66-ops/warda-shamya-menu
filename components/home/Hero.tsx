"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, PhoneCall, UtensilsCrossed, Sparkles } from "lucide-react";

export default function Hero() {
  const goMenu = () => {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0604] via-[#120806] to-[#1a0e0a]">

      {/* ===== Background Glows ===== */}
      <div className="absolute top-[-100px] left-[-50px] w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-100px] right-[-50px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-yellow-400/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ===== LEFT ===== */}
          <div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm font-semibold mb-8"
            >
              <Sparkles size={16} />
              أفضل المأكولات السورية الأصيلة
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-black leading-[1.1] text-white"
            >
              استمتع بأشهى
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500">
                المأكولات السورية
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-white/60 text-lg leading-relaxed max-w-lg"
            >
              نقدم أشهى المشويات والشاورما والمقبلات والحلويات
              السورية بمذاق أصيل وجودة عالية باستخدام أفضل
              المكونات الطازجة يوميًا.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={goMenu}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold transition-all duration-300 shadow-2xl shadow-yellow-500/25 flex items-center gap-3 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <UtensilsCrossed size={20} className="relative z-10" />
                <span className="relative z-10">تصفح المنيو</span>
              </button>

              <a
                href="tel:+201013839628"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 text-white/80 flex items-center gap-3"
              >
                <PhoneCall size={20} />
                اتصل الآن
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 mt-14"
            >
              <div>
                <h2 className="text-yellow-400 text-3xl font-black">+150</h2>
                <p className="text-white/40 text-sm">صنف مميز</p>
              </div>
              <div>
                <h2 className="text-yellow-400 text-3xl font-black">+20K</h2>
                <p className="text-white/40 text-sm">عميل سعيد</p>
              </div>
              <div>
                <h2 className="text-yellow-400 text-3xl font-black">⭐4.9</h2>
                <p className="text-white/40 text-sm">تقييم العملاء</p>
              </div>
            </motion.div>

          </div>

          {/* ===== RIGHT ===== */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/10 blur-3xl" />

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: .7 }}
              className="relative mt-10 flex justify-center"
            >
              {/* Glow */}
              <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/10 blur-[70px]" />

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80"
                  alt="وردة شامية"
                  width={430}
                  height={430}
                  priority
                  className="
                    relative
                    w-[270px]
                    md:w-[360px]
                    lg:w-[430px]
                    h-auto
                    rounded-[40px]
                    object-cover
                    shadow-[0_35px_80px_rgba(0,0,0,.55)]
                    hover:scale-105
                    transition
                    duration-500
                  "
                />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* ===== Scroll ===== */}
      <motion.button
        onClick={goMenu}
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-400/60 hover:text-yellow-400 transition cursor-pointer z-20"
      >
        <ArrowDown size={32} strokeWidth={1.5} />
      </motion.button>

    </section>
  );
}
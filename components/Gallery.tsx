"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
];

export default function Gallery() {
  return (
    <section className="py-28 bg-[#120806]">

      <div className="container mx-auto px-6">

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="text-center mb-16"
        >

          <h2 className="text-5xl font-black text-white">

            من داخل وردة شامية

          </h2>

          <p className="text-white/60 mt-6">

            بعض الصور التى تعبر عن جودة الطعام لدينا

          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {images.map((image,index)=>(

            <motion.div
              key={index}
              whileHover={{
                scale:1.05,
                y:-8
              }}
              className="overflow-hidden rounded-3xl"
            >

              <div className="relative h-80">

                <Image
                  src={image}
                  fill
                  alt=""
                  className="object-cover duration-700 hover:scale-110"
                />

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

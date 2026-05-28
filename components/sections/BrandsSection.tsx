"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";

const brands = [
  { id: "1", name: "DIOR", slug: "dior" },
  { id: "2", name: "MAC", slug: "mac" },
  { id: "3", name: "HUDA BEAUTY", slug: "huda-beauty" },
  { id: "4", name: "CeraVe", slug: "cerave" },
  { id: "5", name: "ESTÉE LAUDER", slug: "estee-lauder" },
  { id: "6", name: "L'ORÉAL", slug: "loreal" },
  { id: "7", name: "MAYBELLINE", slug: "maybelline" },
  { id: "8", name: "The Ordinary", slug: "the-ordinary" },
  { id: "9", name: "YSL", slug: "ysl" },
  { id: "10", name: "CHANEL", slug: "chanel" },
];

export function BrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 bg-black border-b border-gold/8">
      <div className="container-luxury">
        {/* Section Header - Compact */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-cream">البراندات العالمية</h2>
            <p className="text-xs text-gold-muted mt-0.5">أكثر من 100 براند عالمي</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll("right")}
              className="w-7 h-7 rounded-full border border-gold/15 flex items-center justify-center text-gold/60 hover:border-gold/40 hover:text-gold transition-all"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => scroll("left")}
              className="w-7 h-7 rounded-full border border-gold/15 flex items-center justify-center text-gold/60 hover:border-gold/40 hover:text-gold transition-all"
            >
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>

        {/* Brands Slider */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="shrink-0"
            >
              <Link
                href={`/brand/${brand.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="w-[100px] h-[100px] rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gold/10 flex items-center justify-center p-4 transition-all duration-500 group-hover:border-gold/35 group-hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)] group-hover:-translate-y-1">
                  <span className="text-gold/60 font-bold text-sm tracking-wider group-hover:text-gold transition-colors duration-300">
                    {brand.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

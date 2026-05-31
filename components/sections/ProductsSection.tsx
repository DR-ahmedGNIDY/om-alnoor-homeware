"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";

interface ProductsSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  viewAllLink: string;
  badge?: string;
}

export function ProductsSection({
  title,
  subtitle,
  products,
  viewAllLink,
}: ProductsSectionProps) {
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
    <section className="py-14 bg-cream">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-primary">
              {title}
            </h2>

            <p className="text-gray-600 mt-2">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
              >
                <ChevronRight size={18} />
              </button>

              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            <Link
              href={viewAllLink}
              className="hidden sm:flex items-center gap-2 text-primary hover:text-gold transition-colors font-semibold"
            >
              <span>عرض الكل</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Products Slider */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-3"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="shrink-0 w-[260px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
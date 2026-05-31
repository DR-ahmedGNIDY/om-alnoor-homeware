"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  CookingPot,
  ChefHat,
  UtensilsCrossed,
  Home,
  Package,
  Gift,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface BrandsSectionProps {
  selectedBrand: string | null;
  onSelectBrand: (brand: string | null) => void;
}

const categories = [
  {
    id: "cookware",
    name: "أطقم الحلل",
    icon: CookingPot,
  },
  {
    id: "kitchen",
    name: "أدوات المطبخ",
    icon: ChefHat,
  },
  {
    id: "dining",
    name: "أطقم السفرة",
    icon: UtensilsCrossed,
  },
  {
    id: "appliances",
    name: "الأجهزة المنزلية",
    icon: Home,
  },
  {
    id: "storage",
    name: "التخزين والتنظيم",
    icon: Package,
  },
  {
    id: "brides",
    name: "تجهيز العرائس",
    icon: Gift,
  },
];

export function BrandsSection({
  selectedBrand,
  onSelectBrand,
}: BrandsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -350 : 350,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-cream border-b border-gold/10">
      <div className="container-luxury">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">
            أقسام أم النور
          </h2>

          <p className="text-gray-600 text-lg">
            كل ما تحتاجه لمنزلك في مكان واحد
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
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

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="shrink-0"
            >
              <div
                onClick={() =>
                  onSelectBrand(
                    selectedBrand === category.id
                      ? null
                      : category.id
                  )
                }
                className="cursor-pointer"
              >
                <div
                  className={`
                    w-[170px]
                    h-[170px]
                    rounded-3xl
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    transition-all
                    duration-500

                    ${
                      selectedBrand === category.id
                        ? `
                          bg-primary
                          border
                          border-gold
                          shadow-lg
                          scale-105
                        `
                        : `
                          bg-white
                          border
                          border-gold/20
                          hover:border-gold
                          hover:-translate-y-2
                          hover:shadow-xl
                        `
                    }
                  `}
                >
                  <category.icon
                    size={42}
                    className={
                      selectedBrand === category.id
                        ? "text-gold"
                        : "text-primary"
                    }
                  />

                  <span
                    className={`font-bold text-center ${
                      selectedBrand === category.id
                        ? "text-white"
                        : "text-primary"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
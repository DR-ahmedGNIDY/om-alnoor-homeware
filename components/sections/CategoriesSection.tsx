"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChefHat,
  CookingPot,
  UtensilsCrossed,
  Package,
  Home,
  Gift,
} from "lucide-react";

const categories = [
  {
    id: "cookware",
    name: "أطقم الحلل",
    icon: CookingPot,
    image: "/images/categories/cookware.webp",
    count: 350,
  },
  {
    id: "kitchen",
    name: "أدوات المطبخ",
    icon: ChefHat,
    image: "/images/categories/kitchen.webp",
    count: 500,
  },
  {
    id: "dining",
    name: "أطقم السفرة",
    icon: UtensilsCrossed,
    image: "/images/categories/dining.webp",
    count: 250,
  },
  {
    id: "appliances",
    name: "الأجهزة المنزلية",
    icon: Home,
    image: "/images/categories/appliances.webp",
    count: 180,
  },
  {
    id: "storage",
    name: "التخزين والتنظيم",
    icon: Package,
    image: "/images/categories/storage.webp",
    count: 220,
  },
  {
    id: "brides",
    name: "تجهيز العرائس",
    icon: Gift,
    image: "/images/categories/brides.webp",
    count: 400,
  },
];

export function CategoriesSection() {
  return (
    <section className="py-14 bg-cream">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            أقسام أم النور
          </h2>

          <p className="text-gray-600">
            كل ما تحتاجه لمنزلك في مكان واحد
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/shop?category=${category.id}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-5">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    <category.icon className="text-gold" size={22} />
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-white">
                    {category.name}
                  </h3>

                  <p className="text-xs text-white/80 mt-1">
                    {category.count.toLocaleString("ar-EG")} منتج
                  </p>
                </div>

                <div className="absolute inset-0 border border-transparent group-hover:border-gold rounded-2xl transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
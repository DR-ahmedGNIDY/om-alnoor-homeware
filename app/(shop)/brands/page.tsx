"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const brands = [
  { name: "DIOR", slug: "dior", products: 450, categories: ["المكياج", "العطور", "العناية بالبشرة"], logo: "D" },
  { name: "CHANEL", slug: "chanel", products: 380, categories: ["المكياج", "العطور", "العناية بالبشرة"], logo: "C" },
  { name: "YSL", slug: "ysl", products: 320, categories: ["المكياج", "العطور"], logo: "Y" },
  { name: "MAC", slug: "mac", products: 290, categories: ["المكياج"], logo: "M" },
  { name: "HUDA BEAUTY", slug: "huda-beauty", products: 180, categories: ["المكياج"], logo: "H" },
  { name: "L'ORÉAL", slug: "loreal", products: 520, categories: ["المكياج", "العناية بالشعر", "العناية بالبشرة"], logo: "L" },
  { name: "CeraVe", slug: "cerave", products: 95, categories: ["العناية بالبشرة"], logo: "CV" },
  { name: "The Ordinary", slug: "the-ordinary", products: 67, categories: ["العناية بالبشرة"], logo: "TO" },
  { name: "MAYBELLINE", slug: "maybelline", products: 340, categories: ["المكياج"], logo: "MB" },
  { name: "ESTÉE LAUDER", slug: "estee-lauder", products: 280, categories: ["المكياج", "العناية بالبشرة", "العطور"], logo: "EL" },
  { name: "Kérastase", slug: "kerastase", products: 150, categories: ["العناية بالشعر"], logo: "K" },
  { name: "Nuxe", slug: "nuxe", products: 120, categories: ["العناية بالبشرة", "العناية بالجسم"], logo: "N" },
];

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-medium tracking-wider mb-2 block">
            BRANDS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            البراندات العالمية
          </h1>
          <p className="text-gold-muted max-w-lg mx-auto">
            اكتشفي أكثر من 100 براند عالمي في عالم الجمال والتجميل
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-muted" size={20} />
            <input
              type="text"
              placeholder="ابحثي عن براند..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black-light border border-gold/20 rounded-full py-4 pr-12 pl-6 text-cream placeholder:text-gold-muted/50 focus:outline-none focus:border-gold/50 focus:shadow-gold-sm"
            />
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/brand/${brand.slug}`}>
                <div className="luxury-card p-6 group hover:border-gold/40 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center">
                      <span className="text-gold font-bold text-xl">{brand.logo}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-cream group-hover:text-gold transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-gold-muted">{brand.products} منتج</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {brand.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-gold text-sm group-hover:gap-2 transition-all">
                    <span>تصفحي المنتجات</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gold-muted text-lg">لا توجد براندات مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
}

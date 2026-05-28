"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Filter } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";

const brandData: Record<string, { name: string; description: string; categories: string[] }> = {
  dior: {
    name: "DIOR",
    description: "ديور - رمز الفخامة الفرنسية في عالم الجمال. منذ عام 1946، تقدم ديور أرقى منتجات المكياج والعطور والعناية بالبشرة.",
    categories: ["المكياج", "العطور", "العناية بالبشرة"],
  },
  chanel: {
    name: "CHANEL",
    description: "شانيل - أيقونة الأناقة والفخامة. تقدم مجموعة استثنائية من المكياج والعطور والعناية بالبشرة بأعلى معايير الجودة.",
    categories: ["المكياج", "العطور", "العناية بالبشرة"],
  },
  mac: {
    name: "MAC",
    description: "MAC Cosmetics - الخيار الأول لمحترفي المكياج حول العالم. منتجات احترافية بألوان غنية وتركيبات مبتكرة.",
    categories: ["المكياج"],
  },
};

const demoProducts: Product[] = [
  {
    _id: "1",
    name: "Dior Addict Lip Glow",
    slug: "dior-addict-lip-glow",
    brand: { _id: "b7", name: "DIOR", slug: "dior", logo: "", categories: [], isActive: true, order: 7 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: ["https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&q=80"],
    description: "ملمع شفاه ديور أديكت",
    price: 850,
    stock: 25,
    sku: "DIOR-001",
    rating: 4.9,
    reviewCount: 450,
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ["مكياج", "ملمع شفاه"],
    specifications: [],
    createdAt: "2024-12-01",
  },
  {
    _id: "2",
    name: "Dior Sauvage Eau de Parfum",
    slug: "dior-sauvage-edp",
    brand: { _id: "b7", name: "DIOR", slug: "dior", logo: "", categories: [], isActive: true, order: 7 },
    category: { _id: "c3", name: "العطور", slug: "perfumes", isActive: true, order: 3 },
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80"],
    description: "عطر سوفاج من ديور",
    price: 1950,
    discountPrice: 1560,
    discountPercentage: 20,
    stock: 15,
    sku: "DIOR-002",
    rating: 4.8,
    reviewCount: 890,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["عطور", "عطر رجالي"],
    specifications: [],
    createdAt: "2024-01-01",
  },
  {
    _id: "3",
    name: "Dior Capture Totale Serum",
    slug: "dior-capture-totale",
    brand: { _id: "b7", name: "DIOR", slug: "dior", logo: "", categories: [], isActive: true, order: 7 },
    category: { _id: "c2", name: "العناية بالبشرة", slug: "skincare", isActive: true, order: 2 },
    images: ["https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80"],
    description: "سيروم كابتشر توتال من ديور",
    price: 2200,
    stock: 20,
    sku: "DIOR-003",
    rating: 4.7,
    reviewCount: 320,
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    tags: ["عناية بالبشرة", "سيروم"],
    specifications: [],
    createdAt: "2024-01-01",
  },
];

export default function BrandDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const brand = brandData[slug] || brandData.dior;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = activeCategory
    ? demoProducts.filter((p) =>
        typeof p.category === "string"
          ? p.category === activeCategory
          : p.category.name === activeCategory
      )
    : demoProducts;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gold-muted mb-8">
          <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
          <ChevronLeft size={14} />
          <Link href="/brands" className="hover:text-gold transition-colors">البراندات</Link>
          <ChevronLeft size={14} />
          <span className="text-cream">{brand.name}</span>
        </nav>

        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold/30 to-gold-dark/30 flex items-center justify-center shrink-0">
              <span className="text-gold font-bold text-3xl">{brand.name[0]}</span>
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-3xl md:text-4xl font-bold gold-text mb-3">{brand.name}</h1>
              <p className="text-gold-muted max-w-2xl">{brand.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === null
                ? "bg-gold text-black"
                : "bg-black-light border border-gold/20 text-gold-muted hover:text-gold"
            }`}
          >
            كل المنتجات
          </button>
          {brand.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-gold text-black"
                  : "bg-black-light border border-gold/20 text-gold-muted hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gold-muted text-lg">لا توجد منتجات في هذه الفئة</p>
          </div>
        )}
      </div>
    </div>
  );
}

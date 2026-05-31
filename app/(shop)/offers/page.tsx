"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Percent, Clock, ArrowRight, Gift, Flame } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";

const featuredOffers = [
  {
    id: 1,
    title: "عروض نهاية الأسبوع",
    subtitle: "خصومات تصل إلى 50%",
    description: "اكتشفي أفضل العروض على منتجات المكياج والعناية بالبشرة",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    endDate: "2024-12-31",
    badge: "محدودة",
  },
  {
    id: 2,
    title: "اشترِ 1 واحصلي على 1 مجاناً",
    subtitle: "على منتجات مختارة",
    description: "اختيارك المثالي للهدايا أو لتجديد مخزونك الشخصي",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    endDate: "2024-12-25",
    badge: "BOGO",
  },
  {
    id: 3,
    title: "تخفيضات العطور",
    subtitle: "خصم 30% على كل العطور",
    description: "فرصة ذهبية لامتلاك أرقى العطور العالمية بأسعار مميزة",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    endDate: "2024-12-20",
    badge: "عطور",
  },
];

const offerProducts: Product[] = [
  {
    _id: "7",
    name: "Dior Addict Lip Glow",
    slug: "dior-addict-lip-glow",
    brand: { _id: "b7", name: "DIOR", slug: "dior", logo: "", categories: [], isActive: true, order: 7 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: ["https://images.unsplash.com/photo-1741992557222-10a2bfb7f5ea?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    _id: "8",
    name: "CeraVe Hydrating Cleanser",
    slug: "cerave-hydrating-cleanser",
    brand: { _id: "b8", name: "CeraVe", slug: "cerave", logo: "", categories: [], isActive: true, order: 8 },
    category: { _id: "c2", name: "العناية بالبشرة", slug: "skincare", isActive: true, order: 2 },
    images: ["https://images.unsplash.com/photo-1570222094114-d054a817e56b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    description: "غسول مرطب سيرافي",
    price: 320,
    stock: 80,
    sku: "CV-001",
    rating: 4.7,
    reviewCount: 1800,
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ["عناية بالبشرة", "غسول"],
    specifications: [],
    createdAt: "2024-12-01",
  },
  {
    _id: "9",
    name: "Chanel Coco Mademoiselle EDP",
    slug: "chanel-coco-mademoiselle",
    brand: { _id: "b9", name: "CHANEL", slug: "chanel", logo: "", categories: [], isActive: true, order: 9 },
    category: { _id: "c3", name: "العطور", slug: "perfumes", isActive: true, order: 3 },
    images: ["https://images.unsplash.com/photo-1632923565835-6582b54f2105?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    description: "عطر كوكو مادموزيل من شانيل",
    price: 2495,
    stock: 20,
    sku: "CH-001",
    rating: 4.9,
    reviewCount: 920,
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ["عطور", "عطر نسائي"],
    specifications: [],
    createdAt: "2024-12-01",
  },
  {
    _id: "10",
    name: "Maybelline Lash Sensational Mascara",
    slug: "maybelline-lash-sensational",
    brand: { _id: "b10", name: "MAYBELLINE", slug: "maybelline", logo: "", categories: [], isActive: true, order: 10 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: ["https://images.unsplash.com/photo-1630565267420-34708e46a797?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    description: "ماسكارا لاش سينسيشنال من ميبيلين",
    price: 195,
    stock: 100,
    sku: "MB-001",
    rating: 4.6,
    reviewCount: 1500,
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ["مكياج", "ماسكارا"],
    specifications: [],
    createdAt: "2024-12-01",
  },
  {
    _id: "11",
    name: "Kérastase Elixir Ultime Hair Oil",
    slug: "kerastase-elixir-ultime",
    brand: { _id: "b11", name: "Kérastase", slug: "kerastase", logo: "", categories: [], isActive: true, order: 11 },
    category: { _id: "c4", name: "العناية بالشعر", slug: "haircare", isActive: true, order: 4 },
    images: ["https://images.unsplash.com/photo-1738520420636-a1591b84723e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    description: "زيت إليكسير ألتيم للشعر من كيراستاز",
    price: 750,
    stock: 35,
    sku: "KR-001",
    rating: 4.8,
    reviewCount: 600,
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ["عناية بالشعر", "زيت"],
    specifications: [],
    createdAt: "2024-12-01",
  },
  {
    _id: "12",
    name: "Nuxe Huile Prodigieuse Multi-Purpose Dry Oil",
    slug: "nuxe-huile-prodigieuse",
    brand: { _id: "b12", name: "Nuxe", slug: "nuxe", logo: "", categories: [], isActive: true, order: 12 },
    category: { _id: "c5", name: "العناية بالجسم", slug: "bodycare", isActive: true, order: 5 },
    images: ["https://images.unsplash.com/photo-1632923565835-6582b54f2105?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    description: "زيت نوكس الجاف متعدد الاستخدامات",
    price: 450,
    stock: 45,
    sku: "NX-001",
    rating: 4.7,
    reviewCount: 800,
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ["عناية بالجسم", "زيت"],
    specifications: [],
    createdAt: "2024-12-01",
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Percent className="text-red-400" size={32} />
          </div>
          <span className="text-gold text-sm font-medium tracking-wider mb-2 block">
            SPECIAL OFFERS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            عروض حصرية
          </h1>
          <p className="text-gold-muted max-w-lg mx-auto">
            لا تفوتي فرصة الحصول على أفضل المنتجات بأسعار مميزة
          </p>
        </motion.div>

        {/* Featured Offers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {featuredOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative overflow-hidden rounded-2xl h-[350px] group"
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute top-4 right-4">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Flame size={12} />
                  {offer.badge}
                </span>
              </div>

              <div className="absolute bottom-0 right-0 p-6">
                <p className="text-gold-light text-sm mb-1">{offer.subtitle}</p>
                <h3 className="text-xl font-bold text-cream mb-2">{offer.title}</h3>
                <p className="text-sm text-gold-muted mb-4">{offer.description}</p>
                <div className="flex items-center gap-2 text-gold text-sm">
                  <Clock size={14} />
                  <span>تنتهي: {offer.endDate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Offer Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-cream flex items-center gap-3">
              <Gift className="text-gold" size={24} />
              منتجات على العرض
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {offerProducts.map((product, index) => (
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
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="luxury-card p-8 text-center mt-12"
        >
          <h2 className="text-2xl font-bold text-cream mb-3">
            لا تفوتي أي عرض!
          </h2>
          <p className="text-gold-muted mb-6 max-w-md mx-auto">
            اشتركي في نشرتنا البريدية ليصلك كل جديد من العروض والتخفيضات
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream placeholder:text-gold-muted/50 focus:outline-none focus:border-gold/50"
            />
            <button className="btn-gold px-6">اشتركي</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

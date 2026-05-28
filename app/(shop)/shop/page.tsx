"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product, FilterOptions } from "@/types";

// Demo products
const allProducts: Product[] = [
  {
    _id: "1",
    name: "HUDA BEAUTY The New Nude Eyeshadow Palette",
    slug: "huda-beauty-new-nude-eyeshadow",
    brand: { _id: "b1", name: "HUDA BEAUTY", slug: "huda-beauty", logo: "", categories: [], isActive: true, order: 1 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80"],
    description: "باليت ظلال عيون نيود",
    price: 1850,
    discountPrice: 1480,
    discountPercentage: 20,
    stock: 50,
    sku: "HB-001",
    rating: 4.8,
    reviewCount: 1250,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["مكياج", "ظلال عيون"],
    specifications: [],
    createdAt: "2024-01-01",
  },
  {
    _id: "2",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    slug: "the-ordinary-niacinamide",
    brand: { _id: "b2", name: "The Ordinary", slug: "the-ordinary", logo: "", categories: [], isActive: true, order: 2 },
    category: { _id: "c2", name: "العناية بالبشرة", slug: "skincare", isActive: true, order: 2 },
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80"],
    description: "سيروم نياسيناميد",
    price: 275,
    discountPrice: 220,
    discountPercentage: 20,
    stock: 100,
    sku: "TO-001",
    rating: 4.9,
    reviewCount: 3200,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["عناية بالبشرة", "سيروم"],
    specifications: [],
    createdAt: "2024-01-01",
  },
  {
    _id: "3",
    name: "L'Oréal Paris Infallible 24H Fresh Wear Foundation",
    slug: "loreal-infallible-foundation",
    brand: { _id: "b3", name: "L'Oréal", slug: "loreal", logo: "", categories: [], isActive: true, order: 3 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: ["https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80"],
    description: "كريم أساس إنفاليبل",
    price: 350,
    discountPrice: 280,
    discountPercentage: 20,
    stock: 75,
    sku: "LO-001",
    rating: 4.7,
    reviewCount: 850,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["مكياج", "كريم أساس"],
    specifications: [],
    createdAt: "2024-01-01",
  },
  {
    _id: "4",
    name: "MAC Cosmetics Matte Lipstick - Ruby Woo",
    slug: "mac-matte-lipstick-ruby-woo",
    brand: { _id: "b4", name: "MAC", slug: "mac", logo: "", categories: [], isActive: true, order: 4 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80"],
    description: "أحمر شفاه ماتي",
    price: 495,
    discountPrice: 396,
    discountPercentage: 20,
    stock: 60,
    sku: "MAC-001",
    rating: 4.9,
    reviewCount: 2100,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["مكياج", "أحمر شفاه"],
    specifications: [],
    createdAt: "2024-01-01",
  },
  {
    _id: "5",
    name: "Estée Lauder Advanced Night Repair Serum",
    slug: "estee-lauder-night-repair",
    brand: { _id: "b5", name: "Estée Lauder", slug: "estee-lauder", logo: "", categories: [], isActive: true, order: 5 },
    category: { _id: "c2", name: "العناية بالبشرة", slug: "skincare", isActive: true, order: 2 },
    images: ["https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80"],
    description: "سيروم الليل",
    price: 1395,
    discountPrice: 1116,
    discountPercentage: 20,
    stock: 40,
    sku: "EL-001",
    rating: 4.8,
    reviewCount: 1100,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["عناية بالبشرة", "سيروم"],
    specifications: [],
    createdAt: "2024-01-01",
  },
  {
    _id: "6",
    name: "YSL Libre Eau de Parfum",
    slug: "ysl-libre-edp",
    brand: { _id: "b6", name: "YSL", slug: "ysl", logo: "", categories: [], isActive: true, order: 6 },
    category: { _id: "c3", name: "العطور", slug: "perfumes", isActive: true, order: 3 },
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80"],
    description: "عطر ليبري",
    price: 1795,
    discountPrice: 1436,
    discountPercentage: 20,
    stock: 30,
    sku: "YSL-001",
    rating: 4.8,
    reviewCount: 670,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["عطور", "عطر نسائي"],
    specifications: [],
    createdAt: "2024-01-01",
  },
  {
    _id: "7",
    name: "Dior Addict Lip Glow",
    slug: "dior-addict-lip-glow",
    brand: { _id: "b7", name: "DIOR", slug: "dior", logo: "", categories: [], isActive: true, order: 7 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: ["https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&q=80"],
    description: "ملمع شفاه ديور",
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
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80"],
    description: "غسول مرطب",
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
];

const brands = ["HUDA BEAUTY", "The Ordinary", "L'Oréal", "MAC", "Estée Lauder", "YSL", "DIOR", "CeraVe"];
const categories = ["المكياج", "العناية بالبشرة", "العطور", "العناية بالشعر", "العناية بالجسم"];

function ShopContent() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    categories: [],
    minPrice: 0,
    maxPrice: 5000,
    sortBy: "newest",
  });

  // Apply URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const bestSellers = searchParams.get("best-sellers");
    const newArrivals = searchParams.get("new");

    const newFilters = { ...filters };
    if (category) {
      const catMap: Record<string, string> = {
        makeup: "المكياج",
        skincare: "العناية بالبشرة",
        perfumes: "العطور",
        haircare: "العناية بالشعر",
        bodycare: "العناية بالجسم",
        tools: "الأدوات والإكسسوارات",
      };
      if (catMap[category]) {
        newFilters.categories = [catMap[category]];
      }
    }
    if (bestSellers) newFilters.isBestSeller = true;
    if (newArrivals) newFilters.isNew = true;
    setFilters(newFilters);
  }, [searchParams]);

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const brandName = typeof product.brand === "string" ? product.brand : product.brand.name;
    const catName = typeof product.category === "string" ? product.category : product.category.name;

    if (filters.brands?.length && !filters.brands.includes(brandName)) return false;
    if (filters.categories?.length && !filters.categories.includes(catName)) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.isOnSale && !product.discountPrice) return false;
    if (filters.isNew && !product.isNewArrival) return false;
    if (filters.isBestSeller && !product.isBestSeller) return false;
    if (filters.rating && product.rating < filters.rating) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price-desc":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "rating":
        return b.rating - a.rating;
      case "best-seller":
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const toggleFilter = (type: "brands" | "categories", value: string) => {
    setFilters((prev) => {
      const current = prev[type] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-cream mb-2">
            تسوقي الآن
          </h1>
          <p className="text-gold-muted">
            {sortedProducts.length} منتج متاح
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black-light border border-gold/20 text-gold hover:bg-gold/5 transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span className="text-sm">الفلاتر</span>
            {(filters.brands?.length || 0) + (filters.categories?.length || 0) > 0 && (
              <span className="w-5 h-5 rounded-full bg-gold text-black text-xs flex items-center justify-center font-bold">
                {(filters.brands?.length || 0) + (filters.categories?.length || 0)}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions["sortBy"] })}
              className="bg-black-light border border-gold/20 rounded-xl py-2.5 px-4 text-sm text-cream focus:outline-none focus:border-gold/50"
            >
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="best-seller">الأكثر مبيعاً</option>
            </select>

            <div className="hidden sm:flex items-center gap-1 bg-black-light border border-gold/20 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-gold/20 text-gold" : "text-gold-muted hover:text-gold"
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-gold/20 text-gold" : "text-gold-muted hover:text-gold"
                }`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 overflow-hidden"
              >
                <div className="w-[280px] space-y-6">
                  {/* Brands Filter */}
                  <div className="luxury-card p-5">
                    <h3 className="font-bold text-cream mb-4">البراندات</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.brands?.includes(brand)}
                            onChange={() => toggleFilter("brands", brand)}
                            className="rounded border-gold/20 bg-black text-gold focus:ring-gold"
                          />
                          <span className="text-sm text-gold-muted group-hover:text-gold transition-colors">
                            {brand}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Categories Filter */}
                  <div className="luxury-card p-5">
                    <h3 className="font-bold text-cream mb-4">الفئات</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.categories?.includes(category)}
                            onChange={() => toggleFilter("categories", category)}
                            className="rounded border-gold/20 bg-black text-gold focus:ring-gold"
                          />
                          <span className="text-sm text-gold-muted group-hover:text-gold transition-colors">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="luxury-card p-5">
                    <h3 className="font-bold text-cream mb-4">السعر</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                          placeholder="من"
                          className="w-full bg-black border border-gold/20 rounded-lg py-2 px-3 text-sm text-cream focus:outline-none focus:border-gold/50"
                        />
                        <span className="text-gold-muted">-</span>
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                          placeholder="إلى"
                          className="w-full bg-black border border-gold/20 rounded-lg py-2 px-3 text-sm text-cream focus:outline-none focus:border-gold/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Filters */}
                  <div className="luxury-card p-5">
                    <h3 className="font-bold text-cream mb-4">عروض خاصة</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.isOnSale}
                          onChange={(e) => setFilters({ ...filters, isOnSale: e.target.checked })}
                          className="rounded border-gold/20 bg-black text-gold focus:ring-gold"
                        />
                        <span className="text-sm text-gold-muted group-hover:text-gold transition-colors">
                          عروض وخصومات
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.isNew}
                          onChange={(e) => setFilters({ ...filters, isNew: e.target.checked })}
                          className="rounded border-gold/20 bg-black text-gold focus:ring-gold"
                        />
                        <span className="text-sm text-gold-muted group-hover:text-gold transition-colors">
                          وصل حديثاً
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.isBestSeller}
                          onChange={(e) => setFilters({ ...filters, isBestSeller: e.target.checked })}
                          className="rounded border-gold/20 bg-black text-gold focus:ring-gold"
                        />
                        <span className="text-sm text-gold-muted group-hover:text-gold transition-colors">
                          الأكثر مبيعاً
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="luxury-card p-5">
                    <h3 className="font-bold text-cream mb-4">التقييم</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() => setFilters({ ...filters, rating })}
                            className="border-gold/20 bg-black text-gold focus:ring-gold"
                          />
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < rating ? "text-gold fill-gold" : "text-gold-muted"}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-sm text-gold-muted mr-1">وأعلى</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => setFilters({
                      brands: [],
                      categories: [],
                      minPrice: 0,
                      maxPrice: 5000,
                      sortBy: "newest",
                    })}
                    className="w-full py-2.5 rounded-xl border border-gold/20 text-gold text-sm hover:bg-gold/5 transition-colors"
                  >
                    مسح الفلاتر
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gold-muted text-lg">لا توجد منتجات مطابقة للفلاتر المحددة</p>
              </div>
            ) : (
              <div className={`grid gap-5 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}>
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

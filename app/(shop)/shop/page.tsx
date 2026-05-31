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

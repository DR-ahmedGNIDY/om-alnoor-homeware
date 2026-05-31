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
    _id: "2",
                name: "خلاط كهربائي",
                slug: "khalat-kahrabaee-multi-function-blender",
                brand: { _id: "b2", name: "Philips", slug: "philips", logo: "", categories: [], isActive: true, order: 2 },
                category: { _id: "c1", name: "أدوات المطبخ", slug: "kitchen-tools", isActive: true, order: 1 },
                images: ["https://kimi-web-img.moonshot.cn/img/image.made-in-china.com/7411e597de1ee6b9f2595923667d63d71fd04c33.webp"],
                description: "خلاط قوي 1000 واط مع 5 سرعات ووعاء زجاجي سعة 1.5 لتر",
                price: 899,
                discountPrice: 699,
                discountPercentage: 22,
                stock: 35,
                sku: "KT-002",
                rating: 4.5,
                reviewCount: 650,
                isActive: true,
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: true,
                tags: ["مطبخ", "خلاط"],
                specifications: [],
                createdAt: "2024-01-15"
            },
            {
                _id: "3",
                name: "مقلاة هوائية",
                slug: "miqala-hawaeya-smart-air-fryer",
                brand: { _id: "b3", name: "Tefal", slug: "tefal", logo: "", categories: [], isActive: true, order: 1 },
                category: { _id: "c1", name: "أدوات المطبخ", slug: "kitchen-tools", isActive: true, order: 1 },
                images: ["https://kimi-web-img.moonshot.cn/img/erp.rbu.cn/f6b336b29068ecf3b8405a03e081c90085c16bbd.jpg"],
                description: "مقلاة هوائية رقمية 5.5 لتر مع 8 برامج طهي مسبقة",
                price: 2199,
                discountPrice: 1899,
                discountPercentage: 14,
                stock: 20,
                sku: "KT-003",
                rating: 4.8,
                reviewCount: 1200,
                isActive: true,
                isFeatured: true,
                isNewArrival: true,
                isBestSeller: false,
                tags: ["مطبخ", "مقلاة هوائية"],
                specifications: [],
                createdAt: "2024-02-01"
            },
            {
                _id: "4",
                name: "طقم سكاكين",
                slug: "takam-sakakeen-professional-knife-set",
                brand: { _id: "b4", name: "Bosch", slug: "bosch", logo: "", categories: [], isActive: true, order: 3 },
                category: { _id: "c1", name: "أدوات المطبخ", slug: "kitchen-tools", isActive: true, order: 1 },
                images: ["https://kimi-web-img.moonshot.cn/img/www.divertimenti.co.uk/846c63a4e16153b5ace21da18f2bb8235bfe82b2.jpg"],
                description: "طقم 6 سكاكين من الفولاذ المقاوم للصدأ مع مسند خشبي أنيق",
                price: 549,
                discountPrice: 449,
                discountPercentage: 18,
                stock: 45,
                sku: "KT-004",
                rating: 4.6,
                reviewCount: 420,
                isActive: true,
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: false,
                tags: ["مطبخ", "سكاكين"],
                specifications: [],
                createdAt: "2024-01-20"
            },
            {
                _id: "5",
                name: "غلاية مياه",
                slug: "ghalaat-maya-stainless-electric-kettle",
                brand: { _id: "b5", name: "Philips", slug: "philips", logo: "", categories: [], isActive: true, order: 2 },
                category: { _id: "c2", name: "أدوات المنزل", slug: "home-tools", isActive: true, order: 2 },
                images: ["https://kimi-web-img.moonshot.cn/img/web-res.midea.com/e82c5d2ab7a2e60d98e0a17a474751de6fd54447.png"],
                description: "غلاية 1.7 لتر من الستانلس ستيل مع حماية من الغليان الجاف",
                price: 349,
                discountPrice: 299,
                discountPercentage: 14,
                stock: 60,
                sku: "HT-001",
                rating: 4.4,
                reviewCount: 380,
                isActive: true,
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: false,
                tags: ["منزل", "غلاية"],
                specifications: [],
                createdAt: "2024-02-10"
            },
            {
                _id: "6",
                name: "طقم تخزين طعام",
                slug: "takam-takhzin-taam-food-storage-set",
                brand: { _id: "b6", name: "Tupperware", slug: "tupperware", logo: "", categories: [], isActive: true, order: 4 },
                category: { _id: "c1", name: "أدوات المطبخ", slug: "kitchen-tools", isActive: true, order: 1 },
                images: ["https://kimi-web-img.moonshot.cn/img/www.therange.co.uk/7afe5962b023c9b2cfdbdbc3eb0ae74ce67e2cc1.jpg"],
                description: "حاويات بلاستيكية محكمة الغلق آمنة للميكروويف والفريزر",
                price: 299,
                discountPrice: 249,
                discountPercentage: 17,
                stock: 80,
                sku: "KT-005",
                rating: 4.3,
                reviewCount: 290,
                isActive: true,
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: false,
                tags: ["مطبخ", "تخزين"],
                specifications: [],
                createdAt: "2024-03-01"
            },
            {
                _id: "7",
                name: "محضر طعام",
                slug: "muhadar-taam-12-function-food-processor",
                brand: { _id: "b2", name: "Philips", slug: "philips", logo: "", categories: [], isActive: true, order: 2 },
                category: { _id: "c1", name: "أدوات المطبخ", slug: "kitchen-tools", isActive: true, order: 1 },
                images: ["https://kimi-web-img.moonshot.cn/img/web.tradekorea.com/63b277a5d276b4fca592d225cfd357478ac58474.jpg"],
                description: "محضر طعام متكامل مع شفرة ستانلس ووعاء 3 لتر",
                price: 1599,
                discountPrice: 1299,
                discountPercentage: 19,
                stock: 25,
                sku: "KT-006",
                rating: 4.7,
                reviewCount: 750,
                isActive: true,
                isFeatured: true,
                isNewArrival: false,
                isBestSeller: true,
                tags: ["مطبخ", "محضر طعام"],
                specifications: [],
                createdAt: "2024-01-25"
            },
            {
                _id: "8",
                name: "طقم أطباق عشاء",
                slug: "takam-atbaq-asha-dinner-set",
                brand: { _id: "b7", name: "Luminarc", slug: "luminarc", logo: "", categories: [], isActive: true, order: 5 },
                category: { _id: "c2", name: "أدوات المنزل", slug: "home-tools", isActive: true, order: 2 },
                images: ["https://kimi-web-img.moonshot.cn/img/www.vipshopboutic.com/b7b213067ded97c6bcadc4bb2ccfeca53e369159.jpg"],
                description: "أطباق خزفية أنيقة مقاومة للخدش والكسر، مناسبة للاستخدام اليومي",
                price: 799,
                discountPrice: 649,
                discountPercentage: 19,
                stock: 40,
                sku: "HT-002",
                rating: 4.6,
                reviewCount: 520,
                isActive: true,
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: false,
                tags: ["منزل", "أطباق"],
                specifications: [],
                createdAt: "2024-02-15"
            },
            {
                _id: "9",
                name: "مكواة بخار",
                slug: "mikwaa-bukhar-steam-iron",
                brand: { _id: "b8", name: "Tefal", slug: "tefal", logo: "", categories: [], isActive: true, order: 1 },
                category: { _id: "c2", name: "أدوات المنزل", slug: "home-tools", isActive: true, order: 2 },
                images: ["https://kimi-web-img.moonshot.cn/img/mahajanelectronics.com/d73641cd18a8a76447d8fe655c859ac67a2240a9.jpg"],
                description: "مكواة بخار قوية مع لوحة سيراميك غير لاصقة وخزان 300 مل",
                price: 699,
                discountPrice: 549,
                discountPercentage: 21,
                stock: 30,
                sku: "HT-003",
                rating: 4.5,
                reviewCount: 480,
                isActive: true,
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: true,
                tags: ["منزل", "مكواة"],
                specifications: [],
                createdAt: "2024-03-05"
            },
            {
                _id: "10",
                name: "مكنسة كهربائية",
                slug: "miknasa-kahrabaeya-cordless-vacuum",
                brand: { _id: "b9", name: "Dyson", slug: "dyson", logo: "", categories: [], isActive: true, order: 6 },
                category: { _id: "c2", name: "أدوات المنزل", slug: "home-tools", isActive: true, order: 2 },
                images: ["https://kimi-web-img.moonshot.cn/img/store.tineco.com/1cd9e2ec4fe98d579c41ecb8427275c105893090.jpg"],
                description: "مكنسة لاسلكية قوية 21.6V مع فلتر HEPA وبطارية تدوم 40 دقيقة",
                price: 2499,
                discountPrice: 2199,
                discountPercentage: 12,
                stock: 15,
                sku: "HT-004",
                rating: 4.8,
                reviewCount: 980,
                isActive: true,
                isFeatured: true,
                isNewArrival: false,
                isBestSeller: true,
                tags: ["منزل", "مكنسة"],
                specifications: [],
                createdAt: "2024-01-10"
            },
            {
                _id: "11",
                name: "فرن كهربائي",
                slug: "forn-kahrabaee-electric-oven",
                brand: { _id: "b10", name: "Bosch", slug: "bosch", logo: "", categories: [], isActive: true, order: 3 },
                category: { _id: "c1", name: "أدوات المطبخ", slug: "kitchen-tools", isActive: true, order: 1 },
                images: ["https://kimi-web-img.moonshot.cn/img/media.zid.store/e7dda9aa775258a03da25b417f41079b8f37d378.jpg"],
                description: "فرن كهربائي متعدد الوظائف مع شواية وإضاءة داخلية ومؤقت رقمي",
                price: 1899,
                discountPrice: 1599,
                discountPercentage: 16,
                stock: 18,
                sku: "KT-007",
                rating: 4.6,
                reviewCount: 340,
                isActive: true,
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: false,
                tags: ["مطبخ", "فرن"],
                specifications: [],
                createdAt: "2024-02-20"
            },
            {
                _id: "12",
                name: "طقم أدوات مطبخ",
                slug: "takam-adwaa-matbakh-silicone-utensils",
                brand: { _id: "b6", name: "Tupperware", slug: "tupperware", logo: "", categories: [], isActive: true, order: 4 },
                category: { _id: "c1", name: "أدوات المطبخ", slug: "kitchen-tools", isActive: true, order: 1 },
                images: ["https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/88886c2198f2a4e66c665d17efd9f9322c8477d2.jpg"],
                description: "أدوات مطبخ من السيليكون الآمن مع مقبض خشبي مقاوم للحرارة",
                price: 399,
                discountPrice: 299,
                discountPercentage: 25,
                stock: 55,
                sku: "KT-008",
                rating: 4.4,
                reviewCount: 310,
                isActive: true,
                isFeatured: false,
                isNewArrival: true,
                isBestSeller: false,
                tags: ["مطبخ", "أدوات"],
                specifications: [],
                createdAt: "2024-03-10"
            }
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

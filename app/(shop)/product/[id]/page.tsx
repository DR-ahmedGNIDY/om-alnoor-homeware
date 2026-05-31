"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Phone,
  Check,
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";
import { formatPrice, createWhatsAppLink } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/hooks/useStore";
import toast from "react-hot-toast";

// Demo product data
const demoProducts: Record<string, Product> = {
  "huda-beauty-new-nude-eyeshadow": {
    _id: "1",
    name: "HUDA BEAUTY The New Nude Eyeshadow Palette",
    slug: "huda-beauty-new-nude-eyeshadow",
    brand: { _id: "b1", name: "HUDA BEAUTY", slug: "huda-beauty", logo: "", categories: [], isActive: true, order: 1 },
    category: { _id: "c1", name: "المكياج", slug: "makeup", isActive: true, order: 1 },
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&q=80",
    ],
    description: `باليت ظلال عيون نيود من هدى بيوتي - The New Nude Eyeshadow Palette

مميزات المنتج:
• 18 لون متنوع من الظلال العيون
• تركيبة فائقة النعومة والتصاق
• ألوان نيود متنوعة تناسب جميع المناسبات
• مزيج من الألوان المطفية واللامعة
• تركيبة طويلة الأمد تدوم طوال اليوم
• خالية من الكريولين والبارابين

طريقة الاستخدام:
استخدمي فرشاة ظلال العيون لوضع اللون الأساسي على الجفن المتحرك، ثم أضيفي لون أغمق في الطية لإضافة العمق. استخدمي الألوان اللامعة في وسط الجفن لإضافة لمسة لامعة.`,
    shortDescription: "باليت ظلال عيون نيود فاخر بـ 18 لون متنوع",
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
    tags: ["مكياج", "ظلال عيون", "نيود", "هدى بيوتي"],
    specifications: [
      { key: "النوع", value: "باليت ظلال عيون" },
      { key: "عدد الألوان", value: "18 لون" },
      { key: "التركيبة", value: "مطفية ولامعة" },
      { key: "الوزن", value: "19.7 جرام" },
      { key: "بلد الصنع", value: "إيطاليا" },
      { key: "مدة الصلاحية", value: "36 شهر" },
    ],
    createdAt: "2024-01-01",
  },
};

const similarProducts: Product[] = [
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

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const product = demoProducts[slug] || demoProducts["huda-beauty-new-nude-eyeshadow"];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [isZoomed, setIsZoomed] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist)(product._id);

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const brandName = typeof product.brand === "string" ? product.brand : product.brand.name;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`تمت إضافة ${quantity} قطعة إلى السلة!`);
  };

  const handleWhatsAppOrder = () => {
    const message = `مرحبًا، أريد طلب المنتج التالي:
${product.name}
الكمية: ${quantity}
السعر: ${formatPrice((product.discountPrice || product.price) * quantity)}`;
    window.open(createWhatsAppLink("+201022262971", message), "_blank");
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gold-muted mb-8">
          <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
          <ChevronLeft size={14} />
          <Link href="/shop" className="hover:text-gold transition-colors">المتجر</Link>
          <ChevronLeft size={14} />
          <span className="text-cream">{product.name}</span>
        </nav>

        {/* Product Main */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-black-light cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <motion.div
                animate={{ scale: isZoomed ? 1.5 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {hasDiscount && (
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                    خصم {product.discountPercentage}%
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                    جديد
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-gold text-black text-sm font-bold px-3 py-1.5 rounded-full">
                    الأكثر مبيعاً
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === index
                      ? "border-gold shadow-gold-sm"
                      : "border-transparent hover:border-gold/30"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <Link
              href={`/brand/${typeof product.brand === "string" ? "" : product.brand.slug}`}
              className="inline-block text-gold text-sm font-medium hover:text-gold-light transition-colors"
            >
              {brandName}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-cream leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-gold fill-gold"
                        : "text-gold-muted"
                    }
                  />
                ))}
              </div>
              <span className="text-gold font-medium">{product.rating}</span>
              <span className="text-gold-muted">
                ({product.reviewCount.toLocaleString("ar-EG")} تقييم)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-bold text-gold">
                    {formatPrice(product.discountPrice!)}
                  </span>
                  <span className="text-xl text-gold-muted line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="bg-red-500/20 text-red-400 text-sm font-bold px-3 py-1 rounded-full">
                    وفري {formatPrice(product.price - (product.discountPrice || 0))}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gold-muted leading-relaxed">
              {product.shortDescription || product.description.substring(0, 150)}
            </p>

            {/* SKU & Stock */}
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gold-muted">
                رقم المنتج: <span className="text-cream">{product.sku}</span>
              </span>
              <span className="flex items-center gap-1 text-green-400">
                <Check size={14} />
                متوفر في المخزن ({product.stock} قطعة)
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-gold-light font-medium">الكمية:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="text-xl font-bold text-cream w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-gold py-4 flex items-center justify-center gap-3 text-base"
              >
                <ShoppingCart size={20} />
                <span>أضف إلى السلة</span>
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 py-4 px-6 rounded-full bg-green-600 text-white font-bold flex items-center justify-center gap-3 hover:bg-green-500 transition-all"
              >
                <Phone size={20} />
                <span>اطلبي عبر واتساب</span>
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  toggleWishlist(product._id);
                  toast.success(isInWishlist ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة!");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                  isInWishlist
                    ? "border-red-500/30 bg-red-500/10 text-red-400"
                    : "border-gold/20 text-gold-muted hover:border-gold/40 hover:text-gold"
                }`}
              >
                <Heart size={18} className={isInWishlist ? "fill-red-400" : ""} />
                <span className="text-sm">
                  {isInWishlist ? "في المفضلة" : "أضف إلى المفضلة"}
                </span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gold/20 text-gold-muted hover:border-gold/40 hover:text-gold transition-all">
                <Share2 size={18} />
                <span className="text-sm">مشاركة</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold/10">
              <div className="text-center">
                <Truck className="mx-auto text-gold mb-2" size={24} />
                <p className="text-xs text-gold-muted">توصيل سريع</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto text-gold mb-2" size={24} />
                <p className="text-xs text-gold-muted">منتج أصلي 100%</p>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto text-gold mb-2" size={24} />
                <p className="text-xs text-gold-muted">استرجاع خلال 14 يوم</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-1 bg-black-light rounded-xl p-1 mb-8 w-fit">
            {[
              { id: "description", label: "الوصف" },
              { id: "specs", label: "المواصفات" },
              { id: "reviews", label: "التقييمات" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gold text-black"
                    : "text-gold-muted hover:text-gold"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="luxury-card p-8"
            >
              {activeTab === "description" && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-cream/90 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black rounded-xl"
                    >
                      <span className="text-gold-muted">{spec.key}</span>
                      <span className="text-cream font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="text-center py-12">
                  <p className="text-gold-muted mb-4">التقييمات قريباً</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Similar Products */}
        <div>
          <h2 className="text-2xl font-bold text-cream mb-8">منتجات مشابهة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

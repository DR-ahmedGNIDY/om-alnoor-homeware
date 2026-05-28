"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/hooks/useStore";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

export function ProductCard({ product, showQuickView = true }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist)(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success("تمت الإضافة إلى السلة");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
    toast.success(isInWishlist ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة");
  };

  const discountPercentage = product.discountPercentage || 0;
  const hasDiscount = discountPercentage > 0;
  const brandName = typeof product.brand === "string" ? product.brand : product.brand.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${product.slug}`}>
        <div
          className="luxury-card relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-[#0e0e0e]">
            <Image
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-2 right-2 flex flex-col gap-1.5">
              {hasDiscount && (
                <span className="bg-[#c41e3a] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  -{discountPercentage}%
                </span>
              )}
              {product.isNewArrival && (
                <span className="bg-[#1a5276] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  جديد
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-gold/20"
            >
              <Heart
                size={13}
                className={isInWishlist ? "text-red-400 fill-red-400" : "text-cream/70"}
              />
            </button>

            {/* Quick Add Button - appears on hover */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-2"
            >
              <button
                onClick={handleAddToCart}
                className="w-full py-2 rounded-lg bg-gold text-black text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gold-light transition-colors"
              >
                <ShoppingCart size={13} />
                <span>أضف للسلة</span>
              </button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-3">
            {/* Brand */}
            <p className="text-[10px] text-gold-muted uppercase tracking-wider mb-0.5">
              {brandName}
            </p>

            {/* Name */}
            <h3 className="text-xs font-medium text-cream mb-1.5 line-clamp-2 leading-relaxed group-hover:text-gold-light transition-colors min-h-[2.5em]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-gold fill-gold"
                        : "text-gold/20"
                    }
                  />
                ))}
              </div>
              <span className="text-[9px] text-gold-muted">
                ({product.reviewCount.toLocaleString("ar-EG")})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-sm font-bold text-gold">
                    {formatPrice(product.discountPrice!)}
                  </span>
                  <span className="text-[10px] text-gold-muted line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-gold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

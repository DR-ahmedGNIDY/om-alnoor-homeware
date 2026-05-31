"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative mt-[170px] h-[70vh] md:h-[85vh] min-h-[550px] md:min-h-[650px] overflow-hidden">
      {/* Background */}
      <Image
        src="/images/banners/panar2.webp"
        alt="أم النور للأدوات المنزلية"
        fill
        priority
        className="object-cover"
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-12">
          <div className="h-full flex items-center justify-end">
            <div className="w-full max-w-[650px] text-right pr-4 md:pr-10 lg:pr-16">
              
              {/* Subtitle */}
              <p className="text-gold text-lg md:text-xl mb-4 font-semibold">
                كل احتياجات منزلك في مكان واحد
              </p>

              {/* Title */}
              <h1 className="text-[#0F2D52] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-5">
                أم النور للأدوات المنزلية
              </h1>

              {/* Description */}
              <p className="text-gray-700 text-lg md:text-2xl leading-relaxed mb-8">
                أطقم حلل - أدوات مطبخ - أطقم سفرة - أجهزة منزلية - تجهيز العرائس
                بأفضل الأسعار
              </p>

              {/* Buttons */}
              <div className="flex flex-row justify-end gap-4">
                <Link
                  href="/shop"
                  className="bg-primary text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  تصفح المنتجات
                </Link>

                <Link
                  href="/offers"
                  className="border-2 border-gold text-[#0F2D52] font-bold px-8 py-4 rounded-full hover:bg-gold/10 transition-all duration-300"
                >
                  العروض
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
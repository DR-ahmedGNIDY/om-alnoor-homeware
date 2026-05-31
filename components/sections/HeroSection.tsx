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
        <div className="container mx-auto px-4 sm:px-6 md:px-16 h-full flex items-center justify-end text-right">
          <div className="w-full max-w-2xl">
            <p className="text-gold text-base md:text-lg mb-5 font-semibold">
              كل احتياجات منزلك في مكان واحد
            </p>

            <h1 className="text-[42px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-[#0F2D52] mb-4 md:mb-6">
              أم النور للأدوات المنزلية
            </h1>

            <p className="text-base md:text-xl text-gray-700 leading-relaxed md:leading-loose mb-6 md:mb-10 max-w-xl">
              أطقم حلل - أدوات مطبخ - أطقم سفرة - أجهزة منزلية - تجهيز العرائس
              بأفضل الأسعار
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 md:gap-5">
              <Link
                href="/shop"
                className="bg-primary text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full hover:scale-105 transition-all duration-300"
              >
                تصفح المنتجات
              </Link>

              <Link
                href="/offers"
                className="border border-gold text-primary px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-gold/10 transition-all duration-300"
              >
                العروض
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
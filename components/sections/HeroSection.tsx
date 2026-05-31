"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "أم النور للأدوات المنزلية",
    subtitle: "كل احتياجات منزلك في مكان واحد",
    description:
      "أطقم حلل - أدوات مطبخ - أطقم سفرة - أجهزة منزلية - تجهيز العرائس بأفضل الأسعار",
    image: "/images/banners/panar2.webp",
    cta: {
      primary: "تصفح المنتجات",
      secondary: "العروض",
    },
    link: {
      primary: "/shop",
      secondary: "/offers",
    },
  },

  {
    id: 2,
    title: "تجهيز العرائس",
    subtitle: "أفضل الخامات وأفضل الأسعار",
    description:
      "كل ما تحتاجه العروسة من أدوات منزلية وأدوات مطبخ وأطقم سفرة في مكان واحد",
    image: "/images/banners/panar1.webp",
    cta: {
      primary: "شاهد المنتجات",
      secondary: "تواصل معنا",
    },
    link: {
      primary: "/shop",
      secondary: "/contact",
    },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mt-[170px] h-[70vh] md:h-[85vh] min-h-[550px] md:min-h-[650px] overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 sm:px-6 md:px-16 h-full flex items-center justify-center md:justify-start text-center md:text-right">
          <div className="w-full max-w-md md:max-w-2xl px-2 md:px-0">
            <motion.div
              key={currentSlide}
              dir="rtl"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Subtitle */}
              <p className="text-gold text-base md:text-lg mb-5 font-semibold">
                {slides[currentSlide].subtitle}
              </p>

              {/* Title */}
              <h1 className="text-[42px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-primary mb-4 md:mb-6">
                {slides[currentSlide].title}
              </h1>

              {/* Description */}
              <p className="text-base md:text-xl text-white/90 leading-relaxed md:leading-loose mb-6 md:mb-10 max-w-full md:max-w-xl">
                {slides[currentSlide].description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 md:gap-5 w-full sm:w-auto">
                <Link
                  href={slides[currentSlide].link.primary}
                  className="bg-primary text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full hover:scale-105 transition-all duration-300 text-center shadow-lg"
                >
                  {slides[currentSlide].cta.primary}
                </Link>

                <Link
                  href={slides[currentSlide].link.secondary}
                  className="border border-gold text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-gold/10 transition-all duration-300 text-center"
                >
                  {slides[currentSlide].cta.secondary}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Previous */}
      <button
        onClick={() =>
          setCurrentSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
          )
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary/80 border border-gold/40 flex items-center justify-center text-gold backdrop-blur-sm"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={() =>
          setCurrentSlide(
            (prev) => (prev + 1) % slides.length
          )
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary/80 border border-gold/40 flex items-center justify-center text-gold backdrop-blur-sm"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-10 h-3 bg-gold"
                : "w-3 h-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
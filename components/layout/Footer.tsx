"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  CreditCard,
  Shield,
  Truck,
  Headphones,
  Gift,
  ChevronUp,
} from "lucide-react";

const footerLinks = {
  "معلومات":
  [
    { name: "من نحن", href: "/about" },
    { name: "سياسة الخصوصية", href: "/privacy" },
    { name: "الشروط والأحكام", href: "/terms" },
    { name: "الأسئلة الشائعة", href: "/faq" },
  ],

  "الأقسام":
  [
    { name: "أطقم الحلل", href: "/shop?category=cookware" },
    { name: "أدوات المطبخ", href: "/shop?category=kitchen" },
    { name: "الأجهزة المنزلية", href: "/shop?category=appliances" },
    { name: "أطقم السفرة", href: "/shop?category=dining" },
  ],

  "تواصل معنا":
  [
    {
      name: "+20 101 250 6517",
      href: "tel:+201012506517",
      icon: Phone,
    },
    {
      name: "info@omalnoor.com",
      href: "mailto:info@omalnoor.com",
      icon: Mail,
    },
    {
      name: "أسيوط - منفلوط",
      href: "#",
      icon: MapPin,
    },
  ],
};

const features = [
  {
    icon: Gift,
    title: "منتجات عالية الجودة",
    desc: "أفضل الخامات",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    desc: "داخل المحافظات",
  },
  {
    icon: Shield,
    title: "ضمان على المنتجات",
    desc: "جودة مضمونة",
  },
  {
    icon: Headphones,
    title: "خدمة عملاء مميزة",
    desc: "دعم ومتابعة",
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-primary text-white">
      {/* Features */}
      <div className="border-b border-white/10">
        <div className="container-luxury py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <feature.icon
                    className="text-gold"
                    size={22}
                  />
                </div>

                <div>
                  <h4 className="font-bold text-sm">
                    {feature.title}
                  </h4>

                  <p className="text-xs text-white/70">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-luxury py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-4 mb-6"
            >
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo.png"
                  alt="أم النور للأدوات المنزلية"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gold">
                  أم النور
                </h2>

                <p className="text-sm text-white/70">
                  للأدوات المنزلية
                </p>
              </div>
            </Link>

            <p className="text-white/80 leading-8 max-w-md mb-6">
              أم النور للأدوات المنزلية وجهتك الأولى
              لتجهيز العرائس وأدوات المطبخ والأجهزة
              المنزلية وأطقم السفرة بأفضل الأسعار
              وأعلى جودة.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(
            ([title, links]) => (
              <div key={title}>
                <h4 className="text-gold font-bold mb-5">
                  {title}
                </h4>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 hover:text-gold transition-colors flex items-center gap-2"
                      >
                        {"icon" in link &&
                          link.icon && (
                            <link.icon size={15} />
                          )}

                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="flex items-center gap-3">
              <CreditCard
                size={18}
                className="text-gold"
              />

              <span className="text-sm text-white/70">
                الدفع نقداً عند الاستلام
              </span>
            </div>

            <p className="text-sm text-white/60">
              جميع الحقوق محفوظة © 2026 أم النور
              للأدوات المنزلية
            </p>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-primary transition-all"
            >
              <ChevronUp size={20} />
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
}
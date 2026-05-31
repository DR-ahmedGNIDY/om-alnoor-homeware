"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Percent, Gift, Truck } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "عروض تجهيز العرائس",
    subtitle: "خصومات تصل حتى",
    discount: "40%",
    description: "خصومات خاصة على أطقم الحلل وأطقم السفرة وتجهيزات العرائس",
    image: "/images/offers/bride-offer.webp",
    cta: "شاهدي العروض",
    link: "/offers",
    icon: Gift,
  },

  {
    id: 2,
    title: "عروض الأجهزة المنزلية",
    subtitle: "تخفيضات خاصة",
    discount: "30%",
    description: "أفضل الأسعار على الخلاطات والكاتيل والأجهزة المنزلية الصغيرة",
    image: "/images/offers/appliances-offer.webp",
    cta: "تصفح المنتجات",
    link: "/shop?category=appliances",
    icon: Percent,
  },

  {
    id: 3,
    title: "شحن وتوصيل سريع",
    subtitle: "لفترة محدودة",
    discount: "مجاناً",
    description: "توصيل مجاني على الطلبات الكبيرة داخل المحافظة",
    image: "/images/offers/shipping-offer.webp",
    cta: "اطلب الآن",
    link: "/contact",
    icon: Truck,
  },
];

export function OffersSection() {
  return (
    <section className="py-14 bg-white">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            عروض خاصة
          </h2>

          <p className="text-gray-600">
            استفد من أفضل العروض والخصومات المتاحة الآن
          </p>
        </motion.div>

        {/* Offers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={offer.link}
                className="group relative block overflow-hidden rounded-2xl h-[320px] shadow-lg"
              >
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="mb-auto pt-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <offer.icon className="text-gold" size={24} />
                    </div>
                  </div>

                  <p className="text-white/80 text-sm mb-1">
                    {offer.subtitle}
                  </p>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {offer.title}
                  </h3>

                  <p className="text-gold text-4xl font-bold mb-3">
                    {offer.discount}
                  </p>

                  <p className="text-white/80 text-sm mb-4">
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all">
                    <span>{offer.cta}</span>
                    <ArrowLeft
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 border border-transparent group-hover:border-gold rounded-2xl transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
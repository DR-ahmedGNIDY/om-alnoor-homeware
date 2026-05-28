"use client";

import { motion } from "framer-motion";
import { Shield, RefreshCw, Check, X, Clock, Truck, Phone } from "lucide-react";
import Link from "next/link";

const conditions = [
  {
    icon: Check,
    title: "شروط القبول",
    items: [
      "المنتج في حالته الأصلية وغير مستخدم",
      "المنتج في العبوة الأصلية",
      "مرور أقل من 14 يوم على الاستلام",
      "وجود الفاتورة الأصلية",
    ],
  },
  {
    icon: X,
    title: "منتجات لا تقبل الإرجاع",
    items: [
      "المنتجات المستخدمة أو المفتوحة",
      "المنتجات التالفة بسبب سوء الاستخدام",
      "العطور بعد فتح العبوة",
      "المنتجات المخصصة أو المطلوبة خصيصاً",
    ],
  },
];

const steps = [
  { icon: Phone, title: "تواصلي معنا", desc: "اتصلي بنا على +20 102 226 2971 أو عبر واتساب" },
  { icon: Truck, title: "إرجاع المنتج", desc: "أرسلي المنتج مع الفاتورة إلى عنواننا" },
  { icon: Clock, title: "مراجعة الطلب", desc: "نراجع المنتج خلال 2-3 أيام عمل" },
  { icon: RefreshCw, title: "استرداد المبلغ", desc: "يتم استرداد المبلغ خلال 5-7 أيام عمل" },
];

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="text-gold" size={32} />
          </div>
          <span className="text-gold text-sm font-medium tracking-wider mb-2 block">
            RETURN POLICY
          </span>
          <h1 className="text-4xl font-bold text-cream mb-4">
            سياسة الاسترجاع والاستبدال
          </h1>
          <p className="text-gold-muted max-w-lg mx-auto">
            نحن نضمن رضاكم التام. إليك تفاصيل سياسة الاسترجاع والاستبدال
          </p>
        </motion.div>

        {/* Main Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="luxury-card p-8 mb-10"
        >
          <h2 className="text-2xl font-bold text-cream mb-4">سياسة الاسترجاع</h2>
          <p className="text-gold-muted leading-relaxed mb-6">
            في Pharma One Cosmetics، نؤمن بأن رضا العميل هو الأولوية القصوى. لذلك نقدم سياسة استرجاع مرنة تمنحك راحة البال عند التسوق. يمكنك إرجاع أي منتج خلال 14 يوم من تاريخ الاستلام.
          </p>
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
            <p className="text-gold font-medium">
              ⚡ ملاحظة هامة: المنتجات التالفة أو الخاطئة يتم استبدالها أو استرداد قيمتها بالكامل بدون أي رسوم إضافية.
            </p>
          </div>
        </motion.div>

        {/* Conditions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {conditions.map((condition, index) => (
            <motion.div
              key={condition.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="luxury-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  condition.icon === Check ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  <condition.icon className={condition.icon === Check ? "text-green-400" : "text-red-400"} size={20} />
                </div>
                <h3 className="font-bold text-cream">{condition.title}</h3>
              </div>
              <ul className="space-y-3">
                {condition.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gold-muted text-sm">
                    <span className={condition.icon === Check ? "text-green-400" : "text-red-400"}>
                      {condition.icon === Check ? "✓" : "✕"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="luxury-card p-8 mb-10"
        >
          <h2 className="text-2xl font-bold text-cream mb-8">خطوات الاسترجاع</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="text-gold" size={24} />
                </div>
                <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center mx-auto mb-3 font-bold text-sm">
                  {index + 1}
                </div>
                <h4 className="font-bold text-cream mb-1">{step.title}</h4>
                <p className="text-sm text-gold-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="luxury-card p-8 text-center"
        >
          <h2 className="text-xl font-bold text-cream mb-4">هل تحتاجين مساعدة؟</h2>
          <p className="text-gold-muted mb-6">
            فريق خدمة العملاء جاهز لمساعدتك في أي استفسار
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="tel:+201022262971"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Phone size={18} />
              <span>اتصلي بنا</span>
            </a>
            <Link
              href="/contact"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              <span>تواصلي معنا</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

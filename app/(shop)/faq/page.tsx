"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "ما هي سياسة الإرجاع والاستبدال؟",
    answer: "يمكنك إرجاع أو استبدال أي منتج خلال 14 يوم من تاريخ الاستلام، شريطة أن يكون المنتج في حالته الأصلية وغير مستخدم. للمنتجات التالفة أو الخاطئة، نتحمل تكاليف الشحن. للإرجاع الشخصي، يتحمل العميل تكاليف الشحن.",
  },
  {
    question: "كم تستغرق عملية التوصيل؟",
    answer: "التوصيل داخل القاهرة والجيزة يستغرق 1-2 يوم عمل. للمحافظات الأخرى يستغرق 2-5 أيام عمل. التوصيل داخل سوهاج يتم في نفس اليوم إذا تم الطلب قبل الساعة 2 ظهراً.",
  },
  {
    question: "هل المنتجات أصلية 100%؟",
    answer: "نعم، جميع منتجاتنا أصلية 100% ونحصل عليها مباشرة من البراندات أو موزعين معتمدين. نضمن لك جودة كل منتج ونقدم ضمان استرجاع إذا ثبت خلاف ذلك.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل الدفع عند الاستلام (COD)، البطاقات الائتمانية (Visa, Mastercard, Mada)، والمحافظ الإلكترونية (Apple Pay, STC Pay). جميع عمليات الدفع آمنة ومشفرة.",
  },
  {
    question: "كيف يمكنني تتبع طلبي؟",
    answer: "بعد شحن طلبك، ستستلمي رسالة نصية وإيميل يحتوي على رقم التتبع. يمكنك أيضاً تتبع طلبك من خلال صفحة 'طلباتي' في حسابك.",
  },
  {
    question: "هل يوجد خصومات للطلبات الكبيرة؟",
    answer: "نعم! نقدم خصومات خاصة للطلبات الجملة. تواصلي معنا عبر واتساب على +20 102 226 2971 للحصول على عرض سعر خاص.",
  },
  {
    question: "هل يمكنني تغيير عنوان الشحن بعد تأكيد الطلب؟",
    answer: "يمكنك تغيير عنوان الشحن خلال 2 ساعة من تأكيد الطلب فقط. بعد ذلك، لا يمكن تعديل العنوان. تواصلي مع خدمة العملاء للمساعدة.",
  },
  {
    question: "ما هي سياسة الخصوصية؟",
    answer: "نحن نحترم خصوصيتك تماماً. لا نشارك بياناتك مع أي طرف ثالث. يتم استخدام بياناتك فقط لمعالجة طلباتك وتحسين تجربة التسوق. يمكنك مراجعة سياسة الخصوصية الكاملة من الرابط في أسفل الصفحة.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-gold" size={32} />
          </div>
          <span className="text-gold text-sm font-medium tracking-wider mb-2 block">
            FAQ
          </span>
          <h1 className="text-4xl font-bold text-cream mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-gold-muted max-w-lg mx-auto">
            إليك إجابات على الأسئلة الأكثر شيوعاً. إذا لم تجدي إجابتك، تواصلي معنا
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="luxury-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-right"
              >
                <span className="font-bold text-cream text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-gold" size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gold/10 pt-4">
                        <p className="text-gold-muted leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

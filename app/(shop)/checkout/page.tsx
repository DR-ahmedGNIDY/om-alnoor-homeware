"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  MapPin,
  Check,
  ArrowRight,
  Lock,
  Phone,
  Wallet,
  Banknote,
} from "lucide-react";
import { useCartStore } from "@/hooks/useStore";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const paymentMethods = [
  { id: "cod", name: "الدفع عند الاستلام", icon: Banknote, description: "ادفعي نقداً عند استلام الطلب" },
  { id: "card", name: "بطاقة ائتمانية", icon: CreditCard, description: "Visa, Mastercard, Mada" },
  { id: "wallet", name: "محفظة إلكترونية", icon: Wallet, description: "Apple Pay, STC Pay" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice)();

  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const [shippingData, setShippingData] = useState({
    fullName: "",
    phone: "",
    governorate: "",
    city: "",
    street: "",
    building: "",
    floor: "",
    apartment: "",
    notes: "",
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setStep("confirmation");
    setIsLoading(false);
    toast.success("تم إتمام الطلب بنجاح!");
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20">
        <div className="container-luxury text-center">
          <h1 className="text-3xl font-bold text-cream mb-4">السلة فارغة</h1>
          <p className="text-gold-muted mb-8">أضفي منتجات إلى السلة أولاً</p>
          <Link href="/shop" className="btn-gold inline-flex items-center gap-2">
            <span>تسوقي الآن</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container-luxury">
        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {[
              { id: "shipping", label: "الشحن", icon: Truck },
              { id: "payment", label: "الدفع", icon: CreditCard },
              { id: "confirmation", label: "التأكيد", icon: Check },
            ].map((s, index) => (
              <div key={s.id} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  step === s.id
                    ? "bg-gold text-black"
                    : index < ["shipping", "payment", "confirmation"].indexOf(step)
                    ? "bg-gold/20 text-gold"
                    : "bg-black-light text-gold-muted"
                }`}>
                  <s.icon size={16} />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-12 h-0.5 ${
                    index < ["shipping", "payment", "confirmation"].indexOf(step)
                      ? "bg-gold"
                      : "bg-gold/20"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === "shipping" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="luxury-card p-8"
              >
                <h2 className="text-2xl font-bold text-cream mb-6 flex items-center gap-3">
                  <MapPin className="text-gold" />
                  عنوان الشحن
                </h2>

                <form onSubmit={handleShippingSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gold-light mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        required
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                        className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gold-light mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gold-light mb-2">المحافظة</label>
                      <select
                        required
                        value={shippingData.governorate}
                        onChange={(e) => setShippingData({ ...shippingData, governorate: e.target.value })}
                        className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                      >
                        <option value="">اختر المحافظة</option>
                        <option value="cairo">القاهرة</option>
                        <option value="alex">الإسكندرية</option>
                        <option value="giza">الجيزة</option>
                        <option value="sohag">سوهاج</option>
                        <option value="aswan">أسوان</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gold-light mb-2">المدينة</label>
                      <input
                        type="text"
                        required
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gold-light mb-2">الشارع</label>
                    <input
                      type="text"
                      required
                      value={shippingData.street}
                      onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                      className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm text-gold-light mb-2">المبنى</label>
                      <input
                        type="text"
                        value={shippingData.building}
                        onChange={(e) => setShippingData({ ...shippingData, building: e.target.value })}
                        className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gold-light mb-2">الدور</label>
                      <input
                        type="text"
                        value={shippingData.floor}
                        onChange={(e) => setShippingData({ ...shippingData, floor: e.target.value })}
                        className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gold-light mb-2">الشقة</label>
                      <input
                        type="text"
                        value={shippingData.apartment}
                        onChange={(e) => setShippingData({ ...shippingData, apartment: e.target.value })}
                        className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gold-light mb-2">ملاحظات (اختياري)</label>
                    <textarea
                      rows={3}
                      value={shippingData.notes}
                      onChange={(e) => setShippingData({ ...shippingData, notes: e.target.value })}
                      className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50 resize-none"
                    />
                  </div>

                  <button type="submit" className="w-full btn-gold py-4 flex items-center justify-center gap-2 text-base">
                    <span>متابعة للدفع</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="luxury-card p-6 sticky top-32">
                <h3 className="text-lg font-bold text-cream mb-4">ملخص الطلب</h3>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex justify-between text-sm">
                      <span className="text-gold-muted">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="text-cream">
                        {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gold/10 pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-cream">الإجمالي</span>
                    <span className="font-bold text-gold text-xl">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="luxury-card p-8"
              >
                <h2 className="text-2xl font-bold text-cream mb-6 flex items-center gap-3">
                  <Lock className="text-gold" />
                  طريقة الدفع
                </h2>

                <div className="space-y-4 mb-8">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                        selectedPayment === method.id
                          ? "border-gold bg-gold/5"
                          : "border-gold/10 hover:border-gold/30"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedPayment === method.id ? "bg-gold text-black" : "bg-gold/10 text-gold"
                      }`}>
                        <method.icon size={24} />
                      </div>
                      <div className="text-right flex-1">
                        <h3 className="font-bold text-cream">{method.name}</h3>
                        <p className="text-sm text-gold-muted">{method.description}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === method.id
                          ? "border-gold bg-gold"
                          : "border-gold/30"
                      }`}>
                        {selectedPayment === method.id && <Check size={14} className="text-black" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep("shipping")}
                    className="flex-1 py-4 rounded-xl border border-gold/20 text-gold hover:bg-gold/5 transition-colors"
                  >
                    رجوع
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isLoading}
                    className="flex-1 btn-gold py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>تأكيد الطلب</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="luxury-card p-6 sticky top-32">
                <h3 className="text-lg font-bold text-cream mb-4">ملخص الطلب</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gold-muted">المجموع الفرعي</span>
                    <span className="text-cream">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gold-muted">الشحن</span>
                    <span className="text-gold">مجاني</span>
                  </div>
                </div>
                <div className="border-t border-gold/10 pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-cream">الإجمالي</span>
                    <span className="font-bold text-gold text-xl">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gold/5 rounded-xl border border-gold/10">
                  <div className="flex items-center gap-2 text-gold text-sm">
                    <Phone size={16} />
                    <span>للاستفسار: +20 102 226 2971</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check size={48} className="text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-cream mb-4">تم تأكيد طلبك!</h1>
            <p className="text-gold-muted mb-2 max-w-md mx-auto">
              شكراً لتسوقك معنا. سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.
            </p>
            <p className="text-gold mb-8">
              رقم الطلب: <span className="font-bold">PO-123456</span>
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/account/orders" className="btn-gold inline-flex items-center gap-2">
                <span>متابعة الطلب</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/shop" className="btn-outline-gold inline-flex items-center gap-2">
                <span>تسوقي المزيد</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

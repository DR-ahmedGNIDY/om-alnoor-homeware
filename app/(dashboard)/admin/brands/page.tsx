"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, Check } from "lucide-react";
import toast from "react-hot-toast";

interface BrandForm {
  name: string;
  slug: string;
  description: string;
  categories: string[];
}

const availableCategories = [
  "المكياج",
  "العناية بالبشرة",
  "العطور",
  "العناية بالشعر",
  "العناية بالجسم",
  "الأدوات والإكسسوارات",
];

export default function AdminBrands() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<BrandForm>({
    name: "",
    slug: "",
    description: "",
    categories: [],
  });

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      toast.error("اختري فئة واحدة على الأقل");
      return;
    }

    toast.success(`تم إضافة براند ${formData.name} بنجاح!`);
    setIsModalOpen(false);
    setFormData({ name: "", slug: "", description: "", categories: [] });
  };

  const brands = [
    { name: "DIOR", categories: ["المكياج", "العطور", "العناية بالبشرة"], products: 450, isActive: true },
    { name: "MAC", categories: ["المكياج"], products: 320, isActive: true },
    { name: "HUDA BEAUTY", categories: ["المكياج"], products: 180, isActive: true },
    { name: "CeraVe", categories: ["العناية بالبشرة"], products: 95, isActive: true },
    { name: "The Ordinary", categories: ["العناية بالبشرة"], products: 67, isActive: true },
    { name: "YSL", categories: ["المكياج", "العطور"], products: 210, isActive: true },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cream mb-1">البراندات</h1>
          <p className="text-gold-muted">إدارة براندات المتجر</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-gold flex items-center gap-2"
        >
          <Plus size={18} />
          <span>إضافة براند</span>
        </button>
      </div>

      {/* Search */}
      <div className="luxury-card p-4">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-muted" size={18} />
          <input
            type="text"
            placeholder="البحث في البراندات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-gold/20 rounded-xl py-3 pr-12 pl-4 text-cream placeholder:text-gold-muted/50 focus:outline-none focus:border-gold/50"
          />
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="luxury-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                <span className="text-gold font-bold text-lg">{brand.name[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-black transition-all">
                  <Edit2 size={14} />
                </button>
                <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-cream mb-2">{brand.name}</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {brand.categories.map((cat) => (
                <span key={cat} className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gold-muted">{brand.products} منتج</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                brand.isActive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}>
                {brand.isActive ? "نشط" : "معطل"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Brand Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black-light border border-gold/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gold/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-cream">إضافة براند جديد</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gold-muted hover:text-gold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm text-gold-light mb-2">اسم البراند</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="block text-sm text-gold-light mb-2">الرابط (Slug)</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="block text-sm text-gold-light mb-2">الوصف</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-black border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gold-light mb-2">الفئات المتاحة</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                        formData.categories.includes(category)
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-gold/20 text-gold-muted hover:border-gold/40"
                      }`}
                    >
                      {formData.categories.includes(category) && <Check size={14} />}
                      <span className="text-sm">{category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gold-light mb-2">اللوجو</label>
                <div className="border-2 border-dashed border-gold/20 rounded-xl p-8 text-center hover:border-gold/40 transition-colors cursor-pointer">
                  <ImageIcon className="mx-auto text-gold-muted mb-2" size={32} />
                  <p className="text-sm text-gold-muted">ارفعي لوجو البراند</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 btn-gold py-3">
                  حفظ البراند
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-gold/20 text-gold hover:bg-gold/5 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

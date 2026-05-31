"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  groups: string[];
}

const availableGroups = [
  "المطبخ",
  "التقديم",
  "الأجهزة المنزلية",
  "التخزين والتنظيم",
  "تجهيز العرائس",
  "العروض الخاصة",
];

export default function AdminCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState<CategoryForm>({
    name: "",
    slug: "",
    description: "",
    groups: [],
  });

  const toggleGroup = (group: string) => {
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.includes(group)
        ? prev.groups.filter((g) => g !== group)
        : [...prev.groups, group],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.groups.length === 0) {
      toast.error("اختر مجموعة واحدة على الأقل");
      return;
    }

    toast.success(`تم إضافة القسم ${formData.name} بنجاح`);
    setIsModalOpen(false);

    setFormData({
      name: "",
      slug: "",
      description: "",
      groups: [],
    });
  };

  const categories = [
    {
      name: "أطقم الحلل",
      groups: ["المطبخ"],
      products: 120,
      isActive: true,
    },
    {
      name: "أدوات المطبخ",
      groups: ["المطبخ"],
      products: 180,
      isActive: true,
    },
    {
      name: "أطقم السفرة",
      groups: ["التقديم"],
      products: 95,
      isActive: true,
    },
    {
      name: "الأجهزة المنزلية",
      groups: ["الأجهزة المنزلية"],
      products: 75,
      isActive: true,
    },
    {
      name: "التخزين والتنظيم",
      groups: ["التخزين والتنظيم"],
      products: 60,
      isActive: true,
    },
    {
      name: "تجهيز العرائس",
      groups: ["العروض الخاصة"],
      products: 150,
      isActive: true,
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">
            الأقسام الرئيسية
          </h1>

          <p className="text-gray-500">
            إدارة أقسام متجر أم النور
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-gold flex items-center gap-2"
        >
          <Plus size={18} />
          <span>إضافة قسم</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="relative">
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="البحث في الأقسام..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 text-primary focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
                <span className="text-gold text-xl font-bold">
                  {category.name[0]}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all">
                  <Edit2 size={14} />
                </button>

                <button className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-primary mb-3">
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {category.groups.map((group) => (
                <span
                  key={group}
                  className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">
                {category.products} منتج
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                نشط
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-primary">
                إضافة قسم جديد
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block mb-2 text-sm font-medium">
                  اسم القسم
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-"),
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  الرابط (Slug)
                </label>

                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  وصف القسم
                </label>

                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 resize-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  المجموعات
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {availableGroups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => toggleGroup(group)}
                      className={`p-3 rounded-xl border flex items-center gap-2 ${
                        formData.groups.includes(group)
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-gray-200"
                      }`}
                    >
                      {formData.groups.includes(group) && (
                        <Check size={14} />
                      )}

                      <span>{group}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  صورة القسم
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gold transition-all">
                  <ImageIcon
                    className="mx-auto text-gray-400 mb-3"
                    size={32}
                  />

                  <p className="text-gray-500">
                    ارفع صورة القسم
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 btn-gold py-3"
                >
                  حفظ القسم
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border rounded-xl py-3"
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
import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    snapchat?: string;
    twitter?: string;
    youtube?: string;
  };
  shippingCost: number;
  freeShippingThreshold: number;
  taxRate: number;
  currency: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: "Pharma One Cosmetics" },
    logo: { type: String },
    favicon: { type: String },
    contactEmail: { type: String, default: "support@pharmaone.com" },
    contactPhone: { type: String, default: "+20 102 226 2971" },
    whatsappNumber: { type: String, default: "+201022262971" },
    whatsappMessage: { type: String, default: "مرحبًا، أريد الاستفسار عن منتجات Pharma One Cosmetics" },
    address: { type: String, default: "سوهاج - شارع الجمهورية - ش ضيف الله - برج الحاج عبداللطيف" },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      tiktok: { type: String },
      snapchat: { type: String },
      twitter: { type: String },
      youtube: { type: String },
    },
    shippingCost: { type: Number, default: 50 },
    freeShippingThreshold: { type: Number, default: 500 },
    taxRate: { type: Number, default: 14 },
    currency: { type: String, default: "EGP" },
    metaTitle: { type: String, default: "Pharma One Cosmetics - كل منتجات التجميل في مكان واحد" },
    metaDescription: { type: String, default: "أكثر من 7000 منتج من أكثر من 100 براند عالمي" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

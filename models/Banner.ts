import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  position: "hero" | "promo" | "category" | "footer";
  isActive: boolean;
  order: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    mobileImage: { type: String },
    link: { type: String },
    position: {
      type: String,
      enum: ["hero", "promo", "category", "footer"],
      default: "hero",
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

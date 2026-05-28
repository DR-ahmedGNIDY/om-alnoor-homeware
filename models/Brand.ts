import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
  name: string;
  slug: string;
  logo: string;
  banner?: string;
  description?: string;
  categories: mongoose.Types.ObjectId[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    banner: { type: String },
    description: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema);

import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  phone?: string;
  role: "user" | "admin";
  addresses: {
    label: string;
    street: string;
    city: string;
    governorate: string;
    postalCode?: string;
    isDefault: boolean;
  }[];
  wishlist: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    phone: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    addresses: [
      {
        label: { type: String, default: "العنوان الرئيسي" },
        street: { type: String, required: true },
        city: { type: String, required: true },
        governorate: { type: String, required: true },
        postalCode: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

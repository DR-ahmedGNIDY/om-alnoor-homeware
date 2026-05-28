import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "user",
    });

    return NextResponse.json(
      {
        message: "تم إنشاء الحساب بنجاح",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "حدث خطأ ما" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { menuData } from "@/data/menuData";

export async function GET() {
  try {
    console.log("✅ جلب البيانات من الملف المحلي");
    console.log("📦 عدد الأقسام:", menuData.length);
    return NextResponse.json(menuData);
  } catch (error) {
    console.error("❌ خطأ:", error);
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("✅ تم استلام البيانات للحفظ");
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "حدث خطأ" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { menuData } from "@/data/menuData";

const filePath = path.join(process.cwd(), "data", "menu.json");

export async function GET() {
  try {
    // التأكد من وجود مجلد data
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // التأكد من وجود الملف
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(menuData);
    }

    const data = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("❌ خطأ في GET:", error);
    return NextResponse.json(menuData);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "البيانات غير صحيحة" },
        { status: 400 }
      );
    }

    // التأكد من وجود مجلد data
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // كتابة الملف
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    return NextResponse.json({
      success: true,
      message: "✅ تم حفظ البيانات بنجاح",
    });
  } catch (error) {
    console.error("❌ خطأ في POST:", error);
    return NextResponse.json(
      { error: "❌ حدث خطأ أثناء الحفظ" },
      { status: 500 }
    );
  }
}
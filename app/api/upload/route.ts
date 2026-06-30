import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file: any = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "❌ لم يتم إرسال أي ملف" },
        { status: 400 }
      );
    }

    // أنواع الملفات المسموحة
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "❌ نوع الملف غير مدعوم" },
        { status: 400 }
      );
    }

    // الحجم الأقصى (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "❌ حجم الملف كبير جداً (الحد الأقصى 5MB)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name);
    const name = Date.now() + ext;

    // مسار التخزين
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // إنشاء المجلد إذا لم يكن موجوداً
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, name);
    fs.writeFileSync(uploadPath, buffer);

    console.log("✅ تم حفظ الملف في:", uploadPath);

    // الرابط العام للصورة
    const publicUrl = `/uploads/${name}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    console.error("❌ خطأ في رفع الملف:", error);
    return NextResponse.json(
      { error: "❌ حدث خطأ أثناء رفع الملف: " + (error as any).message },
      { status: 500 }
    );
  }
}
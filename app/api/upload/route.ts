import { NextResponse } from "next/server";

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

    // التحقق من نوع الملف
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "❌ يرجى اختيار ملف صورة فقط" },
        { status: 400 }
      );
    }

    // التحقق من الحجم (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "❌ حجم الصورة كبير جداً (الحد الأقصى 5 ميجابايت)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // تحويل الصورة إلى Base64
    const base64 = buffer.toString('base64');
    const mimeType = file.type;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
    });
  } catch (error) {
    console.error("❌ خطأ في رفع الملف:", error);
    return NextResponse.json(
      { error: "❌ حدث خطأ أثناء رفع الملف" },
      { status: 500 }
    );
  }
}
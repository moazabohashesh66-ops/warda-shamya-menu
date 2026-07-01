import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin"; // هنستخدم اتصالك الجاهز بصلاحيات الأدمن

// ================= GET =================
// جلب البيانات دائماً من Supabase (محلياً وعلى Vercel)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select(`
        *,
        products(*)
      `)
      .order("id");

    if (error) throw error;

    // إرجاع البيانات بنفس الهيكل الذي تتوقعه لوحة التحكم
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "فشل جلب البيانات" }, { status: 500 });
  }
}

// ================= POST =================
// حفظ التعديلات في قاعدة البيانات مباشرة (محلياً وعلى Vercel)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // التأكد من أن البيانات المرسلة عبارة عن مصفوفة كما يرسلها الـ Frontend
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "البيانات غير صحيحة" },
        { status: 400 }
      );
    }

    // 💡 حيلة برمجية لتسريع الحفظ: فصل الأقسام عن المنتجات لحفظها دفعة واحدة
    const categoriesToUpsert = [];
    const productsToUpsert = [];

    for (const category of body) {
      const { products, ...cat } = category;
      categoriesToUpsert.push(cat);

      if (products && Array.isArray(products)) {
        productsToUpsert.push(...products);
      }
    }

    // 1. حفظ وتحديث كل الأقسام دفعة واحدة (Upsert: يضيف الجديد ويحدث القديم)
    if (categoriesToUpsert.length > 0) {
      const { error: catError } = await supabaseAdmin
        .from("categories")
        .upsert(categoriesToUpsert);

      if (catError) throw catError;
    }

    // 2. حفظ وتحديث كل المنتجات دفعة واحدة
    if (productsToUpsert.length > 0) {
      const { error: prodError } = await supabaseAdmin
        .from("products")
        .upsert(productsToUpsert);

      if (prodError) throw prodError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
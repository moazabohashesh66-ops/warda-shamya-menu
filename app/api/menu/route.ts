import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

// ================= POST =================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      throw new Error("البيانات يجب أن تكون مصفوفة");
    }

    // 1. حذف المنتجات أولاً لتجنب تعارض العلاقات (Foreign Key Constraint)
    const { error: delProdErr } = await supabase.from("products").delete().neq("id", -9999);
    if (delProdErr) throw new Error("فشل حذف المنتجات القديمة: " + delProdErr.message);

    // 2. حذف الأقسام ثانياً
    const { error: delCatErr } = await supabase.from("categories").delete().neq("id", -9999);
    if (delCatErr) throw new Error("فشل حذف الأقسام القديمة: " + delCatErr.message);

    // 3. إدخال البيانات الجديدة
    for (const category of body) {
      const { error: catErr } = await supabase.from("categories").insert({
        id: category.id,
        name: category.name,
        name_en: category.nameEn || category.name,
        icon: category.icon || "📦",
        image: category.image || null,
      });
      if (catErr) throw new Error(`خطأ في إضافة القسم ${category.name}: ${catErr.message}`);

      if (Array.isArray(category.products)) {
        for (const product of category.products) {
          const { error: prodErr } = await supabase.from("products").insert({
            category_id: category.id,
            name: product.name,
            name_en: product.nameEn || product.name,
            price: Number(product.price) || 0,
            description: product.description || null,
            image: product.image || null,
            is_available: product.isAvailable ?? true,
            is_popular: !!product.isPopular,
            is_new: !!product.isNew,
            size: product.size || null,
            weight: product.weight || null,
          });
          if (prodErr) throw new Error(`خطأ في إضافة المنتج ${product.name}: ${prodErr.message}`);
        }
      }
    }

    return NextResponse.json({ success: true, message: "تم تحديث القائمة بنجاح" });
  } catch (error: any) {
    console.error("💥 خطأ في الحفظ:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء الحفظ", details: error.message },
      { status: 500 }
    );
  }
}
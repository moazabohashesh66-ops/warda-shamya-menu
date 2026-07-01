import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabaseAdmin"; // استيراد الاتصال الموحد

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      throw new Error("البيانات يجب أن تكون مصفوفة");
    }

    // 1. حذف المنتجات والأقسام القديمة
    await supabase.from("products").delete().neq("id", -9999);
    await supabase.from("categories").delete().neq("id", -9999);

    // 2. إدخال الأقسام والمنتجات الجديدة
    for (const category of body) {
      const { error: catErr } = await supabase.from("categories").insert({
        id: category.id,
        name: category.name,
        name_en: category.nameEn || category.name,
        icon: category.icon || "📦",
        image: category.image || null,
      });

      if (catErr) throw new Error(`خطأ في إضافة القسم: ${catErr.message}`);

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
          if (prodErr) throw new Error(`خطأ في إضافة المنتج: ${prodErr.message}`);
        }
      }
    }

    return NextResponse.json({ success: true, message: "تم التحديث بنجاح" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "فشل الحفظ", details: error.message },
      { status: 500 }
    );
  }
}
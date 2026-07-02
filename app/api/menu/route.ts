import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select(`
        *,
        products(*)
      `)
      .order("id");

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("❌ خطأ في GET:", error);
    return NextResponse.json({ error: "خطأ في جلب البيانات" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "البيانات غير صحيحة" },
        { status: 400 }
      );
    }

    // حذف البيانات القديمة
    const { error: deleteProductsError } = await supabase
      .from("products")
      .delete()
      .neq("id", "");

    if (deleteProductsError) throw deleteProductsError;

    const { error: deleteCategoriesError } = await supabase
      .from("categories")
      .delete()
      .neq("id", "");

    if (deleteCategoriesError) throw deleteCategoriesError;

    // إدخال البيانات الجديدة
    for (const category of data) {
      const { error: insertCategoryError } = await supabase
        .from("categories")
        .insert({
          id: category.id,
          name: category.name,
          name_en: category.nameEn || category.name,
          icon: category.icon || "📦",
          image: category.image || null,
        });

      if (insertCategoryError) throw insertCategoryError;

      if (category.products && Array.isArray(category.products)) {
        for (const product of category.products) {
          const { error: insertProductError } = await supabase
            .from("products")
            .insert({
              id: product.id || `p${Date.now()}`,
              category_id: category.id,
              name: product.name,
              name_en: product.nameEn || product.name,
              price: product.price || 0,
              description: product.description || null,
              image: product.image || null,
              is_available: product.isAvailable ?? true,
              is_popular: product.isPopular ?? false,
              is_new: product.isNew ?? false,
              size: product.size || null,
              weight: product.weight || null,
            });

          if (insertProductError) throw insertProductError;
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ خطأ في POST:", error);
    return NextResponse.json(
      { error: "خطأ في حفظ البيانات" },
      { status: 500 }
    );
  }
}
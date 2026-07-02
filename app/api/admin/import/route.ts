import { NextResponse } from "next/server";
import { menuData } from "@/data/menuData";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    console.log("🚀 Start importing menu...");

    // حذف البيانات القديمة
    await supabaseAdmin.from("products").delete().neq("id", "");
    await supabaseAdmin.from("categories").delete().neq("id", "");

    // إضافة الأقسام والمنتجات
    for (const category of menuData) {
      const { products, ...categoryData } = category;

      const { error: catError } = await supabaseAdmin
        .from("categories")
        .insert({
          id: categoryData.id,
          name: categoryData.name,
          name_en: categoryData.nameEn,
          icon: categoryData.icon,
          image: categoryData.image,
        });

      if (catError) {
        console.error(catError);
        throw catError;
      }

      if (products.length) {
        const rows = products.map((product) => ({
          id: product.id,
          category_id: category.id,
          name: product.name,
          name_en: product.nameEn,
          description: product.description ?? "",
          image: product.image ?? "",
          price: product.price,
          size: product.size ?? null,
          weight: product.weight ?? null,
          is_available: product.isAvailable,
          is_popular: product.isPopular ?? false,
          is_new: product.isNew ?? false,
        }));

        const { error: prodError } = await supabaseAdmin
          .from("products")
          .insert(rows);

        if (prodError) {
          console.error(prodError);
          throw prodError;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "تم استيراد جميع البيانات بنجاح",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
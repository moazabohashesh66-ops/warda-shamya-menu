import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    // جلب الأقسام
    const { data: categories, error: catError } = await supabaseAdmin
      .from("categories")
      .select("*")
      .order("id");

    if (catError) throw catError;

    // جلب المنتجات
    const { data: products, error: prodError } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("id");

    if (prodError) throw prodError;

    // دمج المنتجات داخل الأقسام
    const menu = categories.map((category: any) => ({
      ...category,
      products: products.filter(
        (product: any) => product.category_id === category.id
      ),
    }));

    return NextResponse.json(menu);
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "فشل تحميل البيانات",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const categories = await req.json();

    // تحديث الأقسام
    for (const category of categories) {
      const { products, ...categoryData } = category;

      const { error: catError } = await supabaseAdmin
        .from("categories")
        .update({
          name: categoryData.name,
          name_en: categoryData.name_en,
          icon: categoryData.icon,
          image: categoryData.image,
        })
        .eq("id", categoryData.id);

      if (catError) throw catError;

      // تحديث المنتجات
      for (const product of products) {
        const { error: prodError } = await supabaseAdmin
          .from("products")
          .update({
            name: product.name,
            name_en: product.name_en,
            description: product.description,
            image: product.image,
            price: product.price,
            size: product.size,
            weight: product.weight,
            is_available: product.is_available,
            is_popular: product.is_popular,
            is_new: product.is_new,
          })
          .eq("id", product.id);

        if (prodError) throw prodError;
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "فشل حفظ البيانات",
      },
      {
        status: 500,
      }
    );
  }
}

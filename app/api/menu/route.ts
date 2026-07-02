import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    // الأقسام
    const { data: categories, error: catError } = await supabaseAdmin
      .from("categories")
      .select("*")
      .order("id");

    if (catError) throw catError;

    // المنتجات
    const { data: products, error: prodError } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("id");

    if (prodError) throw prodError;

    const menu =
      categories?.map((cat: any) => ({
        ...cat,
        products:
          products?.filter(
            (p: any) => p.category_id === cat.id
          ) || [],
      })) || [];

    return NextResponse.json(menu);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load menu",
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

    for (const category of categories) {
      // تحديث القسم
      const { products, isExpanded, ...categoryData } = category;

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
        const { error: productError } = await supabaseAdmin
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

        if (productError) throw productError;
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Save failed",
      },
      {
        status: 500,
      }
    );
  }
}
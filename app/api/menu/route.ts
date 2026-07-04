import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

let cachedMenu: any = null;
let lastUpdate = 0;

const CACHE_TIME = 1000 * 60 * 10; // 10 دقائق

export async function GET() {
  try {
    if (cachedMenu && Date.now() - lastUpdate < CACHE_TIME) {
      return NextResponse.json(cachedMenu);
    }

    const { data: categories, error: catError } = await supabaseAdmin
      .from("categories")
      .select("*")
      .order("id");

    if (catError) throw catError;

    const { data: products, error: prodError } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("id");

    if (prodError) throw prodError;

    const menu = categories.map((category: any) => ({
      ...category,
      products: products.filter(
        (product: any) => product.category_id === category.id
      ),
    }));

    cachedMenu = menu;
    lastUpdate = Date.now();

    return NextResponse.json(menu);
  } catch (error) {
    console.error(error);

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

    for (const category of categories) {
      const { products, ...categoryData } = category;

      await supabaseAdmin
        .from("categories")
        .update({
          name: categoryData.name,
          name_en: categoryData.name_en,
          icon: categoryData.icon,
          image: categoryData.image,
        })
        .eq("id", categoryData.id);

      for (const product of products) {
        await supabaseAdmin
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
      }
    }

    // حذف الكاش بعد الحفظ
    cachedMenu = null;
    lastUpdate = 0;

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

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
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

// ====================== GET ======================

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
  } catch (error: any) {
    console.error("❌ GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ====================== POST ======================

export async function POST(req: Request) {
  try {
    const categories = await req.json();

    if (!Array.isArray(categories)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Data",
        },
        {
          status: 400,
        }
      );
    }

    for (const category of categories) {
      const { products, ...categoryData } = category;

      // تحديث القسم
      const { error: categoryError } = await supabaseAdmin
        .from("categories")
        .upsert(
          {
            id: categoryData.id,
            name: categoryData.name,
            name_en: categoryData.name_en || categoryData.name,
            icon: categoryData.icon,
            image: categoryData.image,
          },
          {
            onConflict: "id",
          }
        );

      if (categoryError) {
        console.error("CATEGORY ERROR:", categoryError);
        throw categoryError;
      }

      // تحديث المنتجات
      if (Array.isArray(products)) {
        for (const product of products) {
          const { error: productError } = await supabaseAdmin
            .from("products")
            .upsert(
              {
                id: product.id,
                category_id: category.id,

                name: product.name,
                name_en: product.name_en || product.name,

                description: product.description,

                image: product.image,

                price: product.price,

                size: product.size,

                weight: product.weight,

                is_popular: product.is_popular,

                is_new: product.is_new,

                is_available: product.is_available,
              },
              {
                onConflict: "id",
              }
            );

          if (productError) {
            console.error("PRODUCT ERROR:", productError);
            throw productError;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("❌ POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
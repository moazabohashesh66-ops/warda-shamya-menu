import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

// ==================== GET ====================

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

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);

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

// ==================== POST ====================

export async function POST(req: Request) {
  try {
    const categories = await req.json();

    for (const category of categories) {
      const { products, ...categoryData } = category;

      const { error: categoryError } = await supabaseAdmin
        .from("categories")
        .update({
          name: categoryData.name,
          name_en: categoryData.name_en,
          icon: categoryData.icon,
          image: categoryData.image,
        })
        .eq("id", categoryData.id);

      if (categoryError) throw categoryError;

      if (products) {
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
              is_popular: product.is_popular,
              is_new: product.is_new,
              is_available: product.is_available,
            })
            .eq("id", product.id);

          if (productError) throw productError;
        }
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error(error);

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
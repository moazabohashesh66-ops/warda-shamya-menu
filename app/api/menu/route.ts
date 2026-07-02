import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // جلب الأقسام + المنتجات مع بعض
    const { data: categories, error } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        products (
          id,
          name,
          description,
          price,
          is_available
        )
      `);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      categories,
    });

  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "API Error",
      },
      { status: 500 }
    );
  }
}
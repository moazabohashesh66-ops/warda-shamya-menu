import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

// ================= GET =================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select(`*, products(*)`)
      .order("id");

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: "فشل جلب البيانات", details: error.message }, { status: 500 });
  }
}

// ================= POST =================
export async function POST(req: Request) {
  console.log("--- 🚀 جاري محاولة الحفظ الآن ---");
  
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      throw new Error("البيانات يجب أن تكون مصفوفة");
    }

    const categoriesToUpsert: any[] = [];
    const productsToUpsert: any[] = [];

    for (const category of body) {
      const catId = category.id;
      const isCatIdValid = catId && !isNaN(Number(catId)) && Number(catId) > 0;

      categoriesToUpsert.push({
        id: isCatIdValid ? Number(catId) : undefined,
        name: category.name,
        name_en: category.name_en,
        icon: category.icon,
        image: category.image,
      });

      if (category.products && Array.isArray(category.products)) {
        for (const product of category.products) {
          productsToUpsert.push({
            id: (product.id && !isNaN(Number(product.id))) ? Number(product.id) : undefined,
            category_id: isCatIdValid ? Number(catId) : category.id,
            name: product.name,
            name_en: product.name_en,
            description: product.description,
            image: product.image,
            price: Number(product.price) || 0,
            size: product.size,
            weight: product.weight,
            is_popular: !!product.is_popular,
            is_new: !!product.is_new,
            is_available: product.is_available !== false,
          });
        }
      }
    }

    if (categoriesToUpsert.length > 0) {
      const { error } = await supabase.from("categories").upsert(categoriesToUpsert);
      if (error) throw new Error(`Category Error: ${error.message}`);
    }

    if (productsToUpsert.length > 0) {
      const { error } = await supabase.from("products").upsert(productsToUpsert);
      if (error) throw new Error(`Product Error: ${error.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("💥 خطأ أثناء التنفيذ:", error);
    
    // هذه رسالة اختبارية مختلفة لنتأكد أن الكود الجديد تم رفعه
    return NextResponse.json(
      { 
        success: false, 
        error: "❌ تجربة اختبار الخطأ 123", 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}
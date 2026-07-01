import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// إنشاء اتصال مباشر وآمن داخل السيرفر باستخدام المتغيرات
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
      .select(`
        *,
        products(*)
      `)
      .order("id");

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "فشل جلب البيانات" }, { status: 500 });
  }
}

// ================= POST =================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "البيانات غير صحيحة" },
        { status: 400 }
      );
    }

    const categoriesToUpsert: any[] = [];
    const productsToUpsert: any[] = [];

    // 🧹 تنظيف الحقول لكي تتوافق مع جداول الداتابيز
    for (const category of body) {
      const catId = category.id;
      const isCatIdValid = catId && !isNaN(Number(catId)) && Number(catId) > 0;

      const cleanCategory: any = {
        name: category.name,
        name_en: category.name_en,
        icon: category.icon,
        image: category.image,
      };

      if (isCatIdValid) {
        cleanCategory.id = Number(catId);
      }

      categoriesToUpsert.push(cleanCategory);

      if (category.products && Array.isArray(category.products)) {
        for (const product of category.products) {
          const prodId = product.id;
          const isProdIdValid = prodId && !isNaN(Number(prodId)) && Number(prodId) > 0;

          const cleanProduct: any = {
            category_id: isCatIdValid ? Number(catId) : category.id,
            name: product.name,
            name_en: product.name_en,
            description: product.description,
            image: product.image,
            price: product.price ? Number(product.price) : 0,
            size: product.size,
            weight: product.weight,
            is_popular: !!product.is_popular,
            is_new: !!product.is_new,
            is_available: product.is_available !== false,
          };

          if (isProdIdValid) {
            cleanProduct.id = Number(prodId);
          }

          productsToUpsert.push(cleanProduct);
        }
      }
    }

    // 1. تحديث الأقسام
    if (categoriesToUpsert.length > 0) {
      const { error: catError } = await supabase
        .from("categories")
        .upsert(categoriesToUpsert);

      if (catError) throw new Error(`خطأ الأقسام: ${catError.message}`);
    }

    // 2. تحديث المنتجات
    if (productsToUpsert.length > 0) {
      const { error: prodError } = await supabase
        .from("products")
        .upsert(productsToUpsert);

      if (prodError) throw new Error(`خطأ المنتجات: ${prodError.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("💥 Critical POST Error:", error);
    
    // 🔍 فك الخطأ بدقة وعرض تفاصيله الصريحة في الـ Response
    const errorMessage = error.message || (typeof error === 'object' ? JSON.stringify(error) : String(error));
    
    return NextResponse.json(
      { success: false, error: errorMessage || "حدث خطأ غير معروف أثناء الحفظ" },
      { status: 500 }
    );
  }
}
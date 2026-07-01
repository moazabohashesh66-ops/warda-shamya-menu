import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// ================= GET =================
// جلب البيانات دائماً وبشكل مباشر من Supabase محلياً وسحابياً
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
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
// حفظ وتحديث الأقسام والمنتجات سحابياً مع فلترة كاملة لحمايتها من الرفض
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

    // 🧹 تنظيف وفلترة الحقول لكي تتوافق مع جداول الداتابيز الصارمة
    for (const category of body) {
      const catId = category.id;
      // التأكد من أن الـ ID رقمي حقيقي وليس نصاً مؤقتاً من الواجهة
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

      // فلترة وتجهيز المنتجات التابعة للقسم
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
            price: product.price ? Number(product.price) : 0, // تحويل السعر لرقم صريح
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

    // 1. تحديث الأقسام المفلترة دفعة واحدة في الـ Database
    if (categoriesToUpsert.length > 0) {
      const { error: catError } = await supabaseAdmin
        .from("categories")
        .upsert(categoriesToUpsert);

      if (catError) throw new Error(`خطأ الأقسام: ${catError.message}`);
    }

    // 2. تحديث المنتجات المفلترة دفعة واحدة في الـ Database
    if (productsToUpsert.length > 0) {
      const { error: prodError } = await supabaseAdmin
        .from("products")
        .upsert(productsToUpsert);

      if (prodError) throw new Error(`خطأ المنتجات: ${prodError.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("💥 Critical POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "حدث خطأ داخلي" },
      { status: 500 }
    );
  }
}
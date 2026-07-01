import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    console.log("🔍 GET /api/menu - جلب البيانات");
    
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select(`
        *,
        products(*)
      `)
      .order("id");

    if (error) {
      console.error("❌ Error fetching categories:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    console.log(`✅ تم جلب ${data?.length || 0} قسم`);
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("❌ Error in GET:", error);
    return NextResponse.json(
      { error: error.message || "خطأ في جلب البيانات" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    console.log("📝 POST /api/menu - بدء الحفظ");
    console.log("🔑 Service Role Key exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    
    const data = await req.json();
    console.log(`📦 عدد الأقسام المستلمة: ${data.length}`);

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "البيانات غير صحيحة" },
        { status: 400 }
      );
    }

    // حذف البيانات القديمة
    console.log("🗑️ حذف المنتجات القديمة...");
    const { error: deleteProductsError } = await supabaseAdmin
      .from("products")
      .delete()
      .neq("id", "");

    if (deleteProductsError) {
      console.error("❌ Error deleting products:", deleteProductsError);
      return NextResponse.json(
        { error: "خطأ في حذف المنتجات: " + deleteProductsError.message },
        { status: 500 }
      );
    }

    console.log("🗑️ حذف الأقسام القديمة...");
    const { error: deleteCategoriesError } = await supabaseAdmin
      .from("categories")
      .delete()
      .neq("id", "");

    if (deleteCategoriesError) {
      console.error("❌ Error deleting categories:", deleteCategoriesError);
      return NextResponse.json(
        { error: "خطأ في حذف الأقسام: " + deleteCategoriesError.message },
        { status: 500 }
      );
    }

    // إدخال البيانات الجديدة
    console.log(`📝 إدخال ${data.length} قسم...`);

    for (const category of data) {
      console.log(`📝 إدخال قسم: ${category.id} - ${category.name}`);
      
      const { error: insertCategoryError } = await supabaseAdmin
        .from("categories")
        .insert({
          id: category.id,
          name: category.name,
          name_en: category.nameEn || category.name,
          icon: category.icon || "📦",
          image: category.image || null,
        });

      if (insertCategoryError) {
        console.error(`❌ Error inserting category ${category.id}:`, insertCategoryError);
        return NextResponse.json(
          { error: "خطأ في إدخال القسم: " + insertCategoryError.message },
          { status: 500 }
        );
      }

      if (category.products && Array.isArray(category.products)) {
        console.log(`📝 إدخال ${category.products.length} منتج للقسم ${category.id}`);
        
        for (const product of category.products) {
          const { error: insertProductError } = await supabaseAdmin
            .from("products")
            .insert({
              id: product.id || `p${Date.now()}`,
              category_id: category.id,
              name: product.name,
              name_en: product.nameEn || product.name,
              price: product.price || 0,
              description: product.description || null,
              image: product.image || null,
              is_available: product.isAvailable ?? true,
              is_popular: product.isPopular ?? false,
              is_new: product.isNew ?? false,
              size: product.size || null,
              weight: product.weight || null,
            });

          if (insertProductError) {
            console.error(`❌ Error inserting product ${product.id}:`, insertProductError);
            return NextResponse.json(
              { error: "خطأ في إدخال المنتج: " + insertProductError.message },
              { status: 500 }
            );
          }
        }
      }
    }

    console.log("✅ تم حفظ البيانات بنجاح!");
    return NextResponse.json({ 
      success: true, 
      message: "✅ تم حفظ جميع التعديلات بنجاح" 
    });
  } catch (error: any) {
    console.error("💥 خطأ غير متوقع:", error);
    return NextResponse.json(
      { 
        error: "خطأ غير متوقع: " + (error.message || "حدث خطأ") 
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { menuData } from "@/data/menuData";
import { supabaseAdmin } from "@/lib/supabase-admin";

const filePath = path.join(process.cwd(), "data", "menu.json");

// ================= GET =================

export async function GET() {
  try {
    // إذا كان يعمل على Vercel استخدم Supabase
    if (process.env.VERCEL) {
      const { data, error } = await supabaseAdmin
        .from("categories")
        .select(`
          *,
          products(*)
        `)
        .order("id");

      if (!error && data) {
        return NextResponse.json(data);
      }

      console.error(error);
    }

    // ===== Local =====

    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(menuData);
    }

    const data = fs.readFileSync(filePath, "utf8");

    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    return NextResponse.json(menuData);
  }
}

// ================= POST =================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "البيانات غير صحيحة",
        },
        {
          status: 400,
        }
      );
    }

    // =================== VERCEL ===================

    if (process.env.VERCEL) {
      for (const category of body) {
        const { products, ...cat } = category;

        await supabaseAdmin
          .from("categories")
          .update({
            name: cat.name,
            name_en: cat.name_en,
            icon: cat.icon,
            image: cat.image,
          })
          .eq("id", cat.id);

        if (products) {
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
                is_popular: product.is_popular,
                is_new: product.is_new,
                is_available: product.is_available,
              })
              .eq("id", product.id);
          }
        }
      }

      return NextResponse.json({
        success: true,
      });
    }

    // =================== LOCAL ===================

    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

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
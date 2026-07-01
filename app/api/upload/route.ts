import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "لم يتم اختيار صورة",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ==========================
    // اختبار الاتصال بـ Storage
    // ==========================

    const { data: buckets, error: bucketError } =
      await supabaseAdmin.storage.listBuckets();

    console.log("=================================");
    console.log("SUPABASE STORAGE TEST");
    console.log("Buckets => ", buckets);
    console.log("Bucket Error => ", bucketError);
    console.log("=================================");

    const ext = file.name.split(".").pop();
    const fileName = `${uuid()}.${ext}`;

    const { error } = await supabaseAdmin.storage
      .from("menu-images")
      .upload(fileName, buffer, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
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

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage
      .from("menu-images")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
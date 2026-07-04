import { supabaseAdmin } from "@/lib/supabase-admin";

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  is_popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  icon: string;
  products: Product[];
}

export async function getMenu(): Promise<Category[]> {
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

  return categories.map((category: any) => ({
    ...category,
    products: products.filter(
      (product: any) => product.category_id === category.id
    ),
  }));
}
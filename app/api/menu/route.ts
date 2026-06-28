import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('id');

    if (categoriesError) throw categoriesError;

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('id');

    if (productsError) throw productsError;

    const menuData = categories.map((category: any) => ({
      ...category,
      products: products.filter((p: any) => p.category_id === category.id)
    }));

    return NextResponse.json(menuData);
  } catch (error) {
    console.error('Error in GET /api/menu:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Delete existing data
    await supabase.from('products').delete().neq('id', '');
    await supabase.from('categories').delete().neq('id', '');

    // Insert categories and products
    for (const category of data) {
      const { error: catError } = await supabase
        .from('categories')
        .insert({
          id: category.id,
          name: category.name,
          name_en: category.nameEn,
          icon: category.icon,
          image: category.image || null
        });

      if (catError) throw catError;

      for (const product of category.products) {
        const { error: prodError } = await supabase
          .from('products')
          .insert({
            id: product.id,
            category_id: category.id,
            name: product.name,
            name_en: product.nameEn,
            price: product.price,
            description: product.description || null,
            image: product.image || null,
            is_available: product.isAvailable,
            is_popular: product.isPopular || false,
            is_new: product.isNew || false,
            size: product.size || null,
            weight: product.weight || null
          });

        if (prodError) throw prodError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/menu:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
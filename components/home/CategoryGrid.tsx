"use client";

export default function CategoryGrid({ categories, onSelect }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {categories?.map((cat: any) => (
        <div
          key={cat.id}
          onClick={() => onSelect(cat)}
          className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition hover:scale-[1.03]"
        >
          <h3 className="text-yellow-400 font-bold text-lg">
            {cat.name}
          </h3>

          <p className="text-white/40 text-sm mt-2">
            {cat.products?.length || 0} منتجات
          </p>
        </div>
      ))}
    </div>
  );
}

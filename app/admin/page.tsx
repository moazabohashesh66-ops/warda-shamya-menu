"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  size?: string;
  weight?: string;
}

interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  image?: string;
  products: Product[];
}

export default function AdminPage() {
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ categoryId: string; productId: string; productName: string } | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    nameEn: "",
    price: 0,
    description: "",
    isAvailable: true
  });

  // تحميل البيانات
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/menu");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMenuData(data);
      } else {
        setMenuData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("خطأ في تحميل البيانات", error);
      setMenuData([]);
      setLoading(false);
    }
  };

  // حفظ التغييرات
  const saveChanges = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData)
      });
      const result = await res.json();
      if (result.success) {
        setMessage("✅ تم حفظ التغييرات بنجاح!");
        await fetchMenuData();
      } else {
        setMessage("❌ حدث خطأ في الحفظ");
      }
      setTimeout(() => setMessage(""), 3000);
      setLoading(false);
    } catch (error) {
      setMessage("❌ حدث خطأ في الحفظ");
      setTimeout(() => setMessage(""), 3000);
      setLoading(false);
    }
  };

  // تعديل اسم المنتج
  const updateProductName = (categoryId: string, productId: string, newName: string) => {
    const newMenu = menuData.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: cat.products.map(p => {
            if (p.id === productId) {
              return { ...p, name: newName };
            }
            return p;
          })
        };
      }
      return cat;
    });
    setMenuData(newMenu);
  };

  // تغيير سعر المنتج
  const updateProductPrice = (categoryId: string, productId: string, newPrice: number) => {
    if (newPrice < 0) return;
    const newMenu = menuData.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: cat.products.map(p => {
            if (p.id === productId) {
              return { ...p, price: newPrice };
            }
            return p;
          })
        };
      }
      return cat;
    });
    setMenuData(newMenu);
  };

  // تغيير توفر المنتج
  const toggleProductAvailability = (categoryId: string, productId: string) => {
    const newMenu = menuData.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: cat.products.map(p => {
            if (p.id === productId) {
              return { ...p, isAvailable: !p.isAvailable };
            }
            return p;
          })
        };
      }
      return cat;
    });
    setMenuData(newMenu);
  };

  // حذف منتج
  const confirmDelete = (categoryId: string, productId: string, productName: string) => {
    setDeleteConfirm({ categoryId, productId, productName });
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    const { categoryId, productId } = deleteConfirm;
    const newMenu = menuData.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: cat.products.filter(p => p.id !== productId)
        };
      }
      return cat;
    });
    setMenuData(newMenu);
    setDeleteConfirm(null);
    setMessage("🗑️ تم حذف المنتج");
    setTimeout(() => setMessage(""), 2000);
  };

  // إضافة منتج جديد
  const addProduct = (categoryId: string) => {
    if (!newProduct.name || !newProduct.price) {
      setMessage("⚠️ أدخل اسم وسعر المنتج");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const product: Product = {
      id: `p${Date.now()}`,
      name: newProduct.name,
      nameEn: newProduct.nameEn || newProduct.name,
      price: newProduct.price,
      description: newProduct.description || "",
      isAvailable: newProduct.isAvailable !== undefined ? newProduct.isAvailable : true,
      image: newProduct.image || ""
    };

    const newMenu = menuData.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: [...cat.products, product]
        };
      }
      return cat;
    });
    setMenuData(newMenu);
    setNewProduct({ name: "", nameEn: "", price: 0, description: "", isAvailable: true });
    setShowAddProduct(false);
    setMessage("✅ تم إضافة المنتج بنجاح!");
    setTimeout(() => setMessage(""), 3000);
  };

  // رفع صورة المنتج
  const handleProductImageUpload = (categoryId: string, productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      
      const newMenu = menuData.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            products: cat.products.map(p => {
              if (p.id === productId) {
                return { ...p, image: base64 };
              }
              return p;
            })
          };
        }
        return cat;
      });
      setMenuData(newMenu);
      setMessage("✅ تم تحديث صورة المنتج!");
      setTimeout(() => setMessage(""), 2000);
    };
  };

  // رفع صورة القسم
  const handleCategoryImageUpload = (categoryId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      
      const newMenu = menuData.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, image: base64 };
        }
        return cat;
      });
      setMenuData(newMenu);
      setMessage("✅ تم تحديث صورة القسم!");
      setTimeout(() => setMessage(""), 2000);
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0e0a]">
        <div className="text-white/60 text-xl">⏳ جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0e0a] to-[#2E1A12] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2 text-center">
          🛠️ لوحة تحكم المنيو
        </h1>
        <p className="text-center text-white/40 mb-8">إدارة الأقسام والمنتجات والأسعار والصور</p>

        {message && (
          <div className={`p-4 rounded-lg mb-6 text-center font-semibold ${
            message.includes('✅') ? 'bg-green-100 text-green-700 border border-green-300' : 
            message.includes('❌') ? 'bg-red-100 text-red-700 border border-red-300' : 
            'bg-yellow-100 text-yellow-700 border border-yellow-300'
          }`}>
            {message}
          </div>
        )}

        {/* الأقسام */}
        {menuData.map((category) => (
          <div key={category.id} className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/10">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  <span className="text-3xl mr-2">{category.icon}</span>
                  {category.name}
                  <span className="text-sm font-normal text-white/40 ml-2">({category.products.length} منتج)</span>
                </h2>
                <button
                  onClick={() => {
                    const input = document.getElementById(`category-image-${category.id}`) as HTMLInputElement;
                    if (input) input.click();
                  }}
                  className="bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition font-semibold"
                >
                  📸 تغيير صورة القسم
                </button>
                <input
                  id={`category-image-${category.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleCategoryImageUpload(category.id, e)}
                />
              </div>
              <button
                onClick={() => {
                  setShowAddProduct(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition font-semibold"
              >
                ➕ إضافة منتج
              </button>
            </div>

            {/* منتجات القسم */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.products.map((product) => (
                <div key={product.id} className={`border-2 rounded-xl p-4 hover:shadow-lg transition ${!product.isAvailable ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProductName(category.id, product.id, e.target.value)}
                        className="w-full bg-transparent border-2 border-white/20 rounded-lg px-2 py-1 text-sm font-semibold text-white focus:border-yellow-500 focus:outline-none mb-1"
                      />
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          const input = document.getElementById(`product-image-${category.id}-${product.id}`) as HTMLInputElement;
                          if (input) input.click();
                        }}
                        className="text-xs px-2 py-1 rounded-full bg-blue-500/50 text-white hover:bg-blue-600 font-semibold"
                      >
                        📸
                      </button>
                      <input
                        id={`product-image-${category.id}-${product.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleProductImageUpload(category.id, product.id, e)}
                      />
                      <button
                        onClick={() => confirmDelete(category.id, product.id, product.name)}
                        className="text-xs px-2 py-1 rounded-full bg-red-500/50 text-white hover:bg-red-600 font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  {product.image && (
                    <div className="relative w-full h-24 mt-2 rounded-lg overflow-hidden bg-gray-800 border border-white/10">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => updateProductPrice(category.id, product.id, Number(e.target.value))}
                      className="w-24 bg-transparent border-2 border-white/20 rounded-lg px-2 py-1 text-sm font-semibold text-white focus:border-yellow-500 focus:outline-none"
                      min="0"
                    />
                    <span className="text-sm font-bold text-white/60">ج.م</span>
                    <button
                      onClick={() => toggleProductAvailability(category.id, product.id)}
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        product.isAvailable ? 'bg-green-500/50 text-white border border-green-400' : 'bg-red-500/50 text-white border border-red-400'
                      }`}
                    >
                      {product.isAvailable ? '✅ متوفر' : '❌ غير متوفر'}
                    </button>
                    <button
                      onClick={saveChanges}
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition"
                    >
                      حفظ
                    </button>
                  </div>
                  
                  {product.description && (
                    <p className="text-xs text-white/40 mt-1 line-clamp-1">{product.description}</p>
                  )}
                  {product.size && <span className="text-xs text-blue-400 font-semibold">📏 {product.size}</span>}
                  {product.weight && <span className="text-xs text-blue-400 font-semibold ml-2">⚖️ {product.weight}</span>}
                </div>
              ))}
            </div>

            {/* نموذج إضافة منتج */}
            {showAddProduct && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <h4 className="font-bold text-white text-lg mb-3">➕ إضافة منتج جديد</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="الاسم (عربي)"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="bg-white/10 border-2 border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:border-yellow-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="الاسم (إنجليزي)"
                    value={newProduct.nameEn}
                    onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                    className="bg-white/10 border-2 border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:border-yellow-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="السعر"
                    value={newProduct.price || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="bg-white/10 border-2 border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:border-yellow-500 focus:outline-none"
                    min="0"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const categoryId = category.id;
                        addProduct(categoryId);
                      }}
                      className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm hover:bg-yellow-400 transition font-bold flex-1"
                    >
                      إضافة
                    </button>
                    <button
                      onClick={() => setShowAddProduct(false)}
                      className="bg-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition font-semibold"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="الوصف (اختياري)"
                  value={newProduct.description || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="bg-white/10 border-2 border-white/20 rounded-lg px-3 py-2 mt-2 w-full text-white placeholder:text-white/30 focus:border-yellow-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        ))}

        {/* نافذة تأكيد الحذف */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a0e0a] rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-red-500/30">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-red-500 mb-3">تأكيد الحذف</h3>
                <p className="text-white/60 mb-2">
                  هل أنت متأكد من حذف المنتج؟
                </p>
                <p className="text-xl font-bold text-white mb-4">"{deleteConfirm.productName}"</p>
                <p className="text-sm text-red-400 font-semibold mb-6">❗ هذا الإجراء لا يمكن التراجع عنه</p>
                <div className="flex gap-3">
                  <button
                    onClick={executeDelete}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition text-lg"
                  >
                    نعم، احذف
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition text-lg"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* أزرار الحفظ */}
        <div className="text-center mt-8 flex gap-4 justify-center flex-wrap">
          <button
            onClick={saveChanges}
            className="bg-yellow-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition shadow-lg hover:shadow-yellow-500/30"
          >
            💾 حفظ التغييرات
          </button>
          <button
            onClick={() => {
              if (confirm("⚠️ هل أنت متأكد من إعادة ضبط كل البيانات؟")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="bg-red-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-400 transition shadow-lg hover:shadow-red-500/30"
          >
            🔄 إعادة ضبط
          </button>
        </div>
      </div>
    </div>
  );
}
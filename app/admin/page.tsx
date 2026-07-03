import { cookies } from "next/headers";
import { redirect } from "next/navigation";


type Product = {
  id: string;
  name: string;
  name_en?: string;
  description?: string;
  image?: string;
  price: number;
  size?: string;
  weight?: string;
  is_popular?: boolean;
  is_new?: boolean;
  is_available?: boolean;
};

type Category = {
  id: string;
  name: string;
  name_en?: string;
  icon?: string;
  image?: string;
  products: Product[];
  isExpanded?: boolean;
};

type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [expandedAll, setExpandedAll] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileContextRef = useRef<{ cIndex: number; pIndex?: number } | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const loadMenu = useCallback(async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setCategories((data || []).map((c: Category) => ({ ...c, isExpanded: false })));
    } catch (error) {
      console.error(error);
      showToast("❌ فشل تحميل البيانات", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const saveMenu = useCallback(
    async (data: Category[], silent = false) => {
      setSaving(true);
      try {
        const res = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          if (!silent) showToast("✅ تم الحفظ بنجاح", "success");
          setPendingChanges(false);
          return true;
        } else {
          showToast("❌ فشل الحفظ: " + (result.error || "خطأ غير معروف"), "error");
          return false;
        }
      } catch {
        showToast("❌ خطأ في الاتصال", "error");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [showToast]
  );

  const autoSave = useCallback(
    (data: Category[]) => {
      setPendingChanges(true);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveMenu(data, true);
      }, 1500);
    },
    [saveMenu]
  );

  const updateCategory = useCallback(
    (index: number, key: keyof Category, value: any) => {
      setCategories((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [key]: value };
        autoSave(copy);
        return copy;
      });
    },
    [autoSave]
  );

  const updateProduct = useCallback(
    (cIndex: number, pIndex: number, key: keyof Product, value: any) => {
      setCategories((prev) => {
        const copy = [...prev];
        const updatedProducts = [...copy[cIndex].products];
        updatedProducts[pIndex] = { ...updatedProducts[pIndex], [key]: value };
        copy[cIndex] = { ...copy[cIndex], products: updatedProducts };
        autoSave(copy);
        return copy;
      });
    },
    [autoSave]
  );

  const addCategory = useCallback(() => {
    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      name: "قسم جديد",
      icon: "📦",
      products: [],
      isExpanded: true,
    };
    setCategories((prev) => {
      const copy = [...prev, newCategory];
      autoSave(copy);
      return copy;
    });
    showToast("➕ تم إضافة قسم جديد", "info");
  }, [autoSave, showToast]);

  const deleteCategory = useCallback(
    (index: number) => {
      if (!confirm("هل أنت متأكد من حذف هذا القسم وجميع منتجاته؟")) return;
      setCategories((prev) => {
        const copy = [...prev];
        copy.splice(index, 1);
        autoSave(copy);
        return copy;
      });
      showToast("🗑️ تم حذف القسم", "info");
    },
    [autoSave, showToast]
  );

  const addProduct = useCallback(
    (cIndex: number) => {
      setCategories((prev) => {
        const copy = [...prev];
        copy[cIndex].products.push({
          id: `prod_${Date.now()}`,
          name: "منتج جديد",
          price: 0,
          description: "",
          image: "",
          is_available: true,
          is_popular: false,
          is_new: false,
        });
        autoSave(copy);
        return copy;
      });
      showToast("➕ تم إضافة منتج جديد", "info");
    },
    [autoSave, showToast]
  );

  const deleteProduct = useCallback(
    (cIndex: number, pIndex: number) => {
      if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
      setCategories((prev) => {
        const copy = [...prev];
        copy[cIndex].products.splice(pIndex, 1);
        autoSave(copy);
        return copy;
      });
      showToast("🗑️ تم حذف المنتج", "info");
    },
    [autoSave, showToast]
  );

  const duplicateProduct = useCallback(
    (cIndex: number, pIndex: number) => {
      setCategories((prev) => {
        const copy = [...prev];
        const original = copy[cIndex].products[pIndex];
        copy[cIndex].products.push({
          ...original,
          id: `prod_${Date.now()}`,
          name: `${original.name} (نسخة)`,
        });
        autoSave(copy);
        return copy;
      });
      showToast("📋 تم نسخ المنتج", "info");
    },
    [autoSave, showToast]
  );

  const toggleCategory = useCallback((categoryId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, isExpanded: !c.isExpanded } : c
      )
    );
  }, []);

  const toggleAllCategories = useCallback(() => {
    setExpandedAll((prev) => !prev);
    setCategories((prev) =>
      prev.map((c) => ({ ...c, isExpanded: !expandedAll }))
    );
  }, [expandedAll]);

  const triggerFileUpload = useCallback((cIndex: number, pIndex?: number) => {
    fileContextRef.current = { cIndex, pIndex };
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !fileContextRef.current) return;

      const { cIndex, pIndex } = fileContextRef.current;

      if (!file.type.startsWith("image/")) {
        showToast("❌ يرجى اختيار ملف صورة فقط", "error");
        e.target.value = "";
        fileContextRef.current = null;
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast("❌ حجم الصورة كبير جداً (الحد الأقصى 5 ميجابايت)", "error");
        e.target.value = "";
        fileContextRef.current = null;
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result as string;
        
        if (pIndex !== undefined) {
          updateProduct(cIndex, pIndex, "image", dataUrl);
        } else {
          updateCategory(cIndex, "image", dataUrl);
        }
        showToast("✅ تم رفع الصورة", "success");
      };
      reader.onerror = () => {
        showToast("❌ خطأ في قراءة الصورة", "error");
      };
      
      e.target.value = "";
      fileContextRef.current = null;
    },
    [updateCategory, updateProduct, showToast]
  );

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const term = searchTerm.toLowerCase().trim();
    return categories
      .map((cat) => ({
        ...cat,
        products: cat.products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description?.toLowerCase().includes(term)
        ),
      }))
      .filter((cat) => cat.products.length > 0 || cat.name.toLowerCase().includes(term));
  }, [categories, searchTerm]);

  const totalProducts = useMemo(
    () => categories.reduce((acc, cat) => acc + cat.products.length, 0),
    [categories]
  );

  useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch("/api/admin/check");

    if (!res.ok) {
      window.location.href = "/admin/login";
      return;
    }

    loadMenu();
  };

  checkAuth();
}, [loadMenu]);
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#120806]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-10 h-10 text-yellow-400 animate-spin" />
          <p className="text-white/60 text-lg">⏳ جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120806] via-[#1a0e0a] to-[#2d1408] p-4 md:p-8 text-white">
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-5 py-3 rounded-xl shadow-2xl pointer-events-auto animate-in slide-in-from-top-2 duration-300 font-medium ${
              toast.type === "success"
                ? "bg-green-500/90 text-white"
                : toast.type === "error"
                ? "bg-red-500/90 text-white"
                : "bg-yellow-500/90 text-black"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-[#1a0e0a] rounded-2xl p-2 border border-white/10">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 bg-red-500 rounded-full p-2 hover:bg-red-600 transition shadow-xl"
            >
              <X size={18} />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
            />
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center gap-3">
            🛠️ لوحة التحكم
            <span className="text-sm font-normal text-white/30 bg-white/5 px-3 py-1 rounded-full">
              {totalProducts} منتج • {categories.length} أقسام
            </span>
          </h1>
          {pendingChanges && (
            <p className="text-yellow-400/60 text-sm mt-1 flex items-center gap-1">
              <Clock size={14} /> توجد تغييرات غير محفوظة...
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={toggleAllCategories}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm transition"
          >
            {expandedAll ? "📂 طي الكل" : "📂 فتح الكل"}
          </button>
          <button
            onClick={addCategory}
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-xl font-bold transition hover:scale-105"
          >
            <Plus size={18} className="inline mr-1" /> قسم
          </button>
          <button
            onClick={() => saveMenu(categories, false)}
            disabled={saving}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold transition hover:scale-105 disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw size={18} className="animate-spin inline" />
            ) : (
              <Save size={18} className="inline mr-1" />
            )}
            حفظ
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 ابحث عن منتج أو قسم..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pr-12 pl-4 text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-2xl">📭 لا توجد نتائج</p>
          <p className="text-sm mt-2">جرب تغيير كلمة البحث</p>
        </div>
      ) : (
        filteredCategories.map((category, cIndex) => {
          const isExpanded = category.isExpanded ?? false;
          const productCount = category.products?.length || 0;
          const actualIndex = categories.findIndex((c) => c.id === category.id);

          return (
            <div
              key={category.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 mb-4 overflow-hidden transition-all"
            >
              <div
                className="flex flex-wrap items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <input
                    value={category.icon || "📦"}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateCategory(actualIndex, "icon", e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 bg-transparent border-b border-white/20 hover:border-yellow-400 focus:border-yellow-400 outline-none text-3xl text-center transition"
                    placeholder="📦"
                  />
                  <div className="flex-1 min-w-0">
                    <input
                      value={category.name}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateCategory(actualIndex, "name", e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-transparent border-b border-white/20 hover:border-yellow-400 focus:border-yellow-400 outline-none text-lg font-bold text-white transition px-1"
                      placeholder="اسم القسم"
                    />
                    <span className="text-white/30 text-sm">
                      {productCount} منتج
                      {category.name_en && ` • ${category.name_en}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {category.image && (
                    <div
                      className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 cursor-pointer hover:border-yellow-400 transition flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(category.image!);
                      }}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileUpload(actualIndex);
                    }}
                    className="bg-blue-500/30 hover:bg-blue-500/50 text-white/80 p-2 rounded-xl transition"
                    title="رفع صورة القسم"
                  >
                    <Upload size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addProduct(actualIndex);
                    }}
                    className="bg-green-500/30 hover:bg-green-500/50 text-white p-2 rounded-xl transition"
                    title="إضافة منتج"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(actualIndex);
                    }}
                    className="bg-red-500/30 hover:bg-red-500/50 text-white/60 p-2 rounded-xl transition"
                    title="حذف القسم"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button className="text-white/40 hover:text-yellow-400 transition p-1">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 pt-2 border-t border-white/5">
                  <div className="mb-4">
                    <label className="text-xs text-white/30 block mb-1">رابط صورة القسم</label>
                    <input
                      value={category.image || ""}
                      onChange={(e) => updateCategory(actualIndex, "image", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white/80 outline-none focus:border-yellow-400 transition"
                      placeholder="https://example.com/image.jpg"
                    />
                    {category.image && (
                      <div className="mt-2 flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => setSelectedImage(category.image!)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition"
                        >
                          👁️ معاينة
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {category.products.length === 0 ? (
                      <div className="text-center text-white/20 py-6 text-sm">
                        لا توجد منتجات في هذا القسم
                      </div>
                    ) : (
                      category.products.map((product, pIndex) => {
                        const actualPIndex = categories[actualIndex]?.products?.findIndex(
                          (p) => p.id === product.id
                        );

                        return (
                          <div
                            key={product.id}
                            className="bg-black/30 rounded-xl p-4 border border-white/5 hover:border-white/15 transition group"
                          >
                            <div className="flex flex-wrap items-start gap-3">
                              <div className="flex-1 min-w-[120px]">
                                <label className="text-[10px] text-white/30 block mb-0.5">اسم المنتج</label>
                                <input
                                  value={product.name}
                                  onChange={(e) =>
                                    updateProduct(actualIndex, actualPIndex!, "name", e.target.value)
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-yellow-400 transition"
                                  placeholder="اسم المنتج"
                                />
                              </div>
                              <div className="w-28">
                                <label className="text-[10px] text-white/30 block mb-0.5">السعر</label>
                                <input
                                  type="number"
                                  value={product.price}
                                  onChange={(e) =>
                                    updateProduct(
                                      actualIndex,
                                      actualPIndex!,
                                      "price",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-yellow-400 transition"
                                  placeholder="0"
                                />
                              </div>
                              <div className="flex items-center gap-1 pt-4">
                                <button
                                  onClick={() => duplicateProduct(actualIndex, actualPIndex!)}
                                  className="bg-blue-500/30 hover:bg-blue-500/50 text-white/60 p-2 rounded-lg transition"
                                  title="نسخ المنتج"
                                >
                                  <Copy size={14} />
                                </button>
                                <button
                                  onClick={() => deleteProduct(actualIndex, actualPIndex!)}
                                  className="bg-red-500/30 hover:bg-red-500/50 text-white/60 p-2 rounded-lg transition"
                                  title="حذف المنتج"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
                              <div className="sm:col-span-2 lg:col-span-1">
                                <label className="text-[10px] text-white/30 block mb-0.5">الوصف</label>
                                <input
                                  value={product.description || ""}
                                  onChange={(e) =>
                                    updateProduct(
                                      actualIndex,
                                      actualPIndex!,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-yellow-400 transition"
                                  placeholder="وصف المنتج"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-white/30 block mb-0.5">الحجم</label>
                                <input
                                  value={product.size || ""}
                                  onChange={(e) =>
                                    updateProduct(actualIndex, actualPIndex!, "size", e.target.value)
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-yellow-400 transition"
                                  placeholder="وسط، كبير..."
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-white/30 block mb-0.5">الوزن</label>
                                <input
                                  value={product.weight || ""}
                                  onChange={(e) =>
                                    updateProduct(actualIndex, actualPIndex!, "weight", e.target.value)
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-yellow-400 transition"
                                  placeholder="كيلو، نصف كيلو..."
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-white/30 block mb-0.5">صورة المنتج</label>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => triggerFileUpload(actualIndex, actualPIndex)}
                                    className="bg-blue-500/30 hover:bg-blue-500/50 text-white/80 p-2 rounded-lg transition flex-1 text-xs flex items-center justify-center gap-1"
                                  >
                                    <Upload size={12} /> رفع
                                  </button>
                                  {product.image && (
                                    <div
                                      className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 cursor-pointer hover:border-yellow-400 transition flex-shrink-0"
                                      onClick={() => setSelectedImage(product.image!)}
                                    >
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-2 pt-2 border-t border-white/5">
                              <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={product.is_available ?? true}
                                  onChange={(e) =>
                                    updateProduct(
                                      actualIndex,
                                      actualPIndex!,
                                      "is_available",
                                      e.target.checked
                                    )
                                  }
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-400 focus:ring-yellow-400"
                                />
                                متوفر
                              </label>
                              <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={product.is_popular ?? false}
                                  onChange={(e) =>
                                    updateProduct(
                                      actualIndex,
                                      actualPIndex!,
                                      "is_popular",
                                      e.target.checked
                                    )
                                  }
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-400 focus:ring-yellow-400"
                                />
                                <Star size={12} className="text-yellow-400" /> الأكثر طلباً
                              </label>
                              <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={product.is_new ?? false}
                                  onChange={(e) =>
                                    updateProduct(
                                      actualIndex,
                                      actualPIndex!,
                                      "is_new",
                                      e.target.checked
                                    )
                                  }
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-400 focus:ring-yellow-400"
                                />
                                جديد
                              </label>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Edit2, Trash2, Plus } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


const defaultCategories = {
  Dairy: [
    { _id: "1", name: "Amul Milk", priceRange: "₹45-₹65", emoji: "🥛", stock: 50 },
    { _id: "11", name: "Mother Dairy Curd", priceRange: "₹35-₹50", emoji: "🧈", stock: 30 },
  ],
  Vegetables: [
    { _id: "2", name: "Fresh Tomato", priceRange: "₹35-₹50", emoji: "🍅", stock: 30 },
    { _id: "12", name: "Onion", priceRange: "₹40-₹60", emoji: "🧅", stock: 40 },
  ],
  Fruits: [
    { _id: "3", name: "Banana", priceRange: "₹40-₹60", emoji: "🍌", stock: 40 },
    { _id: "13", name: "Mango", priceRange: "₹80-₹120", emoji: "🥭", stock: 25 },
  ],
  Bakery: [
    { _id: "4", name: "Fresh Bread", priceRange: "₹30-₹45", emoji: "🍞", stock: 35 },
  ],
  Snacks: [
    { _id: "5", name: "Chips", priceRange: "₹20-₹40", emoji: "🍟", stock: 60 },
    { _id: "14", name: "Chocolate", priceRange: "₹25-₹50", emoji: "🍫", stock: 45 },
  ],
  Household: [
    { _id: "6", name: "Cleaning Liquid", priceRange: "₹100-₹150", emoji: "🧼", stock: 20 },
  ],
  PersonalCare: [
    { _id: "7", name: "Shampoo", priceRange: "₹150-₹250", emoji: "🧴", stock: 28 },
  ],
};

const EMOJIS = [
  "🥛", "🥦", "🍞", "🍫", "🧼", "🪥", "🥤", "🐟", 
  "🥭", "🍎", "🍌", "🥕", "🥬", "🍊", "🧈", "🥚", "🍅", "🧅", "🍟", "🧴"
];

export default function AddProducts() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    priceRange: "",
    emoji: "🥗",
    stock: 0,
  });

  const categoryRef = useRef(null);
  const emojiRef = useRef(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/products`);
      if (res.data.success) {
        setProductsByCategory(res.data.categories || defaultCategories);
      } else {
        setProductsByCategory(defaultCategories);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProductsByCategory(defaultCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowCategoryDropdown(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedCategories = { ...productsByCategory };
      
      if (editingId) {
        await axios.put(`${API_BASE}/products/${editingId}`, formData);
        Object.keys(updatedCategories).forEach(category => {
          updatedCategories[category] = updatedCategories[category].map(p => 
            p._id === editingId ? formData : p
          );
        });
      } else {
        const res = await axios.post(`${API_BASE}/products`, formData);
        const newProduct = res.data.product || formData;
        newProduct._id = newProduct._id || Date.now().toString();
        
        const category = formData.category || "Uncategorized";
        if (!updatedCategories[category]) {
          updatedCategories[category] = [];
        }
        updatedCategories[category].push(newProduct);
      }

      setProductsByCategory(updatedCategories);
      window.dispatchEvent(new Event("product-updated"));

      setFormData({
        name: "",
        category: "",
        priceRange: "",
        emoji: "🥗",
        stock: 0,
      });
      setEditingId(null);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      
      const updatedCategories = { ...productsByCategory };
      Object.keys(updatedCategories).forEach(category => {
        updatedCategories[category] = updatedCategories[category].filter(p => p._id !== id);
        if (updatedCategories[category].length === 0) {
          delete updatedCategories[category];
        }
      });
      
      setProductsByCategory(updatedCategories);
      window.dispatchEvent(new Event("product-updated"));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleEdit = (p) => {
    setFormData(p);
    setEditingId(p._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-lime-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-xl text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-lime-50 to-emerald-50 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text mb-2">
          Manage Products
        </h1>
        <p className="text-gray-600">Add products organized by category</p>
      </div>

      {/* FORM - 2 COLUMN (KEEP ORIGINAL GOOD FORM) */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-emerald-100 p-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Product Name *</label>
              <input
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Fresh Milk Packet"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div className="mt-6 relative" ref={categoryRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <input
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 pr-12 transition-all relative z-20"
                  placeholder="Type or select (Dairy, Bakery...)"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  onFocus={() => setShowCategoryDropdown(true)}
                  onKeyDown={handleCategoryKeyDown}
                />
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-30 mt-1 max-h-48 overflow-y-auto">
                    {Object.keys(productsByCategory).map((cat) => (
                      <div
                        key={cat}
                        className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setFormData({ ...formData, category: cat });
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {cat} ({productsByCategory[cat].length})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range *</label>
                <input
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="₹50-100"
                  value={formData.priceRange}
                  onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="relative" ref={emojiRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Emoji</label>
                <input
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 pr-12 text-3xl text-center transition-all relative z-20"
                  placeholder="🥛"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  onFocus={() => setShowEmojiDropdown(true)}
                />
                {showEmojiDropdown && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-30 mt-1 grid grid-cols-5 gap-2 p-3 max-h-40 overflow-y-auto">
                    {EMOJIS.map((emoji) => (
                      <div
                        key={emoji}
                        className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-emerald-100 rounded-lg cursor-pointer transition-all hover:scale-110"
                        onClick={() => {
                          setFormData({ ...formData, emoji });
                          setShowEmojiDropdown(false);
                        }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="10"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                />
              </div>

              <button 
                type="submit"
                className="md:col-span-2 mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                {editingId ? "Update Product" : "Add New Product"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ALL PRODUCTS HORIZONTAL - 6 CARDS PER ROW */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text mb-8 flex items-center gap-3">
          All Products ({Object.values(productsByCategory).flat().length} total)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Object.values(productsByCategory).flat().map((p) => (
            <div
              key={p._id}
              className="group bg-white/90 backdrop-blur rounded-xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-emerald-100 hover:border-emerald-200"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform mb-3 mx-auto">
                {p.emoji}
              </div>
              <h4 className="font-bold text-sm text-gray-900 mb-1 text-center line-clamp-2">{p.name}</h4>
              <p className="text-emerald-600 font-semibold text-sm mb-2 text-center">{p.priceRange}</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                <div className={`w-2 h-2 rounded-full ${p.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-600">Stock: {p.stock}</span>
              </div>
              
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-2 px-2 rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center justify-center gap-1"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white py-2 px-2 rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center justify-center gap-1"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {Object.values(productsByCategory).flat().length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h3 className="text-2xl font-bold text-gray-500 mb-2">No products yet</h3>
            <p className="text-lg text-gray-600">Add your first product using the form above</p>
          </div>
        )}
      </div>
    </div>
  );
}

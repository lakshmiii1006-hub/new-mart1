import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Search,
  X,
  Phone,
  ShoppingBag,
  Eye,
  EyeOff,
} from "lucide-react";

const PHONE_NUMBER = "+91 76578 58862";

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

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Products() {
  const [categories, setCategories] = useState(defaultCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [copied, setCopied] = useState(false);

  /* 🔥 FETCH BACKEND PRODUCTS */
  const fetchBackendProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      if (!res.data?.categories) return;

      setCategories((prev) => {
        const merged = { ...prev };

        Object.keys(res.data.categories).forEach((cat) => {
          if (!merged[cat]) {
            merged[cat] = res.data.categories[cat];
          } else {
            const existingIds = new Set(merged[cat].map((p) => p._id));
            const newOnes = res.data.categories[cat].filter(
              (p) => !existingIds.has(p._id)
            );
            merged[cat] = [...merged[cat], ...newOnes];
          }
        });

        return merged;
      });
    } catch (err) {
      console.error("Product fetch failed", err);
    }
  };

  /* ✅ LOAD ON PAGE OPEN */
  useEffect(() => {
    fetchBackendProducts();
  }, []);

  /* ✅ LISTEN TO ADD / UPDATE / DELETE */
  useEffect(() => {
    window.addEventListener("product-updated", fetchBackendProducts);
    return () =>
      window.removeEventListener("product-updated", fetchBackendProducts);
  }, []);

  const filteredCategories = Object.keys(categories).filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-lime-50 to-emerald-50 min-h-screen p-8">
      {/* ===== ANIMATED GROCERY BUBBLES ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[
          { icon: "🥛", size: 90, left: 10, top: 20, delay: 0 },
          { icon: "🍅", size: 85, left: 80, top: 50, delay: 2 },
          { icon: "🍌", size: 100, left: 20, top: 70, delay: 4 },
          { icon: "🍞", size: 95, left: 75, top: 30, delay: 6 },
          { icon: "🍫", size: 80, left: 90, top: 65, delay: 8 },
          { icon: "🧼", size: 105, left: 5, top: 85, delay: 10 },
        ].map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute opacity-40 drop-shadow-2xl"
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180],
              scale: [1, 1.1, 1],
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, delay: bubble.delay },
              rotate: { duration: 15, repeat: Infinity },
              scale: { duration: 3, repeat: Infinity },
            }}
          >
            <span className="block w-full h-full flex items-center justify-center text-4xl">{bubble.icon}</span>
          </motion.div>
        ))}
      </div>

      {/* ===== BACKGROUND ORBS ===== */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-[120px] z-0" />
      <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-lime-400/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-emerald-400/15 rounded-full blur-[120px] z-0" />

      <div className="relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text"
        >
          Shop by Category
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-12"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            className="w-full p-4 pl-12 rounded-xl border border-emerald-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
            placeholder="Search categories (Dairy, Fruits, Snacks...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <motion.button
              whileHover={{ scale: 0.95 }}
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </motion.button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredCategories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              onClick={() =>
                setSelectedCategory({ name: cat, products: categories[cat] })
              }
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 cursor-pointer shadow-xl hover:shadow-2xl border border-emerald-100/50 hover:border-yellow-300/70 transition-all duration-500 overflow-hidden h-[280px] flex flex-col"
            >
              <div className="text-5xl mb-6 mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400/80 to-emerald-500/80 flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/25 group-hover:scale-110 transition-all duration-500">
                {categories[cat][0]?.emoji || "🛒"}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-emerald-600 transition-colors">
                {cat}
              </h2>
              <p className="text-emerald-600 font-semibold text-lg text-center mb-6 flex items-center justify-center gap-2">
                {categories[cat].length} Products
                <span className="text-2xl">→</span>
              </p>
              <p className="text-sm text-gray-600 mt-auto text-center leading-relaxed">
                Fresh daily stock available
              </p>
            </motion.div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-20">
          {[
            { num: "1000+", label: "Products" },
            { num: "50+", label: "Categories" },
            { num: "Daily", label: "Fresh Stock" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center p-6 bg-white/70 rounded-xl backdrop-blur-sm shadow-lg"
            >
              <p className="text-2xl lg:text-3xl font-bold text-emerald-600">{stat.num}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-emerald-200/50"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute right-6 top-6 p-2 bg-white/50 hover:bg-white rounded-2xl shadow-lg transition-all"
            >
              <X className="w-6 h-6 text-gray-600" />
            </motion.button>

            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text">
              {selectedCategory.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {selectedCategory.products.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-2xl border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 flex items-start gap-4"
                >
                  <div className="text-4xl flex-shrink-0 p-3 bg-white/50 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xl text-gray-900 mb-1 leading-tight">{p.name}</h4>
                    <p className="text-emerald-600 font-semibold text-lg mb-3">{p.priceRange}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        Stock: {p.stock}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(PHONE_NUMBER);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch {
                  alert("Copy failed");
                }
              }}
              className="w-full bg-gradient-to-r from-emerald-600 to-yellow-500 text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-3 mx-auto max-w-sm"
            >
              <Phone className="w-6 h-6" />
              {copied ? "✅ Number Copied!" : "📞 Call Now"}
            </motion.button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Open 7AM - 11PM Daily | Shaktinagar, Mangalore
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

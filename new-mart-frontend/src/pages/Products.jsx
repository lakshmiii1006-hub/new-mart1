import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Search,
  X,
  Phone,
} from "lucide-react";

const PHONE_NUMBER = "+91 76578 58862";

// ✅ API BASE (already includes /api)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Products() {
  // ✅ IMPORTANT: start EMPTY (backend is source of truth)
  const [categories, setCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [copied, setCopied] = useState(false);

  /* ✅ FETCH PRODUCTS FROM BACKEND */
  const fetchBackendProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      if (res.data?.categories) {
        setCategories(res.data.categories); // ✅ REPLACE, NOT MERGE
      }
    } catch (err) {
      console.error("Product fetch failed", err);
    }
  };

  /* ✅ LOAD ON PAGE OPEN */
  useEffect(() => {
    fetchBackendProducts();
  }, []);

  /* ✅ LISTEN TO ADMIN ADD / UPDATE / DELETE (same tab) */
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

      {/* ===== BACKGROUND ANIMATION ===== */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-lime-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-emerald-400/15 rounded-full blur-[120px]" />

      <div className="relative z-10">
        {/* ===== TITLE ===== */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text"
        >
          Shop by Category
        </motion.h1>

        {/* ===== SEARCH ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-12 max-w-3xl mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            className="w-full p-4 pl-12 rounded-xl border border-emerald-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
            placeholder="Search categories (Dairy, Fruits, Snacks...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </motion.div>

        {/* ===== CATEGORY CARDS ===== */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h3 className="text-2xl font-bold text-gray-500 mb-2">
              No products available
            </h3>
            <p className="text-lg text-gray-600">
              Please check back later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredCategories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() =>
                  setSelectedCategory({
                    name: cat,
                    products: categories[cat],
                  })
                }
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 cursor-pointer shadow-xl hover:shadow-2xl border border-emerald-100 transition-all duration-300 h-[280px] flex flex-col"
              >
                <div className="text-5xl mb-6 mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-emerald-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  {categories[cat]?.[0]?.emoji || "🛒"}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  {cat}
                </h2>
                <p className="text-emerald-600 font-semibold text-lg text-center">
                  {categories[cat].length} Products →
                </p>
                <p className="text-sm text-gray-600 mt-auto text-center">
                  Fresh daily stock
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ===== PRODUCT MODAL ===== */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute right-6 top-6"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <h2 className="text-3xl font-bold mb-8 text-center">
              {selectedCategory.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {selectedCategory.products.map((p) => (
                <div
                  key={p._id}
                  className="bg-emerald-50 p-6 rounded-2xl shadow-md flex gap-4"
                >
                  <div className="text-4xl">{p.emoji}</div>
                  <div>
                    <h4 className="font-bold text-lg">{p.name}</h4>
                    <p className="text-emerald-600 font-semibold">
                      {p.priceRange}
                    </p>
                    <p className="text-sm text-gray-600">
                      Stock: {p.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                await navigator.clipboard.writeText(PHONE_NUMBER);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold"
            >
              {copied ? "✅ Number Copied!" : "📞 Call Now"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

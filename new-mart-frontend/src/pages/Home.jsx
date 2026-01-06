import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { name: "Fresh Dairy", icon: "🥛", desc: "Milk, curd, butter, paneer" },
  { name: "Fruits & Vegetables", icon: "🥦", desc: "Farm fresh produce" },
  { name: "Bakery", icon: "🍞", desc: "Bread, cakes & pastries" },
  { name: "Snacks", icon: "🍫", desc: "Biscuits & chocolates" },
  { name: "Household", icon: "🧼", desc: "Cleaning essentials" },
  { name: "Personal Care", icon: "🪥", desc: "Health & hygiene" },
];

const features = [
  { icon: "🌿", title: "100% Fresh", desc: "Direct from local farmers" },
  { icon: "⚡", title: "Same Day", desc: "Ready for pickup today" },
  { icon: "🏪", title: "Local Store", desc: "Visit us anytime" },
  { icon: "👨‍👩‍👧", title: "Family Owned", desc: "15+ years serving community" },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-lime-50 to-emerald-50 min-h-screen">
      
      {/* ===== BIGGER ANIMATED GROCERY BUBBLES ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[
          { icon: "🥭", size: 110, left: 10, top: 20, delay: 0 },
          { icon: "🍎", size: 95, left: 85, top: 40, delay: 2 },
          { icon: "🥕", size: 100, left: 20, top: 70, delay: 4 },
          { icon: "🍌", size: 120, left: 70, top: 25, delay: 6 },
          { icon: "🥬", size: 90, left: 90, top: 60, delay: 8 },
          { icon: "🍊", size: 105, left: 5, top: 85, delay: 10 },
        ].map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute opacity-50 drop-shadow-2xl"
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, delay: bubble.delay },
              rotate: { duration: 20, repeat: Infinity },
              scale: { duration: 4, repeat: Infinity }
            }}
          >
            <span className="block w-full h-full flex items-center justify-center text-5xl">{bubble.icon}</span>
          </motion.div>
        ))}
      </div>

      {/* ===== BACKGROUND ORBS ===== */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-[120px] z-0" />
      <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-lime-400/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-emerald-400/15 rounded-full blur-[120px] z-0" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 z-20"
          >
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text leading-tight">
              NEW MART
              <span className="block mt-3 text-xl font-medium text-yellow-600">
                Shaktinagar, Mangalore
              </span>
            </h1>

            <p className="text-lg text-gray-700 max-w-lg leading-relaxed">
              Family-owned local grocery store serving fresh produce and daily essentials for 15+ years.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {["500+", "1000+", "15+"].map((t, i) => (
                <div key={i} className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <p className="text-2xl font-bold text-emerald-600">{t}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {["Daily Customers", "Products", "Years"][i]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/70 z-20 w-full max-w-md mx-auto lg:max-w-none"
          >
            <img
              src="https://res.cloudinary.com/dyxijlh28/image/upload/v1767494042/WhatsApp_Image_2026-01-04_at_7.52.00_AM_qot2ll.jpg"
              alt="New Mart Store"
              className="w-full h-full lg:h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text">
            Why Choose New Mart
          </h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Quality products from your neighborhood store
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl border border-emerald-100/50 transition-all duration-300"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="relative z-10 py-20 bg-white/40 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text">
            Shop by Category
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-yellow-300/60 transition-all duration-400 cursor-pointer"
              >
                <div className="text-4xl mb-4 mx-auto w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-400/80 to-emerald-500/80 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-400">
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-emerald-600">{c.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-yellow-500/10 to-emerald-500/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text">
              Your Neighborhood Grocery
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                <div className="text-3xl mb-4">📞</div>
                <p className="text-2xl font-bold text-gray-900">+91 76578 58862</p>
                <p className="text-emerald-600 font-semibold mt-1">7AM - 11PM Daily</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                <div className="text-3xl mb-4">📍</div>
                <p className="text-xl font-bold text-gray-900">Shaktinagar, Mangalore</p>
                <p className="text-sm text-gray-600 mt-2">2 min walk from main road</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Family-owned for 15+ years. Fresh vegetables, dairy, and daily essentials from your trusted local store.
            </p>
          </div>
        </div>
      </section>

     
          
         
        </div>
    
    
  );
}

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-yellow-50 via-lime-50 to-emerald-50">
      
      {/* Subtle 2 animated elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute opacity-30 drop-shadow-xl"
          style={{ left: '15%', top: '25%', width: 100, height: 100 }}
          animate={{ y: [0, -20, 0], rotate: [0, 180] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="block w-full h-full flex items-center justify-center text-4xl">🥦</span>
        </motion.div>
        <motion.div
          className="absolute opacity-30 drop-shadow-xl"
          style={{ right: '15%', top: '60%', width: 90, height: 90 }}
          animate={{ y: [0, -25, 0], rotate: [0, -180] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        >
          <span className="block w-full h-full flex items-center justify-center text-4xl">🥛</span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text leading-tight">
            About New Mart
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Established in 2010, New Mart has been serving Shaktinagar with quality groceries for over 15 years. 
              We combine traditional values with modern retail standards.
            </p>
            <div className="flex justify-center items-center gap-8 text-sm">
              <div><span className="text-3xl font-bold text-emerald-600 block">500+</span>Daily Customers</div>
              <div><span className="text-3xl font-bold text-yellow-600 block">1000+</span>Total Products</div>
              <div><span className="text-3xl font-bold text-gray-900 block">15+</span>Years Experience</div>
            </div>
          </div>
        </motion.section>

        {/* Our Journey */}
        <section className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text"
          >
            Our Journey
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2010 - Humble Beginnings</h3>
                <p className="text-gray-700 leading-relaxed">
                  Started with 200 sq ft space stocking basic vegetables, milk and bread. Served 20 families daily.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2020 - Community Favorite</h3>
                <p className="text-gray-700 leading-relaxed">
                  Expanded to 1500 sq ft with complete grocery range. Now serves 500+ families daily.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-8 rounded-2xl shadow-xl text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-2xl font-bold mb-2">15 Years Growth</h3>
                <p>From 20 to 500+ daily customers</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Today</h3>
                <p className="text-xl font-semibold text-emerald-600">Mangalore's trusted local supermarket</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text"
          >
            What Makes Us Different
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: '🥛', 
                title: 'Fresh Dairy Daily', 
                desc: 'Milk delivered fresh from authorized suppliers',
                stat: '50L Daily'
              },
              { 
                icon: '⚖️', 
                title: 'Certified Weights', 
                desc: 'Government approved digital weighing scales',
                stat: '100% Accurate'
              },
              { 
                icon: '🧹', 
                title: 'Cleanliness First', 
                desc: 'Store sanitized 8 times daily',
                stat: '8x Daily'
              },
              { 
                icon: '🏷️', 
                title: 'Transparent Pricing', 
                desc: 'Printed MRP on every item, no hidden charges',
                stat: 'MRP Pricing'
              },
              { 
                icon: '👨‍⚕️', 
                title: 'Expiry Control', 
                desc: 'Products rotated by FIFO method daily',
                stat: 'Zero Waste'
              },
              { 
                icon: '📦', 
                title: 'Stock Management', 
                desc: 'Digital inventory tracking system',
                stat: '2000+ SKUs'
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white shadow-lg hover:shadow-xl rounded-2xl p-8 border border-gray-100 hover:border-emerald-200 transition-all duration-400 hover:bg-emerald-50/50"
              >
                <div className="text-4xl mb-6 mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-700">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">{feature.desc}</p>
                <div className="text-emerald-600 font-bold text-lg">{feature.stat}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* NEW Store Operations - Real Supermarket Processes */}
        <section className="mb-24 bg-white/60 backdrop-blur-sm rounded-3xl p-12 lg:p-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text"
          >
            Daily Store Operations
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-12 text-center">
            {[
              {
                icon: '🛒',
                title: 'Stock Replenishment',
                detail: '5:30 AM',
                subtitle: 'Fresh stock arrangement before opening'
              },
              {
                icon: '🔍',
                title: 'Quality Inspection',
                detail: '6:30 AM',
                subtitle: 'All perishables checked before display'
              },
              {
                icon: '⚖️',
                title: 'Scale Calibration',
                detail: 'Daily',
                subtitle: 'Government approved verification process'
              }
            ].map((operation, i) => (
              <motion.div
                key={operation.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-2xl bg-gradient-to-br from-yellow-50 to-emerald-50 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-emerald-300 transition-all"
              >
                <div className="text-5xl mb-8 mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">{operation.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700">{operation.title}</h3>
                <p className="text-3xl font-black text-emerald-600 mb-2">{operation.detail}</p>
                <p className="text-gray-600 font-medium">{operation.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold mb-16 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text"
          >
            Store Information
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-xl"
            >
              <div className="text-6xl mb-8 mx-auto w-28 h-28 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl">📞</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact</h3>
                <p className="text-3xl font-black text-emerald-600 mb-4">+91 76578 58862</p>
                <p className="text-lg text-gray-600">Store Direct Line</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-gray-200 hover:border-yellow-300 transition-all hover:shadow-xl"
            >
              <div className="text-6xl mb-8 mx-auto w-28 h-28 bg-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl">📍</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Location</h3>
                <p className="text-xl font-semibold text-gray-900 mb-2">Shaktinagar Main Road</p>
                <p className="text-lg text-gray-700 mb-4">Next to SBI ATM, Mangalore</p>
                <p className="text-emerald-600 font-bold">7 AM - 11 PM Daily</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

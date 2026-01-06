import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Contact() {
  const handleViewLargerMap = () => {
    window.open('https://maps.app.goo.gl/Nr2qcJQXWQuR57hC9', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-lime-50 to-emerald-50 min-h-screen py-20 px-6">
      
      {/* 6 ANIMATED GROCERIES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[
          { icon: '🥦', left: '10%', top: '15%', size: 90, delay: 0 },
          { icon: '🥛', left: '80%', top: '25%', size: 85, delay: 1.5 },
          { icon: '🍎', right: '15%', top: '50%', size: 95, delay: 3 },
          { icon: '🍞', left: '20%', top: '65%', size: 88, delay: 4.5 },
          { icon: '🍌', right: '25%', top: '75%', size: 92, delay: 6 },
          { icon: '🥭', left: '5%', top: '85%', size: 87, delay: 7.5 }
        ].map((item, i) => (
          <motion.div 
            key={i}
            className="absolute opacity-40 drop-shadow-2xl"
            style={{ 
              left: item.left, 
              right: item.right, 
              top: item.top,
              width: item.size,
              height: item.size
            }}
            animate={{ 
              y: [0, -25, 0], 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              y: { duration: 8, repeat: Infinity, delay: item.delay },
              rotate: { duration: 25, repeat: Infinity },
              scale: { duration: 6, repeat: Infinity, delay: item.delay }
            }}
          >
            <span className="block w-full h-full flex items-center justify-center text-4xl lg:text-5xl">
              {item.icon}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-emerald-700 to-yellow-600 bg-clip-text leading-tight">
            Contact New Mart
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed bg-white/70 backdrop-blur-sm rounded-xl p-4">
            Your neighborhood grocery store - always ready to serve you
          </p>
        </motion.section>

        {/* Contact Cards - CLEANER & SMALLER */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* Phone - Compact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="group bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-400 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105">
                  <Phone size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 mb-1">Store Phone</h3>
                  <p className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-yellow-500 bg-clip-text text-transparent">
                    +91 76578 58862
                  </p>
                </div>
              </div>
              <p className="text-sm text-emerald-600 font-medium ml-4">Direct store line</p>
            </motion.div>

            {/* Location - Compact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-yellow-200 transition-all duration-400 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105">
                  <MapPin size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 mb-1">Store Location</h3>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900 break-words">Gopalakrishna Temple Rd</p>
                    <p className="text-sm font-semibold text-gray-900 break-words">Shakti Nagar, Mangaluru</p>
                    <p className="text-xs text-gray-600">Karnataka 575016</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-emerald-600 font-medium ml-4">Next to SBI ATM</p>
            </motion.div>

            {/* Hours - Compact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="group bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-400 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105">
                  <Clock size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 mb-1">Store Hours</h3>
                  <p className="text-xl lg:text-2xl font-black text-gray-900">7AM - 11PM</p>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-emerald-600 font-bold">Open 365 Days</p>
                <p className="text-xs text-emerald-500 font-medium">Sundays & Festivals too</p>
              </div>
            </motion.div>
          </div>

          {/* MAP - Slightly Smaller */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl shadow-xl overflow-hidden bg-white/70 backdrop-blur-sm border border-emerald-200/50"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.414989316614!2d74.87234561476636!3d12.89999969070945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae919a9b6b6b6d%3A0x9b6b6b6d9b6b6b6d!2sGopalakrishna%20Temple%20Rd%2C%20Shakti%20Nagar%2C%20Mangaluru%2C%20Karnataka%20575016!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[420px] rounded-2xl pointer-events-none"
              title="New Mart Location Map"
            />
            
            {/* MAP BUTTON - Compact */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewLargerMap}
                className="w-full bg-gradient-to-r from-emerald-500 to-yellow-500 text-white py-3 px-6 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all duration-300 bg-white/90 backdrop-blur-sm"
              >
                <MapPin size={16} />
                <span>View Larger Map</span>
                <ExternalLink size={14} />
              </motion.button>
            </div>
            
            {/* Top badge - Smaller */}
            <div className="absolute top-3 left-3 bg-emerald-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-lg font-bold text-xs">
              📍 Store Location
            </div>
          </motion.div>
        </div>

        {/* Welcome Message - Compact */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl p-8 lg:p-12 border border-emerald-200/50 shadow-xl"
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text">
            Ready to Visit?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Swing by our Shaktinagar store today! Just a 2-minute walk from the main road, 
            next to SBI ATM. Park nearby and enjoy fresh groceries with a smile. 
            We're open 16 hours daily serving 100+ happy families!
          </p>
        </motion.section>
      </div>
    </div>
  );
}

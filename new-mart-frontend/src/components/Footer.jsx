import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-3xl font-black gradient-text-hero mb-4">🛒 New Mart</div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Your trusted neighborhood supermarket in Shaktinagar, Mangalore since 2010.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <div className="font-semibold text-white">+91 98452 34567</div>
                <div className="text-sm text-gray-400">24/7 Customer Care</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all">Home</Link>
              <Link to="/about" className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all">About Us</Link>
              <Link to="/products" className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all">Products</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all">Contact</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6">Categories</h3>
            <div className="space-y-3 text-sm">
              <div className="text-gray-300 hover:text-white hover:translate-x-2 transition-all">Fresh Dairy</div>
              <div className="text-gray-300 hover:text-white hover:translate-x-2 transition-all">Fruits & Vegetables</div>
              <div className="text-gray-300 hover:text-white hover:translate-x-2 transition-all">Bakery</div>
              <div className="text-gray-300 hover:text-white hover:translate-x-2 transition-all">Household</div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6">Store Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock size={20} />
                <span>Mon-Sun: 6AM - 11PM</span>
              </div>
              <div className="text-lg font-semibold text-orange-400 mt-4">Open 365 Days!</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 New Mart Supermarket - Shaktinagar, Mangalore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
    { name: 'Testimonials', path: '/testimonials' }
  ];

  return (
    <>
      {/* Top Bar - Full Width Green */}
      <div className="bg-emerald-600 text-white py-2.5">
        <div className="mx-4 flex items-center justify-between text-sm font-medium">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <MapPin size={16} />
              <span>Shaktinagar, Mangalore</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Phone size={16} />
              <span>+91 98452 34567</span>
            </div>
          </div>
          <div className="font-semibold">Open 6AM - 11PM</div>
        </div>
      </div>

      {/* Main Header - NO SIDE PADDING */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="py-4">
          <div className="flex items-center justify-between mx-4">
            
            {/* Logo - Flush Left */}
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors">
              <span className="text-2xl">🛒</span>
              <span>New Mart</span>
            </Link>

            {/* Desktop Navigation - Flush Right */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium text-sm text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side - Flush Right */}
            <div className="flex items-center space-x-2">
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <Settings size={16} />
                <span>Admin DashBoard</span>
              </Link>

              <button
                className="md:hidden p-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900/50 z-50" onClick={() => setMobileOpen(false)}>
          <div className="bg-white w-72 h-full absolute right-0 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900" onClick={() => setMobileOpen(false)}>
                <span className="text-2xl">🛒</span>
                <span>New Mart</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            
            <nav className="space-y-4 mb-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block p-4 font-medium rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/admin"
                className="w-full flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                onClick={() => setMobileOpen(false)}
              >
                <Settings size={20} />
                <span>Admin Panel</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

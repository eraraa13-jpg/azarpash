import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Header: React.FC = () => {
  const { cart } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">آ</span>
            </div>
            <span className="text-xl font-bold text-gray-900">آذرپاش</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              صفحه اصلی
            </Link>
            <Link to="/?category=استند موبایل" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              استند موبایل
            </Link>
            <Link to="/?category=استند لپتاپ" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              استند لپتاپ
            </Link>
            <Link to="/?category=لوازم اداری" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              لوازم اداری
            </Link>
            <Link to="/?category=پک اداری" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              پک اداری
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی محصولات..."
                className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                autoFocus
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
            <nav className="flex flex-col gap-3">
              <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">
                صفحه اصلی
              </Link>
              <Link to="/?category=استند موبایل" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">
                استند موبایل
              </Link>
              <Link to="/?category=استند لپتاپ" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">
                استند لپتاپ
              </Link>
              <Link to="/?category=لوازم اداری" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">
                لوازم اداری
              </Link>
              <Link to="/?category=پک اداری" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2">
                پک اداری
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

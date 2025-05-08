
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="bg-primary sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-xl font-semibold flex-shrink-0">
            ECCO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-secondary-light transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-secondary-light transition-colors">
              Shop
            </Link>
            <Link to="/categories" className="text-white hover:text-secondary-light transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-white hover:text-secondary-light transition-colors">
              About
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch} 
              className="text-white hover:text-secondary-light transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="text-white hover:text-secondary-light transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <Link to="/account" className="text-white hover:text-secondary-light transition-colors hidden md:block">
              <User className="h-5 w-5" />
            </Link>
            <button 
              onClick={toggleMenu} 
              className="text-white md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 animate-fade-in">
            <div className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <button 
                onClick={toggleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 animate-fade-in md:hidden">
            <ul className="space-y-3">
              <li>
                <Link to="/" className="block py-2 px-4 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="block py-2 px-4 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className="block py-2 px-4 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-4 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/account" className="block py-2 px-4 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                  Account
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

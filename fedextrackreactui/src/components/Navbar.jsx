import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors">
      ShopLoop
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-yellow-400 transition-colors">Products</Link>
          <Link to="/cart" className="hover:text-yellow-400 transition-colors">Cart</Link>
          <Link to="/about" className="hover:text-yellow-400 transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
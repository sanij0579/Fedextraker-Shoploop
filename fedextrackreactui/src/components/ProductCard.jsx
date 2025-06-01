import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-xl transition-shadow">
      <img src={product.pic} alt={product.title} className="w-24 h-24 object-cover rounded-md" />

      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <p className="text-md text-gray-700 mt-2 font-semibold">₹{product.price}</p>
        <p className="text-xs text-gray-400 mt-1">Tracking #: {product.trackingNumber}</p>
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-auto">
        <Link
          to={`/track/${product.trackingNumber}`}
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-4 py-2 rounded-md shadow-sm transition-colors"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
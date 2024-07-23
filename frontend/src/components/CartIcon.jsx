import React from 'react';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="flex items-center space-x-2">
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-gray-700 dark:text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>

        {totalQuantity > 0 && (
          <div 
            tabIndex={0} 
            className="dropdown-content mt-3 p-4 w-52 bg-white shadow-lg rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {totalQuantity} items
              </span>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Quantity</span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {totalQuantity}
                </span>
              </div>
              <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartIcon;

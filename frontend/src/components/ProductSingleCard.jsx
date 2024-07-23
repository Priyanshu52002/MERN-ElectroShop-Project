import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductSingleCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  const itemInCart = cartItems.find(item => item._id === product._id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => addToCart(product);
  const handleRemoveFromCart = () => removeFromCart(product._id);

  // Truncate description to 15 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : description;
  };

  const truncatedDescription = truncateDescription(product.description);
  const shouldShowReadMore = product.description.split(' ').length > 15;

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center" 
        />
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">
            {isDescriptionExpanded ? product.description : truncatedDescription}
            {shouldShowReadMore && (
              <button 
                className="text-blue-600 ml-1 focus:outline-none"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm font-medium text-green-700">₹{product.price_in_rs}</p>
          <div className="flex space-x-2">
            {quantity > 0 ? (
              <button 
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 font-medium rounded text-sm transition duration-500 ease-in-out transform hover:scale-105"
                onClick={handleRemoveFromCart}
              >
                Remove
              </button>
            ) : (
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 font-medium rounded text-sm transition duration-500 ease-in-out transform hover:scale-105"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSingleCard;

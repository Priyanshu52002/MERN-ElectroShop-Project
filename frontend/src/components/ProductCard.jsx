import React from 'react';
import ProductSingleCard from './ProductSingleCard';

const ProductCard = ({ products }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1200px] mx-auto p-4">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((item) => (
          <ProductSingleCard key={item._id} product={item} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No products available at the moment.
        </div>
      )}
    </div>
  );
};

export default ProductCard;

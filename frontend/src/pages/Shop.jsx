import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const Shop = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cateogary, setCateogary] = useState('');
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        axios.defaults.withCredentials=true;
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/product/getProducts`);
        console.log(response.data.products); // Ensure data is as expected
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  const filterProducts = () => {
    if (!Array.isArray(product)) {
      console.error("Products is not an array:", product);
      return;
    }

    let filtered = [...product];

    if (cateogary !== '') {
      filtered = filtered.filter((product) => product.cateogary === cateogary);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [product, cateogary]);


  return (
    <div>
    <Navbar/>
    <div className="p-4 max-w-[1300px] mx-auto mt-16">
      
      <div className="filters flex justify-between mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>

          <select value={cateogary} onChange={(e) => setCateogary(e.target.value)}
                                   className="select select-bordered w-full max-w-xs">
             <option value="">All</option>
            <option value="Smart Phones">Smart Phones</option>
            <option value="Laptops">Laptops</option>
            <option value="Speakers">Speakers</option>
            <option value="HeadPhones">HeadPhones</option>
          </select>

        </div>
      </div>

        <ProductCard products={filteredProducts} />
      </div>
      <Footer/>
    </div>
  )
}

export default Shop;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        axios.defaults.withCredentials=true;
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/product/getProducts`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
    <Navbar/>
    <div className="p-4 max-w-[1300px] mx-auto my-16">

      <div className="hero-content text-center mb-24">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-deep-blue">
            Welcome to <span className="text-teal-600">ElectroShop</span>
          </h1>
          <p className="py-6 text-gray-700">
            Discover the latest in electronics with our top-quality gadgets, appliances, and accessories.
          </p> 
          <Link to="/Shop" className="btn btn-primary mt-4">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="mb-16 text-center">
        <h2 className="text-3xl font-semibold text-deep-blue mb-6">Featured Products</h2>
        <ProductCard products={featuredProducts} />
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;

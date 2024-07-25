import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stats from '../components/Stats';
import AdminNavbar from '../components/AdminNavbar';

const Admin = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                axios.defaults.withCredentials = true;
                const authorised = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/admin`);
                if (authorised) {
                    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/product/admin`);
                    setProduct(res.data.products);
                }
                else{
                    console.log("you are not authorised");
                    return ;
            } catch (error) {
                console.error('Error fetching products:', error);
                navigate('/login'); // useNavigate hook for navigation
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]); // Include navigate in dependency array

    if (loading) {
        return <div className='text-center text-gray-700'>Loading...</div>;
    }

    // Truncate description to 15 words
    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : description;
    };

    const handleToggleDescription = (id) => {
        setExpandedDescriptions(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div>
            <AdminNavbar/>
            <Stats />
            <div className='px-4 py-8 max-w-7xl mx-auto'>
                <h2 className='text-2xl font-bold tracking-tight text-green-800 mb-6'>Product Management</h2>

                <div className='mb-6'>
                    <Link
                        to='/admin/product/create'
                        className='bg-green-600 hover:bg-green-700 py-2 px-4 font-medium rounded-lg shadow-md text-white transition duration-500 ease-in-out transform hover:scale-105'
                    >
                        Add Item +
                    </Link>
                </div>

                <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {product.map((item) => (
                        <div
                            key={item._id}
                            className='relative bg-white p-4 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105'
                        >
                            <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100'>
                                <img src={item.image} alt={item.name} className='w-full h-full object-cover object-center' />
                            </div>
                            <div className='mt-4 flex flex-col justify-between'>
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-900'>{item.name}</h3>
                                    <p className='text-sm text-gray-600'>
                                        {expandedDescriptions[item._id]
                                            ? item.description
                                            : truncateDescription(item.description)}
                                        {item.description && (
                                            <button
                                                className='text-blue-600 ml-1 focus:outline-none'
                                                onClick={() => handleToggleDescription(item._id)}
                                            >
                                                {expandedDescriptions[item._id] ? ' Show Less' : ' Read More'}
                                            </button>
                                        )}
                                    </p>
                                    <p className='text-sm text-gray-600'>{item.cateogary}</p>
                                </div>
                                <div className='mt-4 flex justify-between items-center'>
                                    <p className='text-sm font-medium text-green-700'>₹{item.price_in_rs}</p>
                                    <div className='flex space-x-2'>
                                        <Link
                                            to={`/admin/product/edit/${item._id}`}
                                            className='bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 font-medium rounded text-sm transition duration-500 ease-in-out transform hover:scale-105'
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/admin/product/delete/${item._id}`}
                                            className='bg-red-500 hover:bg-red-600 text-white py-1 px-3 font-medium rounded text-sm transition duration-500 ease-in-out transform hover:scale-105'
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;

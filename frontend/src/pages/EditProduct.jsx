import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const EditProduct = () => {
    const [name, setName] = useState('');
    const [priceInRs, setPriceInRs] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/product/getProduct/${id}`);
                const { product } = response.data;
                setName(product.name);
                setPriceInRs(product.price_in_rs);
                setDescription(product.description || '');
                setCategory(product.cateogary || '');
            } catch (error) {
                console.error('Error fetching product:', error);
                enqueueSnackbar('Error fetching product', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, enqueueSnackbar]);

    const handleEditProduct = async () => {
        const data = { name, price_in_rs: priceInRs, description, cateogary:category };
        setLoading(true);
        try {
            axios.defaults.withCredentials=true;
            await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/product/update/${id}`, data);
            enqueueSnackbar('Product edited successfully', { variant: 'success' });
            navigate('/admin');
        } catch (error) {
            enqueueSnackbar('Error editing product', { variant: 'error' });
            console.error('Error editing product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            {loading && <Spinner />}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-2xl font-bold leading-9 text-green-800">Edit Product</h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleEditProduct(); }}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-700">Name</label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="priceInRs" className="block text-sm font-medium leading-6 text-gray-700">Price in Rs</label>
                            <div className="mt-2">
                                <input
                                    id="priceInRs"
                                    name="priceInRs"
                                    type="number"
                                    value={priceInRs}
                                    onChange={(e) => setPriceInRs(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-700">Description</label>
                            <div className="mt-2">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-700">Category</label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="Smart Phones">Smart Phones</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Speakers">Speakers</option>
                                    <option value="HeadPhones">HeadPhones</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;

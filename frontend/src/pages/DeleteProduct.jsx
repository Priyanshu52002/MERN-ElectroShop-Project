import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const DeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const handleDeleteProduct = async () => {
        setLoading(true);
        try {
            axios.defaults.withCredentials=true;
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/product/delete/${id}`, config);
            enqueueSnackbar('Product deleted successfully', { variant: 'success' });
            navigate('/admin');
        } catch (error) {
            enqueueSnackbar('Error deleting product', { variant: 'error' });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {loading && <Spinner />}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-2xl font-bold leading-9 text-green-800">Delete Product</h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="mb-6">
                        <Link
                            to="/admin"
                            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 font-medium rounded-lg shadow-md text-white"
                        >
                            Back
                        </Link>
                    </div>
                    <h2 className="text-xl mb-4 font-semibold text-gray-800">Are you sure you want to delete this product?</h2>
                    <button
                        onClick={handleDeleteProduct}
                        className="flex w-full justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 transition duration-300 ease-in-out"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProduct;

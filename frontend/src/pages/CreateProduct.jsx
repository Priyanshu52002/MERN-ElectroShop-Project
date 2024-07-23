import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [priceInRs, setPriceInRs] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImg(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImgPreview(null);
        }
    };

    const uploadFile = async () => {
        if (!img) {
            enqueueSnackbar('No image selected', { variant: 'warning' });
            return;
        }

        const data = new FormData();
        data.append('file', img);

        try {
            const uploadUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/upload-image`;
            const res = await axios.post(uploadUrl, data);
            const { secure_url } = res.data;
            enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
            return secure_url;
        } catch (error) {
            enqueueSnackbar('Failed to upload an image', { variant: 'error' });
        }
    };

    const handleSaveProduct = async () => {
        if (!name || !priceInRs || !category) {
            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
            return;
        }

        const price = parseInt(priceInRs);
        if (isNaN(price) || price <= 0) {
            enqueueSnackbar('Price must be a positive number', { variant: 'warning' });
            return;
        }

        setLoading(true);

        try {
            const uploadedImageUrl = await uploadFile();
            if (!uploadedImageUrl) {
                throw new Error('Image upload failed');
            }

            const formData = {
                name,
                price_in_rs: priceInRs,
                description,
                image: uploadedImageUrl,
                cateogary: category
            };
            axios.defaults.withCredentials = true;
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/product/create`, formData);
            enqueueSnackbar('Product saved successfully', { variant: 'success' });
            navigate('/admin');
        } catch (error) {
            enqueueSnackbar('Error saving product: ' + (error.response?.data?.message || error.message), { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {loading && <Spinner />}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold leading-9 text-blue-600">Create Product</h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white p-8 shadow-lg rounded-lg border border-gray-300">
                    <div className="mb-6">
                        <Link to="/admin" className="bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white font-semibold rounded-lg shadow-md">
                            Back
                        </Link>
                    </div>
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveProduct(); }}>
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
                                    className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                                    className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                                    className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                                    className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                            <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-700">Upload Image</label>
                            <div className="mt-2">
                                <input
                                    id="img"
                                    name="img"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {imgPreview && (
                            <div className="my-4">
                                <img src={imgPreview} alt="Preview" className="w-full h-auto rounded-md" />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4 shadow-md"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;

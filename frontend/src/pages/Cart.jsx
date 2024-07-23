import { useSnackbar } from 'notistack';
import React from 'react';
import { useCart } from "../context/CartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51Pc7c42K9g4ItOc69wO3WULyJ4WKSuR0hYEjdIpFATWr3uvl1R7gu7orVexvG3161fgUhnCL5ygEwFrUxrDGUhbc00O97zm1AB');

const Cart = () => {
    const { cartItems, decreaseCartItemQuantity, addToCart, clearCart } = useCart();
    const { enqueueSnackbar } = useSnackbar();
    if (cartItems.length === 0) {
        return <div className='text-gray-800 dark:text-gray-200 text-3xl text-center my-72'>Your cart is empty.</div>;
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price_in_rs * item.quantity, 0);

    // Handle checkout
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        // Transform cart items to match Stripe requirements
        const transformedItems = cartItems.map(item => ({
            name: item.name,
            price_in_rs: item.price_in_rs,
            quantity: item.quantity,
            image: item.image
        }));
        
        try { 
            axios.defaults.withCredentials=true;
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/stripe/create-checkout-session`, {
                products: transformedItems
            },{withCredentials: true});

            const { error } = await stripe.redirectToCheckout({
                sessionId: response.data.id
            });

            if (error) {
                console.error('Error during Stripe checkout redirection:', error);
            }
        } catch (error) {
            console.error('Checkout process error:', error);
            enqueueSnackbar('Login First ', { variant: 'warning' });
        }
    };

    return (
        <div>
            <Navbar/>
            <div className=" py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold">Price</th>
                                            <th className="text-left font-semibold">Quantity</th>
                                            <th className="text-left font-semibold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <img className="h-16 w-16 mr-4 rounded-md" src={item.image} alt={item.name} />
                                                        <span className="font-semibold">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">₹{item.price_in_rs}</td>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <button 
                                                            onClick={() => decreaseCartItemQuantity(item._id)}
                                                            className="border rounded-md py-2 px-4 mr-2"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-center w-8">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => addToCart(item)}
                                                            className="border rounded-md py-2 px-4 ml-2"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-4">₹{item.price_in_rs * item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>₹0.00</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">₹{totalPrice }</span>
                                </div>
                                <button 
                                    onClick={handleCheckout} 
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-600 transition duration-300"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Cart;

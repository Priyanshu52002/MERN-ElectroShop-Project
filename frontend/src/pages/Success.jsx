import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Success = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        console.log('Payment was successful, clearing cart');
        clearCart();
    }, [clearCart]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 text-gray-900">
            <div className="text-center p-12 rounded-lg shadow-lg bg-white max-w-lg mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-green-700">🎉 Payment Successful!</h1>
                <p className="text-lg mb-6 text-gray-700">Your order has been placed successfully. Thank you for shopping with us!</p>
                <p className="text-md text-gray-600">We’re preparing your order and will notify you once it’s on its way.</p>
                <div className="mt-8">
                    <a 
                        href="/" 
                        className="inline-block bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Success;

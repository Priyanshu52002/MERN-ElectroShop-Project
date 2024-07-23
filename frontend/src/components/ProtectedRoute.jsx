import React from 'react'
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    // return !!localStorage.getItem('token'); // Ensure 'token' is a string
    return true;
}

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) { // Call the function here
        return <Navigate to='/login' />
    }
    return children;
}

export default ProtectedRoute;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(LoginContext);
    const handlelogout=async()=>{
        try{
            const res=await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/logout`);
            if(res){
                console.log("user logged out successfully");
                    setIsLoggedIn(false);
                navigate('/');
            }
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className="navbar bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center max-w-[1200px] mx-auto">
            <div className="navbar-center flex">
                <button 
                    onClick={handlelogout} 
                    className='btn btn-accent text-white py-2 px-4 rounded-md shadow-md hover:bg-accent-dark transition duration-300'
                >
                    Logout
                </button>
            </div>

            <div className="navbar-end flex items-center gap-8">
                <ThemeToggleButton />
            </div>
        </div>
    );
};

export default AdminNavbar;

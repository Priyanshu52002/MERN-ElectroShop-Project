import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const changeInputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setStatusMessage('');
    setIsSuccess(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.password2) {
      setIsSuccess(false);
      setStatusMessage('Passwords do not match');
      return;
    }

    try {
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // };

      const registered=await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      if(registered){
        enqueueSnackbar('user Registered successfully', { variant: 'success' });
        setIsSuccess(true);
        setStatusMessage('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      enqueueSnackbar('Error editing product', { variant: 'error' });
      setIsSuccess(false);
      setStatusMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800'>
      <div className='bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100'>Register</h2>

        {statusMessage && (
          <p className={`text-lg italic mb-4 text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {statusMessage}
          </p>
        )}

        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300' htmlFor='name'>
              Username
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={userData.name}
              onChange={changeInputHandler}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={userData.email}
              onChange={changeInputHandler}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={userData.password}
              onChange={changeInputHandler}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300' htmlFor='password2'>
              Confirm Password
            </label>
            <input
              type='password'
              id='password2'
              name='password2'
              value={userData.password2}
              onChange={changeInputHandler}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md transition duration-300'
          >
            Register
          </button>
        </form>

        <p className='mt-4 text-center text-gray-700 dark:text-gray-300'>
          Existing account?{' '}
          <Link to='/login' className='text-blue-500 hover:text-blue-700'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

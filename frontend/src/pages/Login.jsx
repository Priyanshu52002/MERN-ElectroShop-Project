import React, { useState ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';



const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });


  const [statusMessage, setStatusMessage] = useState('');

  const changeInputHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (statusMessage) setStatusMessage('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials=true;
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`, loginData);
      console.log(response.data);
      if(response){
        setIsLoggedIn(true);
        if(response.data.role==='admin') {
          navigate('/admin');
        }else{
          navigate('/shop');
        }
      }
      
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800'>
      <div className='bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100'>Log In</h2>
        {statusMessage && <p className='text-red-500 text-sm italic mb-4 text-center'>{statusMessage}</p>}
        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={loginData.email}
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
              value={loginData.password}
              onChange={changeInputHandler}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md transition duration-300'
          >
            Log In
          </button>
        </form>
        <p className='mt-4 text-center text-gray-700 dark:text-gray-300'>
          No account yet?{' '}
          <Link to='/register' className='text-blue-500 hover:text-blue-700'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
import React, {useContext} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import CartIcon from './CartIcon';
import ThemeToggleButton from './ThemeToggleButton';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';
// const ThemeToggleButton = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     setIsDarkMode(currentTheme === 'dark');
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = isDarkMode ? 'light' : 'dark';
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <span className="text-gray-700 dark:text-gray-300">
//         {isDarkMode ? 'Dark' : 'Light'}
//       </span>
//       <button
//         onClick={toggleTheme}
//         className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
//         aria-label="Toggle theme"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           {isDarkMode ? (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M21.64 13a1 1 0 00-1.05-.14A8.05 8.05 0 0117.22 13a8.15 8.15 0 01-7.29-6.56A8.59 8.59 0 019.08 5.49a8.14 8.14 0 012.53-.35 8.11 8.11 0 014.19 1.34A8.15 8.15 0 0112 19.73z"
//             />
//           ) : (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 6.5A5.5 5.5 0 1117.5 12 5.51 5.51 0 0112 6.5zm0 9A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z"
//             />
//           )}
//         </svg>
//       </button>
//     </div>
//   );
// };

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials=true;
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/logout`);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="lg:hidden flex items-center">
          <button
            className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>

        <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          ElectroShop
        </Link>

        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/cart">
            <CartIcon />
          </Link>
          <ThemeToggleButton />
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
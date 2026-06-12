import { Link } from 'react-router-dom';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import techbazaar from "/assets/techbazaar.png";
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { useCart } from '../context/CartContextProvider';
import { MdLogout } from 'react-icons/md';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useContext(UserContext);
    const { cart } = useCart();
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const navigatePageWithReload = (path) => {
        window.location.href = path;
    };

    const handleLogout = async () => {
        try {
            await logout();
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload();
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img className="h-12 w-auto" src={techbazaar} alt="TechBazaar Logo" />
                        </Link>
                    </div>

                    {/* Menu Links for larger screens */}
                    <div className="hidden md:flex md:gap-2 space-x-4">
                        <Link to="/" className="hover:text-red-500 font-semibold text-lg transition ease-in-out duration-300 transform hover:scale-110">Home</Link>
                        <Link to="/products" className="hover:text-red-500 font-semibold text-lg transition ease-in-out duration-300 transform hover:scale-110">Products</Link>
                        <Link to="/contact" className="hover:text-red-500 font-semibold text-lg transition ease-in-out duration-300 transform hover:scale-110">Contact</Link>
                        <Link to="/about" className="hover:text-red-500 font-semibold text-lg transition ease-in-out duration-300 transform hover:scale-110">About Us</Link>
                    </div>

                    {/* Search and Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex bg-gray-100 rounded-full p-2">
                            <input
                                className="bg-transparent outline-none text-sm px-2"
                                type="text"
                                placeholder="Search..."
                            />
                            <button>
                                <CiSearch size={20} />
                            </button>
                        </div>

                        <div
                            onClick={() => navigatePageWithReload('/cart')}
                            className="relative hover:text-red-500 transition ease-in-out duration-300 transform hover:scale-110"
                        >
                            <CiShoppingCart size={25} />
                            <div className='absolute -top-3 -right-2 rounded-full flex items-center justify-center h-4 w-4 bg-red-500 text-white'>{cart?.items?.length || 0}</div>
                        </div>
                        <Link to="/manage" className="hover:text-red-500 transition ease-in-out duration-300 transform hover:scale-110">
                            <FaUserCircle size={25} />
                        </Link>
                        {user ? (
                            <div onClick={() => handleLogout()}><MdLogout size={25} /></div>
                        ) : (
                            <Link to='/login' className='border px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-transparent hover:text-black hover:border-red-500'>Login</Link>
                        )}
                    </div>

                    {/* Hamburger Menu for mobile screens */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 transition ease-in-out duration-300 transform hover:scale-110">
                            {isMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 shadow-sm hover:bg-gray-100">Home</Link>
                        <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 shadow-sm hover:bg-gray-100">Products</Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 shadow-xl hover:bg-gray-100">Contact</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 shadow-xl hover:bg-gray-100">About Us</Link>
                        <div className="flex items-center justify-between bg-gray-100 rounded-full p-2">
                            <input
                                className="bg-transparent outline-none text-sm px-2"
                                type="text"
                                placeholder="Search..."
                            />
                            <button>
                                <CiSearch size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-300">
                        <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center">
                                <FaUserCircle size={30} className="text-gray-600" />
                                <span className="ml-3 text-gray-800 font-medium">Hey! {user?.username || "Guest"}</span>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <Link to="/cart" className="relative hover:text-red-500 transition ease-in-out duration-300 transform hover:scale-110">
                                    <CiShoppingCart size={25} />
                                    <div className='absolute -top-3 -right-2 rounded-full flex items-center justify-center h-4 w-4 bg-red-500 text-white'>{cart?.items?.length || 0}</div>
                                </Link>
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to='/login'
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

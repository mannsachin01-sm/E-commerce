import { CiMobile2 } from "react-icons/ci";
import { FiTablet } from "react-icons/fi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { CiLaptop } from "react-icons/ci";
import { IoWatchOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import Hero from "../components/hero";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContextProvider";
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Homepage = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const img = [
        { url: './assets/1.png' },
        { url: './assets/2.png' },
        { url: './assets/3.webp' },
        { url: './assets/4.png' },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`);
                setProducts(response.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);


    return (
        <div className="flex flex-col mb-24 px-4 md:px-8">
            {/* Hero section */}
            <div className="mb-10">
                <Hero images={img} />
            </div>
            {/* Fresh Sales */}
            <div className="m-1 flex flex-col gap-4 items-center">
                <span className="font-bold text-3xl">Fresh Sales</span>
                <Link to="/products">
                    <button className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300">View All Products</button>
                </Link>
            </div>
            <div className="flex gap-4 max-w-full overflow-hidden overflow-x-auto mb-10">
                {products && products.slice(0, 6).map(product => (
                    <div key={product._id} className="bg-white min-w-[15rem] min-h-[20rem] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img src={product.image} alt={product.name} className="w-full h-32 object-contain rounded-t-lg mb-4 cursor-pointer"  />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-4 truncate">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-bold text-orange-500">₹{product.price}</p>
                            <button
                                className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300"
                                onClick={() => addToCart(product._id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
                        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                    </div>
                ))}
            </div>

            {/* Browse By Category */}
            <div className="m-1">
                <span className="font-bold text-xl flex flex-col items-center mb-5">Browse By Category</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <Link to='/products/mobile phones' className="border rounded p-6 text-center cursor-pointer hover:bg-orange-500 hover:text-white">
                        <CiMobile2 size={50} />
                        Phones
                    </Link>
                    <Link to='/products/Tablets' className="border rounded p-6 text-center cursor-pointer hover:bg-orange-500 hover:text-white">
                        <FiTablet size={50} />
                        Tablets
                    </Link>
                    <Link to='/products/Desktop' className="border rounded p-6 text-center cursor-pointer hover:bg-orange-500 hover:text-white">
                        <HiOutlineComputerDesktop size={50} />
                        Computers
                    </Link>
                    <Link to='/products/Laptops' className="border rounded p-6 text-center cursor-pointer hover:bg-orange-500 hover:text-white">
                        <CiLaptop size={50} />
                        Laptops
                    </Link>
                    <Link to='/products/Smart watches' className="border rounded p-6 text-center cursor-pointer hover:bg-orange-500 hover:text-white">
                        <IoWatchOutline size={50} />
                        Watches
                    </Link>
                </div>
            </div>
            <hr className="border-2 border-orange-500 my-10" />
            {/* Best Selling Products */}
            <div className="m-1 flex flex-col gap-4 items-center">
                <span className="font-bold text-3xl">Best Selling Products</span>
                <button className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300"><Link to='/products'>View All</Link></button>
            </div>
            <div className="flex gap-4 max-w-full overflow-hidden overflow-x-auto mb-10">
                {products && products.slice(6, 12).map(product => (
                    <div key={product._id} className="bg-white min-w-[15rem] min-h-[20rem] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img src={product.image} alt={product.name} className="w-full h-32 object-contain rounded-t-lg mb-4 cursor-pointer"  />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-4 truncate">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-bold text-orange-500">₹{product.price}</p>
                            <button
                                className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300"
                                onClick={() => addToCart(product._id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
                        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                    </div>
                ))}
            </div>

            {/* Explore Our Products */}
            <div className="m-1 flex flex-col gap-4 items-center">
                <span className="font-bold text-3xl">Explore Our Products</span>
                <Link to="/products">
                    <button className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300 mb-5">View All Products</button>
                </Link>
            </div>
            <div className="flex gap-4 w-full max-h-[30rem] mb-10 flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 flex flex-col gap-4">
                    {products && products.slice(7, 9).map(product => (
                        <div key={product?._id} className="flex justify-between bg-white w-full h-fit p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src={product?.image} alt={product?.name} className="w-1/2 h-48 object-contain rounded-t-lg"  />
                            <div className="flex flex-col w-1/2 mx-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product?.name}</h2>
                                <p className="text-gray-600 mb-4 truncate">{product?.description}</p>
                                <p className="text-sm text-gray-500 mt-2">Category: {product?.category}</p>
                                <p className="text-sm text-gray-500">Brand: {product?.brand}</p>
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-lg font-bold text-orange-500">₹{product?.price}</p>
                                    <button
                                        className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300"
                                        onClick={() => addToCart(product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {products[2] && (
                    <div key={products[2]._id} className="relative bg-white w-full sm:w-1/2 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-l-md" >
                        <img src={products[2]?.image} alt={products[2]?.name} className="w-full h-full max-h-[25rem] object-contain rounded-t-lg mb-4" />
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gray-700/40 py-4">
                            <h2 className="text-xl font-bold text-red-500 mb-2">{products[2]?.name}</h2>
                            <div className="text-gray-50 mb-4 truncate w-[20rem]">{products[2]?.description}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="flex flex-wrap justify-evenly mb-10">
                <div className="border rounded p-5 m-5 hover:bg-orange-500 hover:text-white w-full sm:w-1/3">
                    <TbTruckDelivery size={50} />
                    <span className="font-bold text-xl">FREE AND FAST DELIVERY</span><br />
                    Free delivery for all orders
                </div>
                <div className="border rounded p-5 m-5 hover:bg-orange-500 hover:text-white w-full sm:w-1/3">
                    <RiCustomerService2Fill size={50} />
                    <span className="font-bold text-xl">24/7 CUSTOMER SERVICE</span><br />
                    Friendly 24/7 customer support
                </div>
                <div className="border rounded p-5 m-5 hover:bg-orange-500 hover:text-white w-full sm:w-1/3">
                    <VscWorkspaceTrusted size={50} />
                    <span className="font-bold text-xl">MONEY BACK GUARANTEE</span><br />
                    We return money within 30 days
                </div>
            </div>
        </div>
    );
};

export default Homepage;

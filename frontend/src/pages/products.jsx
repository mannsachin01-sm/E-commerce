import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContextProvider';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { FaCartPlus } from 'react-icons/fa6';

const API_URL = import.meta.env.VITE_API_URL; // Use API URL from env variables

const ProductsPage = () => {
    const { category } = useParams(); // Get the dynamic category from the URL
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({
        price: '',
        category: category || '', // Use the URL category if present
        brand: ''
    });
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`);
                setProducts(response.data || []);
                setFilteredProducts(response.data || []);

                // Extract unique categories and brands from products
                const productsData = response.data || [];
                const uniqueCategories = [...new Set(productsData.map(product => product.category))];
                const uniqueBrands = [...new Set(productsData.map(product => product.brand))];

                setCategories(uniqueCategories);
                setBrands(uniqueBrands);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Apply filters whenever filters change or when the category changes
    useEffect(() => {
        const applyFilters = () => {
            let results = products;
            if (filters.price) {
                results = results.filter(product => product.price <= parseFloat(filters.price));
            }
            if (filters.category) {
                results = results.filter(product => product.category.toLowerCase().includes(filters.category.toLowerCase()));
            }
            if (filters.brand) {
                results = results.filter(product => product.brand.toLowerCase().includes(filters.brand.toLowerCase()));
            }
            setFilteredProducts(results);
        };

        applyFilters();
    }, [filters, products, category]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (

        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
                {'New Feature'}
            </h1>
            <Link to="/productrecommendationpage">
                <button className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300">Product Recommendation</button>
            </Link>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Explore Our Products</h1>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <input
                    type="number"
                    name="price"
                    placeholder="Max Price"
                    value={filters.price}
                    onChange={handleFilterChange}
                    className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
                />
                {/* Dropdown for Category */}
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {/* Dropdown for Brand */}
                <select
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
                >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded-t-lg mb-4" />
                            <h2 className="text-xl font-semibold text-orange-600 mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-orange-500">₹{product.price}</p>
                                <div className="flex items-center justify-between gap-3 mr-4">
                                    <div className="" onClick={() => addToCart(product._id)}>
                                        <FaCartPlus size={25} className="text-orange-500" />
                                    </div>
                                    <Link to={`/prod/${product._id}`}
                                        className="bg-orange-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-orange-600 transition-colors duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
                            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No products found matching your criteria.</p>
            )}
        </div>
    );
};

export default ProductsPage;

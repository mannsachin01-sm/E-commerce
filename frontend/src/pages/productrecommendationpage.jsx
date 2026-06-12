import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Use API URL from env variables

const ProductRecommender = () => {
    const [productName, setProductName] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [products, setProducts] = useState([]);  // State to store products

    // Fetch the list of products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`);  // Endpoint to fetch products
                setProducts(response.data);  // Assuming the response contains an array of products
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Fetch recommendations based on selected product
    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/recommend`, {
                params: { productName },
            });
            setRecommendations(response.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Recommender System</h1>
            <div className="w-full max-w-md">
                {/* Dropdown to select product */}
                <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select a product</option>
                    {/* Render products dynamically from backend */}
                    {products.map((product, index) => (
                        <option key={index} value={product.name}>{product.name}</option>
                    ))}
                </select>
                <button
                    onClick={fetchRecommendations}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                >
                    Show Recommendation
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {recommendations.map((rec, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
                    >
                        <img
                            src={rec.image}
                            alt={rec.title}
                            className="w-32 h-32 object-cover rounded-md mb-4"
                        />
                        <p className="text-center text-gray-700 font-medium">{rec.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductRecommender;

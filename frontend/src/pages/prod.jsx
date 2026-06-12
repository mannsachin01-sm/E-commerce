import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiFillStar, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from '../context/CartContextProvider';
import { UserContext } from '../context/UserContextProvider';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { id } = useParams();
    const { userId } = useContext(UserContext);
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [compareProducts, setCompareProducts] = useState([]);
    const [showCompareContainer, setShowCompareContainer] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL; // Use API URL from env variables

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products/${id}`);
            setProduct(response.data);
            setReviews(response.data.reviews)

            if (response.data.category) {
                fetchRelatedProducts(response.data.category);
            }
        } catch (error) {
            console.error("Failed to fetch product", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (category) => {
        try {
            const response = await axios.get(`${API_URL}/api/products?category=${category}`);
            setRelatedProducts(response.data.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Failed to fetch related products", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleReviewSubmit = async () => {
        try {
            await axios.post(`${API_URL}/api/products/${id}/review/${userId}`, {
                rating,
                comment
            });
            setRating(0);
            setComment('');
            setShowReviewForm(false);
            fetchProduct();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Already Reviewed!',
                    text: error.response.data.message,
                    confirmButtonText: 'OK'
                });
            } else {
                console.error("Error submitting review", error);
            }
        }
    };

    const handleCompare = (selectedProduct) => {
        if (compareProducts.length === 0) {
            setCompareProducts([product, selectedProduct]);
            setShowCompareContainer(true);
        } else {
            setCompareProducts([product, selectedProduct]);
        }
    };

    const closeCompareContainer = () => {
        setShowCompareContainer(false);
        setCompareProducts([]);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-10 text-red-500">Product not found</div>;
    }

    return (
        <div className="container p-4 md:p-8">
            {/* Product Details Section */}
            <div className='mx-auto p-4 md:p-8 max-w-4xl'>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-4 md:p-6">
                        <img
                            src={product.image || 'https://via.placeholder.com/400'}
                            alt={product.name}
                            className="object-contain w-full h-80 md:h-96 transition-transform transform hover:scale-105 rounded-lg"
                        />
                    </div>

                    <div className="md:w-1/2 p-4 md:p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold mb-2 text-orange-600">{product.name}</h1>
                            <p className="text-sm text-gray-500 uppercase mb-4">
                                {product.category} &middot; {product.brand}
                            </p>
                            <div className="flex items-center mb-4">
                                {[...Array(product?.averageRating)].map((_, index) => (
                                    <AiFillStar key={index} className="text-yellow-500" />
                                ))}
                                {[...Array(5 - product?.averageRating)].map((_, index) => (
                                    <AiFillStar key={index} className="text-gray-300" />
                                ))}
                                <span className="text-gray-600 ml-2">({product?.numReviews})</span>
                            </div>
                            <p className="text-gray-700 mb-6">{product.description}</p>
                            <p className="text-2xl font-bold text-orange-600 mb-4">₹{product.price}</p>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                className="flex items-center justify-center bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-transparent hover:border-orange-600 border hover:text-orange-500 transition ease-in-out duration-200 shadow-lg"
                                onClick={() => addToCart(product._id)}
                            >
                                <AiOutlineShoppingCart className="mr-2" /> Add to Cart
                            </button>
                            <button
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition ease-in-out duration-200 shadow-md cursor-pointer"
                                onClick={() => setShowReviewForm(true)}
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-8">
                <h2 className="text-2xl text-center font-semibold mb-4 text-orange-600">Related Products</h2>
                <div className="flex overflow-x-auto space-x-4 py-4">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <div
                                key={relatedProduct._id}
                                className="bg-white shadow-md rounded-lg p-4 min-w-[200px] max-w-[200px] flex-shrink-0"
                            >
                                <img
                                    src={relatedProduct.image || 'https://via.placeholder.com/150'}
                                    alt={relatedProduct.name}
                                    className="object-cover w-full h-40 mb-2 rounded-md"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{relatedProduct.name}</h3>
                                <p className="text-gray-600 text-sm">{relatedProduct.category}</p>
                                <p className="text-orange-600 font-bold mt-1">₹{relatedProduct.price}</p>
                                <div className='flex items-center justify-between'>
                                    <button
                                        onClick={() => addToCart(relatedProduct._id)}
                                        className="bg-orange-500 text-white text-xl py-2 px-2 rounded-md mt-2 hover:bg-orange-600 transition"
                                    >
                                        <FaCartPlus />
                                    </button>
                                    <div
                                        onClick={() => handleCompare(relatedProduct)}
                                        className="flex items-center justify-center gap-1 bg-blue-500 text-white py-2 px-2 rounded-md mt-2 hover:bg-blue-600 transition"
                                    >
                                        Compare
                                        <HiOutlineSwitchHorizontal size={20} className='mt-1' />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No related products found.</p>
                    )}
                </div>
            </div>

            {/* Compare products */}
            {showCompareContainer && compareProducts.length === 2 && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative flex">
                        <button
                            className="absolute top-0 right-2 text-gray-500 hover:text-gray-800 text-3xl"
                            onClick={closeCompareContainer}
                        >
                            &times;
                        </button>
                        {compareProducts.map((compProduct, index) => (
                            <div key={index} className="w-full md:w-1/2 p-4 border-r border-gray-200 last:border-r-0">
                                <h2 className="text-2xl font-semibold mb-4 text-orange-600">{compProduct.name}</h2>
                                <img
                                    src={compProduct.image || 'https://via.placeholder.com/200'}
                                    alt={compProduct.name}
                                    className="w-full h-64 object-cover mb-4 rounded-lg"
                                />
                                <p className="text-lg font-semibold text-gray-800 mb-2">Price: ₹{compProduct.price}</p>
                                <p className="text-gray-600 mb-2">Category: {compProduct.category}</p>
                                <p className="text-gray-600 mb-4">Brand: {compProduct.brand}</p>
                                <p className="text-gray-700">{compProduct.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div className='flex flex-col items-center justify-center'>
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-600">Customer Reviews</h2>
                <div className="flex overflow-x-auto space-x-4 py-4">
                    {reviews?.length > 0 ? (
                        reviews?.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4 min-w-[250px] max-w-[250px] flex-shrink-0"
                            >
                                <p className="text-gray-700 text-lg my-2 font-semibold">@{review?.user?.username || "Anonymous"}</p>
                                <div className="flex items-center mb-2">
                                    {[...Array(review?.rating)].map((_, i) => (
                                        <AiFillStar key={i} className="text-yellow-500" />
                                    ))}
                                    {[...Array(5 - review?.rating)].map((_, i) => (
                                        <AiFillStar key={i} className="text-gray-300" />
                                    ))}
                                </div>
                                <p className="text-gray-800 mb-2 italic">{review?.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                    )}
                </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
                        <button
                            className="absolute top-0 right-2 text-gray-500 hover:text-gray-800 text-3xl"
                            onClick={() => setShowReviewForm(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
                        <div className="flex space-x-1 mb-4">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setRating(index + 1)}
                                >
                                    {index < rating ? (
                                        <AiFillStar className="text-yellow-500 text-2xl" />
                                    ) : (
                                        <AiOutlineStar className="text-gray-400 text-2xl" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full p-2 border rounded-lg mb-4"
                            rows="3"
                            placeholder="Write your review here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="w-full bg-orange-600 text-white py-2 rounded-md"
                            onClick={handleReviewSubmit}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
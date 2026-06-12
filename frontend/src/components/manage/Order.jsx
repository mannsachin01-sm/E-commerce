import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const API_URL = import.meta.env.VITE_API_URL;

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/checkout/orders`);
            setOrders(response.data);
            setLoading(false);
            console.log(response.data);
        } catch (err) {
            setError('Failed to fetch orders. Please try again later.');
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <p>{error}</p>
                <button onClick={fetchOrders} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-16">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">My Orders</h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders found.</p>
            ) : (
                <div className="grid gap-6 lg:grid-cols-2 sm:grid-cols-1">
                    {orders.map((order) => (
                        <div
                            key={order?._id}
                            className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-semibold text-gray-600">Order ID: #{order?._id}</span>
                                <span
                                    className={`text-sm px-2 py-1 rounded-full font-semibold ${order?.orderStatus === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                                >
                                    {order?.orderStatus}
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Order Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">Total Items: {order?.products?.length}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-gray-800 font-medium">Items:</p>
                                <ul className="text-sm text-gray-600">
                                    {order?.products?.map((item, index) => (
                                        <li key={index} className="flex justify-between py-2">
                                            <span>{item?.productId?.name}</span>
                                            <span>{item?.quantity} x ₹{item?.productId?.price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold text-gray-800">
                                    Total: ₹{order?.totalAmount.toFixed(2)}
                                </span>
                                {order?.orderStatus === 'Delivered' ? (
                                    <AiOutlineCheckCircle className="text-green-500 text-2xl" />
                                ) : (
                                    <AiOutlineCloseCircle className="text-red-500 text-2xl" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;

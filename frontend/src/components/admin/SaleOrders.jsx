import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;

export default function SaleOrders () {
    const [ orders, setOrders ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

    const fetchOrders = async () => {
        try {
            const response = await axios.get( `${API_URL}/api/checkout/orders` );
            setOrders( response.data );
            setLoading( false );
        } catch ( err ) {
            setError( 'Failed to fetch orders. Please try again later.' );
            console.log( err );
            setLoading( false );
        }
    };
    useEffect( () => {
        fetchOrders();
    }, [] );

    const handleStatusChange = async ( e, order ) => {
        const newStatus = e.target.value;
        if ( order.paymentStatus !== 'Paid' ) {
            await Swal.fire( {
                icon: "warning",
                title: "payment status unpaid",
                text: `Order status can only be changed if payment status is "Paid".`,
                showConfirmButton: true,
                confirmButtonText: "OK",
            } );
            return;
        }
        try {
            await axios.put( `${API_URL}/api/checkout/order/updateOrderStatus/${order._id}`, {
                orderStatus: newStatus,
            } );
            // Update the order status in the local state
            setOrders( ( prevOrders ) =>
                prevOrders.map( ( o ) =>
                    o._id === order._id ? { ...o, orderStatus: newStatus } : o
                )
            );
        } catch ( err ) {
            console.log( 'Failed to update order status:', err );
            await Swal.fire( {
                icon: "error",
                title: "Failed to update order status",
                text: `Failed to update order status. Please try again later.`,
                showConfirmButton: true,
                confirmButtonText: "OK",
            } );
            return;
        }
    }
    const handleCancelOrder = async ( id ) => {
        try {
            await axios.put( `${API_URL}/api/checkout/order/updateOrderStatus/${id}`, {
                orderStatus: 'canceled',
            } );
            fetchOrders();
        } catch ( err ) {
            console.log( 'Failed to Cancel order status:', err );
            await Swal.fire( {
                icon: "error",
                title: "Failed to Cancle order status",
                text: `Failed to Cancle order status. Please try again later.`,
                showConfirmButton: true,
                confirmButtonText: "OK",
            } );
            return;
        }
    }

    if ( loading ) return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
    if ( error ) return <div className="text-center text-red-500">{ error }</div>;

    return (
        <div className="p-8 text-black min-h-screen">
            <div className="text-5xl text-center text-white font-bold py-10 bg-black min-w-full border-gray-600 rounded-xl">
                Admin Orders Panel
            </div>
            <h1 className="text-2xl font-bold text-center mb-8">Your Orders</h1>
            { orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { orders.map( ( order ) => (
                        <div key={ order._id } className="bg-white p-6 shadow-lg rounded-lg">
                            <h2 className="font-semibold text-xl text-orange-500 mb-4">Order #{ order._id }</h2>
                            <p className="mb-2">
                                <span className="font-bold">Date & Time:</span>{ " " }
                                <span className='text-lg'>
                                    { new Date( order.createdAt ).toLocaleDateString( 'en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: 'numeric',
                                    } ) }{ " " }
                                    { new Date( order.createdAt ).toLocaleTimeString( 'en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    } ) }
                                </span>
                            </p>
                            <div className="mb-2 flex items-center">
                                <span className="font-bold">Order Status: &nbsp;</span>
                                <select
                                    id="orderStatus"
                                    value={ order.orderStatus }
                                    onChange={ ( e ) => handleStatusChange( e, order ) }
                                    className="border rounded py-2 px-2 w-1/2 border-orange-500 text-orange-500 focus:bg-gray-100 focus:outline-none"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="completed">completed</option>
                                    <option value="canceled">canceled</option>
                                </select>
                            </div>
                            <p className="mb-2"><span className="font-bold">Payment:</span> { order.paymentStatus }</p>
                            <p className="mb-2"><span className="font-bold">Total:</span> ₹{ order.totalAmount }</p>
                            <p className="font-bold mb-2">Products:</p>
                            <ul className="mb-4 bg-gradient-to-b from-gray-50 via-orange-100 to-orange-300 border max-h-[10rem] overflow-y-auto">
                                { order?.products?.map( ( product, i ) => (
                                    <li key={ product?.productId?._id || i } className="flex justify-between">
                                        <span className='italic'>Product ID: { product?.productId?._id }</span>
                                        <span>Quantity: { product?.quantity }</span>
                                    </li>
                                ) ) }
                            </ul>
                            <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition cursor-pointer"
                                onClick={ () => { handleCancelOrder( order._id ) } }
                            >
                                Cancel order
                            </button>
                        </div>
                    ) ) }
                </div>
            ) }
        </div>
    );
};

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard () {
    const [ orderMetrics, setOrderMetrics ] = useState( {} );
    const [ customerMetrics, setCustomerMetrics ] = useState( {} );
    const [ latestOrders, setLatestOrders ] = useState( [] );
    const [ salesData, setSalesData ] = useState( [] );

    useEffect( () => {
        async function fetchOrders () {
            try {
                const response = await axios.get( `${API_URL}/api/checkout/orders` );
                const orders = response.data;

                // Aggregate order metrics
                const totalOrders = orders.length;
                const pending = orders.filter( order => order.orderStatus === 'pending' ).length;
                const completed = orders.filter( order => order.orderStatus === 'completed' ).length;
                const canceled = orders.filter( order => order.orderStatus === 'canceled' ).length;

                setOrderMetrics( { totalOrders, pending, completed, canceled } );
                setLatestOrders( orders.slice( 0, 5 ) ); // Get the latest 5 orders

                // Assuming the salesData is derived from orders with date and amount information
                const monthlySales = calculateMonthlySalesData( orders );
                setSalesData( monthlySales );
                console.log("salesData:- ",salesData)

            } catch ( error ) {
                console.error( "Error fetching orders:", error );
            }
        }

        async function fetchUser () {
            try {
                const response = await axios.get( `${API_URL}/api/user/getAllUsers` );
                const user = response.data;
                console.log(user)

                const totalUsers = user.length;
                const admins = user.filter( user => user.isAdmin == true ).length;
                const totalCustomers = totalUsers - admins;

                setCustomerMetrics( { totalUsers, admins, totalCustomers } );

            } catch ( error ) {
                console.error( "Error fetching user:", error );
            }
        }

        fetchOrders();
        fetchUser();
    }, [] );

    const calculateMonthlySalesData = ( orders ) => {
        // Calculate monthly sales and orders for the chart
        const salesByMonth = {};

        orders.forEach( order => {
            const month = new Date( order.createdAt ).toLocaleString( 'default', { month: 'short' } );
            if ( !salesByMonth[ month ] ) salesByMonth[ month ] = { sales: 0, orders: 0 };
            salesByMonth[ month ].sales += parseFloat( order.totalAmount );
            salesByMonth[ month ].orders += 1;
        } );

        return Object.entries( salesByMonth ).map( ( [ name, data ] ) => ( { name, ...data } ) );
    };

    return (
        <div className="p-6 space-y-6 min-h-screen">
            <div className="text-5xl text-center font-bold py-10 bg-black min-w-full border-gray-600 rounded-xl">
                Dashboard
            </div>

            {/* Order Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-orange-600">Total Orders</h2>
                    <p className="text-2xl text-white font-bold">{ orderMetrics.totalOrders }</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-orange-600">Pending Orders</h2>
                    <p className="text-2xl text-white font-bold">{ orderMetrics.pending }</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-orange-600">Completed Orders</h2>
                    <p className="text-2xl text-white font-bold">{ orderMetrics.completed }</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-orange-600">Canceled Orders</h2>
                    <p className="text-2xl text-white font-bold">{ orderMetrics.canceled }</p>
                </div>
            </div>

            {/* Customer Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-orange-600">Total Users</h2>
                    <p className="text-2xl text-white font-bold">{ customerMetrics.totalUsers }</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-orange-600">Total Customers</h2>
                    <p className="text-2xl text-white font-bold">{ customerMetrics.totalCustomers }</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-orange-600">Admins</h2>
                    <p className="text-2xl text-white font-bold">{ customerMetrics.admins }</p>
                </div>
            </div>

            {/* Latest Orders */}
            <div className="p-4 rounded-lg text-gray-100 shadow">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">Latest Orders :</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Customer</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { latestOrders.map( ( order ) => (
                                <tr key={ order._id } className="border-t hover:bg-gray-900">
                                    <td className="px-4 py-2">#{ order._id }</td>
                                    <td className="px-4 py-2">
                                        {order?.user?.username}
                                    </td>
                                    <td className="px-4 py-2">
                                        { new Date( order.createdAt ).toLocaleDateString( 'en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: 'numeric',
                                        } ) }{ " " }
                                    </td>
                                    <td className="px-4 py-2">₹{ order?.totalAmount }</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={ `px-2 py-1 rounded ${order?.orderStatus === 'pending'
                                                    ? 'bg-yellow-200 text-yellow-800'
                                                    : order.orderStatus === 'completed'
                                                        ? 'bg-green-200 text-green-800'
                                                        : 'bg-red-200 text-red-800'
                                                }` }
                                        >
                                            { order.orderStatus }
                                        </span>
                                    </td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sales & Orders Chart */}
            <div className="bg-black rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">Sales & Orders Chart</h2>
                <ResponsiveContainer width="100%" className={"mx-auto"} height={300}>
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2929" />
                        <XAxis
                            dataKey="name"
                            label={{ value: "Month", position: "insideBottomRight", offset: -2, fill: '#f9fafb' }}
                            tick={{ fill: '#f9fafb' }}
                            tickSize={10}
                            interval={0}
                            angle={-45}
                            tickFormatter={(month) => month.toUpperCase()}
                        />
                        <YAxis
                            label={{ value: 'Sales', angle: -90, position: 'insideLeft', fill: '#f9fafb', dy: -10 }}
                            tick={{ fill: '#f9fafb', fontSize: 15 }}
                            width={80}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                            axisLine={{ stroke: '#f9fafb' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                borderRadius: '8px',
                                border: 'none',
                                padding: '10px',
                                color: '#f9fafb'
                            }}
                            wrapperStyle={{
                                outline: 'none'
                            }}
                            labelStyle={{
                                color: '#9ca3af'
                            }}
                        />
                        <Bar dataKey="sales" fill="#4A90E2" name="Sales" />
                        <Bar dataKey="orders" fill="#50E3C2" name="Orders" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

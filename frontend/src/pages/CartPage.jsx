import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContextProvider';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const userId = user?._id;
    const isLoggedIn = user?._id ? true : false;
    const username = user?.username;

    const proceedToPayment = async () => {
        try {
            if (cart.items.length === 0) {
                await Swal.fire({
                    icon: "warning",
                    title: "Cart is Empty",
                    text: "Your cart is empty, please add some items.",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                });
                return;
            }

            if (!isLoggedIn) {
                await Swal.fire({
                    icon: "warning",
                    title: "Sign In Required",
                    text: "Please sign in to proceed with the payment.",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                });
                return;
            }

            const stripe = await loadStripe(
                "pk_test_51Ok6nYSI7zSEwyy04FCQ6BTuX5ErxHiV5sEBB2AyDCJc36Z3e1scTkl0YeoVcZHH4hcBc4tGB33DBBV2dxefidWC00AWOyZxJ4"
            );
            if (!stripe) {
                console.error('Stripe.js failed to load.');
                return;
            }

            const address = {
                name: username,
                address: "123 Main St",
                city: "CityName",
                postalCode: "12345",
                country: "IN",
            };

            const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0) + 50; // Including shipping
            const orderBody = {
                userId: userId,
                products: cart.items,
                totalAmount: totalAmount,
            };
            const order = await fetch(`${API_URL}/api/checkout/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderBody),
                credentials: "include",
            });
            if (order.ok) {
                const orderData = await order.json();
                const paymentBody = {
                    orderId: orderData._id,
                    products: cart.items,
                    address: address,
                    amount: totalAmount,
                    paymentMethod: "card",
                    currency: "INR",
                };
                const response = await fetch(`${API_URL}/api/checkout/payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentBody),
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to create Stripe session");
                }

                const sessionData = await response.json();
                const result = await stripe.redirectToCheckout({
                    sessionId: sessionData.session.id,
                });

                if (result.error) {
                    throw new Error(result.error.message);
                }

                // Clear cart after payment is successful
                await clearCart();

                await Swal.fire({
                    icon: "success",
                    title: "Payment Successful!",
                    text: "Your order has been placed successfully.",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                });
            }

        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-10">
            <div className="text-3xl font-bold text-center mb-8">
                {cart.items.length > 0 ? (
                    "Your Cart"
                ) : (
                    <div className='flex flex-col gap-3'>
                        <p>Your cart is Empty.</p>
                        <div className='text-xl'>Go to <Link to="/products" className='underline text-blue-500'>Products</Link> page.</div>
                    </div>
                )}
            </div>
            {cart?.items.length > 0 && (
                <div className="flex flex-col md:flex-row md:space-x-4  max-w-[90rem] mx-auto">
                    {/* Cart Items Section */}
                    <div className="w-full max-h-[38rem] overflow-x-hidden overflow-y-auto md:w-[75%] bg-white p-5 rounded-lg shadow-lg">
                        {cart.items.map((item) => (
                            <div key={item._id} className="flex items-center justify-between py-5 border-b">
                                <img src={item.product?.image} alt={item.product?.name} className="w-16 h-16 rounded-md" />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-semibold">{item.product?.name}</h2>
                                    <p className="text-gray-500">{item.product.description}</p>
                                    <div className="flex items-center space-x-3 mt-2">
                                        <button
                                            onClick={() => { decreaseQuantity(item?.product._id) }}
                                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button
                                            onClick={() => { increaseQuantity(item?.product._id) }}
                                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-bold">₹{(item.product?.price * item?.quantity).toFixed(2)}</span>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 mt-2 border px-2 py-1 rounded-md border-red-500 hover:bg-red-500 hover:text-white"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Section */}
                    <div className="w-full max-h-64 md:w-1/4 bg-white p-5 rounded-lg shadow-lg mt-8 md:mt-0">
                        <h3 className="text-2xl font-bold">Summary</h3>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Shipping:</span>
                                <span>₹50.00</span>
                            </div>
                            <div className="flex justify-between mt-2 font-bold">
                                <span>Total:</span>
                                <span>₹{(cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0) + 50).toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            className="w-full mt-6 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
                            onClick={proceedToPayment}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                {/* Uncomment below if you want to add a check-circle icon */}
                {/* <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" /> */}
                
                <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    Thank you for your purchase! Your order has been successfully processed.
                </p>
                <Link to='/products'>
                    <button
                        className="w-full py-2 text-white bg-green-600 hover:bg-green-700 transition rounded-lg text-lg sm:text-xl"
                    >
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Success;

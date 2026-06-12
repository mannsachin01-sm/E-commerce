import { Link } from "react-router-dom";

const Cancel = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Cancellation Confirmed</h1>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    We're sorry to see you cancel your order. If you need any assistance, please let us know.
                </p>
                <Link to='/contact'>
                    <button
                        className="w-full py-2 mb-4 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg text-lg sm:text-xl"
                    >
                        Contact Support
                    </button>
                </Link>
                <Link to='/'>
                    <button
                        className="w-full py-2 text-gray-700 border border-gray-300 hover:bg-gray-100 transition rounded-lg text-lg sm:text-xl"
                    >
                        Go Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Cancel;

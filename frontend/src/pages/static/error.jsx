import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="min-h-screen bg-white px-6 sm:px-12 lg:px-32">
            <div className="text-black text-center pt-32 sm:pt-48">
                <h1 className="text-6xl sm:text-9xl">404</h1>
                <div className="text-xl sm:text-2xl mt-4">Page not found.</div>
                <div className="mt-8 text-lg sm:text-xl">
                    <p>Oops! It seems like the page you’re trying to access doesn’t exist.</p>
                    <p>If you believe there’s an issue, feel free to report it, and we’ll look into it.</p>
                </div>
                <div className="mt-8">
                    <Link to='/' className="mt-6 px-4 py-2 mx-4 border text-white border-orange-500 dark:bg-orange-700 rounded-lg text-lg sm:text-xl">
                        Return Home
                    </Link>
                    <Link to='/contact' className="mt-6 px-4 py-2 border border-orange-500 rounded-lg cursor-pointer text-lg sm:text-xl">
                        Report problem
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error;

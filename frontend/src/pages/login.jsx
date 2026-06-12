import { useContext, useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';
import Swal from 'sweetalert2'; // Import SweetAlert2

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [openForgetPassword, setOpenForgetPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [resetPasswordData, setResetPasswordData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleResetPasswordChange = (e) => {
        setResetPasswordData({
            ...resetPasswordData,
            [e.target.name]: e.target.value
        });
    };

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/api/user/login`, formData, {
                withCredentials: true
            });
            if (response.status === 200) {
                const { token, user } = response.data;
                login(user, token); // Save the token and user data to context
                setCookie('token', token, 2); // Save the token cookies
                setCookie('user', user, 2); // Save the user data to cookies
                
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/'); // Navigate to home after success
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Please check your credentials and try again.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Password Mismatch',
                text: 'Please ensure both passwords match.',
                confirmButtonText: 'OK'
            });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/user/forgot-password`, {
                email: resetPasswordData.email,
                password: resetPasswordData.newPassword,
            });

            if (response.status === 200) {
                console.log('Password reset successful');
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Successful!',
                    text: 'You can now log in with your new password.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setOpenForgetPassword(false);
                    setResetPasswordData({
                        email: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                    navigate('/login'); // Redirect to login
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Reset Failed',
                    text: 'Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
            console.error('Password reset error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex justify-center items-center bg-gray-100">
            {openForgetPassword ? (
                <div className="absolute w-full max-w-sm p-4 bg-white shadow-lg rounded-md">
                    <span className="text-2xl font-bold text-center">Reset your password</span>
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={resetPasswordData.email}
                            onChange={handleResetPasswordChange}
                            autoFocus
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md"
                            type="password"
                            name="newPassword"
                            placeholder="New password"
                            value={resetPasswordData.newPassword}
                            onChange={handleResetPasswordChange}
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={resetPasswordData.confirmPassword}
                            onChange={handleResetPasswordChange}
                            required
                        />
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-orange-500 rounded text-white p-2 w-full"
                                disabled={loading}
                            >
                                {loading ? 'Resetting...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                className="hover:bg-orange-500 border border-orange-500 text-orange-600 hover:text-white rounded p-2 w-full"
                                onClick={() => setOpenForgetPassword(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col items-center bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
                    <span className="text-4xl font-bold mb-4">Log in to Tech Bazaar</span>
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md"
                            type="email"
                            placeholder="Email or Phone Number"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoFocus
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="flex justify-between items-center">
                            <button
                                type="submit"
                                className="bg-orange-500 rounded text-white p-2 w-full"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                            <button
                                type="button"
                                className="text-orange-500 cursor-pointer"
                                onClick={() => setOpenForgetPassword(!openForgetPassword)}
                            >
                                Forget Password?
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        Don&apos;t have an Account? 
                        <span className="px-1 underline cursor-pointer font-thin">
                            <Link to='/sign_up'>Register Now</Link>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

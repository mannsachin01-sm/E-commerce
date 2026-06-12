import { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Make the API call to send the message
            await axios.post(`${API_URL}/api/user/contact`, formData);
            setSuccess("Message sent successfully!");

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Message sent successfully!',
                confirmButtonText: 'OK'
            });

            // Reset form data
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while sending the message.';
            setError(errorMessage);
            
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen mt-10">
            <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-white rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2">
                {/* Contact Info */}
                <div className="w-full sm:w-1/2">
                    <div className="flex justify-start items-center gap-4 mb-6">
                        <IoCallOutline className="bg-orange-500 text-white rounded-full p-3" size={40} />
                        <div>
                            <span className="font-bold text-orange-500">Call To Us</span><br />
                            <span>We are available 24/7.</span><br />
                            <span>Phone: +91 9999999999</span><br />
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-4 mb-6">
                        <CiMail className="bg-orange-500 text-white rounded-full p-3" size={40} />
                        <div>
                            <span className="font-bold text-orange-500">Write To Us</span><br />
                            <span>Fill out our form and we will contact you within 24 hours.</span><br />
                            <span>Email: techbazaar2025@gmail.com</span><br />
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="flex flex-col gap-4 w-full sm:w-1/2" onSubmit={handleSubmit}>
                    <input
                        className="p-3 border rounded-md outline-none"
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-3 border rounded-md outline-none"
                        type="email"
                        name="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-3 border rounded-md outline-none"
                        type="tel"
                        name="phone"
                        placeholder="Your Phone *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        className="p-3 border rounded-md outline-none"
                        name="message"
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button
                        className="bg-orange-500 rounded text-white p-3 hover:bg-orange-600 transition-colors duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    {error && <span className="text-red-500">{error}</span>}
                    {success && <span className="text-green-500">{success}</span>}
                </form>
            </div>
        </div>
    );
};

export default Contact;

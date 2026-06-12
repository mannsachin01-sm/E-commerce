import { Link } from 'react-router-dom'; 
import { LuSendHorizontal } from "react-icons/lu";

import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
    const currentYear = new Date().getFullYear();  // Get the current year dynamically

    return (
        <div className='bg-black text-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4'>
                {/* Tech Bazaar Section */}
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-lg'>Tech Bazaar</span>
                    <span>Subscribe Now</span>
                    <span>Get 10% off on your first order!</span>
                    <div className='flex gap-2'>
                        <input className="bg-black outline-none p-2 text-white w-3/4 md:w-52" type="email" placeholder="Enter your email" />
                        <a href="mailto:techbazaar2025@gmail.com">
                            <LuSendHorizontal  className='mt-2 text-white cursor-pointer' size={25}/>
                        </a>
                    </div>
                    
                    <div className='flex mt-2 gap-3'>
                        {/* <div className='hover:bg-red-500 rounded-full p-2'>
                            <Link to="https://www.facebook.com/share/77wPKKHPbhiJtyMi/?mibextid=qi2Omg">
                                <FaFacebookF className="text-white" size={30}/>
                            </Link>
                        </div> */}
                        <div className='hover:bg-red-500 rounded-full p-2'>
                            <Link to="https://x.com/TechBazaar2025?t=WkQZy0CHM7ImWD2YAU7Daw&s=08">
                                <CiTwitter className="text-white" size={30}/>
                            </Link>
                        </div>
                        <div className='hover:bg-red-500 rounded-full p-2'>
                            <Link to="https://www.instagram.com/techbazaar2025?igsh=cGc3aGRmMzRyc25t">
                                <FaInstagram className="text-white" size={30}/>
                            </Link>
                        </div>
                        <div className='hover:bg-red-500 rounded-full p-2'>
                            <Link to="https://youtube.com/@techbazaar2025?si=6YhKNWAoVp62zLZ_">
                                <CiYoutube className="text-white" size={30}/>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-lg'>Support</span>
                    <span>Address: Remote</span>
                    <a href='mailto:techbazaar2025@gmail.com'>techbazaar2025@gmail.com</a>
                    <span>+91 9999999999</span>
                </div>

                {/* Account Section */}
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-lg'>Account</span>
                    <span><Link to="/manage" className="hover:text-red-500">My Account</Link></span>
                    <span><Link to="/login" className="hover:text-red-500">Login</Link> / <Link to="/sign_up" className="hover:text-red-500">Register</Link></span>
                    <span><Link to='/products' className="hover:text-red-500">Shop</Link></span>
                </div>

                {/* Quick Links Section */}
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-lg'>Quick Link</span>
                    <span><Link to="/privacy" className="hover:text-red-500">Privacy Policy</Link></span>
                    <span><Link to="/refund" className="hover:text-red-500">Refund Policy</Link></span>
                    <span><Link to="/shipping" className="hover:text-red-500">Shipping Policy</Link></span>
                    <span><Link to="/term" className="hover:text-red-500">Terms Of Use</Link></span>
                    <span><Link to="/faq" className="hover:text-red-500">FAQ</Link></span>
                </div>
            </div>

            {/* Footer Copyright with Dynamic Year */}
            <div className='flex justify-center py-4'>
                © {currentYear} Company, Inc. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;

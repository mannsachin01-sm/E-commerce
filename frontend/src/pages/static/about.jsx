import { CiShop } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdAssuredWorkload } from "react-icons/md";
import ritik from "/assets/ritik.jpg";
import naman from "/assets/naman.jpg";
import shitij from "/assets/shitij.jpg";
import kushang from "/assets/kushang.jpg";
import malya from "/assets/malya.jpg";

const About = () => {
  return (
    <div className="m-6 lg:m-24">
      <span className="font-bold text-4xl lg:text-5xl flex justify-center mb-6">Our Story</span>
      <div className="text-center mb-10">
        <p className="text-base lg:text-lg">
          Welcome to Tech Bazaar, your premier online store for top-quality
          electronic items. From the latest smartphones and laptops to
          cutting-edge home appliances and accessories, Tech Bazaar offers a vast
          selection of products to meet all your tech needs. Our website is
          designed for easy navigation, allowing you to quickly find and compare
          the newest gadgets and best brands. With secure payment options, fast
          shipping, and dedicated customer support, shopping for electronics has
          never been easier. Discover unbeatable deals and the latest innovations
          at Tech Bazaar, where technology meets convenience.
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="border rounded p-5 hover:bg-orange-500 hover:text-white text-center">
          <CiShop size={50} className="mx-auto" />
          <span className="font-bold text-xl">16,547</span>
          <br />
          <span>Sellers active at our site</span>
        </div>
        <div className="border rounded p-5 hover:bg-orange-500 hover:text-white text-center">
          <CiDollar size={50} className="mx-auto" />
          <span className="font-bold text-xl">9,27,564</span>
          <br />
          <span>Monthly sale</span>
        </div>
        <div className="border rounded p-5 hover:bg-orange-500 hover:text-white text-center">
          <MdOutlineShoppingBag size={50} className="mx-auto" />
          <span className="font-bold text-xl">41,692</span>
          <br />
          <span>Customer active at our site</span>
        </div>
        <div className="border rounded p-5 hover:bg-orange-500 hover:text-white text-center">
          <FaSackDollar size={50} className="mx-auto" />
          <span className="font-bold text-xl">71,48,250</span>
          <br />
          <span>Yearly sale</span>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="text-center">
          <img className="rounded-full h-28 mx-auto" src={malya} alt="Avatar" />
          <span className="block font-semibold">Tia Rawat</span>
          <span className="block text-sm">Backend Developer</span>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <CiTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="text-center">
          <img className="rounded-full h-28 mx-auto" src={naman} alt="Avatar" />
          <span className="block font-semibold">Sachin Mann</span>
          <span className="block text-sm">Frontend Developer</span>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <CiTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="text-center">
          <img className="rounded-full h-28 mx-auto" src={shitij} alt="Avatar" />
          <span className="block font-semibold">Yash Rana</span>
          <span className="block text-sm">Designer</span>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <CiTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded p-5 hover:bg-orange-500 hover:text-white text-center">
          <TbTruckDelivery size={50} className="mx-auto" />
          <span className="font-bold text-xl">FREE AND FAST DELIVERY</span>
          <br />
          Free delivery for all orders
        </div>
        <div className="border rounded p-5 hover:bg-orange-500 hover:text-white text-center">
          <RiCustomerService2Fill size={50} className="mx-auto" />
          <span className="font-bold text-xl">24/7 CUSTOMER SERVICE</span>
          <br />
          Friendly 24/7 customer support
        </div>
        <div className="border rounded p-5 hover:bg-orange-500 hover:text-white text-center">
          <MdAssuredWorkload size={50} className="mx-auto" />
          <span className="font-bold text-xl">MONEY BACK GUARANTEE</span>
          <br />
          We return money within 30 days
        </div>
      </div>
    </div>
  );
};

export default About;
import React from "react";
import { FaGlobe } from "react-icons/fa";
import logo from "../../assets/logo/amazon-logo-navbar.png";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      {/* Top Links Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h2 className="font-bold mb-3 text-[16px]">Get to Know Us</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-gray-300">About Amazon</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Careers</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Press Releases</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Amazon Science</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3 text-[16px]">Connect with Us</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-gray-300">Facebook</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Twitter</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Instagram</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3 text-[16px]">Make Money with Us</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-gray-300">Sell on Amazon</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Amazon Global Selling</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Advertise Your Products</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Become an Affiliate</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Fulfilment by Amazon</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3 text-[16px]">Let Us Help You</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-gray-300">Your Account</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Returns Centre</a></li>
            <li><a href="/" className="hover:underline text-gray-300">100% Purchase Protection</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Amazon App Download</a></li>
            <li><a href="/" className="hover:underline text-gray-300">Help</a></li>
          </ul>
        </div>
      </div>

      {/* Middle Section (Logo + Selectors) */}
      <div className="border-t border-gray-700 py-6">
        <div className="flex justify-center items-center space-x-6">
          <img
            src={logo}
            alt="Amazon Logo"
            className="h-6"
          />
          <button className="flex items-center border border-gray-500 px-3 py-1 text-sm rounded text-gray-300 hover:border-white">
            <FaGlobe className="mr-2" /> English
          </button>
          <button className="border border-gray-500 px-3 py-1 text-sm rounded text-gray-300 hover:border-white">
            India
          </button>
        </div>
      </div>

      {/* Services Strip (AbeBooks, Audible, etc.) */}
      <div className="bg-[#131A22] px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-xs text-gray-400 mx-auto">
        <div>
          <p className="font-semibold text-white">AbeBooks</p>
          <p>Books, art & collectibles</p>
        </div>
        <div>
          <p className="font-semibold text-white">Amazon Web Services</p>
          <p>Scalable Cloud Computing Services</p>
        </div>
        <div>
          <p className="font-semibold text-white">Audible</p>
          <p>Download Audio Books</p>
        </div>
        <div>
          <p className="font-semibold text-white">IMDb</p>
          <p>Movies, TV & Celebrities</p>
        </div>
        <div>
          <p className="font-semibold text-white">Shopbop</p>
          <p>Designer Fashion Brands</p>
        </div>
        <div>
          <p className="font-semibold text-white">Amazon Business</p>
          <p>Everything For Your Business</p>
        </div>
        <div>
          <p className="font-semibold text-white">Prime Now</p>
          <p>2-Hour Delivery on Everyday Items</p>
        </div>
        <div>
          <p className="font-semibold text-white">Amazon Prime Music</p>
          <p>100 million songs, ad-free<br />Over 15 million podcast episodes</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-900 text-gray-400 text-xs py-4">
        <div className="flex justify-center space-x-6 mb-2">
          <a href="/" className="hover:underline">Conditions of Use & Sale</a>
          <a href="/" className="hover:underline">Privacy Notice</a>
          <a href="/" className="hover:underline">Interest-Based Ads</a>
        </div>
        <p className="text-center">&copy; 1996-{new Date().getFullYear()}, Amazon Clone, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

export default Footer;

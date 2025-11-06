// frontend/src/components/common/Navbar.jsx
// Navbar component for AmazonClone
// Shows logo, search, delivery info, language selector, cart, orders, and dynamic user greeting

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/amazon-logo-navbar.png";
import {
  ShoppingCartIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { IoMdSearch } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  // Access user and logout from AuthContext
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="bg-[#131921] text-white w-full">
      {/* Main Navbar */}
      <div className="flex items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="mr-4 flex items-center cursor-pointer">
          <img src={logo} alt="Amazon Logo" className="h-[30px] w-auto" />
        </Link>

        {/* Delivery Info */}
        <div className="hidden sm:flex flex-col mr-4 cursor-pointer">
          <span className="text-xs text-[#cccccc]">
            Delivering to Chennai 600001
          </span>
          <span className="font-bold flex items-center">
            <MapPinIcon className="h-4 w-4 mr-1" /> Update location
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 mx-4">
          <select className="rounded-l-md px-2 text-black text-sm bg-[#cccccc] w-[60px]">
            <option>All</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Fashion</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon"
            className="flex-1 px-4 py-2 text-black focus:outline-none"
          />
          <button className="bg-yellow-400 px-4 rounded-r-md hover:bg-yellow-500 transition flex items-center justify-center">
            <IoMdSearch size={20} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 text-sm">
          {/* Language Selector */}
          <div className="relative group flex items-center mx-4 cursor-pointer">
            <img
              src="https://flagcdn.com/w20/in.png"
              alt="India Flag"
              className="w-6 h-4 object-cover"
            />
            <span className="text-white text-sm ml-1">EN</span>

            {/* Dropdown Menu */}
            <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md p-4 w-56 hidden group-hover:block z-50">
              <ul className="space-y-1 text-sm text-gray-800">
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  English - EN
                </li>
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  हिन्दी - HI
                </li>
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  தமிழ் - TA
                </li>
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  తెలుగు - TE
                </li>
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  ಕನ್ನಡ - KN
                </li>
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  മലയാളം - ML
                </li>
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  বাংলা - BN
                </li>
                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                  मराठी - MR
                </li>
              </ul>
              <hr className="my-2" />
              <p className="text-xs text-gray-600">Learn more</p>
              <p className="text-xs text-gray-600 mt-2">
                You are shopping on <strong>Amazon.in</strong>
              </p>
              <button className="mt-2 w-full border border-gray-300 text-xs py-1 rounded hover:bg-gray-100">
                Change country/region
              </button>
            </div>
          </div>

          {/* Sign in / Account */}
          {user ? (
            <div className="flex flex-col cursor-pointer text-left">
              <Link to="/account">
                <span className="text-xs">Hello, {user.name}</span>
                <span className="font-bold flex items-center">
                  Account & Lists{" "}
                  <ChevronDownIcon className="h-4 w-4 inline ml-1" />
                </span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex flex-col text-left cursor-pointer"
            >
              <span className="text-xs">Hello, Sign in</span>
              <span className="font-bold flex items-center">
                Account & Lists{" "}
                <ChevronDownIcon className="h-4 w-4 inline ml-1" />
              </span>
            </Link>
          )}

          {/* Returns & Orders */}
          <Link to="/orders" className="flex flex-col text-xs">
            <span>Returns</span>
            <span className="font-bold">& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCartIcon className="h-8 w-8" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-2 text-xs font-bold">
                {cartCount}
              </span>
            )}
            <span className="ml-1 hidden sm:inline font-bold">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

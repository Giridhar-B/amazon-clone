import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function SubNavbar() {
  return (
    <div className="bg-gray-800 text-white text-sm mb-0 pb-0">
      <div className="flex items-center space-x-6 px-4 py-2">
        {/* All with hamburger */}
        <div className="flex items-center space-x-1 cursor-pointer hover:border hover:border-white px-2 py-1">
          <GiHamburgerMenu className="h-5 w-5" />
          <span className="font-bold">All</span>
        </div>

        {/* Other options */}
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Fresh
        </span>
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Amazon miniTV
        </span>
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Sell
        </span>
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Best Sellers
        </span>
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Mobiles
        </span>
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Today's Deals
        </span>
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Customer Service
        </span>
        <span className="cursor-pointer hover:border hover:border-white px-2 py-1">
          Electronics
        </span>
      </div>
    </div>
  );
}

export default SubNavbar;

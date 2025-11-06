import React, { useEffect, useState, useRef, useContext } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ProductPurchaseSection = ({ product }) => {
  const [userCity, setUserCity] = useState("Chennai");
  const [userPincode, setUserPincode] = useState("600001");
  const [quantity, setQuantity] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });
  const dropdownRef = useRef(null);

  const { user } = useContext(AuthContext);
  const stockCount = product?.stock || 0;

  /* ------------------ Delivery Date ------------------ */
  useEffect(() => {
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3);
    setDeliveryDate(
      delivery.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    );
  }, []);

  /* ------------------ Auto-detect City ------------------ */
  useEffect(() => {
    if (!userCity && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Your location";
          setUserCity(city);
        } catch {
          setUserCity("Unknown");
        }
      });
    }
  }, [userCity]);

  /* ------------------ Close dropdown ------------------ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ------------------ Format Price ------------------ */
  const renderFormattedPrice = (price) => {
    if (!price) return null;
    const formatted = Number(price).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
    });
    const [main, fraction] = formatted.split(".");
    return (
      <span className="text-[28px] font-medium whitespace-nowrap">
        <sup className="align-middle text-[13px]">₹</sup>
        {main}
        <sup className="align-middle text-[13px]">{fraction}</sup>
      </span>
    );
  };

  /* ------------------ Add to Cart ------------------ */
  const handleAddToCart = async () => {
    if (!user) return setPopup({ show: true, message: "Please log in to add items to your cart." });
    if (stockCount === 0) return setPopup({ show: true, message: "This product is out of stock." });

    try {
      const cartData = {
        user_id: user.id,
        asin: product?.asin,
        quantity: quantity || 1,
      };

      console.log("🛒 Sending cart data:", cartData);

      const response = await axios.post("http://localhost:5000/cart", cartData);

      if (response.data) {
        setPopup({ show: true, message: " Product added to cart!" });
      } else {
        setPopup({ show: true, message: "Failed to add product. Try again." });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setPopup({ show: true, message: "Failed to add product. Try again." });
    }
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: "" });
  };

  /* ------------------ JSX UI ------------------ */
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white max-w-xs top-24 mt-10 relative">

      {/*  Popup Modal (centered small box) */}
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p className="text-gray-800 font-medium mb-4">{popup.message}</p>
            <button
              onClick={handleClosePopup}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="mb-1 mt-2">{renderFormattedPrice(product?.price)}</div>
      <p className="text-sm mb-3">
        FREE delivery <span className="font-semibold">{deliveryDate}</span>
      </p>
      <p className="text-green-700 font-semibold mb-2">Arrives in 3 days</p>

      <div
        onClick={() => alert("Open location update modal")}
        className="text-[12px] mb-4 flex items-center cursor-pointer hover:underline flex-wrap text-blue-800"
      >
        <MapPin size={16} className="text-gray-600 mr-1" />
        <span className="font-medium">
          Delivering to&nbsp;
          {userCity && userPincode
            ? `${userCity} ${userPincode}`
            : "Detecting..."}
        </span>
        <span className="ml-1">- Update location</span>
      </div>

      <p
        className={`font-semibold mb-3 ${
          stockCount > 0 ? "text-green-700" : "text-red-600"
        }`}
      >
        {stockCount > 0 ? "In stock" : "Out of stock"}
      </p>

      {stockCount > 0 && (
        <div className="mb-4 relative" ref={dropdownRef}>
          <label htmlFor="quantity" className="text-sm font-medium mr-2">
            Quantity:
          </label>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="border border-gray-400 rounded px-3 py-1 w-full text-left bg-white flex justify-between items-center"
          >
            {quantity}
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          {showDropdown && (
            <ul
              className="absolute z-10 bg-white border border-gray-400 mt-1 rounded w-full max-h-40 overflow-y-auto shadow-md"
              style={{ scrollbarWidth: "thin" }}
            >
              {Array.from({ length: stockCount }, (_, i) => i + 1).map((num) => (
                <li
                  key={num}
                  onClick={() => {
                    setQuantity(num);
                    setShowDropdown(false);
                  }}
                  className={`px-3 py-1 hover:bg-gray-100 cursor-pointer ${
                    quantity === num ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {num}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mb-4 text-sm">
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">Ships from</span>
          <span className="text-blue-600">Amazon</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">Sold by</span>
          <span className="text-blue-600">{product?.brand || "Amazon"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Payment</span>
          <span className="text-blue-600">Secure transaction</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-3">
        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-full"
        >
          Add to Cart
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-black font-medium py-2 rounded-full">
          Buy Now
        </button>
        <button className="border border-gray-400 text-sm text-gray-700 hover:bg-gray-100 py-2 rounded-full">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductPurchaseSection;

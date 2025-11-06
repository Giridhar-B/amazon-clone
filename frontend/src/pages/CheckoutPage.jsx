import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  //  Popup state
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    redirect: false,
  });

  //  Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const showPopup = (message, redirect = false) => {
    setPopup({ show: true, message, redirect });
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: "", redirect: false });
    if (popup.redirect) navigate("/orders");
  };

  const handlePlaceOrder = async () => {
    if (!user?.id) return showPopup("Please log in to place an order.");
    if (!cartItems.length) return showPopup("Your cart is empty.");
    if (!address.city || !address.state || !address.pincode)
      return showPopup("Please fill in all required address details.");

    const orderData = {
      items: cartItems.map((item) => ({
        product_id: item.id || item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      address,
      totalPrice,
      payment_method: paymentMethod,
      user_id: user.id,
      address_id: null,
    };

    console.log(" Sending order data:", orderData);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/orders", orderData);

      if (res.data.success) {
        clearCart();
        showPopup(" Order placed successfully!", true);
      } else {
        showPopup("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(" Error placing order:", err.response?.data || err);
      showPopup("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      {/*  Center Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center">
            <p className="text-gray-800 font-medium mb-5">{popup.message}</p>
            <button
              onClick={handleClosePopup}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/*  Address Form */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="address_line_1"
              placeholder="Address Line 1"
              value={address.address_line_1}
              onChange={handleAddressChange}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              name="address_line_2"
              placeholder="Address Line 2"
              value={address.address_line_2}
              onChange={handleAddressChange}
              className="w-full border rounded p-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleAddressChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark (optional)"
                value={address.landmark}
                onChange={handleAddressChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/*  Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item.id || item.product_id}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          {/*  Payment Method */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Payment Method</h4>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Card Payment</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded font-medium transition-all"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

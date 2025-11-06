import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, fetchCartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch cart items on load
  useEffect(() => {
    const loadCart = async () => {
      if (!user) return;
      setLoading(true);
      await fetchCartItems();
      setLoading(false);
    };
    loadCart();
  }, [user]);

  // Calculate total dynamically
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  // Handle navigation to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Please log in to view your cart.
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading your cart...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.cart_item_id}
              className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:5000${item.image_url}`}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-lg border"
                />
                <div>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm">
                    ₹{parseFloat(item.price).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.cart_item_id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-semibold">Total:</h3>
            <p className="text-xl font-bold text-green-700">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg font-medium mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

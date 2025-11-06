// src/pages/OrdersPage.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Popup state
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    onConfirm: null,
    type: "", // "info" | "confirm"
  });

  //  Fetch user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user || !user.id) {
          console.warn(" No user found — cannot fetch orders");
          setOrders([]);
          setLoading(false);
          return;
        }

        console.log(" Fetching orders for user:", user.id);
        const res = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
        console.log(" Orders fetched:", res.data);
        setOrders(res.data || []);
      } catch (err) {
        console.error(" Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  //  Show popup function
  const showPopup = (message, onConfirm = null, type = "info") => {
    setPopup({ show: true, message, onConfirm, type });
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: "", onConfirm: null, type: "" });
  };

  //  Handle order deletion
  const handleDeleteOrder = (orderId) => {
    showPopup("Are you sure you want to cancel this order?", async () => {
      try {
        const res = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
        if (res.status === 200) {
          showPopup(" Order cancelled successfully.");
          setOrders((prev) => prev.filter((o) => o.order_id !== orderId));
        }
      } catch (err) {
        console.error(" Error deleting order:", err);
        showPopup("Failed to cancel order. Please try again.");
      }
    }, "confirm");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Loading your orders...
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-700">
        <h2 className="text-xl font-semibold">You have no orders yet.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 relative">
      {/*  Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center">
            <p className="text-gray-800 font-medium mb-5">{popup.message}</p>
            <div className="flex justify-center gap-4">
              {popup.type === "confirm" ? (
                <>
                  <button
                    onClick={() => {
                      popup.onConfirm?.();
                      handleClosePopup();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded font-semibold"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded font-semibold"
                  >
                    No
                  </button>
                </>
              ) : (
                <button
                  onClick={handleClosePopup}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">Order #{order.order_id}</h2>

              {/* 🗑 Cancel Button */}
              <button
                onClick={() => handleDeleteOrder(order.order_id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>

            <div className="mb-3">
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-semibold">Ordered Date:</span>{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment_method}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ₹{order.total_amount}
              </p>
            </div>

            <div className="border-t pt-3 mt-3">
              <h3 className="font-semibold mb-2">Items:</h3>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b py-2 last:border-none"
                  >
                    <img
                      src={`http://localhost:5000${item.image_url}`}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No items found in this order.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

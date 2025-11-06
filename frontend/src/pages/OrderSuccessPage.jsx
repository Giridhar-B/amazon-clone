import React from "react";
import { Link, useParams } from "react-router-dom";

const OrderSuccessPage = () => {
  const { id } = useParams();
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
      <p className="mb-6">Your order ID: <span className="font-mono">{id}</span></p>
      <Link to="/orders" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccessPage;

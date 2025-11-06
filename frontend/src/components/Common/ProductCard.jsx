import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-white border rounded-lg shadow-sm hover:shadow-md transition p-3"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-2"
      />
      <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
      <p className="text-red-600 font-bold mt-1">₹{product.price}</p>
    </Link>
  );
}

export default ProductCard;

import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ProductInfo({ product }) {
  // Generate star rating
  const stars = [];
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++)
    stars.push(<FaStar key={i} className="text-yellow-500" />);
  if (hasHalfStar)
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
  while (stars.length < 5)
    stars.push(
      <FaRegStar key={`empty-${stars.length}`} className="text-yellow-500" />
    );

  return (
    <div className="bg-yellow-100 border rounded-lg ">
      {/* Title */}
      <h1 className="text-2xl font-bold">{product.title}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        {stars}
        <span className="text-sm text-blue-600 cursor-pointer">
          {product.reviews} ratings
        </span>
      </div>

      {/* Price Section */}
      <div className="space-y-1">
        <p className="text-2xl text-red-600 font-semibold">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        {product.mrp && (
          <p className="text-sm text-gray-500 line-through">
            MRP ₹{product.mrp.toLocaleString("en-IN")}
          </p>
        )}
        {product.discount && (
          <p className="text-green-600 text-sm">{product.discount} off</p>
        )}
      </div>

      {/* Highlights / Key Features */}
      {product.highlights && (
        <div>
          <h3 className="font-semibold mt-4">About this item</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
            {product.highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Description */}
      {product.description && (
        <p className="mt-4 text-gray-700">{product.description}</p>
      )}
    </div>
  );
}

export default ProductInfo;

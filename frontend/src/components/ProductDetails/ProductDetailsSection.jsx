import React from "react";

function ProductDetailsSection({ details }) {
  if (!details || !details.specs || Object.keys(details.specs).length === 0) {
    return <p className="text-gray-500">No product details available.</p>;
  }

  return (
    <div className="bg-white  p-4 mt-4 border-t border-b border-gray-300">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-2 pb-2 border-gray-300">
        Product Details
      </h2>

      {/* Key-Value rows */}
      <div className="pt-2 pb-5">
        {Object.entries(details.specs).map(([key, value], index) => (
          <div
            key={index}
            className="flex justify-between py-1.5 border-t border-b border-gray-200"
          >
            <span className="font-semibold text-gray-700 w-1/2 text-[14px]  ">
              {key}
            </span>
            <span className="text-gray-900 w-1/2 text-sm">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailsSection;

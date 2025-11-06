import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StarRating from "./StarRating";

import delivery from "../../assets/icons/icon-amazon-delivered.png";
import replacement from "../../assets/icons/icon-returns.png";
import warranty from "../../assets/icons/icon-warranty.png";
import payOnDelivery from "../../assets/icons/icon-cod.png";
import topBrand from "../../assets/icons/icon-top-brand.png";
import securePayment from "../../assets/icons/Secure-payment.png";
import freeShipping from "../../assets/icons/trust_icon_free_shipping.png";

function ProductInfoSection() {
  const { asin } = useParams();
  const [product, setProduct] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef(null);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${asin}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchProduct();
  }, [asin]);

  // Check scroll position to toggle arrows
  const checkScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [product]);

  if (!product)
    return <p className="text-gray-500 mt-10">Loading product details...</p>;

  const {
    title,
    brand,
    description,
    price,
    original_price,
    discount_percentage,
    category,
    about_item,
    heading,
  } = product;

  const discount =
    discount_percentage ||
    Math.round(((original_price - price) / original_price) * 100);

  // All highlights
  const allHighlights = [
    { img: delivery, text: "Free Delivery" },
    { img: replacement, text: "10 Days Replacement" },
    { img: warranty, text: "1 Year Warranty" },
    { img: payOnDelivery, text: "Pay on Delivery" },
    { img: topBrand, text: "Top Brand" },
    { img: securePayment, text: "Secure Payment" },
    { img: freeShipping, text: "Free Shipping" },
  ];

  // Category-specific highlights
  let highlights = [];
  if (category?.toLowerCase() === "electronics") highlights = allHighlights;
  else if (category?.toLowerCase() === "fashion")
    highlights = [
      { img: replacement, text: "10 Days Replacement" },
      { img: payOnDelivery, text: "Pay on Delivery" },
      { img: topBrand, text: "Top Brand" },
      { img: freeShipping, text: "Free Shipping" },
    ];
  else if (category?.toLowerCase() === "books")
    highlights = [
      { img: delivery, text: "Free Delivery" },
      { img: payOnDelivery, text: "Pay on Delivery" },
      { img: securePayment, text: "Secure Payment" },
    ];
  else
    highlights = [
      { img: delivery, text: "Free Delivery" },
      { img: payOnDelivery, text: "Pay on Delivery" },
      { img: freeShipping, text: "Free Shipping" },
    ];

  const aboutArray =
    typeof about_item === "string"
      ? about_item.split(".").filter((item) => item.trim() !== "")
      : about_item || [];

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col mt-10">
      {/* Product Title */}
      <h1 className="text-[24px] font-semibold text-gray-900">{heading}</h1>

      {/* Ratings */}
      <div className="flex items-center gap-2 mt-2">
        <StarRating rating={product.avg_rating} />
        <span className="text-gray-600 text-sm">
          {product.avg_rating} • {product.total_reviews} ratings
        </span>
      </div>
      <hr className="mt-2"/>
      {/* Price Section */}
      <div className="flex items-baseline gap-3 mt-2">
        <span className="text-2xl text-gray-900">
          ₹{price?.toLocaleString()}
        </span>
        {original_price && (
          <>
            <span className="line-through text-gray-400 text-lg">
              ₹{original_price?.toLocaleString()}
            </span>
            <span className="text-red-600 font-medium text-lg">
              -{discount}% off
            </span>
          </>
        )}
      </div>

      {/* 🔹 Highlights Carousel */}
      <div className="relative mt-3 w-[420px]">
        {/* Left Button */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 p-2 rounded shadow hover:bg-gray-100"
          >
            <FaChevronLeft size={16} />
          </button>
        )}

        {/* Scrollable container */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth h-30 items-center"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center flex-shrink-0 w-28"
            >
              <img
                src={item.img}
                alt={item.text}
                className="w-10 h-10 object-contain"
              />
              <span className="text-blue-600 text-[12px] font-medium text-center mt-2">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Right Button */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 p-2 rounded shadow hover:bg-gray-100"
          >
            <FaChevronRight size={16} />
          </button>
        )}
      </div>

      <hr className="mt-2" />

      {/* Description */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Description
        </h2>

        {description ? (
          <div className="text-sm text-gray-700 leading-relaxed space-y-1">
            {description.split("\n").map((line, index) => {
              const [label, value] = line.split(":").map((item) => item.trim());
              return (
                <div key={index} className="flex">
                  <span className="font-semibold w-48">{label}</span>
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-700 text-sm">
            No description available for this product.
          </p>
        )}
      </div>

      {/* About This Product */}
      {aboutArray.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">
            About this item
          </h2>
          <ul className="list-disc list-inside mt-2 text-gray-700 text-sm space-y-1">
            {aboutArray.map((point, index) => (
              <li key={index}>{point.trim()}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default ProductInfoSection;

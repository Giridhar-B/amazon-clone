import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductImageGallery from "../components/ProductDetails/ProductImageGallery";
import ProductInfoSection from "../components/ProductDetails/ProductInfoSection";
import ProductPurchaseSection from "../components/ProductDetails/ProductPurchaseSection";
import ProductDetailsSection from "../components/ProductDetails/ProductDetailsSection";
import ProductReviewsSection from "../components/ProductDetails/ProductReviewsSection";

function ProductPage() {
  const { asin } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${asin}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [asin]);

  if (!product)
    return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="mx-auto p-6 min-h-screen">
      {/* First Row Section */}
      <div className="flex flex-wrap justify-between w-full">
        {/* Left - Image Gallery */}
        <div className="w-[50%] md:sticky md:top-24 self-start h-fit">
          <ProductImageGallery images={product.images} title={product.title} />
        </div>

        {/* Middle - Product Info */}
        <div className="w-[30%]">
          <ProductInfoSection product={product} />
        </div>

        {/* Right - Purchase Section */}
        <div className="w-[15%]">
          <ProductPurchaseSection product={product} />
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12">
        <ProductDetailsSection details={product.details} />
      </div>

      {/* Reviews */}
      <div className="mt-12 border-t pt-6">
        <ProductReviewsSection reviews={product.reviews} />
      </div>
    </div>
  );
}

export default ProductPage;

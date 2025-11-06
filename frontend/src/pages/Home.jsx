import React from "react";
// import { Link } from "react-router-dom";

// ImageSlider
import ImageSlider from "../components/HomePage/HeroSlides/ImageSlider";

// Box Rows
import BoxGrid from "../components/HomePage/Boxes/BoxGrid";

// Carousel With Product Details
import ProductCarousel from "../components/HomePage/Carousel/ProductCarousel";
import { electronicsDeals } from "../data/productCarouselData";

// Carousel Only with Product Images
import ImageCarousel from "../components/HomePage/Carousel/ImageCarousel";
import {
  imageCarouselData1,
  imageCarouselData2,
  imageCarouselData3,
} from "../data/imageCarousel";

// Sign In or Create Account
import SignInPanel from "../components/HomePage/SignInPanel";

// Back To Top of the Page
import BackToTopButton from "../components/Common/BackToTopButton";

// Footer
import Footer from "../components/Common/Footer";

function Home() {
  return (
    <div className="bg-gray-100">
      <ImageSlider />

      <BoxGrid rowIds={["row1", "row2"]} />

      {/* Products are clickable */}
      <ProductCarousel
        title="Top deals with exchange | Up to ₹74,000 off"
        products={electronicsDeals.map((product) => ({
          ...product,
          link: `/product/${product.id}`, 
        }))}
      />

      <ImageCarousel
        title="Up to 65% off | Deals on Smart TVs"
        images={imageCarouselData1}
      />

      <BoxGrid rowIds={["row3"]} />

      <ImageCarousel
        title="Up to 40% off | Best Deals on flagship smartphones"
        images={imageCarouselData2}
      />

      <ImageCarousel
        title="Min.45% off | Bestsellers from Indian artisans"
        images={imageCarouselData3}
      />

      <BoxGrid rowIds={["row4"]} />

      {/* Amazon-style Sign In Panel */}
      <SignInPanel />

      {/* Back To Top of the Page */}
      <BackToTopButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;

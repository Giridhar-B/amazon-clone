import React, { useRef, useState, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

function ProductCarousel({ title, products }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position
  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  // Run check on load & scroll
  useEffect(() => {
    checkScroll();
    const ref = carouselRef.current;
    if (ref) ref.addEventListener("scroll", checkScroll);
    return () => ref?.removeEventListener("scroll", checkScroll);
  }, []);

// Scroll function
const scroll = (direction) => {
  if (carouselRef.current) {
    const cardWidth = 220; // adjust based on min-w/max-w of card + gap
    const scrollAmount = cardWidth * 4; // scroll 5 products at once
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};


  return (
    <div className="relative bg-white p-5 mt-5 mx-10 shadow-md">
      {/* Section Title */}
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[100px] w-[60px] bg-white shadow-md  flex items-center justify-center rounded-r z-10"

          >
            <MdArrowBackIos size={24} />
          </button>
        )}

        {/* Scrollable Products */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: "none" }} // hide scrollbar for Firefox
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className="min-w-[200px] max-w-[250px] flex-shrink-0 bg-white p-3 border rounded-md h-[300px]"
            >
                <div className="h-[200px] w-full flex items-center justify-center bg-gray-100 mb-3 rounded overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain h-[300px] w-[190px] transform scale-105"
                    />
                </div>

              <p className="text-red-600 font-bold text-[14px]">
                ₹{product.offerPrice.toLocaleString()}
              </p>
              <p className="text-gray-500 line-through text-[13px]">
                ₹{product.actualPrice.toLocaleString()}
              </p>
              <p className="text-[13px] line-clamp-2 truncate w-full">{product.name}</p>              
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md h-[100px] w-[60px]  flex items-center justify-center rounded-l z-10"
          >
            <MdArrowForwardIos size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCarousel;

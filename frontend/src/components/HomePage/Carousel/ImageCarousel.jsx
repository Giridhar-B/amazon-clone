import React, { useRef, useState, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

function ImageCarousel({ title, images }) {
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

  useEffect(() => {
    checkScroll();
    const ref = carouselRef.current;
    if (ref) ref.addEventListener("scroll", checkScroll);
    return () => ref?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 5 * 200; // scroll 5 images at once
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-white p-5 mt-5 mx-10 shadow-md group">
      {/* Section Title */}
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 
                      h-[100px] w-[60px] flex items-center justify-center rounded-r z-10
                      opacity-0 group-hover:opacity-100 transition-opacity
                      ${canScrollLeft ? "bg-white shadow-md" : "bg-slate-50 bg-opacity-50 cursor-not-allowed"}`}
        >
          <MdArrowBackIos size={24} />
        </button>

        {/* Scrollable Images */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {images.map((img, idx) => (
            <div key={idx} className="min-w-[200px] flex-shrink-0">
              <img
                src={img}
                alt={`carousel-img-${idx}`}
                className="h-[200px] w-full object-contain rounded"
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 
                      h-[100px] w-[60px] flex items-center justify-center rounded-l z-10
                      opacity-0 group-hover:opacity-100 transition-opacity
                      ${canScrollRight ? "bg-white shadow-md" : "bg-slate-50 bg-opacity-50 cursor-not-allowed"}`}
        >
          <MdArrowForwardIos size={24} />
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;

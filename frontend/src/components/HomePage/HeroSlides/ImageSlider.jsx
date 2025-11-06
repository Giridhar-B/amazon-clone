import React, { useState, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// Import hero images
import Banner1 from "../../../assets/HomePage/HeroSlides/banner1.jpg"
import Banner2 from "../../../assets/HomePage/HeroSlides/banner2.png";
import Banner3 from "../../../assets/HomePage/HeroSlides/banner3.jpg";
import Banner4 from "../../../assets/HomePage/HeroSlides/banner4.jpg";
import Banner5 from "../../../assets/HomePage/HeroSlides/banner5.jpg";
import Banner6 from "../../../assets/HomePage/HeroSlides/banner6.png";
import Banner7 from "../../../assets/HomePage/HeroSlides/banner7.jpg";
import Banner8 from "../../../assets/HomePage/HeroSlides/banner8.jpg";


export default function ImageSlider() {
  const images = [
    Banner1,
    Banner2,
    Banner3,
    Banner4,
    Banner5,
    Banner6,
    Banner7,
    Banner8,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex === images.length) return; // wait for reset
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(images.length - 1);
      setTimeout(() => setIsTransitioning(true), 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Reset when last duplicate is reached
  const handleTransitionEnd = () => {
    if (currentIndex === images.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => setIsTransitioning(true), 50);
    }
  };



  return (
    <div className="bg-gray-100">
      <div className="relative max-w-[1500px] mx-auto overflow-hidden">
        {/* Slider */}
        <div
          className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {[...images, images[0]].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-[600px] object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent"></div>

        {/* Left Arrow */}
        <button
        onClick={prevSlide}
            className="absolute top-[17px] left-2 h-[250px] w-[60px] flex items-center justify-center 
                    bg-transparent text-black text-4xl"
        >
        <MdArrowBackIos />
      </button>

        {/* Right Arrow */}
       <button
         onClick={nextSlide}
         className="absolute top-[17px] right-2 h-[250px] w-[60px] flex items-center justify-center 
                    bg-transparent text-black text-4xl "
       >
         <MdArrowForwardIos />
       </button>
      </div>

      
    </div>
  );
}


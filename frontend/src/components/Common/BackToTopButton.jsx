import React from "react";

function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="w-full bg-gray-700 text-white text-center py-3 font-medium text-sm cursor-pointer hover:bg-gray-600 transition duration-200"
    >
      Back to top
    </button>
  );
}

export default BackToTopButton;

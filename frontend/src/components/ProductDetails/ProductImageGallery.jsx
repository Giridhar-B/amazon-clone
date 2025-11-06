import React, { useState, useRef } from "react";

const ProductImageGallery = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // For main screen
  const [modalImage, setModalImage] = useState(images[0]); // For popup
  const [zoomVisible, setZoomVisible] = useState(false);
  const [lensPosition, setLensPosition] = useState({ left: 0, top: 0 });
  const [showModal, setShowModal] = useState(false);
  const imageRef = useRef(null);
  const modalRef = useRef(null);

  const lensSize = 200;
  const zoomScale = 1.5;

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (x < lensSize / 2) x = lensSize / 2;
    if (x > rect.width - lensSize / 2) x = rect.width - lensSize / 2;
    if (y < lensSize / 2) y = lensSize / 2;
    if (y > rect.height - lensSize / 2) y = rect.height - lensSize / 2;

    setLensPosition({ left: x - lensSize / 2, top: y - lensSize / 2 });
  };

  const visibleImages = images.slice(0, 5);
  const remainingImages = images.slice(5);
  const remainingCount = images.length - 5;

  // Close popup when clicking outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 mt-10">
        {/* Left: Thumbnails */}
        <div className="flex flex-col space-y-3">
          {visibleImages.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000${img}`}
              alt={`thumb-${index}`}
              className={`w-[60px] h-[60px] object-contain cursor-pointer rounded-md border transition-transform hover:scale-105 bg-transparent ${
                selectedImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => {
                setModalImage(img); // show clicked thumbnail in popup
                setShowModal(true);
              }}
              onMouseEnter={() => setSelectedImage(img)}
              style={{
                mixBlendMode: "multiply",
                backgroundColor: "transparent",
              }}
            />
          ))}

          {/* 5+ Button */}
          {remainingCount > 0 && (
            <div
              className="w-[60px] h-[60px] flex items-center justify-center border border-gray-400 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm font-semibold"
              onClick={() => {
                // When clicked, open with first hidden image
                setModalImage(remainingImages[0]);
                setShowModal(true);
              }}
            >
              +{remainingCount}
            </div>
          )}
        </div>

        {/* Main Image + Zoom */}
        <div
          className="relative flex items-center justify-center bg-transparent"
          onMouseEnter={() => setZoomVisible(true)}
          onMouseLeave={() => setZoomVisible(false)}
          onMouseMove={handleMouseMove}
          onClick={() => {
            setModalImage(selectedImage);
            setShowModal(true);
          }}
          style={{
            cursor: "pointer",
            width: "auto",
            height: "auto",
            maxWidth: "800px",
            maxHeight: "800px",
          }}
        >
          <img
            ref={imageRef}
            src={`http://localhost:5000${selectedImage}`}
            alt={title}
            className="max-w-full max-h-[800px] object-contain"
            style={{
              backgroundColor: "transparent",
              mixBlendMode: "multiply", // keeps white bg transparent-like
            }}
          />

          {/* Lens */}
          {zoomVisible && (
            <div
              className="absolute"
              style={{
                left: lensPosition.left,
                top: lensPosition.top,
                width: lensSize,
                height: lensSize,
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Zoomed View */}
          {zoomVisible && (
            <div className="absolute left-[700px] w-[600px] h-[600px] border overflow-hidden bg-white shadow-lg">
              <img
                src={`http://localhost:5000${selectedImage}`}
                alt="Zoomed Product"
                style={{
                  position: "absolute",
                  transform: `scale(${zoomScale})`,
                  transformOrigin: "top left",
                  left: `-${lensPosition.left * zoomScale}px`,
                  top: `-${lensPosition.top * zoomScale}px`,
                  mixBlendMode: "multiply",
                  backgroundColor: "transparent",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Modal Popup */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-xl max-w-6xl w-full flex gap-10 relative"
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            {/* Left: Large Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={`http://localhost:5000${modalImage}`}
                alt="Modal Product"
                className="w-[600px] h-[600px] object-contain"
                style={{
                  mixBlendMode: "multiply",
                  backgroundColor: "transparent",
                }}
              />
            </div>

            {/* Right: Product Info & Thumbnails */}
            <div className="w-[350px]">
              <h2 className="text-xl font-semibold mb-6">{title}</h2>

              <div className="grid grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000${img}`}
                    alt={`thumb-modal-${i}`}
                    onClick={() => setModalImage(img)}
                    className={`w-[80px] h-[80px] object-contain cursor-pointer border rounded-md ${
                      modalImage === img
                        ? "border-yellow-500"
                        : "border-gray-300"
                    }`}
                    style={{
                      mixBlendMode: "multiply",
                      backgroundColor: "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;

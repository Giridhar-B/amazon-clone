import React, { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductReviewsSection = ({ reviews }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStar, setSelectedStar] = useState(null);

  const allReviewImages = reviews
    ?.flatMap((r) => r.media || [])
    .filter((m) => m.media_type === "image");

  const imagesPerPage = 6;
  const scrollStep = 5;

  const handlePrev = () => setCurrentIndex((p) => Math.max(p - scrollStep, 0));
  const handleNext = () =>
    setCurrentIndex((p) =>
      Math.min(p + scrollStep, allReviewImages.length - imagesPerPage)
    );

  const visibleImages =
    allReviewImages?.slice(currentIndex, currentIndex + imagesPerPage) || [];

  const totalReviews = reviews?.length || 0;

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const validRatings = reviews
      .map((r) => Number(r.rating))
      .filter((n) => !isNaN(n));
    const sum = validRatings.reduce((a, b) => a + b, 0);
    return validRatings.length > 0 ? (sum / validRatings.length).toFixed(1) : 0;
  }, [reviews]);

  const ratingCounts = [
    reviews?.filter((r) => r.rating >= 4.5 && r.rating <= 5).length || 0,
    reviews?.filter((r) => r.rating >= 3.5 && r.rating < 4.5).length || 0,
    reviews?.filter((r) => r.rating >= 2.5 && r.rating < 3.5).length || 0,
    reviews?.filter((r) => r.rating >= 1.5 && r.rating < 2.5).length || 0,
    reviews?.filter((r) => r.rating >= 0.5 && r.rating < 1.5).length || 0,
  ];

  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
  );

  const filteredReviews = useMemo(() => {
    if (!selectedStar) return reviews;
    return reviews.filter((r) => {
      const rating = Number(r.rating);
      if (selectedStar === 5) return rating >= 4.5 && rating <= 5;
      if (selectedStar === 4) return rating >= 3.5 && rating < 4.5;
      if (selectedStar === 3) return rating >= 2.5 && rating < 3.5;
      if (selectedStar === 2) return rating >= 1.5 && rating < 2.5;
      if (selectedStar === 1) return rating >= 0.5 && rating < 1.5;
      return false;
    });
  }, [selectedStar, reviews]);

  return (
    <div className="mt-12 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

      {/* Average Rating */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center relative">
            {[1, 2, 3, 4, 5].map((i) => {
              const fillPercentage = Math.min(
                Math.max(averageRating - (i - 1), 0),
                1
              );
              return (
                <span key={i} className="relative text-2xl">
                  <span className="text-gray-300">★</span>
                  <span
                    className="absolute top-0 left-0 text-yellow-500 overflow-hidden"
                    style={{
                      width: `${fillPercentage * 100}%`,
                      clipPath: `inset(0 ${100 - fillPercentage * 100}% 0 0)`,
                    }}
                  >
                    ★
                  </span>
                </span>
              );
            })}
          </div>
          <p className="text-gray-700 font-medium text-lg">
            {averageRating} out of 5
          </p>
        </div>
        <p className="ml-1 text-gray-500 -mb-3">
          {totalReviews} review{totalReviews !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT - Rating Breakdown */}
        <div className="w-full md:w-1/5 text-[#2162A1]">
          {[5, 4, 3, 2, 1].map((star, idx) => (
            <div
              key={star}
              onClick={() =>
                setSelectedStar(selectedStar === star ? null : star)
              }
              className={`flex items-center gap-2 mb-2 cursor-pointer hover:underline hover:text-[#1B4A82] ${
                selectedStar === star ? "bg-yellow-50 rounded-md p-1" : ""
              }`}
            >
              <span className="w-6 text-xl pr-8">{star}★</span>
              <div className="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-6 bg-yellow-500"
                  style={{ width: `${ratingPercentages[idx]}%` }}
                ></div>
              </div>
              <span className="w-10 pl-4 text-xl">
                {ratingPercentages[idx]}%
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT - Reviews */}
        <div className="flex-1 ml-[100px] space-y-8 -mt-32">
          {/* Review Images Carousel */}
          {allReviewImages.length > 0 && (
            <div className="relative">
              <h3 className="text-lg font-semibold mb-3">
                Reviews with images
              </h3>
              <div className="relative flex items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute -left-2 z-10 bg-white border border-black rounded-md shadow p-2 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft size={18} />
                </button>

                <div className="flex gap-3 overflow-hidden mx-8 justify-center">
                  {visibleImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:5000${img.media_url}`}
                      alt={`review-img-${idx}`}
                      className="w-[150px] h-[140px] object-cover rounded-md border cursor-pointer"
                      onClick={() =>
                        setSelectedImage(
                          `http://localhost:5000${img.media_url}`
                        )
                      }
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={
                    currentIndex + imagesPerPage >= allReviewImages.length
                  }
                  className="absolute -right-2 z-10 bg-white border border-black rounded-md shadow p-2 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaChevronRight size={18} />
                </button>
              </div>
              <div className="border-b border-gray-200 mt-6"></div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="Full view"
                className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Individual Reviews */}
          <div className="w-[800px]">
            <h3 className="text-xl font-semibold mb-3">Top Reviews</h3>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((r) => (
                <div
                  key={r.id}
                  className="border rounded-lg p-4 shadow-sm mb-4"
                >
                  {/* Profile & Name */}
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`http://localhost:5000${r.reviewer_pic}`}
                      alt={r.reviewer_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-medium text-gray-800">
                      {r.reviewer_name}
                    </p>
                  </div>

                  {/* Stars + Title in same line */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i <= Math.round(r.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    {r.review_title && (
                      <p className="font-semibold text-gray-900 text-sm ml-2">
                        {r.review_title}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mb-2">
                    Reviewed on{" "}
                    {new Date(r.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm mb-3">{r.review_text}</p>

                  {/* Review Media */}
                  {r.media.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {r.media.map((m, idx) => (
                        <div key={idx}>
                          {m.media_type === "image" && (
                            <img
                              src={`http://localhost:5000${m.media_url}`}
                              alt="review media"
                              className="w-24 h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                              onClick={() =>
                                setSelectedImage(
                                  `http://localhost:5000${m.media_url}`
                                )
                              }
                            />
                          )}
                          {m.media_type === "video" && (
                            <video
                              src={`http://localhost:5000${m.media_url}`}
                              controls
                              className="w-40 rounded-lg border"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews for this rating.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsSection;

import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, totalStars = 5 }) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (rating >= i) {
      // full star
      stars.push(<FaStar key={i} className="text-yellow-500 inline" />);
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 inline" />);
    } else {
      // empty star
      stars.push(<FaRegStar key={i} className="text-gray-400 inline" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;

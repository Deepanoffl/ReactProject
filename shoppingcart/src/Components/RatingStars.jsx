import { useState } from "react";

const RatingStars = ({ loadKey }) => {
  //get and set rating from user
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem(loadKey);
    return savedRating ? parseInt(savedRating) : 0;
  });

  //function

  const handleRating = (newRating) => {
    setRating(newRating);
    localStorage.setItem(loadKey, newRating);
  };

  return (
    <div className="ratings">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-lg ${
            rating >= star ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleRating(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default RatingStars;

"use client";
import { useState } from "react";

const StarRating = () => {
  // const [rating, setRating] = useState<any>(null);
  // const [hover, setHover] = useState<any>(null);
  // const [totalStars, setTotalStars] = useState(5);

  // const handleChange = (e: any) => {
  //   setTotalStars(
  //     parseInt(Boolean(e?.target?.value, 10) ? e?.target?.value : 5)
  //   );
  // };
  return (
    <div className="star__container">
      {/* <h1>Star rating</h1>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating: any = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <br />
      <br />
      <p>Your rating is: {rating}</p> */}
    </div>
  );
};

export default StarRating;

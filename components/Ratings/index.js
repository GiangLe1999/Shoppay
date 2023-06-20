import * as React from "react";
import Rating from "@mui/material/Rating";

const Ratings = ({ defaultRating, value }) => {
  return (
    <Rating
      name="half-rating-read"
      defaultValue={defaultRating}
      precision={0.5}
      readOnly
      value={value}
    />
  );
};

export default Ratings;

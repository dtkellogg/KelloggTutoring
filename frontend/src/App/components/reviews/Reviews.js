import React from "react";
import { Link } from "react-router-dom"

import ReviewsList from "./ReviewsList";



export default function Reviews({ type }) {
  return (
    <div className={
      type === "meetToshi" ? "container__screen--sidebar" : "container__home--reviews"
    }>
      <div
        className="reviews"
        style={
          type === "meetToshi" ? { display: "block" } : { display: "flex" }
        }
      >
        {type === "meetToshi" && (
          <Link to={`/reviews/create-review`} className="btn__reviews">
            Create Review
          </Link>
        )}

        <ReviewsList type={type} />
      </div>
    </div>
  );
}
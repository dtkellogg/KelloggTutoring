import React from "react";
import { Link, useRouteMatch } from "react-router-dom"

import ReviewsList from "./ReviewsList";



export default function ReviewsRaw({ type }) {
  const { url } = useRouteMatch()

  console.log("Inside Reviews Component")

  return (
    <div className={
      type === "meetToshi" ? "container__screen--sidebar" : "container__home--reviews"
    }>
      <div
        className={
          type === "meetToshi" ? "container__reviews--toshi-screen" : "container__reviews--home-screen"
        }
        // style={
        //   type === "meetToshi" ? { display: "block" } : { display: "flex" }
        // }
      >
        {type === "meetToshi" && (
          <Link to={`${url}/create-review`} className="btn__reviews">
            Create Review
          </Link>
        )}

        <ReviewsList type={type} />
      </div>
    </div>
  );
}

export const Reviews = React.memo(ReviewsRaw, (prevProps, nextProps) => {
  return prevProps.count === nextProps.count
})
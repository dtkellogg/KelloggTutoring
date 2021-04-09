import React from "react";
import { Link, useRouteMatch } from "react-router-dom"

import ReviewsList from "./ReviewsList";



export default function Reviews({ type }) {
  const { url } = useRouteMatch()

  return (
    <div className={
      type === "meetToshi" ? "container__screen--sidebar" : "container__home--reviews"
    }>
      <div
        className={
          type === "meetToshi" ? "container__reviews--toshi-screen" : "container__reviews--home-screen"
        }
        style={
          type === "meetToshi" ? { display: "block" } : { display: "flex" }
        }
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
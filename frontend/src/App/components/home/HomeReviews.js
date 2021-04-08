import React from 'react'
import { Link } from "react-router-dom";

import Reviews from "../reviews/Reviews";

function HomeReviews({reviewsRef}) {
    return (
      <section className="container__home--reviews" ref={reviewsRef}>
        <Reviews type="home" />
        <Link to={`toshi/reviews/create-review`} className="">
          <button className="btn__home--to-reviews">Write a review</button>
        </Link>
      </section>
    );
}

export default HomeReviews

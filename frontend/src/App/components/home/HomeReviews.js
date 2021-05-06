import React from 'react'
import { Link } from "react-router-dom";

import Reviews from "../reviews/Reviews";

function HomeReviews({reviewsRef}) {
    return (
      <section className="container__home--reviews" ref={reviewsRef}>
        <Reviews type="home" />
      </section>
    );
}

export default HomeReviews
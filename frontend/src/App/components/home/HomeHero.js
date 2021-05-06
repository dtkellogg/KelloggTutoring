import React from 'react'
import { Link } from "react-router-dom";

function HomeHero() {

  return (
    <section className="container__hero">
      <div className="container__hero--text">

        <h1 className="letter-spacing-lg p__home--title">
          Kellogg Tutoring
        </h1>

        <h3 className="p__home--tutoring-simplified">
          Tutoring Simplified.
        </h3>

        <h4 className="p__home--subjects">
          Math, Science, English, Spanish, SAT & ACT
        </h4>

      </div>

      <div className="container__hero--right">

        <div className="container__btns--hero">

          <Link
            to={`/appointments/booking`}
            className="btn__home--to-request-tutoring"
          >
            Request Tutoring
          </Link>

          <Link
            to={`/appointments/payments`}
            className="btn__home--to-payments"
          >
            Payments
          </Link>
          
        </div>

        <div className="home__bubble bubble--1 fadeInAnimated__3" />
        <div className="home__bubble bubble--2 fadeInAnimated__2" />
        <div className="home__bubble bubble--3 fadeInAnimated__1" />

        <div
          id="teaching-animation"
          className="home__teaching-animation"
        />

      </div>
    </section>
  );
}

export default HomeHero
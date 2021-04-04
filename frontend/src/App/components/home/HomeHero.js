import React from 'react'
import { Link } from "react-router-dom";

function HomeHero() {
    return (
      <section className="container__hero">
        <div className="container__hero--text">
          <h1 className="letter-spacing-lg text__home--welcome fadeInAnimated--2">
            Kellogg Tutoring
          </h1>
          <h3 className="text__home--tutoring-simplified fadeInAnimated--3">
            Tutoring Simplified.
          </h3>
          <h4 className="text__home--subjects fadeInAnimated--4">
            Math, Science, English, Spanish, SAT & ACT
          </h4>
        </div>

        <div className="container__hero--right">
          <div className="container__btns--hero fadeInAnimated--4">
            <button className="btn__home--to-request-tutoring">
              <Link
                to={`/appointments/booking`}
                className="text__home--request-tutoring"
              >
                Request Tutoring
              </Link>
            </button>
            <button className="btn__home--to-payments">
              <Link
                to={`/appointments/payments`}
                className="text__home--payments"
              >
                Payments
              </Link>
            </button>
          </div>
          <div className="home__bubble bubble--1 fadeInAnimated--3" />
          <div className="home__bubble bubble--2 fadeInAnimated--2" />
          <div className="home__bubble bubble--3 fadeInAnimated--1" />

          <div
            id="teaching-animation"
            className="home__teaching-animation fadeInAnimated--0"
          />
        </div>
      </section>
    );
}

export default HomeHero
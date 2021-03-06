import React, { useRef } from "react";
import {Link} from 'react-router-dom'

// components
import BtnsUpDownHome from '../navigation/BtnsUpDownHome'
import HomeHero from './HomeHero'
import HomeAppointments from "./HomeAppointments";

import Reviews from "../reviews/Reviews";

export default function Home() {
  const calendarRef = useRef(null);
  const reviewsRef = useRef(null)

  return (
    <div className="container__home--primary">

      <BtnsUpDownHome calendarRef={calendarRef} reviewsRef={reviewsRef} />

      <div className="container__home--secondary">
        <HomeHero />
        <HomeAppointments calendarRef={calendarRef} />
        <Reviews reviewsRef={reviewsRef} type="home" />
        <Link to={`toshi/reviews/create-review`} className="btn__home--to-reviews">
          Write a review
        </Link>
      </div>

    </div>
  );
}
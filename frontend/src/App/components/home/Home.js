import React, { useRef } from "react";

// components
import BtnsUpDownHome from '../navigation/BtnsUpDownHome'
import HomeHero from './HomeHero'
import HomeAppointments from "./HomeAppointments";
import HomeReviews from "./HomeReviews";

export default function Home() {
  const calendarRef = useRef(null);
  const reviewsRef = useRef(null)

  return (
    <div className="container__home--primary">

      <BtnsUpDownHome calendarRef={calendarRef} reviewsRef={reviewsRef} />

      <div className="container__home--secondary">
        <HomeHero />
        <HomeAppointments calendarRef={calendarRef} />
        <HomeReviews reviewsRef={reviewsRef} />
      </div>

    </div>
  );
}
import React, { useRef } from "react";

// components
import BtnsUpDownHome from '../components/navigation/BtnsUpDownHome'
import HomeHero from '../components/home/HomeHero'
import HomeAppointments from "../components/home/HomeAppointments";
import HomeReviews from "../components/home/HomeReviews";

export default function HomePage() {
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
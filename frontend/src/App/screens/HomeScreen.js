import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

// components
import BtnsUpDownHome from '../components/navigation/BtnsUpDownHome'
import HomeHero from '../components/home/HomeHero'
import HomeAppointments from "../components/home/HomeAppointments";
import HomeReviews from "../components/home/HomeReviews";

// actions
import { subheader } from "../actions/subheader";

export default function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const reviewsRef = useRef(null)

  useEffect(() => {
    dispatch(subheader("Home"));
  }, [location, dispatch]);

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
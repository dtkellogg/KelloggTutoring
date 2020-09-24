import React from "react";
import { FaGhost } from "react-icons/fa";

export default function Home() {
  return (
    <div className="pg__home">
      <div className="container__hero">
        <div className="container__hero--text">
          <h1 className="text-size-1">Welcome</h1>
          <h3 className="text-size-3">Tutoring Simplified</h3>
          <h3 className="text-size-3">Math, Science, English, Spanish,</h3>
          <h3 className="text-size-3">SAT & ACT</h3>
        </div>

        {/* <img src="#" className="hero__img" /> */}
        <FaGhost
          size={130}
          color="var(--black)"
          fill="var(--black)"
          className="social-media-icon grey-light-7"
        />
      </div>

      <div className="highlights__appointments">
        <h2 className="text-size-2">Appointments</h2>
        <div className="highlights__appointments--text">
          <h3>Schedule and manage your appointments. Click here.</h3>
        </div>
        <div className="highlights__appointments--calendar"></div>
      </div>

      <div className="highlights__meetToshi">
        <h2 className="text-size-2">Meet Toshi</h2>
        <div className="highlights__meetToshi--container">
          <p></p>
        </div>
      </div>
      <div className="highlights__contact">
        <h2 className="text-size-2">Contact</h2>
      </div>
    </div>
  );
}

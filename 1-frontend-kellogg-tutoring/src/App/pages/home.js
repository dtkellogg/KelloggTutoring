import React from "react";
import { FaGhost } from "react-icons/fa";

export default function Home() {
  return (
    <div className="pg__home">
      <div className="container__hero">
        <div className="container__hero--text">
          <h1 className="text-size-0">Welcome</h1>
          <h3 className="text-size-3">Tutoring Simplified.</h3>
          <h4 className="text-size-4">
            Math, Science, English, Spanish, SAT & ACT
          </h4>
          {/* <h4 className="text-size-4">SAT & ACT</h4> */}
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
        <h2 className="text-size-2 highlights__header">Meet Toshi</h2>
        <div className="highlights__meetToshi--container">
          <div className="card__meetToshi">
            <h3 className="text-size-3 card__meetToshi--header">
              Hello! I'm looking forward to teaching you!
            </h3>

            <p className="text-size-4 card__meetToshi--p">
              My name is Damian Kellogg, but you probably know we by my middle
              name, Toshi.
            </p>

            <p className="text-size-4 card__meetToshi--p">
              I am a highly experience tutor, having been in the industry for 7
              years. I specialize in designing teaching concepts simply, and I a
              have a track record of being able to teach students of all
              abilities and backgrounds. This is arguably in part to my love for
              traveling, which I've forutantely been able satiate abundantly
              from a very young age. It may also be due to my biracial
              background, and my Mom's family in Japan.
            </p>

            <p className="text-size-4 card__meetToshi--p">
              In addition, I am a former D1 track and cross country runner, and
              still consider exercise as a daily necessity. I attended Acalanes
              High School in Lafayette, CA, and UC Davis, where I recieved by
              B.S. in Chemistry. I am very friendly and value forming
              mentor-student relationships, but I am also very organized,
              punctual and reliable. Please feel free to contact me if you have
              any questions, or if you would like to hear from a few of my
              current clients. Thank you so much for taking the time to consider
              me. I have a feeling that you won't regret it.
            </p>
          </div>
        </div>
      </div>
      <div className="highlights__contact">
        <h2 className="text-size-2">Contact</h2>
      </div>
    </div>
  );
}

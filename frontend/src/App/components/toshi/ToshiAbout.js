import React from 'react'

// data
import { toshiList } from "../../data/lists"
import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function ToshiAbout() {
  const { width } = useWindowDimensions()

    return (
      <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
        <div className="toshi--card__meetToshi">
          <h2 className="font-size-2 toshi--card__meetToshi--header  letter-spacing-sm">
            Hello! I'm looking forward to teaching you.
          </h2>

          {/* <p className="font-size-3 toshi--card__meetToshi--p">
            My name is Damian Kellogg, but you probably know we by my middle name,
            <span style={{ color: "var(--old-blue-2)" }}> Toshi</span>.
          </p>

          <p className="font-size-3 toshi--card__meetToshi--p">
            I am a highly experienced tutor, having been in the industry for 7
            years. I specialize in teaching concepts{" "}
            <span style={{ color: "var(--old-blue-2)" }}>simply</span>, and I have
            a track record of being able to connect and communicate with students
            of all abilities and backgrounds. I like to think that this is due in
            part to my love for traveling, which I've fortunately been able
            satiate abundantly from a very young age. It may also be due to my
            bicultural upbringing, and the influence of my mother's entire family
            in Japan and my father's in San Francisco.
          </p>

          <p className="font-size-3 toshi--card__meetToshi--p">
            Besides teaching, I spend my days running and building strong
            relationships with my friends. I have experience running division 1
            track and cross country for the NCAA, and I have taken away and
            applied a lot from my athletic endevours. I find that there are many
            similarities between being a great athlete and a great student.
          </p>

          <p className="font-size-3 toshi--card__meetToshi--p">
            I attended Acalanes High School in Lafayette, CA and UC Davis, where I
            recieved my B.S. in Chemistry. I am very friendly and value forming
            mentor-student relationships, but I am also very{" "}
            <span style={{ color: 'var(--old-blue-2)'}}>organized, punctual</span> and{" "}
            <span style={{ color: 'var(--old-blue-2)'}}>reliable</span>.
          </p>

          <p className="font-size-3 toshi--card__meetToshi--p">
            Please feel free to contact me if you have any questions, or if you
            would like to hear from a few of my clients. Thank you so much for
            taking the time to consider me. If you so choose to try working with
            me, I have a strong feeling that you will consider it to be one of the
            best decisions you've made in your academic career.
          </p> */}
        </div>
      </div>
    );
}
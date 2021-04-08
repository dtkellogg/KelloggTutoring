import React from 'react'

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function ToshiAbout() {
  const { width } = useWindowDimensions()

    return (
      <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
        <div className="container__toshi">
          <h2 className="header__toshi letter-spacing-sm">
            Hello!
          </h2>

          {/* <p className="toshi__p">
            My name is Damian Kellogg, but you probably know me by my middle name,
            <span style={{ color: "var(--old-blue-2)" }}> Toshi</span>.
          </p> */}

          <div className="toshi__p">
            I am a UC Davis graduate with a B.S. in Chemistry who spends his time walking/running, reading, coding, and teaching. 
            I used to run competitively, and still find exercise to be a key component of my day. Books I have read recently include 
            {" "}<i>Heart of Darkness</i>, <i>Into Thin Air</i>,  <i>Batavia’s Graveyard</i>, <i>Ashenden: Or the British Agent</i>, <i>The Lord of the Rings</i>, and <i>Life of Pi</i>. As my reading 
            selection may suggest, I am in love with traveling, and have been very fortunate in that respect. I hope to be able 
            to continue satiating my travel desires by taking work on the road and both teach and code while exploring a new part 
            of the world.
          </div>

          <div className="toshi__p">
            I come from a strong math and science background. I have always enjoyed both fields, and thus pursued a B.S. in Chemistry. 
            I also come from a biracial background, as my mother was a first generation Japanese woman and my father was born in San Francisco.
            My mother gave me a life of multiple languages, and my father, and avid reader and respectable materials scientist, drove my 
            interest with English. 
          </div>

          <div className="toshi__p">
            Also... welcome to my website! Thank you so much for taking the time to consider me, or if you already work with me,
            thank you for visiting.
          </div>

          {/* <p className="toshi__p">
            Besides having 7 years of tutoring experience, having been in the industry for 7
            years. I specialize in teaching concepts{" "}
            <span style={{ color: "var(--old-blue-2)" }}>simply</span>, and I have
            a track record of being able to connect and communicate with students
            of all abilities and backgrounds. I like to think that this is due in
            part to my love for traveling, which I've fortunately been able
            satiate abundantly from a very young age. It may also be due to my
            bicultural upbringing, and the influence of my mother's entire family
            in Japan and my father's in San Francisco.
          </p>

          <p className="toshi__p">
            Besides teaching, I spend my days running and building strong
            relationships with my friends. I have experience running division 1
            track and cross country for the NCAA, and I have taken away and
            applied a lot from my athletic endevours. I find that there are many
            similarities between being a great athlete and a great student.
          </p>

          <p className="toshi__p">
            I attended Acalanes High School in Lafayette, CA and UC Davis, where I
            recieved my B.S. in Chemistry. I am very friendly and value forming
            mentor-student relationships, but I am also very{" "}
            <span style={{ color: 'var(--old-blue-2)'}}>organized, punctual</span> and{" "}
            <span style={{ color: 'var(--old-blue-2)'}}>reliable</span>.
          </p>

          <p className="toshi__p">
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
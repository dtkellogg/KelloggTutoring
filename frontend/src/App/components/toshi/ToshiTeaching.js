import React from "react";

import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function ToshiTeaching() {
  
  const { width } = useWindowDimensions()

  return (
    < div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
      <div className="container__toshi">
        <h2 className="header__toshi letter-spacing-sm">
          {/* How will I prepare you for your upcoming academic endevours? */}
          Style & Expertise
        </h2>

        <p className="toshi__p">
          I have been teaching students for the past 7 years. I have truly enjoyed my time, as I have found helping and watching someone learn to be extremely satisfactory. I have spent many hours working one-on-one with students, and have used my own personal interest in psychology to analyze the different ways in which students learn. I am by no means an expert, but I have found that I can teach a wide variety of students.
        </p>

        <p className="toshi__p">
          I have always considered myself to be a good listener, and I make no exception when I am teaching. I have a calm manner (possibly due to my monotone), and I tend to focus on keeping a relatively relaxed atmosphere for my students. I honestly believe that you learn best when you are relaxed.
        </p>

        <p className="toshi__p">
          Choosing me as your teacher is only half the journey: the rest will require effort on your part. But if you are willing to work and you pick me as a teacher, I can guarantee that I will help you grow.
        </p>

      </div>
    </div>
  )
}

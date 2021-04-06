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
          I come from both a science and language ba
        </p>

        <p className="toshi__p">
          My philosophy is that you learn best when you are relaxed.
          I therefore make sure to build a sort of friendship with my student.
          {/* Having spent thousands of hours teaching students,
          I have been able to develop a teaching method that both acts to my strength and works for everyone. I 
          have always been a great listener and and can connect with most types of people. When you feel heard and are treated
          with respect, you are much more likely to respond well, communicate without hesitation, and remain calm.
          Although these aspects are often disgregarded, I believe that they do not only affect your ability to learn,
          but also your ability to think. */}
        </p>

        {/* 
        <p className="toshi__p">
          Besides being a good listener, I am also very patient. I watched my extremely careful parents for years and 
          I have learned how valuable being patient with others is, especially when you are trying to process some
          new piece of information. 
          </p>

        <p className="toshi__p">
          For many years, I have watched how people learn new things. Everyone is different. However, the one thing that's shared 
          is that getting somewhere is never easy. Everyone who succeeds has to esentially work so hard that they are outcompeting
          their peers.
        </p>
         */}
      </div>
    </div>
  )
}

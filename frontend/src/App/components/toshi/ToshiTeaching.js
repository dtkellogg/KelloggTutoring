import React from "react";

// components
import {Sidebar} from "../navigation/Sidebar";

// data
import { toshiList } from "../../data/lists"

export default function ToshiTeaching() {

  return (
    <div className="container__screen--sidebar">
      {/* <Sidebar title="Toshi" list={toshiList} /> */}
      <div className="toshi--card__meetToshi">
        <h2 className="font-size-2 toshi--card__meetToshi--header  letter-spacing-sm">
          {/* How will I prepare you for your upcoming academic endevours? */}
          Style & Expertise
        </h2>

        {/* <p className="font-size-3 toshi--card__meetToshi--p">
          My philosophy is simple and focuses on reinforcing what I have found to
          be the most fundamental pillars of learning: <span style={{ color: 'var(--old-blue-2)'}}>confidence</span>, <span style={{ color: 'var(--old-blue-2)'}}>calmness</span > and
          <span style={{ color: 'var(--old-blue-2)'}}> making you the teacher.</span >
        </p>

        <p className="font-size-3 toshi--card__meetToshi--p">
          Having spent thousands of hours teaching students,
          I have been able to develop a teaching method that both acts to my strength and works for everyone. I 
          have always been a great listener and and can connect with most types of people. When you feel heard and are treated
          with respect, you are much more likely to respond well, communicate without hesitation, and remain calm.
          Although these aspects are often disgregarded, I believe that they do not only affect your ability to learn,
          but also your ability to think.
        </p>

        <p className="font-size-3 toshi--card__meetToshi--p">
          Besides being a good listener, I am also very patient. I watched my extremely careful parents for years and 
          I have learned how valuable being patient with others is, especially when you are trying to process some
          new piece of information. 
          </p>

        <p className="font-size-3 toshi--card__meetToshi--p">
          For many years, I have watched how people learn new things. Everyone is different. However, the one thing that's shared 
          is that getting somewhere is never easy. Everyone who succeeds has to esentially work so hard that they are outcompeting
          their peers.
        </p> */}
        
      </div>
    </div>
  )
}

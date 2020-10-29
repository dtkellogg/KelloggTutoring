import React from "react";
import Sidebar from "../components/Sidebar";

const toshiList = [
  "About",
  "Teaching",
  "Reviews",
  "Blog",
];

export default function ToshiTeaching() {
  return (
    <div className="pg__meetToshi">
      <Sidebar title="Toshi" list={toshiList} />
    <div className="pg__meetToshi--card__meetToshi">
      <h2 className="text-size-2 pg__meetToshi--card__meetToshi--header  letter-spacing-sm">
        {/* How will I prepare you for your upcoming academic endevours? */}
        Style & Expertise
      </h2>

      <p className="text-size-3 pg__meetToshi--card__meetToshi--p">
        My philosophy is simple and focuses on reinforcing what I have found to
        be the most fundamental pillars of learning: <span style={{ color: 'var(--old-blue-2)'}}>confidence</span >, <span style={{ color: 'var(--old-blue-2)'}}>calmness</span > and
        <span style={{ color: 'var(--old-blue-2)'}}> making you the teacher.</span >
      </p>

      <p className="text-size-3 pg__meetToshi--card__meetToshi--p">
        Having spent thousands of hours teaching students,
        I have been able to develop a teaching method that works for everyone:
      </p>

      <p className="text-size-3 pg__meetToshi--card__meetToshi--p">

      </p>
    </div>
    </div>
  );
}

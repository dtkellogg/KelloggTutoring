import React from "react";
import Sidebar from "../components/Sidebar";

const toshiList = [
  "About",
  "Teaching",
  "Reviews",
  "Blog",
];

export default function ToshiBlog() {
  return (
    <div className="pg__meetToshi">
      <Sidebar title="Toshi" list={toshiList} />
    <div className="pg__meetToshi--card__meetToshi">
      <h2 className="text-size-2 pg__meetToshi--card__meetToshi--header  letter-spacing-sm">
        {/* How will I prepare you for your upcoming academic endevours? */}
        Coming soon...
      </h2>
    </div>
    </div>
  );
}

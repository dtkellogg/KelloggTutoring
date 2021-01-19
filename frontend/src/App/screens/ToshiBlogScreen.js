import React from "react";
import Sidebar from "../components/Sidebar";

// data
import { toshiList } from "../data/lists"

export default function ToshiBlog() {
  return (
    <div className="pg__meetToshi">
      <Sidebar title="Toshi" list={toshiList} />
      <div className="pg__meetToshi--card__meetToshi">
        <h2 className="text-size-2 pg__meetToshi--card__meetToshi--header  letter-spacing-sm">
          Coming soon...
        </h2>
      </div>
    </div>
  );
}

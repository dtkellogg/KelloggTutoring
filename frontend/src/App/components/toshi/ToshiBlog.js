import React from "react";
import {Sidebar} from "../navigation/Sidebar";

// data
import { toshiList } from "../../data/lists"

export default function ToshiBlog() {
  return (
    <div className="container__screen--sidebar">
      {/* <Sidebar title="Toshi" list={toshiList} /> */}
      <div className="toshi--card__meetToshi">
        <h2 className="font-size-2 toshi--card__meetToshi--header  letter-spacing-sm">
          Coming soon...
        </h2>
      </div>
    </div>
  );
}

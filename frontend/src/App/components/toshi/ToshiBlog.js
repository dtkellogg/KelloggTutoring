import React from "react";

import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function ToshiBlog() {
  const { width } = useWindowDimensions()
  return (
    < div className={"fadeInAnimated--0" + width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
      <div className="toshi--card__meetToshi">
        <h2 className="toshi--card__meetToshi--header">
          Coming soon...
        </h2>
      </div>
    </div>
  );
}

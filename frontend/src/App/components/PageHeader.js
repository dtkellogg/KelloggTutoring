import React from 'react'

import useWindowDimensions from '../hooks/useWindowDimensions'

// hands indicating to the user to pick a link
const hands = ["👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👈"]
const randomHand = hands[Math.floor(Math.random() * hands.length)];


export default function PageHeader() {

  const {width} = useWindowDimensions()

  return (
    <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar" }>
        <div className="container__page-header">
        <h2 className="page-header__text font-size-2">
          Please select an option to the left.
        </h2>
        <span className="page-header__text--emoji font-size-0">
          <span role="img" aria-label="email emoji">
            {randomHand}
          </span>
        </span>
        </div>
      </div>
  );
}
import React from 'react'

import useWindowDimensions from '../hooks/useWindowDimensions'

// hands indicating to the user to pick a link
const handsLeft = ["👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👈"]
const handsUp = ["👆🏻", "👆🏼", "👆🏽", "👆🏾", "👆🏿", "👆", ]


export default function PageHeader() {
  const {width} = useWindowDimensions()
  
  const randomHand = width > 950
    ? handsLeft[Math.floor(Math.random() * handsLeft.length)]
    : handsUp[Math.floor(Math.random() * handsUp.length)];


  return (
    <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar" }>
        <div className="container__page-header">
        <h2 className="page-header__text font-size-2">
          {`Please select an option ${width > 950 ? "to the left" : "above"}.`}
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
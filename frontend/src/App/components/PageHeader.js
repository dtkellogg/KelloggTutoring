import React from 'react'

// hands indicating to the user to pick a link
const hands = ["👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👈"]
const randomHand = hands[Math.floor(Math.random() * hands.length)];


export default function PageHeader() {

  return (
      <div className="container__screen--sidebar fadeInAnimated--0">
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
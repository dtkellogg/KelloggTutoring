import React, { useState, useEffect } from 'react'

import useWindowDimensions from '../hooks/useWindowDimensions'

// hands indicating to the user to pick a link
const handsLeft = ["👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👈"]
const handsUp = ["👆🏻", "👆🏼", "👆🏽", "👆🏾", "👆🏿", "👆", ]


export default function PageHeader() {
  const {width} = useWindowDimensions()
  const [Hand, setHand] = useState("")
  const [directionText, setDirectionText] = useState(width > 950 ? "to the left" : "above")

  useEffect(() => {
    width > 950
      ? setHand(handsLeft[Math.floor(Math.random() * handsLeft.length)])
      : setHand(handsUp[Math.floor(Math.random() * handsUp.length)])
  }, [ width])

  useEffect(() => {
    setDirectionText(width > 950 ? "to the left" : "above")
  }, [width])


  return (
    <div className="container__screen--sidebar">
        <div className="container__page-header">
        <h2 className="page-header__text">
          {`Please select an option ${directionText}.`}
        </h2>
        <span className="page-header__text--emoji">
          <span role="img" aria-label="email emoji">
            {Hand}
          </span>
        </span>
        </div>
      </div>
  );
}
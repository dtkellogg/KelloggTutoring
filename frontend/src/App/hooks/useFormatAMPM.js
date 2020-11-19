import React from "react";

export default function useFormatAMPM(date) {
  var hours = date.split(":")[0];
  var minutes = date.split(":")[1];
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var strTime = hours + ":" + minutes + " " + ampm;

  return strTime;
}

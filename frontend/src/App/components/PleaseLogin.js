import React from "react";
import { Link } from "react-router-dom";

export default function PleaseLoginScreen() {
  return (
    <div className="container__screen--sidebar">
      <Link to={`/login`} className="font-size-2 msg__userInfoNull">
        Please&nbsp;
        <span className="font-size-2" style={{ color: "blue" }}>
          login&nbsp;
        </span>
        <span className="font-size-2"> to view your appointments</span>
      </Link>
    </div>
  );
}

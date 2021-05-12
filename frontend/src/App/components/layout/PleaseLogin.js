import React from "react";
import { Link } from "react-router-dom";

export default function PleaseLoginScreen() {
  return (
    <div className="container__screen--sidebar">
      <Link to={`/login`} className="msg__userInfoNull">
        Please&nbsp;
        <span style={{ color: "blue" }}>
          login&nbsp;
        </span>
        <span>to view your appointments</span>
      </Link>
    </div>
  );
}

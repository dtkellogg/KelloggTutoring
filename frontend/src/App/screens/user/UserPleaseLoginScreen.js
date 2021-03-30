import React from "react";
import { Link } from "react-router-dom";

export default function PleaseLoginScreen() {
  return (
    <div className="please-login">
      <Link to={`/login`} className="text-size-2 msg__userInfoNull">
        Please&nbsp;
        <span className="text-size-2" style={{ color: "blue" }}>
          login&nbsp;
        </span>
        <span className="text-size-2"> to view your appointments</span>
      </Link>
    </div>
  );
}

import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
    return (
      <div className="footer">
        <div className="footer__contact-items">

          <div className="footer__contact-item font-size-3">
            <span role="img" aria-label="email emoji" className="footer__emoji">
              ✉️
            </span>
            <a href="mailto:toshikelloggtutoring@gmail.com" style={{ color: "blue" }}>
              &nbsp; toshikelloggtutoring@gmail.com
            </a>
          </div>

          <div className="footer__contact-item font-size-3">
            <span role="img" aria-label="phone emoji" className="footer__emoji">
              📞&nbsp;
            </span>
            <Link
              to={`/contact/message`}
              className="font-size-3 msg__userInfoNull"
            >
              (Please&nbsp;
              <span className="font-size-3" style={{ color: "blue" }}>
                ask
              </span>
              <span className="font-size-3">)</span>
            </Link>
          </div>

        </div>

        <div className="legal">
          <span className="font-size-5">
            &copy; 2020 by Damian Toshi Kellogg. All rights reserved.
          </span>
        </div>
      </div>
    );
}
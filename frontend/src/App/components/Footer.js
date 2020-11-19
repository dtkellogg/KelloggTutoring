import React from 'react'
import {Link} from 'react-router-dom'


export default function Footer() {
    return (
      <div className="footer">
        <div className="footer__contact-items">
          <div className="footer__contact-item text-size-3">
            <span role="img" aria-label="email emoji" className="footer__emoji">
              ✉️
            </span>
            <a href="mailto:kelloggtutoring@gmail.com" style={{ color: "blue" }}>
              &nbsp; kelloggtutoring@gmail.com
            </a>
          </div>
          <div className="footer__contact-item text-size-3">
            <span role="img" aria-label="phone emoji" className="footer__emoji">
              📞&nbsp;
            </span>
            {/* &nbsp;(please ask) */}
            <Link
              to={`/contact/message`}
              className="text-size-3 msg__userInfoNull"
            >
              (Please&nbsp;
              <span className="text-size-3" style={{ color: "blue" }}>
                ask
              </span>
              <span className="text-size-3">)</span>
            </Link>
          </div>
        </div>
        <div className="legal">
          <span className="text-size-5">
            &copy; 2020 by Damian Toshi Kellogg. All rights reserved.
          </span>
        </div>
      </div>
    );
}
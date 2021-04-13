import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
    return (
      <div className="container__footer">
        <div className="footer__contact-items">

          <div className="footer__contact-item">
            <span role="img" aria-label="email emoji" className="footer__emoji">
              ✉️
            </span>
            <a href="mailto:toshikelloggtutoring@gmail.com" style={{ color: "blue" }}>
              &nbsp; toshikelloggtutoring@gmail.com
            </a>
          </div>

          <div className="footer__contact-item">
            <span role="img" aria-label="phone emoji" className="footer__emoji">
              📞&nbsp;
            </span>
            <Link
              to={`/contact/message`}
              className="msg__userInfoNull"
            >
              (Please&nbsp;
              <span style={{ color: "blue" }}>
                ask
              </span>
              )
            </Link>
          </div>

        </div>

        <span className="legal">
            &copy; 2020 by Damian Toshi Kellogg. All rights reserved.
        </span>
      </div>
    );
}
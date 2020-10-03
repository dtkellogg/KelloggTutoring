import React from 'react'


export default function Footer() {
    return (
      <div className="footer">
        <div className="footer__contact-items">
          <div className="footer__contact-item text-size-3">
            <span role="img" aria-label="phone emoji" className="footer__emoji"> 📞</span>
            +1(925)***-****
          </div>
          <div className="footer__contact-item text-size-3">
            <span role="img" aria-label="email emoji" className="footer__emoji">
              ✉️
            </span>
            d******@gmail.com
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
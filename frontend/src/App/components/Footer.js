import React from 'react'

export default function Footer() {
    return (
      <div className="footer">
          <div className="footer__contact-items">
            <div className="footer__contact-item text-size-3">📞 +1(925)***-****</div>
            <div className="footer__contact-item text-size-3">✉️  d******@gmail.com</div>
            {/* <div className="footer__contact-item">+1(925)324-9254</div> */}
            </div>
        <div className="legal">
            <span className="text-size-5"> &copy; 2020 by Damian Toshi Kellogg. All rights reserved.</span>
        </div>
      </div>
    );
}
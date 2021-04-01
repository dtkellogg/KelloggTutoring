import React, {useState} from 'react';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

function BtnsUpDownHome({calendarRef, reviewsRef}) {
    const [windowLocation, setWindowLocation] = useState("top");

    const handleScrollToTop = () => {
      if (windowLocation === "calendar") {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setWindowLocation("top");
      } else if (windowLocation === "reviews") {
        calendarRef.current.scrollIntoView();
        setWindowLocation("calendar");
      } else if (windowLocation === "bottom") {
        reviewsRef.current.scrollIntoView();
        setWindowLocation("reviews");
      }
    };

    const handleScrollToBottom = () => {
      if (windowLocation === "top") {
        calendarRef.current.scrollIntoView();
        setWindowLocation("calendar");
      } else if (windowLocation === "calendar") {
        reviewsRef.current.scrollIntoView();
        setWindowLocation("reviews");
      } else if (windowLocation === "reviews") {
        window.scrollTo({
          top: 20000,
          left: 100,
          behavior: "smooth",
        });
        setWindowLocation("bottom");
      }
    };


    return (
      <div>
        <div className="container__btns--up-down-ui fadeInAnimated--0">
          <button className="btn__nav--up">
            <FaCaretUp
              size={40}
              fill="var(--old-blue)"
              className=""
              onClick={handleScrollToTop}
            />
          </button>
          <button className="btn__nav--down">
            <FaCaretDown
              size={40}
              fill="var(--old-blue)"
              className=""
              onClick={handleScrollToBottom}
            />
          </button>
        </div>
      </div>
    );
}

export default BtnsUpDownHome
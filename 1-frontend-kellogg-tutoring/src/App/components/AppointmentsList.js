import React from 'react'
import Sidebar from "../components/Sidebar";
// import EventCalendar from "../components/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { subheader } from "../actions/subheader";




export default function AppointmentsList() {
  let location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(subheader("Schedule, Manage and Pay"));
  }, [location]);

  return (
    <div className="appointments">
      <h2 className="text-size-2 appointments__header">
        Here are your upcoming appointments:
      </h2>
      <ul className="appointments__list text-size-3">
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Monday </span> 9/28:
            <span className="bold-3"> 4:00 p.m.</span> -
            <span className="bold-3"> 5:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Tuesday </span> 9/29 -
            <span className="bold-3"> 3:00 p.m.</span> -
            <span className="bold-3"> 5:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Thursday </span> 10/1 -
            <span className="bold-3"> 7:00 p.m.</span> -
            <span className="bold-3"> 9:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
        <li className="appointments__list--item">
          <div className="appointments__list--item-time">
            <span className="bold-2">Sunday </span> 10/4 -
            <span className="bold-3"> 12:30 p.m.</span> -
            <span className="bold-3"> 2:00 p.m.</span>
          </div>
          <div className="btns-container__appointments">
            <button className="btn__cancel">Cancel</button>
            <button className="btn__pay">Pay</button>
          </div>
        </li>
      </ul>
    </div>
  )
}

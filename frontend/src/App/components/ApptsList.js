import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listAppointments, deleteAppointment } from '../actions/appointmentActions'
import {
  FaCheckSquare,
  FaTrash,
  FaTimes
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {useSortMultiple} from '../hooks/useSort'
import Sidebar from "../components/Sidebar";
import { subheader } from "../actions/subheader";


const apptsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]


export default function ApptsList({ location, type }) {
  var now = moment();
  // console.log(`now : ${now}`);

  const dispatch = useDispatch();

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sortedAppts = useSortMultiple(appointments, "date", "startTime")

  React.useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error) {
      dispatch(subheader({ error }));
    }
  }, [dispatch, loading, error])


  React.useEffect(() => {
    dispatch(listAppointments());
  }, [dispatch, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      dispatch(deleteAppointment(id));
    }
  };

  // console.log(`location: ${location}`)
  if (userInfo === null) {
    return (
      <div className="pg__appointment">
        <Sidebar title="Appointments" list={apptsList} />
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

  if (
    type === "upcoming" &&
    userInfo &&
    sortedAppts
      .filter((appt) => appt.student === userInfo.name)
      .filter((appt) => moment(appt.date).isAfter(now)).length === 0
  ) {
    console.log(`userInfo: ${userInfo}; sortedAppts: ${sortedAppts}`)
    console.log(userInfo)
    return (
      <h2 className="text-size-2" style={{ textAlign: "center" }}>
        You have no upcoming sessions
      </h2>
    );
  }



  if (
    type === "all" &&
    userInfo &&
    sortedAppts.filter((appt) => appt.student === userInfo.name).length === 0
  ) {
    return (
      <div className="pg__appointment">
        <Sidebar title="Appointments" list={apptsList} />
      <h2 className="text-size-2 msg__no-prev-appts">
        You have no appointment history
      </h2>
      </div>
    );
  }

  // console.log(`KNDL: ${sortedAppts.map((appt) => appt.student === userInfo.name).length === 0}`)

  if (
    type === "upcoming" &&
    userInfo &&
    sortedAppts
      .filter((appt) => appt.student === userInfo.name)
      .filter((appt) => moment(appt.date).isAfter(now)).length > 0
  ) {
    return (
      // <div className="pg__appointment">
      <div className="">
        {/* <Sidebar title="Appointments" list={apptsList} /> */}
      <table className="text-size-3 appointments__list">
        <thead className="thead">
          <tr className="tr">
            <th className="appointments__th--upcoming-date">date</th>
            <th className="appointments__th--upcoming-time">time</th>
            <th className="appointments__th--upcoming-student">student</th>
            <th className="appointments__th--upcoming-subject">subject</th>
            <th className="appointments__th--upcoming-btns">paid?</th>
            <th className="appointments__th--upcoming-btns">cancel</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {sortedAppts
            .filter((appt) => appt.student === userInfo.name)
            .filter((appt) => moment(appt.date).isAfter(now))

            .map((appt) => {
              
              const date = appt.date.split("T")[0].split("-");
              return (

                <tr key={appt._id} className="tr">
                  <td className="text-size-3 appointments__td--upcoming-date">{`${date[1]}-${date[2]}`}</td>
                  <td className="text-size-3 appointments__td--upcoming-time">{`${appt.startTime} - ${appt.endTime}`}</td>
                  <td className="text-size-3 appointments__td--upcoming-student">
                    {appt.student}
                  </td>
                  <td className="text-size-3 appointments__td--upcoming-subject">
                    {appt.subject}
                  </td>
                  <td className="appointments__item--btns">
                    {appt.paid ? (
                      <>
                        <FaCheckSquare
                          size={20}
                          color="var(--green-dark)"
                          fill="var(--green)"
                          className="social-media-icon grey-light-7"
                          type="button"
                          // onClick={() => deleteHandler(appt._id)}
                        />
                      </>
                    ) : (
                      <FaTimes
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--red)"
                        className="social-media-icon grey-light-7"
                        type="button"
                        // onClick={() => deleteHandler(appt._id)}
                      />
                    )}
                  </td>
                  <td className="text-size-3 appointments__item--subject">
                    <FaTrash
                      size={20}
                      color="var(--green-dark)"
                      fill="var(--red)"
                      className="social-media-icon__trash grey-light-7"
                      type="button"
                      // onClick={() => deleteHandler(appt._id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
    );
  }

  if (type === "all" && userInfo) {
    return (
      <div className="pg__appointment">
        <Sidebar title="Appointments" list={apptsList} />


      <table className="text-size-3 appointments__list--all">
        <thead className="thead">
          <tr className="tr">
            <th className="appointments__th--upcoming-date">date</th>
            <th className="appointments__th--upcoming-time">time</th>
            <th className="appointments__th--upcoming-student">student</th>
            <th className="appointments__th--upcoming-subject">subject</th>
            <th className="appointments__th--upcoming-btns">paid?</th>
            <th className="appointments__th--upcoming-btns">cancel</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {sortedAppts
            .filter((appt) => appt.student === userInfo.name)

            .map((appt) => {
              const date = appt.date.split("T")[0].split("-");
              return (
                <tr key={appt._id} className="tr">
                  <td className="text-size-3 appointments__td--upcoming-date">{`${date[1]}-${date[2]}`}</td>
                  <td className="text-size-3 appointments__td--upcoming-time">{`${appt.startTime} - ${appt.endTime}`}</td>
                  <td className="text-size-3 appointments__td--upcoming-student">
                    {appt.student}
                  </td>
                  <td className="text-size-3 appointments__td--upcoming-subject">
                    {appt.subject}
                  </td>
                  <td className="appointments__item--btns">
                    {appt.paid ? (
                      <>
                        <FaCheckSquare
                          size={20}
                          color="var(--green-dark)"
                          fill="var(--green)"
                          className="social-media-icon grey-light-7"
                          type="button"
                          // onClick={() => deleteHandler(appt._id)}
                        />
                      </>
                    ) : (
                      <FaTimes
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--red)"
                        className="social-media-icon grey-light-7"
                        type="button"
                        // onClick={() => deleteHandler(appt._id)}
                      />
                    )}
                  </td>
                  <td className="text-size-3 appointments__item--subject">
                    <FaTrash
                      size={20}
                      color="var(--green-dark)"
                      fill="var(--red)"
                      className="social-media-icon__trash grey-light-7"
                      type="button"
                      // onClick={() => deleteHandler(appt._id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
    );
  }

  // this is the default return...
  // I will most likely come back here during refactoring and make use of this

  if (type === "admin" && userInfo) {
    return (

      <table className="text-size-3 appointments__list--all">
        <thead className="thead">
          <tr className="tr">
            <th className="appointments__th--date">date</th>
            <th className="appointments__th--time">time</th>
            {/* <th className="appointments__th--student">student</th> */}
            <th className="appointments__th--subject">subject</th>
            <th className="appointments__th--btns">Paid?</th>
            <th className="appointments__th--cancel">Cancel</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {appointments.map((appt) => {
            const date = appt.date.split("T")[0].split("-");
            return (
              <tr key={appt._id} className="appointments__list--item">
                <td className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                <td className="text-size-3 appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                {/* <td className="text-size-3 appointments__item--student">{appt.student}</td> */}
                <td className="text-size-3 appointments__item--subject">
                  {appt.subject}
                </td>
                <td className="appointments__item--btns">
                  {appt.paid ? (
                    <>
                      {/* <button className="btn__pay">Pay</button> */}
                      {/* <button className="btn__cancel">Cancel</button> */}
                      <FaCheckSquare
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--green)"
                        className="social-media-icon grey-light-7"
                        type="button"
                        // onClick={() => deleteHandler(appt._id)}
                      />
                    </>
                  ) : (
                    <FaTimes
                      size={20}
                      color="var(--green-dark)"
                      fill="var(--red)"
                      className="social-media-icon grey-light-7"
                      type="button"
                    />
                  )}
                </td>
                <td className="text-size-3 appointments__item--subject">
                  <FaTrash
                    size={20}
                    color="var(--green-dark)"
                    fill="var(--red)"
                    className="social-media-icon__trash grey-light-7"
                    type="button"
                    onClick={() => deleteHandler(appt._id)}
                  />
                </td>
                {/* <button className="btn__cancel">Cancel</button> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  // if (
  //   type === "upcoming" &&
  //   userInfo &&
  //   sortedAppts
  //     .filter((appt) => appt.student === userInfo.name)
  //     .filter((appt) => moment(appt.date).isAfter(now)).length > 0
  // ) {
  //   return (
  //     <div className="pg__appointment">
  //       <Sidebar title="Appointments" list={apptsList} />
  //       <table className="text-size-3 appointments__list">
  //         <thead className="thead">
  //           <tr className="tr">
  //             <th className="appointments__th--upcoming-date">date</th>
  //             <th className="appointments__th--upcoming-time">time</th>
  //             <th className="appointments__th--upcoming-student">student</th>
  //             <th className="appointments__th--upcoming-subject">subject</th>
  //             <th className="appointments__th--upcoming-btns">paid?</th>
  //             <th className="appointments__th--upcoming-btns">cancel</th>
  //           </tr>
  //         </thead>
  //         <tbody className="tbody">
  //           {sortedAppts
  //             .filter((appt) => appt.student === userInfo.name)
  //             .filter((appt) => moment(appt.date).isAfter(now))

  //             .map((appt) => {
  //               const date = appt.date.split("T")[0].split("-");
  //               return (

  //                 <tr key={appt._id} className="tr">
  //                   <td className="text-size-3 appointments__td--upcoming-date">${date[1]}-${date[2]}</td>
  //                   <td className="text-size-3 appointments__td--upcoming-time">{`${appt.startTime} - ${appt.endTime}`}</td>
  //                   <td className="text-size-3 appointments__td--upcoming-student">
  //                     {appt.student}
  //                   </td>
  //                   <td className="text-size-3 appointments__td--upcoming-subject">
  //                     {appt.subject}
  //                   </td>
  //                   <td className="appointments__item--btns">
  //                     {appt.paid ? (
  //                       <>
  //                         {/* <button className="btn__pay">Pay</button> */}
  //                         {/* <button className="btn__cancel">Cancel</button> */}
  //                         <FaCheckSquare
  //                           size={20}
  //                           color="var(--green-dark)"
  //                           fill="var(--green)"
  //                           className="social-media-icon grey-light-7"
  //                           type="button"
  //                         // onClick={() => deleteHandler(appt._id)}
  //                         />
  //                       </>
  //                     ) : (
  //                         <FaTimes
  //                           size={20}
  //                           color="var(--green-dark)"
  //                           fill="var(--red)"
  //                           className="social-media-icon grey-light-7"
  //                           type="button"
  //                         // onClick={() => deleteHandler(appt._id)}
  //                         />
  //                       )}
  //                   </td>
  //                   <td className="text-size-3 appointments__item--subject">
  //                     <FaTrash
  //                       size={20}
  //                       color="var(--green-dark)"
  //                       fill="var(--red)"
  //                       className="social-media-icon__trash grey-light-7"
  //                       type="button"
  //                     // onClick={() => deleteHandler(appt._id)}
  //                     />
  //                   </td>
  //                 </tr>
  //               );
  //             })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // }

  // if (type === "all" && userInfo) {
  //   return (
  //     <div className="pg__appointment">
  //       <Sidebar title="Appointments" list={apptsList} />


  //       <table className="text-size-3 appointments__list--all">
  //         <thead className="thead">
  //           <tr className="tr">
  //             <th className="appointments__th--upcoming-date">date</th>
  //             <th className="appointments__th--upcoming-time">time</th>
  //             <th className="appointments__th--upcoming-student">student</th>
  //             <th className="appointments__th--upcoming-subject">subject</th>
  //             <th className="appointments__th--upcoming-btns">paid?</th>
  //             <th className="appointments__th--upcoming-btns">cancel</th>
  //           </tr>
  //         </thead>
  //         <tbody className="tbody">
  //           {sortedAppts
  //             .filter((appt) => appt.student === userInfo.name)

  //             .map((appt) => {
  //               const date = appt.date.split("T")[0].split("-");
  //               return (
  //                 <tr key={appt._id} className="tr">
  //                   <td className="text-size-3 appointments__td--upcoming-date">{`${date[1]}-${date[2]}`}</td>
  //                   <td className="text-size-3 appointments__td--upcoming-time">{`${appt.startTime} - ${appt.endTime}`}</td>
  //                   <td className="text-size-3 appointments__td--upcoming-student">
  //                     {appt.student}
  //                   </td>
  //                   <td className="text-size-3 appointments__td--upcoming-subject">
  //                     {appt.subject}
  //                   </td>
  //                   <td className="appointments__item--btns">
  //                     {appt.paid ? (
  //                       <>
  //                         <FaCheckSquare
  //                           size={20}
  //                           color="var(--green-dark)"
  //                           fill="var(--green)"
  //                           className="social-media-icon grey-light-7"
  //                           type="button"
  //                         // onClick={() => deleteHandler(appt._id)}
  //                         />
  //                       </>
  //                     ) : (
  //                         <FaTimes
  //                           size={20}
  //                           color="var(--green-dark)"
  //                           fill="var(--red)"
  //                           className="social-media-icon grey-light-7"
  //                           type="button"
  //                         // onClick={() => deleteHandler(appt._id)}
  //                         />
  //                       )}
  //                   </td>
  //                   <td className="text-size-3 appointments__item--subject">
  //                     <FaTrash
  //                       size={20}
  //                       color="var(--green-dark)"
  //                       fill="var(--red)"
  //                       className="social-media-icon__trash grey-light-7"
  //                       type="button"
  //                     // onClick={() => deleteHandler(appt._id)}
  //                     />
  //                   </td>
  //                 </tr>
  //               );
  //             })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // }

  // this is the default return...
  // I will most likely come back here during refactoring and make use of this

  if (type === "home" && userInfo) {
    return (

      <table className="text-size-3 appointments__list--all">
        <thead className="thead">
          <tr className="tr">
            <th className="appointments__th--date">date</th>
            <th className="appointments__th--time">time</th>
            {/* <th className="appointments__th--student">student</th> */}
            <th className="appointments__th--subject">subject</th>
            <th className="appointments__th--btns">Paid?</th>
            <th className="appointments__th--cancel">Cancel</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {appointments.map((appt) => {
            const date = appt.date.split("T")[0].split("-");
            return (
              <tr key={appt._id} className="appointments__list--item">
                <td className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                <td className="text-size-3 appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                {/* <td className="text-size-3 appointments__item--student">{appt.student}</td> */}
                <td className="text-size-3 appointments__item--subject">
                  {appt.subject}
                </td>
                <td className="appointments__item--btns">
                  {appt.paid ? (
                    <>
                      {/* <button className="btn__pay">Pay</button> */}
                      {/* <button className="btn__cancel">Cancel</button> */}
                      <FaCheckSquare
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--green)"
                        className="social-media-icon grey-light-7"
                        type="button"
                      // onClick={() => deleteHandler(appt._id)}
                      />
                    </>
                  ) : (
                      <FaTimes
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--red)"
                        className="social-media-icon grey-light-7"
                        type="button"
                      />
                    )}
                </td>
                <td className="text-size-3 appointments__item--subject">
                  <FaTrash
                    size={20}
                    color="var(--green-dark)"
                    fill="var(--red)"
                    className="social-media-icon__trash grey-light-7"
                    type="button"
                    onClick={() => deleteHandler(appt._id)}
                  />
                </td>
                {/* <button className="btn__cancel">Cancel</button> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

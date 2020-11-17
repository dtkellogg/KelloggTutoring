import React from "react";
import { Link, useRouteMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createReview, listReviews, deleteReview } from "../actions/reviewActions";
import { getUserDetails } from "../actions/userActions";
import {useSortMultiple} from '../hooks/useSort'
import Sidebar from "../components/Sidebar";
import { FaTrash, FaEdit } from "react-icons/fa";

import { subheader } from "../actions/subheader";


const toshiList = [
  "About",
  "Teaching",
  "Reviews",
  "Blog",
];



export default function Reviews({type}) {
  const {
    // path,
    url,
  } = useRouteMatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;


  const sortedReviews = useSortMultiple(reviews, "date", "name");

  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [relation, setRelation] = React.useState("Student");
  const [msg, setMsg] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = React.useState(Date.now());
  const [submitted, setSubmitted] = React.useState(false);
  const [failed, setFailed] = React.useState("");
  const [sent, setSent] = React.useState(false);

  // const validate = () => {
  //   if ( name.length === 0 && msg.length === 0) {
  //     setFailed("Please submit a message and a valid email address.");
  //     window.setTimeout(() => {
  //       setFailed("");
  //     }, 4000);
  //   } else if (name.length === 0) {
  //     setFailed("Please include your name.");
  //     window.setTimeout(() => {
  //       setFailed("");
  //     }, 4000);
  //   } else if (msg.length === 0) {
  //     setFailed("Please include a message.");
  //     window.setTimeout(() => {
  //       setFailed("");
  //     }, 4000);
  //   } else {
  //     return true;
  //   }
  // };

  // const handleChange = (e) => {
  //   e.preventDefault()
  //   setName(e.target.value)
  // }

  const userDetails = useSelector((state) => state.userDetails);
  const {
    // loading,
    // error,
    user,
  } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const isValid = validate();

    if (name.length === 0 && msg.length === 0) {
      setFailed("Please enter a name and message.");
      window.setTimeout(() => {
        setFailed("");
      }, 4000);
    }

    if (name.length > 0 && msg.length > 0) {
      setSubmitted(true);

      window.setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      await dispatch(createReview(name, relation, msg, date)).then(() => {
        // setSubmitted(false);
        setSent(true);

        setName("");
        setRelation("Student");
        setMsg("");
      });
    }
  };

  React.useEffect(() => {
    // if (userInfo && userInfo.isAdmin) {
    dispatch(listReviews());
    dispatch(getUserDetails("profile"));
    // } else {
    // Note: come back and implement the redirect below once useHistory is defined in the right pace
    // history.push("/login");
    // }
  }, [dispatch, sent]);

  React.useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error) {
      dispatch(subheader({ error }));
    }
  }, [dispatch, loading, error]);

  // console.log(`name: ${name}`);

  React.useEffect(() => {
    if (user === undefined) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      // setEmail(user.email);
    }
  }, [dispatch, user]);

  const handleRadioBtnChange = (e) => {
    // e.preventDefault();
    setRelation(e.target.value);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteReview(id)).then(() => dispatch(listReviews()));
    }
  };

  // const handleMsgChange = (e) => {
  //    e.preventDefault();
  //    setMsg(e.target.value);
  // }

  // console.log(`relation: ${relation}`)
  return (
    <>
      <div
        className={
          type === "meetToshi" ? "pg__meetToshi" : "pg__home--container"
        }
      >
        {type === "meetToshi" && <Sidebar title="Toshi" list={toshiList} />}
        <div
          className={
            type === "meetToshi"
              ? "pg__meetToshi--card__meetToshi"
              : "pg__home--review-container"
          }
        >
          

          <div
            className="reviews"
            style={
              type === "meetToshi" ? { display: "block" } : { display: "flex" }
            }
          >
            {type === "home" ? (
              userInfo === null ? (
                <div className="reviews__login--container">
                  <div className="reviews__login">
                    <span className="text-size-2">Please&nbsp;</span>
                    <Link
                      to={`/login`}
                      className="text-size-2 reviews__msg--userInfoNull"
                    >
                      <span className="text-size-2" style={{ color: "blue" }}>
                        login&nbsp;
                      </span>
                    </Link>
                    <span className="text-size-2">to write a review</span>
                  </div>
                </div>
              ) : (
                <form
                  className="reviews__new-review"
                  style={{
                    // padding: type === "meetToshi" ? "0rem 2rem" : "8rem 2rem",
                    // padding: type === "meetToshi" ? "0rem 2rem" : "1rem 2rem",
                  }}
                >
                  <h2 className="reviews__new-review--header text-size-2">
                    Create a review
                  </h2>

                  <div className="reviews__new-review--element">
                    <input
                      className="reviews__new-review--input text-size-4"
                      type="text"
                      placeholder="Name"
                      style={{ color: "var(--old-blue-2)" }}
                      value={name || ''}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className="reviews__new-review--label text-size-4"></label>
                  </div>

                  <div className="reviews__new-review--radio-btns">
            

                    <div className="reviews__new-review--radio-btn">
                      <input
                        type="radio"
                        id="Student"
                        name="relation"
                        value="Student"
                        className="btn__radio--input"
                        // checked
                        onChange={(e) => handleRadioBtnChange(e)}
                      />

                      <label
                        className="reviews__new-review--label text-size-4"
                        style={{
                          color:
                            type === "meetToshi"
                              ? "var(--old-blue-2)"
                              : "var(--grey-light-6)",
                        }}
                      >
                        Student
                      </label>
                    </div>

                    <div className="reviews__new-review--radio-btn">
                      <input
                        type="radio"
                        id="Parent"
                        name="relation"
                        value="Parent"
                        className="btn__radio--input"
                        onChange={(e) => handleRadioBtnChange(e)}
                      />
                      <label
                        className="reviews__new-review--label text-size-4"
                        style={{
                          color:
                            type === "meetToshi"
                              ? "var(--old-blue-2)"
                              : "var(--grey-light-6)",
                        }}
                      >
                        Parent
                      </label>
                    </div>

                    <div className="reviews__new-review--radio-btn">
                      <input
                        type="radio"
                        id="Friend"
                        name="relation"
                        value="Friend"
                        className="btn__radio--input"
                        onChange={(e) => handleRadioBtnChange(e)}
                      />
                      <label
                        className="reviews__new-review--label text-size-4"
                        style={{
                          color:
                            type === "meetToshi"
                              ? "var(--old-blue-2)"
                              : "var(--grey-light-6)",
                        }}
                      >
                        Friend
                      </label>
                    </div>
                  </div>

                  <div className="review__new-review--element text-size-4">
                    <textarea
                      className="reviews__new-review--textarea text-size-4"
                      type="text"
                      placeholder="Message"
                      value={msg}
                      style={{
                        minHeight: type === "meetToshi" ? "45vh" : "55vhvh",
                        maxHeight: type === "meetToshi" ? "55vh" : "62vh",
                        color: "var(--old-blue-2)",
                      }}
                      onChange={(e) => setMsg(e.target.value)}
                    ></textarea>
                    <label className="reviews__new-review--label text-size-4"></label>
                  </div>

                  {submitted && (
                    <p className="messageForm__success-message--contact text-size-3">
                      Email has been sent.
                    </p>
                  )}
                  {failed.length > 0 && (
                    <p className="messageForm__fail-message--contact text-size-3">
                      {failed}
                    </p>
                  )}

                  <button
                    type="button"
                    className="btn__reviews--new-review"
                    onClick={handleSubmit}
                    disabled={submitted || failed.length > 0}
                  >
                    Submit
                  </button>
                </form>
              )
            ) : (
              <Link to={`${url}/create-review`} className="btn__adminApptsList">
                <span className="text-size-6" style={{ textAlign: "center" }}>
                  Create Review
                </span>
              </Link>
            )}
            

            <ul className="reviews__list">
              {sortedReviews.map((review) => {
                const date = review.date.split("T")[0].split("-");
                const orderedDate = `${date[1]}/${date[2]}/${date[0]}`;

                if(review.approved === true) {
                  return (
                    <li key={review._id} className="reviews__card">
                      <div
                        className="reviews__card--header"
                        style={{
                          backgroundColor:
                            type === "meetToshi"
                              ? "var(--old-blue-2)"
                              : "white",
                        }}
                      >
                        <div
                          className="reviews__card--item-name text-size-3"
                          style={{
                            color:
                              type === "meetToshi"
                                ? "var(--black)"
                                : "var(--old-blue-2)",
                          }}
                        >
                          {review.name}
                          <span className="reviews__relation text-size-5">
                            {" "}
                            ({review.relation})
                          </span>
                        </div>
                       

                        <div
                          className="reviews__card--item-date text-size-4"
                          style={{
                            color:
                              type === "meetToshi"
                                ? "var(--black)"
                                : "var(--grey-light-5)",
                          }}
                        >
                          {orderedDate}
                        </div>
                      </div>

                      <div className="reviews__card--item-msg text-size-4">
                        {review.msg}
                      </div>

                      <div className="btns__reviews">
                        <div
                          className="reviews__card--item-approved text-size-4"
                          style={{
                            color:
                              type === "meetToshi"
                                ? "var(--black)"
                                : "var(--grey-light-5)",
                          }}
                        >
                          {!review.approved && "Pending"}
                        </div>
                        {user !== undefined && review.name === user.name && (
                          <>
                            <Link to={`/review/${review._id}/edit`}>
                              <FaEdit
                                size={20}
                                fill="var(--old-blue-2)"
                                className="social-media-icon__edit"
                                type="button"
                              />
                            </Link>
                            <FaTrash
                              size={20}
                              fill="var(--red)"
                              className="social-media-icon__trash"
                              type="button"
                              onClick={() => deleteHandler(review._id)}
                            />
                          </>
                        )}
                      </div>
                     
                    </li>
                  );
                } 
                if (user !== undefined && review.name === user.name) {
                  return (
                    <li key={review._id} className="reviews__card">
                      <div
                        className="reviews__card--header"
                        style={{
                          backgroundColor:
                            type === "meetToshi"
                              ? "var(--old-blue-2)"
                              : "white",
                        }}
                      >
                        <div
                          className="reviews__card--item-name text-size-3"
                          style={{
                            color:
                              type === "meetToshi"
                                ? "var(--black)"
                                : "var(--old-blue-2)",
                          }}
                        >
                          {review.name}
                          <span className="reviews__relation text-size-5">
                            {" "}
                            ({review.relation})
                          </span>
                        </div>
                        

                        <div
                          className="reviews__card--item-date text-size-4"
                          style={{
                            color:
                              type === "meetToshi"
                                ? "var(--black)"
                                : "var(--black)",
                          }}
                        >
                          {/* {review.date.split("T")[0].split("-")} */}
                          {orderedDate}
                        </div>
                      </div>

                      <div className="reviews__card--item-msg text-size-4">
                        {review.msg}
                      </div>

                      <div className="btns__reviews">
                        <div
                          className="reviews__card--item-approved text-size-4"
                          style={{
                            color:
                              type === "meetToshi"
                                ? "var(--grey-light-5)"
                                : "var(--grey-light-5)",
                          }}
                        >
                          {!review.approved && "Pending"}
                        </div>
                        {user !== undefined && review.name === user.name && (
                          <>
                            <Link to={`/review/${review._id}/edit`}>
                              <FaEdit
                                size={20}
                                fill="var(--old-blue-2)"
                                className="social-media-icon__edit"
                                type="button"
                                // onClick={() => deleteHandler(appt._id)}
                              />
                            </Link>
                            <FaTrash
                              size={20}
                              fill="var(--red)"
                              className="social-media-icon__trash"
                              type="button"
                              onClick={() => deleteHandler(review._id)}
                            />
                          </>
                        )}
                      </div>
                     
                    </li>
                  );
                } else return null
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

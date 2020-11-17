import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { subheader } from "../actions/subheader";
import { getReviewDetails, updateReview } from "../actions/reviewActions";
// import { USER_UPDATE_RESET } from "../constants/userConstants";
// import Sidebar from "../components/Sidebar";
import { REVIEW_UPDATE_RESET } from "../constants/reviewConstants";

// const adminList = [
//   "User List",
//   "Appointments",
  // "Reviews",
  // "Blog",
// ];

export default function ReviewEdit({ match, history, location }) {
//   console.log(`match: ${match}`);
  const reviewId = match.params.id;

  const [name, setName] = React.useState("");
  const [relation, setRelation] = React.useState("");
  const [msg, setMsg] = React.useState("");

  const dispatch = useDispatch();

  const reviewDetails = useSelector((state) => state.reviewDetails);
  const { loading, error, review } = reviewDetails;

  const reviewUpdate = useSelector((state) => state.reviewUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = reviewUpdate;

  React.useEffect(() => {
    if (loading || loadingUpdate) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error || errorUpdate) {
      dispatch(subheader({ error }));
    }
  }, [dispatch, loading, error, loadingUpdate, errorUpdate]);

  React.useEffect(() => {
    if (successUpdate) {
      dispatch({ type: REVIEW_UPDATE_RESET });
      history.push("/");
    console.log(review)
    } else {
      if (!review.name || review._id !== reviewId) {
        dispatch(getReviewDetails(reviewId));
      } else {
        setName(review.name);
        setRelation(review.relation);
        setMsg(review.msg);

        console.log(`msg: ${review.relation}`)
      }
    }
  }, [dispatch, history, reviewId, review, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReview({ _id: reviewId, name, relation, msg}));
  };

    const handleRadioBtnChange = (e) => {
      // e.preventDefault();
      setRelation(e.target.value);
    };

  return (
    <div className="pg__meetToshi">
      <Link to="/" className="btn__go-back">
        Go Back
      </Link>
      <form onSubmit={handleSubmit} className="reviewEditScreen user__page">
        <div className="reviewEditScreen__header">
          <h2 className="text-size-2 letter-spacing-sm">
            {/* Any Questions? */}
            Edit Review
          </h2>

          {/* {message && <h1>{message}</h1>} */}
        </div>
        <div className="reviewEditScreen__content">
          <div className="reviewEditScreen__element">
            <label
              className="text-size-4 letter-spacing-md reviewEditScreen__label"
              htmlFor="name"
            >
              name
            </label>
            <input
              type="text"
              className="reviewEditScreen__input reviewEditScreen__input-contact text-size-3"
              placeholder="Your name address"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="reviewEditScreen__element">
            <div className="review__new-review--radio-btns">
              <div className="">
                <input
                  type="radio"
                  id="Student"
                  name="relation"
                  value="Student"
                  className="btn__radio--input"
                  // checked={review.relation === this.value}
                  onChange={(e) => handleRadioBtnChange(e)}
                />

                <label
                  className="reviews__new-review--label text-size-4"
                  style={{
                    color: "var(--old-blue-2)",
                  }}
                >
                  Student
                </label>
              </div>

              <div className="">
                <input
                  type="radio"
                  id="Parent"
                  name="relation"
                  value="Parent"
                  className="btn__radio--input"
                  // checked={review.relation === this.value}
                  onChange={(e) => handleRadioBtnChange(e)}
                />
                <label
                  className="reviews__new-review--label text-size-4"
                  style={{
                    color: "var(--old-blue-2)",
                  }}
                >
                  Parent
                </label>
              </div>

              <div className="">
                <input
                  type="radio"
                  id="Friend"
                  name="relation"
                  value="Friend"
                  className="btn__radio--input"
                  // checked={review.relation === this.value}
                  onChange={(e) => handleRadioBtnChange(e)}
                />
                <label
                  className="reviews__new-review--label text-size-4"
                  style={{
                    color: "var(--old-blue-2)",
                  }}
                >
                  Friend
                </label>
              </div>
            </div>
          </div>

          {/* <div className="reviewEditScreen__element">
            <label className="text-size-4 letter-spacing-md reviewEditScreen__label">
              Is Admin
            </label>
            <input
              type="radio"
              checked={isAdmin}
              className="reviewEditScreen__input reviewEditScreen__input-contact text-size-3"
              placeholder="Admin?"
              value={isAdmin}
              onChange={(isAdmin) => setIsAdmin(!isAdmin)}
            />
          </div> */}

          <div className="reviewEditScreen__element text-size-4">
            <textarea
              className="reviewEditScreen__textarea text-size-4"
              type="text"
              placeholder="Message"
              style={{ color: "var(--old-blue-2)" }}
              value={msg}
              // style={{
              //   minHeight: "25vh",
              //   maxHeight: "55vh",
              // }}
              onChange={(e) => setMsg(e.target.value)}
            ></textarea>
            <label className="reviews__new-review--label text-size-4"></label>
          </div>

          <button
            className="btn__userEditScreen"
            type="submit"
            onClick={handleSubmit}
          >
            Submit changes
          </button>
        </div>
      </form>
    </div>
  );
}

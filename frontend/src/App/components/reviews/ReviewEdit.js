import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// actions
import { subheader } from "../../actions/subheader";
import { getReviewDetails, updateReview } from "../../actions/reviewActions";

// constants
import { REVIEW_UPDATE_RESET } from "../../constants/reviewConstants";



export default function ReviewEdit({ match, history, location }) {
  const reviewId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [relation, setRelation] = React.useState("");
  const [msg, setMsg] = React.useState("");


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
    } else {
      if (!review.name || review._id !== reviewId) {
        dispatch(getReviewDetails(reviewId));
      } else {
        setName(review.name);
        setRelation(review.relation);
        setMsg(review.msg);
      }
    }
  }, [dispatch, history, reviewId, review, successUpdate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReview({ _id: reviewId, name, relation, msg}));
  }


  const handleRadioBtnChange = (e) => {
    setRelation(e.target.value);
  }

  return (
    <div className="container__screen--sidebar">
      <Link to="/" className="btn__reviews--go-back">
        Go Back
      </Link>
      <form onSubmit={handleSubmit} className="edit-review user__page">
        <div className="edit-review__header">
          <h2 className="font-size-2 letter-spacing-sm">
            Edit Review
          </h2>

        </div>
        <div className="edit-review__content">
          <div className="edit-review__element">
            <label
              className="font-size-4 letter-spacing-md edit-review__label"
              htmlFor="name"
            >
              name
            </label>
            <input
              type="text"
              className="edit-review__input edit-review__input-contact font-size-3"
              placeholder="Your name address"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="edit-review__element">
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
                  className="reviews__new-review--label font-size-4"
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
                  className="reviews__new-review--label font-size-4"
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
                  className="reviews__new-review--label font-size-4"
                  style={{
                    color: "var(--old-blue-2)",
                  }}
                >
                  Friend
                </label>
              </div>
            </div>
          </div>

          {/* <div className="edit-review__element">
            <label className="font-size-4 letter-spacing-md edit-review__label">
              Is Admin
            </label>
            <input
              type="radio"
              checked={isAdmin}
              className="edit-review__input edit-review__input-contact font-size-3"
              placeholder="Admin?"
              value={isAdmin}
              onChange={(isAdmin) => setIsAdmin(!isAdmin)}
            />
          </div> */}

          <div className="edit-review__element font-size-4">
            <textarea
              className="edit-review__textarea font-size-4"
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
            <label className="reviews__new-review--label font-size-4"></label>
          </div>

          <button
            className="btn__edit-user"
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

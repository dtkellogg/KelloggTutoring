import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// actions
import { subheader } from "../../actions/subheader";
import { getReviewDetails, updateReview } from "../../actions/reviewActions";
import { useToasts } from "react-toast-notifications";

// constants
import { REVIEW_UPDATE_RESET } from "../../constants/reviewConstants";


export default function ReviewEdit({ match, history, location }) {
  const reviewId = match.params.id;
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [msg, setMsg] = useState("");


  const reviewDetails = useSelector((state) => state.reviewDetails);
  const { loading, error, review } = reviewDetails;

  const reviewUpdate = useSelector((state) => state.reviewUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = reviewUpdate;

  console.log(`name: ${name}`)
  console.log(`relation: ${relation}`)
  console.log(`msg: ${msg}`)


  useEffect(() => {
    if (loading || loadingUpdate) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error || errorUpdate) {
      console.log(error)
    }
  }, [dispatch, loading, error, loadingUpdate, errorUpdate]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: REVIEW_UPDATE_RESET });

      addToast("Your review was successfully updated.", {
        appearance: "success",
        autoDismiss: true,
      });

      history.push("/toshi/reviews");
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
      
      <Link to="/toshi/reviews" className="btn__reviews--go-back">
        Go Back
      </Link>

      <form onSubmit={handleSubmit} className="container__reviews--edit-review">
        <h2 className="header__admin--edit-review">
          Edit Review
        </h2>

        <div className="edit-review__content">
          <div className="edit-review__element">
            <label
              className="letter-spacing-md edit-review__label"
              htmlFor="name"
            >
              name
            </label>
            <input
              type="text"
              className="edit-review__input edit-review__input-contact"
              placeholder="Your name address"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="edit-review__element">
            <div className="reviews__new-review--radio-btns">
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
                  className="reviews__new-review--label"
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
                  className="reviews__new-review--label"
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
                  className="reviews__new-review--label"
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
            <label className=" letter-spacing-md edit-review__label">
              Is Admin
            </label>
            <input
              type="radio"
              checked={isAdmin}
              className="edit-review__input edit-review__input-contact"
              placeholder="Admin?"
              value={isAdmin}
              onChange={(isAdmin) => setIsAdmin(!isAdmin)}
            />
          </div> */}

          <div className="edit-review__element">
            <textarea
              className="edit-review__textarea"
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
            <label className="reviews__new-review--label"></label>
          </div>

          <button
            className="btn__reviews--new-review"
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

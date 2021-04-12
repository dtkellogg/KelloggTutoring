import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";

// actions
import { listReviews, deleteReview } from "../../actions/reviewActions";

function ReviewsCard({review}, type) {
  const date = review.date.split("T")[0].split("-");
  const orderedDate = `${date[1]}/${date[2]}/${date[0]}`;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUser, // eslint-disable-line no-unused-vars
    error: loadingError, // eslint-disable-line no-unused-vars
    user,
  } = userDetails;

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteReview(id)).then(() => dispatch(listReviews()));
    }
  };
  
  if (review.approved === true) {
    return (
      <li key={review._id} className="reviews__card">
        <div
          className="reviews__card--header"
          style={{
            backgroundColor:
              type === "meetToshi" ? "var(--old-blue-2)" : "white",
          }}
        >
          <div
            className="reviews__card--item-name"
            style={{
              color:
                type === "meetToshi" ? "var(--black)" : "var(--old-blue-2)",
            }}
          >
            {review.name}
            
          </div>

          <span className="reviews__relation">
            {" "}
            ({review.relation})
          </span>

          <div
            className="reviews__card--item-date"
            style={{
              color:
                type === "meetToshi" ? "var(--black)" : "var(--grey-5)",
            }}
          >
            {orderedDate}
          </div>
        </div>

        <div className="reviews__card--item-msg">{review.msg}</div>

        <div className="reviews__card--interactions">
          <div
            className="reviews__card--item-approved"
            style={{
              color:
                type === "meetToshi" ? "var(--black)" : "var(--grey-5)",
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
                  className="icon__edit"
                  type="button"
                />
              </Link>
              <FaTrash
                size={20}
                fill="var(--red)"
                className="icon__trash"
                type="button"
                onClick={() => deleteHandler(review._id)}
              />
            </>
          )}
        </div>
      </li>
    );
  } else if (user !== undefined && review.name === user.name) {
    return (
      <li key={review._id} className="reviews__card">
        <div
          className="reviews__card--header"
          style={{
            backgroundColor:
              type === "meetToshi" ? "var(--old-blue-2)" : "white",
          }}
        >
          <div
            className="reviews__card--item-name"
            style={{
              color:
                type === "meetToshi" ? "var(--black)" : "var(--old-blue-2)",
            }}
          >
            {review.name}
            <span className="reviews__relation">
              {" "}
              ({review.relation})
            </span>
          </div>

          <div
            className="reviews__card--item-date"
            style={{
              color: type === "meetToshi" ? "var(--black)" : "var(--black)",
            }}
          >
            {/* {review.date.split("T")[0].split("-")} */}
            {orderedDate}
          </div>
        </div>

        <div className="reviews__card--item-msg">{review.msg}</div>

        <div className="btns__reviews">
          <div
            className="reviews__card--item-approved"
            style={{
              color:
                type === "meetToshi"
                  ? "var(--grey-5)"
                  : "var(--grey-5)",
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
                  className="icon__edit"
                  type="button"
                  // onClick={() => deleteHandler(appt._id)}
                />
              </Link>
              <FaTrash
                size={20}
                fill="var(--red)"
                className="icon__trash"
                type="button"
                onClick={() => deleteHandler(review._id)}
              />
            </>
          )}
        </div>
      </li>
    );
  } else return null;
}

export default ReviewsCard
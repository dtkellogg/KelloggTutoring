import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";

// hooks
import { useSortMultiple } from "../hooks/useSort";

// actions
import { listReviews, deleteReview } from "../actions/reviewActions";
import { subheader } from "../actions/subheader";


export default function ReviewsList({ type }) {
    const dispatch = useDispatch();

    const reviewList = useSelector((state) => state.reviewList);
    const { loading, error, reviews } = reviewList; // eslint-disable-line no-unused-vars

    const userDetails = useSelector((state) => state.userDetails);
    const {
      // loading,
      // error,
      user,
    } = userDetails;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin // eslint-disable-line no-unused-vars

    const sortedReviews = useSortMultiple(reviews, "date", "name");

    if(error) console.error(error);

    const deleteHandler = async (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await dispatch(deleteReview(id)).then(() => dispatch(listReviews()));
      }
    };

  React.useEffect(() => {
    dispatch(listReviews())
  }, [dispatch, userInfo])

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



    return (
      <ul className="reviews__list">
        {sortedReviews.map((review) => {
          const date = review.date.split("T")[0].split("-");
          const orderedDate = `${date[1]}/${date[2]}/${date[0]}`;

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
                      type === "meetToshi" ? "var(--old-blue-2)" : "white",
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
                        type === "meetToshi" ? "var(--black)" : "var(--black)",
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
          } else return null;
        })}
      </ul>
    );
  }
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

// components
import ReviewsCard from './ReviewsCard'

// hooks
import { useSortMultiple } from "../../hooks/useSort";

// actions
import { listReviews } from "../../actions/reviewActions";
import { subheader } from "../../actions/subheader";


export default function ReviewsList({ type }) {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList; // eslint-disable-line no-unused-vars

  const sortedReviews = useSortMultiple(reviews, "date", "name");

  useEffect(() => {
    if(reviews.length === 0) {
      dispatch(listReviews())
    }
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
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
        return <ReviewsCard review={review} type={type} />
      })}
    </ul>
  );
}
import React, { memo, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import ReviewsList from "./ReviewsList";
import { getUserDetails } from "../../actions/userActions";
import { subheader } from "../../actions/subheader";


export default function ReviewsRaw({ type }) {
  const { url } = useRouteMatch()
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (user) {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      }
    } else if (error) {
      console.log(error)
    } else if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
  }, [dispatch, user]);

  return (
    <div className={
      type === "meetToshi" ? "container__screen--sidebar" : "container__home--reviews"
    }>
      <div
        className={
          type === "meetToshi" ? "container__reviews--toshi-screen" : "container__reviews--home-screen"
        }
      >
        {type === "meetToshi" && (
          <Link to={`${url}/create-review`} className="btn__reviews">
            Create Review
          </Link>
        )}

        <ReviewsList type={type} />
      </div>
    </div>
  );
}

export const Reviews = memo(ReviewsRaw, (prevProps, nextProps) => {
  return prevProps.count === nextProps.count
})
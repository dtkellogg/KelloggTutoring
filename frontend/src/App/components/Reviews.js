import React from "react";
import { Link, useRouteMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createReview, listReviews, deleteReview } from "../actions/reviewActions";
import { getUserDetails } from "../actions/userActions";
import {useSortMultiple} from '../hooks/useSort'
import Sidebar from "./Sidebar";
import { FaTrash, FaEdit } from "react-icons/fa";

import ReviewsList from "./ReviewsList";

import { subheader } from "../actions/subheader";

import Notecard from '../../Notecard.jpg'


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
            
             
              <Link to={`/review/create-review`} className="btn__adminApptsList">
                <span className="text-size-6" style={{ textAlign: "center" }}>
                  Create Review
                </span>
              </Link>
            
            

            <ReviewsList type={type} />
          </div>
        </div>
      </div>
    </>
  );
}

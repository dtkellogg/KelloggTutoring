import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import reviews from "../reviews"
import { createReview, listReviews } from "../actions/reviewActions";
import useSort from '../hooks/useSort'
import Sidebar from "../components/Sidebar";

const toshiList = [
  "About",
  "Teaching",
  "Reviews",
  "Blog",
];

export default function Reviews({type}) {
  
  const reviewList = useSelector((state) => state.reviewList);
  const {
    // loading,
    // error,
    reviews,
  } = reviewList;

  const sortedReviews = useSort(reviews, "date")


  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [relation, setRelation] = React.useState("Student");
  const [msg, setMsg] = React.useState("");
  const [date, setDate] = React.useState(Date.now())
  const [submitted, setSubmitted] = React.useState(false);
  const [failed, setFailed] = React.useState("");

  console.log(`name: ${relation}`);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const isValid = validate();

    // if (isValid) {
      

      // window.setTimeout(() => {
      //   setSubmitted(false);
      // }, 4000);
    // }

    console.log(`name: ${relation}`)

    dispatch(
      createReview(name, relation, msg, date)
    );
    setName('')
    setRelation("Student")
    setMsg("")
    setSubmitted(true);
  }

  React.useEffect(() => {
    // if (userInfo && userInfo.isAdmin) {
      dispatch(listReviews());
    // } else {
      // Note: come back and implement the redirect below once useHistory is defined in the right pace
      // history.push("/login");
    // }
  }, [dispatch]);

  const handleRadioBtnChange = (e) => {
    // e.preventDefault();
    setRelation(e.target.value);

  }

  // const handleMsgChange = (e) => {
  //    e.preventDefault();
  //    setMsg(e.target.value);
  // }

  console.log(`relation: ${relation}`)
  return (
    <div className="pg__meetToshi">
      <Sidebar title="Toshi" list={toshiList} />
    <div className="pg__meetToshi--card__meetToshi">
      <h2 className="text-size-1 pg__meetToshi--card__meetToshi--header letter-spacing-sm">
        Reviews
      </h2>

      <div className="reviews">
        <form
          className="reviews__new-review"
          style={{
            // padding: type === "meetToshi" ? "0rem 2rem" : "8rem 2rem",
            padding: type === "meetToshi" ? "0rem 2rem" : "1rem 2rem",
          }}
        >
          <h2 className="review__new-review--header text-size-2">
            Add a new review
          </h2>

          <div className="review__new-review--element">
            <input
              className="reviews__new-review--input text-size-4"
              type="text"
              placeholder="Name"
              style={{ color: "var(--old-blue-2)" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label className="reviews__new-review--label text-size-4"></label>
          </div>

          <div className="review__new-review--radio-btns">
            {/* <input
              className="reviews__new-review--input"
              type="text"
              placeholder="Relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            ></input> */}

            <div className="">
              <input
                type="radio"
                id="Student"
                name="relation"
                value="Student"
                className="radio-btn__input"
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

            <div className="">
              <input
                type="radio"
                id="Parent"
                name="relation"
                value="Parent"
                className="radio-btn__input"
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

            <div className="">
              <input
                type="radio"
                id="Friend"
                name="relation"
                value="Friend"
                className="radio-btn__input"
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
              style={{ color: "var(--old-blue-2)" }}
              value={msg}
              style={{
                minHeight: type === "meetToshi" ? "45vh" : "55vhvh",
                maxHeight: type === "meetToshi" ? "55vh" : "62vh",
              }}
              onChange={(e) => setMsg(e.target.value)}
            ></textarea>
            <label className="reviews__new-review--label text-size-4"></label>
          </div>

          <button
            type="button"
            className="btn__reviews--new-review"
            onClick={handleSubmit}
            disabled={submitted || failed.length > 0}
          >
            Submit
          </button>
        </form>

        <ul className="reviews__list">
          {sortedReviews.map((review) => {
            const date = review.date.split("T")[0].split("-");
            const orderedDate = `${date[1]}/${date[2]}/${date[0]}`;

            return (
              <li className="reviews__card">
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
                          : "var(--grey-light-5)",
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    className="reviews__card--item-relation text-size-4"
                    style={{
                      color:
                        type === "meetToshi"
                          ? "var(--black)"
                          : "var(--grey-light-5)",
                    }}
                  >
                    {review.relation}
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
                    {/* {review.date.split("T")[0].split("-")} */}
                    {orderedDate}
                  </div>
                </div>
                <div className="reviews__card--item-msg text-size-4">
                  {review.msg}
                </div>
                <div className="reviews__card--item-approved text-size-4">
                  {review.approved}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  );
}

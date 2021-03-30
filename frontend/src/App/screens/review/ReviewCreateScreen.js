// react
import React from 'react'
import { useDispatch, useSelector } from "react-redux";

// actions
import { createReview } from "../../actions/reviewActions";
import { getUserDetails } from "../../actions/userActions";

// components
import {Sidebar} from "../../components/navigation/Sidebar";

// data
import { toshiList } from "../../data/lists"



export default function ReviewCreateScreen({ history }) {
  const dispatch = useDispatch();

  console.log(history.location.pathname);

  const [name, setName] = React.useState("");
  const [relation, setRelation] = React.useState("Student");
  const [msg, setMsg] = React.useState("");
  const [date, setDate] = React.useState(Date.now()); // eslint-disable-line no-unused-vars
  const [submitted, setSubmitted] = React.useState(false);
  const [failed, setFailed] = React.useState("");
  const [sent, setSent] = React.useState(false); // eslint-disable-line no-unused-vars

  const userDetails = useSelector((state) => state.userDetails);
  const {
    // loading,
    // error,
    user,
  } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;  // eslint-disable-line no-unused-vars

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const isValid = validate();

    if (name === undefined || msg.length === 0) {
      setFailed("Please enter a name and message.");
      window.setTimeout(() => {
        setFailed("");
      }, 4000);
    }

    if (name !== undefined && msg.length > 0) {
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
        console.log(history.location.pathname)
        history.push('/meetToshi/reviews')
      });
    }
  };

  const handleRadioBtnChange = (e) => {
    // e.preventDefault();
    setRelation(e.target.value);
  };


  React.useEffect(() => {
    if (user === undefined) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
    }
  }, [dispatch, user]);

  return (
    <div className="pg__meetToshi">
      <Sidebar title="Toshi" list={toshiList} />
      <form className="reviews__new-review">
        <h2 className="reviews__new-review--header text-size-2">
          Create a review
        </h2>

        <div className="reviews__new-review--element">
          <input
            className="reviews__new-review--input text-size-4"
            type="text"
            placeholder="Name"
            style={{ color: "var(--old-blue-2)" }}
            value={name || ""}
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
              // style={{ color: "var(--old-blue-2)" }}
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
            <label className="reviews__new-review--label text-size-4">
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
            <label className="reviews__new-review--label text-size-4">
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
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
          <label className="reviews__new-review--label text-size-4"></label>
        </div>

        {submitted && (
          <p className="messageForm__success-message--contact text-size-3">
            Your review was submitted successfully. Thank you!
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
    </div>
  );
}
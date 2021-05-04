// react
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

// actions
import { createReview } from "../../actions/reviewActions";
import { getUserDetails } from "../../actions/userActions";
import { subheader } from "../../actions/subheader";

// components
import Input from '../Input'


export default function ReviewCreateScreen({ history }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Student");
  const [msg, setMsg] = useState("");
  const [date, setDate] = useState(Date.now()); // eslint-disable-line no-unused-vars

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === undefined || msg.length === 0) {
      addToast("Please enter a name and message.", {
        appearance: "error",
        autoDismiss: true,
      });
    }

    if (name !== undefined && msg.length > 0) {
      addToast("Your review was submitted successfully. Thank you!", {
        appearance: "success",
        autoDismiss: true,
      });

      await dispatch(createReview(name, relation, msg, date)).then(() => {
        setName("");
        setRelation("Student");
        setMsg("");
        history.push('/toshi/reviews')
      });
    }
  };

  const handleRadioBtnChange = (e) => {
    // e.preventDefault();
    console.log(`e.target.value: ${e.target.value}`)
    setRelation(e.target.value);
  };

  useEffect(() => {
    if (user) {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
      }
    } else if (error) {
      addToast("There was an error. Please refresh the page.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
  }, [dispatch, history, user, loading, error]);

  return (
    <div className="container__screen--sidebar">
      <Link to='/toshi/reviews' className="btn__go-back--admin">Go Back</Link>
      <form className="reviews__new-review">

        <h2 className="reviews__new-review--header">
          Create a review
        </h2>

        <Input containerClass="reviews__new-review--element" labelClass="reviews__new-review--label" inputClass="reviews__new-review--input"
          htmlFor="name" label="name" type="name" value={name || ""} placeholder="name" onChange={(e) => setName(e.target.value)}
        />

        <div className="reviews__new-review--radio-btns">

          {/* <Input containerClass="reviews__new-review--radio-btn" labelClass="reviews__new-review--label" inputClass="btn__radio--input"
            htmlFor="" label="Student" type="radio" value={relation} placeholder="" onChange={(e) => handleRadioBtnChange(e.target.value)}
            id="Student" name="relation"
          /> */}
          {/* <Input containerClass="reviews__new-review--radio-btn" labelClass="reviews__new-review--label" inputClass="btn__radio--input"
            htmlFor="" label="subject" type="radio" value={subject} placeholder="subject" onChange={(e) => setSubject(e.target.value)}
          />
          <Input containerClass="reviews__new-review--radio-btn" labelClass="reviews__new-review--label" inputClass="btn__radio--input"
            htmlFor="" label="date" type="radio" value={date} placeholder="date" onChange={(e) => setDate(e.target.value)}
          /> */}
          

          <div className="reviews__new-review--radio-btn">
            <input
              type="radio"
              id="Student"
              name="relation"
              value="Student"
              placeholder="name"
              className="btn__radio--input"
              // checked
              onChange={(e) => handleRadioBtnChange(e)}
            />

            <label className="reviews__new-review--label">
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
            <label className="reviews__new-review--label">
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
            <label className="reviews__new-review--label">
              Friend
            </label>
          </div>

        </div>

        <Input containerClass="reviews__new-review--element" labelClass="reviews__new-review--label" inputClass="reviews__new-review--textarea"
          htmlFor="message" label="message" type="text" value={msg || ""} placeholder="Please leave your message here." onChange={(e) => setMsg(e.target.value)}
          textarea={true}
        />

        <button
          type="button"
          className="btn__reviews--new-review"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
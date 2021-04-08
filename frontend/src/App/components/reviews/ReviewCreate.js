// react
import React from 'react'
import { useDispatch, useSelector } from "react-redux";

// actions
import { createReview } from "../../actions/reviewActions";
import { getUserDetails } from "../../actions/userActions";

// components
import Input from '../Input'



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
    console.log(`e.target.value: ${e.target.value}`)
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
    <div className="container__screen--sidebar">
      <form className="reviews__new-review">

        <h2 className="reviews__new-review--header">
          Create a review
        </h2>

        <Input containerClass="reviews__new-review--element" labelClass="reviews__new-review--label" inputClass="reviews__new-review--input"
          htmlFor="" label="" type="text" value={name || ""} placeholder="name" onChange={(e) => setName(e.target.value)}
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
          htmlFor="" label="" type="text" value={msg} placeholder="message" onChange={(e) => setMsg(e.target.value)}
          textarea={true}
        />

        {submitted && (
          <p className="form__success-message--contact">
            Your review was submitted successfully. Thank you!
          </p>
        )}
        {failed.length > 0 && (
          <p className="form__fail-message--contact">
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
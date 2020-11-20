import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import Sidebar from "../components/Sidebar";
import useFormatedPhoneNumber from "../hooks/useFormatedPhoneNumber"


// const contactList = ['message form', 'schedule an appointment', 'phone, text & email'];
const contactList = ['message', 'schedule', 'contact info'];

function FormattedPhoneNum(input) {
  let output = "(";
  input.replace(/^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function (match, g1, g2, g3) {
    if (g1.length) {
      output += g1;
      if (g1.length === 3) {
        output += ")";
        if (g2.length) {
          output += " " + g2;
          if (g2.length === 3) {
            output += " - ";
            if (g3.length) {
              output += g3;
            }
          }
        }
      }
    }
  }
  );
  return output;
}


export default function MessageScreen({ history }) {

  // console.log(`history: ${history}`)

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [failed, setFailed] = React.useState("");

  // console.log(`FORMATED-NAME: ${getFormattedPhoneNum(phone)}`)

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {
    //  loading,
    //  error,
    user,
  } = userDetails;

  // console.log(`user: ${user}`)


  React.useEffect(() => {
      if (user === undefined || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
  }, [dispatch, history, user]);

  const validate = () => {
    // eslint-disable-next-line no-useless-escape
    const emailRegexp = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const phoneRegexp = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

    if (!emailRegexp.test(email) && message.length === 0) {
      setFailed("Please submit a message and a valid email address.");
      window.setTimeout(() => {
        setFailed("");
      }, 4000);
    } else if (!emailRegexp.test(email)) {
      setFailed("Please submit a valid email address.");
      window.setTimeout(() => {
        setFailed("");
      }, 4000);
    } else if (phone.length > 0 && !phoneRegexp.test(phone)) {
      setFailed("Please submit a valid phone number.");
      window.setTimeout(() => {
        setFailed("");
      }, 4000);
    } else if (message.length === 0) {
      setFailed("Please add a message.");
      window.setTimeout(() => {
        setFailed("");
      }, 4000);
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      setSubmitted(true);

      window.setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      const dataToSubmit = {
        name,
        email,
        subject,
        phone,
        message,
      };


        await axios
          .post("/api/messages", dataToSubmit)
          .then((response) => {
            console.log(`axios response: ${response.data}`);
          })
          .then(() => {
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");
          });
    }
  };

  return (
    <div className="pg__contact">
      <Sidebar title="Contact" list={contactList} />
      <div className="user__page">
        <form className="messageForm" onSubmit={handleSubmit}>
          <div className="messageForm__header">
            <h2 className="text-size-2 letter-spacing-sm">
              Any questions?
            </h2>
          </div>
          <div className="messageForm__content">
            <div className="messageForm__element">
              <label className="text-size-5 letter-spacing-md messageForm__label">
                name
              </label>
              <input
                type="text"
                className="messageForm__input messageForm__input-contact text-size-4"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="messageForm__element">
              <label
                className="text-size-5 letter-spacing-md messageForm__label"
                htmlFor="email__messageForm"
              >
                email
              </label>
              <input
                type="email"
                className="messageForm__input messageForm__input-contact text-size-4"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="messageForm__element">
              <label className="text-size-5 letter-spacing-md messageForm__label">
                phone
              </label>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                // format="(###) ###-####"
                className="messageForm__input messageForm__input-contact text-size-4"
                placeholder="(xxx) xxx - xxxx"
                value={phone ? FormattedPhoneNum(phone) : phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="messageForm__element">
              <label className="text-size-5 letter-spacing-md messageForm__label">
                subject
              </label>
              <input
                type="text"
                className="messageForm__input messageForm__input-contact text-size-4"
                placeholder="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="messageForm__element">
              <label
                className="text-size-5 letter-spacing-md messageForm__label"
                htmlFor="message__messageForm"
              >
                message
              </label>
              <textarea
                type="text"
                className="messageForm__textarea messageForm__input--contact-message text-size-4"
                placeholder="Please leave your message here."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            {submitted && (
              <p className="messageForm__success-message--contact text-size-3">
                Email has been sent.
              </p>
            )}
            {failed.length > 0 && (
              <p className="messageForm__fail-message--contact text-size-3">
                {failed}
              </p>
            )}

            <button
              className="btn__messageForm"
              onClick={handleSubmit}
              disabled={submitted || failed.length > 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
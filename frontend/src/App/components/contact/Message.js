import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

// actions
import { getUserDetails } from "../../actions/userActions";
import { sendMessageToNodeMailer } from "../../actions/msgActions";
import { subheader } from "../../actions/subheader";

// hooks
import useFormatedPhoneNumber from "../../hooks/useFormatedPhoneNumber"
import useWindowDimensions from '../../hooks/useWindowDimensions'

// components
import Input from '../contact/Input'

// can't call hook conditionally in jsx so using the following fn:
function FormattedPhoneNum(input) {
  return useFormatedPhoneNumber(input)
}


export default function Message({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { width } = useWindowDimensions()
  const { addToast } = useToasts();

  const userDetails = useSelector((state) => state.userDetails);
  const {
     loading,
     error,
    user,
  } = userDetails;


  useEffect(() => {
    if (user) {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    } else if(error) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      setSubmitted(true);

      window.setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      await dispatch(sendMessageToNodeMailer(name, email, subject, phone, message))
        .then(() => {
          setName("");
          setEmail("");
          setPhone("");
          setSubject("");
          setMessage("");
        });
    }
  };

  const validate = () => {
    const emailRegexp = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/; // eslint-disable-line no-useless-escape
    const phoneRegexp = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

    if (!emailRegexp.test(email) && message.length === 0) {
      addToast("Please submit a message and a valid email address.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (!emailRegexp.test(email)) {
      addToast("Please submit a valid email address.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (phone.length > 0 && !phoneRegexp.test(phone)) {
      addToast("Please submit a valid phone number.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (message.length === 0) {
      addToast("Please add a message.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      return true;
    }
  };

  return (
    <div className="container__screen--sidebar">
      <form className="container__form" onSubmit={handleSubmit}>
        <h2 className="header__form">
          Any questions?
        </h2>
        <div className="form__body">

          <Input containerClass="form__element" labelClass="form__label" inputClass="form__input form__input-contact"
            htmlFor="" label="name" type="name" value={name || ""} placeholder="name" onChange={(e) => setName(e.target.value)}
          />
          <Input containerClass="form__element" labelClass="form__label" inputClass="form__input form__input-contact"
            htmlFor="email__form" label="email" type="email" value={email || ""} placeholder="email" onChange={(e) => setEmail(e.target.value)}
          />
          <Input containerClass="form__element" labelClass="form__label" inputClass="form__input form__input-contact"
            htmlFor="" label="phone" type="tel" value={phone ? FormattedPhoneNum(phone) : phone} placeholder="(xxx) xxx - xxxx" onChange={(e) => setPhone(e.target.value)} 
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
          <Input containerClass="form__element" labelClass="form__label" inputClass="form__input form__input-contact"
            htmlFor="" label="subject" type="subject" value={subject || ""} placeholder="subject" onChange={(e) => setSubject(e.target.value)}
          />
          <Input containerClass="form__element" labelClass="form__label" inputClass="form__textarea form__input--contact-message"
            htmlFor="message__form" label="message" type="text" value={message || ""} placeholder="Please leave your message here." onChange={(e) => setMessage(e.target.value)}
            textarea={true}
          />

        </div>
        
        <button
          className="btn__form"
          onClick={handleSubmit}
          disabled={submitted}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
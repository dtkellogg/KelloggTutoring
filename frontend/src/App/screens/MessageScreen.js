import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

// actions
import { getUserDetails } from "../actions/userActions";
import { sendMessageToNodeMailer } from "../actions/msgActions";

// hooks
import useFormatedPhoneNumber from "../hooks/useFormatedPhoneNumber"
import useWindowDimensions from '../hooks/useWindowDimensions'

// components
import Input from '../components/Input'

// can't call hook conditionally in jsx so using the following fn:
function FormattedPhoneNum(input) {
  let output = ''
  output += useFormatedPhoneNumber(input)
  return output;
}



export default function MessageScreen({ history }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [failed, setFailed] = React.useState("");

  const dispatch = useDispatch();
  const { width } = useWindowDimensions()
  const { addToast } = useToasts();

  const userDetails = useSelector((state) => state.userDetails);
  const {
    //  loading,
    //  error,
    user,
  } = userDetails;


  React.useEffect(() => {
    if (user) {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user]);

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
    // eslint-disable-next-line no-useless-escape
    const emailRegexp = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
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
    <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__header">
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
          disabled={submitted || failed.length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
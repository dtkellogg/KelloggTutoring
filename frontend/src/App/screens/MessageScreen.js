import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

// actions
import { getUserDetails } from "../actions/userActions";
import { sendMessageToNodeMailer } from "../actions/msgActions";

// hooks
import useFormatedPhoneNumber from "../hooks/useFormatedPhoneNumber"
import useWindowDimensions from '../hooks/useWindowDimensions'

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
          <div className="form__element">
            <label className="form__label">
              name
            </label>
            <input
              type="name"
              className="form__input form__input-contact font-size-4"
              placeholder="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__element">
            <label
              className="form__label"
              htmlFor="email__form"
            >
              email
            </label>
            <input
              type="email"
              className="form__input form__input-contact font-size-4"
              placeholder="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__element">
            <label className="form__label">
              phone
            </label>
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              // format="(###) ###-####"
              className="form__input form__input-contact font-size-4"
              placeholder="(xxx) xxx - xxxx"
              // value={phone ? useFormatedPhoneNumber(phone) : phone}
              value={phone ? FormattedPhoneNum(phone) : phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form__element">
            <label className="form__label">
              subject
            </label>
            <input
              type="subject"
              className="form__input form__input-contact font-size-4"
              placeholder="subject"
              value={subject || ""}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="form__element">
            <label
              className="form__label"
              htmlFor="message__form"
            >
              message
            </label>
            <textarea
              type="text"
              className="form__textarea form__input--contact-message font-size-4"
              placeholder="Please leave your message here."
              value={message || ""}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          {submitted && (
            <p className="form__success-message--contact font-size-3">
              Message has been sent.
            </p>
          )}
          {failed.length > 0 && (
            <p className="form__fail-message--contact font-size-3">
              {failed}
            </p>
          )}

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
import React from "react";
// import axios from "axios";


export default function MessageFormScreen() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [failed, setFailed] = React.useState("");

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

      // const dataToSubmit = {
      //   name,
      //   email,
      //   phone,
      //   subject,
      //   message,
      // };


      //   await axios
      //     .post("/api/v1/messages", dataToSubmit)
      //     .then((response) => {
      //       console.log(`axios response: ${response.data}`);
      //     })
      //     .then(() => {
      //       setName("");
      //       setEmail("");
      //       setPhone("");
      //       setSubject("");
      //       setMessage("");
      //     });
    }
  };

  return (
    <form className="messageForm" onSubmit={handleSubmit}>
      <div className="messageForm__header">
        <h2 className="text-size-2 letter-spacing-sm">
          {/* Any Questions? */}
          Any questions? Leave a message here.
        </h2>
        {submitted && (
          <p className="messageForm__success-message--contact text-size-3">
            Email has been sent.
          </p>
        )}
        {failed.length > 0 && (
          <p className="messageForm__fail-message--contact text-size-3">
            {/* Failed to register for newsletter. Please try again. */}
            {failed}
          </p>
        )}
      </div>
      <div className="messageForm__content">
        <div className="messageForm__element">
          <label className="text-size-4 letter-spacing-md messageForm__label">
            Name
          </label>
          <input
            type="text"
            className="messageForm__input messageForm__input-contact text-size-3"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="messageForm__element">
          <label
            className="text-size-4 letter-spacing-md messageForm__label"
            htmlFor="email__messageForm"
          >
            Email
          </label>
          <input
            type="emailMessageForm"
            className="messageForm__input messageForm__input-contact text-size-3"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="messageForm__element">
          <label className="text-size-4 letter-spacing-md messageForm__label">
            Phone
          </label>
          <input
            type="text"
            className="messageForm__input messageForm__input-contact text-size-3"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="messageForm__element">
          <label className="text-size-4 letter-spacing-md messageForm__label">
            Subject
          </label>
          <input
            type="text"
            className="messageForm__input messageForm__input-contact text-size-3"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="messageForm__element">
          <label
            className="text-size-4 letter-spacing-md messageForm__label"
            htmlFor="message__messageForm"
          >
            Message
          </label>
          <textarea
            type="text"
            className="messageForm__textarea messageForm__input--contact-message text-size-3"
            placeholder="Please enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          className="btn btn__messageForm"
          onClick={handleSubmit}
          disabled={submitted || failed.length > 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
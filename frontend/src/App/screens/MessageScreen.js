import React from "react";

export default function MessageScreen() {

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
          <label className="text-size-5 letter-spacing-md messageForm__label">
            name
          </label>
          <input
            type="text"
            className="messageForm__input messageForm__input-contact text-size-3"
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
            className="messageForm__input messageForm__input-contact text-size-3"
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
            className="messageForm__input messageForm__input-contact text-size-3"
            placeholder="XXX XXX XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="messageForm__element">
          <label className="text-size-5 letter-spacing-md messageForm__label">
            subject
          </label>
          <input
            type="text"
            className="messageForm__input messageForm__input-contact text-size-3"
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
            className="messageForm__textarea messageForm__input--contact-message text-size-3"
            placeholder="What's up? How can I be of service?"
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
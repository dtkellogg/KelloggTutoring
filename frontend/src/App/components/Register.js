import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

export default function Register({ location, history }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  React.useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        setMessage('Passwords don\'t match')
    } else {
        dispatch(register(name, email, password))
    }
  };

  return (
    <div className="form user__page">
      <form onSubmit={handleSubmit}>
        <div className="form__header">
          <h2 className="text-size-2 letter-spacing-sm">
            {/* Any Questions? */}
            Sign up.
          </h2>

          {message && <h1>{message}</h1>}
        </div>
        <div className="form__content">
          <div className="form__element">
            <label
              className="text-size-4 letter-spacing-md form__label"
              for="name"
            >
              Name
            </label>
            <input
              type="name"
              className="form__input form__input-contact text-size-3"
              placeholder="Your name address"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form__element">
            <label
              className="text-size-4 letter-spacing-md form__label"
              for="email"
            >
              Email
            </label>
            <input
              type="email"
              className="form__input form__input-contact text-size-3"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__element">
            <label className="text-size-4 letter-spacing-md form__label">
              Password
            </label>
            <input
              type="text"
              className="form__input form__input-contact text-size-3"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__element">
            <label className="text-size-4 letter-spacing-md form__label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form__input form__input-contact text-size-3"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn__form"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>

          <div className="text-size-5">
            Have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              <span className="blue">Login</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

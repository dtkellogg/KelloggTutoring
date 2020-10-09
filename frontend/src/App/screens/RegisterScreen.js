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
  const { 
    // loading, 
    // error, 
    userInfo } = userRegister;
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
    <React.Fragment>
      <form onSubmit={handleSubmit} className="registerScreen user__page">
        <div className="registerScreen__header">
          <h2 className="text-size-2 letter-spacing-sm">
            {/* Any Questions? */}
            Sign up.
          </h2>

          {message && <h1>{message}</h1>}
        </div>
        <div className="registerScreen__content">
          <div className="loginScreen__input-container">

            <div className="registerScreen__element">
              <label
                className="text-size-5 letter-spacing-md registerScreen__label"
                for="name"
              >
                Name
              </label>
              <input
                type="name"
                className="registerScreen__input registerScreen__input-contact text-size-4"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="registerScreen__element">
              <label
                className="text-size-5 letter-spacing-md registerScreen__label"
                for="email"
              >
                Email
              </label>
              <input
                type="email"
                className="registerScreen__input registerScreen__input-contact text-size-4"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="registerScreen__element">
              <label className="text-size-5 letter-spacing-md registerScreen__label">
                Password
              </label>
              <input
                type="text"
                className="registerScreen__input registerScreen__input-contact text-size-4"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="registerScreen__element">
              <label className="text-size-5 letter-spacing-md registerScreen__label">
                Confirm Password
              </label>
              <input
                type="text"
                className="registerScreen__input registerScreen__input-contact text-size-4"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            className="btn btn__registerScreen"
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
    </React.Fragment>
  );
}

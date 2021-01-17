import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { subheader } from "../actions/subheader"

export default function Login({ location, history }) {
  const dispatch= useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  console.log(location)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [failedMsg, setFailedMsg] = React.useState("")
  const [successMsg, setSuccessMsg] = React.useState('') // eslint-disable-line no-unused-vars

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  
  React.useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
    if(loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if(error) {
      // dispatch(subheader({error}));
      console.log(error);
      setFailedMsg('There was a problem logging in. Reenter your email and password.');

      window.setTimeout(() => {
        setFailedMsg("");
      }, 5000);

    }
  }, [dispatch, history, userInfo, redirect, loading, error])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      dispatch(login(email, password))
    } else {
      setFailedMsg('Enter a valid email address and password.')

      window.setTimeout(() => {
        setFailedMsg("");
      }, 4000);
    } 
  }



  return (
    <form onSubmit={handleSubmit} className="loginScreen user__page">
      <div className="loginScreen__header">
        <h2 className="text-size-2 letter-spacing-sm">Please login.</h2>
      </div>

      <div className="loginScreen__content">
        <div className="loginScreen__input-container">
          <div className="loginScreen__element">
            <label
              className="text-size-5 letter-spacing-md loginScreen__label"
              htmlFor="email"
            >
              email
            </label>
            <input
              type="email"
              className="loginScreen__input loginScreen__input-contact text-size-3"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="loginScreen__element">
            <label className="text-size-5 letter-spacing-md loginScreen__label">
              password
            </label>
            <input
              type="password"
              className="loginScreen__input loginScreen__input-contact text-size-3"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {failedMsg && (
          <span className="text-size-3 loginScreen__failed-message">
            {failedMsg}
          </span>
        )}
        {successMsg && (
          <span className="loginScreen__success-message">{successMsg}</span>
        )}

        <button
          className="btn__loginScreen"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="text-size-5 loginScreen__register">
          New User?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <span style={{ color: "blue" }}>Register</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
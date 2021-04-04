import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { subheader } from "../actions/subheader"

export default function Login({ location, history }) {
  const dispatch= useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'

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
    <div className="container__screen--no-sidebar">
      <form onSubmit={handleSubmit} className="container__login--form">
      <div className="login__header">
        <h2 className="font-size-2 letter-spacing-sm">Please login.</h2>
      </div>

      <div className="login__content">
        <div className="login__input-container">
          <div className="login__element">
            <label
              className="font-size-5 letter-spacing-md login__label"
              htmlFor="email"
            >
              email
            </label>
            <input
              type="email"
              className="login__input login__input-contact font-size-3"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login__element">
            <label className="font-size-5 letter-spacing-md login__label">
              password
            </label>
            <input
              type="password"
              className="login__input login__input-contact font-size-3"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {failedMsg && (
          <span className="font-size-3 login__failed-message">
            {failedMsg}
          </span>
        )}
        {successMsg && (
          <span className="login__success-message">{successMsg}</span>
        )}

        <button
          className="btn__login"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="font-size-5 login__register">
          New User?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <span style={{ color: "blue" }}>Register</span>
          </Link>
        </div>
      </div>
    </form>
    </div>
  );
}
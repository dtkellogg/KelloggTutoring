import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { subheader } from "../actions/subheader"
import Input from '../components/Input'

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
        <h2 className="header__login letter-spacing-sm">Please login.</h2>

        <div className="login__content">

          <div className="login__input-container">
            <Input containerClass="login__element" labelClass="login__label" inputClass="login__input"
              htmlFor="email" label="email" type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}
            />
            <Input containerClass="login__element" labelClass="login__label" inputClass="login__input"
              htmlFor="" label="password" type="password" value={password} placeholder="your password" onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* {failedMsg && (
            <span className="login__failed-message">
              {failedMsg}
            </span>
          )}
          {successMsg && (
            <span className="login__success-message">{successMsg}</span>
          )} */}

          <button
            className="btn__login"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>

          <div className="login__register">
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
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { subheader } from "../actions/subheader";

export default function Login({ location, history }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch= useDispatch()
  
  const redirect = location.search ? location.search.split('=')[1] : '/'

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
      dispatch(subheader({error}));
    }
  }, [dispatch, history, userInfo, redirect, loading, error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
      <form onSubmit={handleSubmit} className="loginScreen user__page">
        <div className="loginScreen__header">
          <h2 className="text-size-2 letter-spacing-sm">
            {/* Any Questions? */}
            Please login.
          </h2>


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

          <button
            className="btn btn__loginScreen"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>

          <div className="text-size-5">
              New User?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <span style={{color: 'blue'}}>Register</span>
              </Link>
          </div>
        </div>
      </form>
  );
}
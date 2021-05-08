import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

// actions
import { login } from '../actions/userActions'
import { subheader } from "../actions/subheader"
import { getUserDetails } from "../actions/userActions";

// components
import Input from '../components/Input'

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { addToast } = useToasts()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if(userInfo) {
      history.goBack()
      // history.push(redirect)
      const firstName = userInfo.name.split(" ")[0]
      
      addToast(`Welcome back ${firstName}`, {
        appearance: "success",
        autoDismiss: true,
      })
      
      dispatch(getUserDetails("profile"));
    }
  }, [history, addToast, userInfo]) 

  useEffect(() => {
    
    if(error) {
      console.log(error);
      addToast('There was a problem logging in. Reenter your email and password.', {
        appearance: "error",
        autoDismiss: true,
      })
    } else if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
  }, [dispatch, addToast, loading, error]) 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      dispatch(login(email, password))
    } else {
      addToast('Enter a valid email address and password.', {
        appearance: "error",
        autoDismiss: true,
      })
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

          <button
            className="btn__login"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>

          <div className="login__register">
            New User?{" "}
            <Link to="/register">
              <span style={{ color: "blue" }}>Register</span>
            </Link>
          </div>
          
        </div>
      </form>
    </div>
  );
}
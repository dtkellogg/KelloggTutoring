import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// actions
import { register } from "../actions/userActions"

import { useToasts } from "react-toast-notifications";


export default function Register({ location, history }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const redirect = location.search ? location.search.split("=")[1] : "/"

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const userRegister = useSelector((state) => state.userRegister)
  const { 
    loading, // eslint-disable-line no-unused-vars
    error, // eslint-disable-line no-unused-vars
    userInfo 
  } = userRegister

  React.useEffect(() => {
    if (userInfo) {
       history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if(password !== confirmPassword) {
        addToast("Please fill all inputs and try again.", {
          appearance: "error",
          autoDismiss: true,
        })
      } else {
        dispatch(register(name, email, password))
      }

    } catch {
      addToast("Sorry, there was an error. Please try registering again.", {
        appearance: "error",
        autoDismiss: true,
      })
    }
  }

  return (
    <div className="container__screen--no-sidebar">
      <form onSubmit={handleSubmit} className="container__register--form">
      {/* <form onSubmit={handleSubmit} className="container__screen--no-sidebar"> */}

        <h2 className="header__register">
          Sign up.
        </h2>

          <div className="container__register--inputs">
            <div className="register-screen__element">
              <label className="register-screen__label" htmlFor="name" >
                Full name
              </label>
              <input
                type="name"
                className="register-screen__input"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="register-screen__element">
              <label
                className="register-screen__label"
                htmlFor="email"
              >
                email
              </label>
              <input
                type="email"
                className="register-screen__input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="register-screen__element">
              <label className="register-screen__label">
                password
              </label>
              <input
                type="password"
                className="register-screen__input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="register-screen__element">
              <label className="register-screen__label">
                confirm password
              </label>
              <input
                type="password"
                className="register-screen__input"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn__register" type="submit" onClick={handleSubmit} >
            Sign up
          </button>

      <div className="font-size-5">
            Have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} >
              <span style={{color: "blue"}}>Login</span>
            </Link>
          </div>

      </form>
      </div>
  )
}

import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// actions
import { register } from "../actions/userActions"



export default function Register({ location, history }) {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [message, setMessage] = React.useState(null)


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
    e.preventDefault();

    if(password !== confirmPassword) {
        setMessage('Passwords don\'t match')
    } else {
        dispatch(register(name, email, password))
    }
  };

  return (
      <form onSubmit={handleSubmit} className="register-screen user__page">
        <div className="register-screen__header">
          <h2 className="text-size-2 letter-spacing-sm">
            Sign up.
          </h2>

          {message && <h1>{message}</h1>}
        </div>
        <div className="register-screen__content">
          <div className="loginScreen__input-container">

            <div className="register-screen__element">
              <label
                className="text-size-5 letter-spacing-md register-screen__label"
                htmlFor="name"
              >
                Full name
              </label>
              <input
                type="name"
                className="register-screen__input register-screen__input-contact text-size-4"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="register-screen__element">
              <label
                className="text-size-5 letter-spacing-md register-screen__label"
                htmlFor="email"
              >
                email
              </label>
              <input
                type="email"
                className="register-screen__input register-screen__input-contact text-size-4"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="register-screen__element">
              <label className="text-size-5 letter-spacing-md register-screen__label">
                password
              </label>
              <input
                type="password"
                className="register-screen__input register-screen__input-contact text-size-4"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="register-screen__element">
              <label className="text-size-5 letter-spacing-md register-screen__label">
                confirm password
              </label>
              <input
                type="password"
                className="register-screen__input register-screen__input-contact text-size-4"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            className="btn__register"
            type="submit"
            onClick={handleSubmit}
          >
            Sign up
          </button>

          <div className="text-size-5">
            Have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              <span style={{color: "blue"}}>Login</span>
            </Link>
          </div>
        </div>
      </form>
  )
}

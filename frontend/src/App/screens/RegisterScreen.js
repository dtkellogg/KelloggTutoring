import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications";

// actions
import { register } from "../actions/userActions"

// components
import Input from '../components/Input'


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

          <section className="container__register--inputs">
            <Input containerClass="register-screen__element" labelClass="register-screen__label" inputClass="register-screen__input"
              htmlFor="name" label="Full name" type="name" value={name} placeholder="full name" onChange={(e) => setName(e.target.value)} 
            />
            <Input containerClass="register-screen__element" labelClass="register-screen__label" inputClass="register-screen__input"
              htmlFor="email" label="email" type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} 
            />
            <Input containerClass="register-screen__element" labelClass="register-screen__label" inputClass="register-screen__input"
              htmlFor="" label="password" type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} 
            />
            <Input containerClass="register-screen__element" labelClass="register-screen__label" inputClass="register-screen__input"
              htmlFor="" label="confirm password" type="password" value={confirmPassword} placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </section>

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

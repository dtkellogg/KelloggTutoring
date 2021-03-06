import React, { useState, useEffect } from "react"
import { Link, location, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications";

// actions
import { register } from "../../actions/userActions"
import { subheader } from "../../actions/subheader";

// components
import Input from '../contact/Input'


export default function Register() {
  const dispatch = useDispatch();
  const location = useLocation()
  const history = useHistory()
  const { addToast } = useToasts();

  const redirect = location.search ? location.search.split("=")[1] : "/"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const userRegister = useSelector((state) => state.userRegister)
  const { 
    loading,
    error,
    userInfo 
  } = userRegister

  useEffect(() => {
    setEmail("")
  }, [])

  useEffect(() => {
    if (userInfo) {
      history.goBack()
      // history.push(redirect);
    } else if (error) {
      console.log(error)
    } else if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
  }, [history, userInfo, redirect, loading, error]);

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

        <h2 className="header__register">
          Sign up.
        </h2>

        <section className="container__register--inputs">
          <Input containerClass="register__element" labelClass="register__label" inputClass="register__input"
            htmlFor="name" label="full name" type="name" value={name} placeholder="full name" onChange={(e) => setName(e.target.value)} 
          />
          <Input containerClass="register__element" labelClass="register__label" inputClass="register__input"
            htmlFor="email" label="email" type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} 
          />
          <Input containerClass="register__element" labelClass="register__label" inputClass="register__input"
            htmlFor="" label="password" type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} 
          />
          <Input containerClass="register__element" labelClass="register__label" inputClass="register__input"
            htmlFor="" label="confirm password" type="password" value={confirmPassword} placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </section>

        <button className="btn__register" type="submit" onClick={handleSubmit} >
          Sign up
        </button>

        <div className="register__redirect-to-login">
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} >
            <span style={{color: "blue"}}>Login</span>
          </Link>
        </div>

      </form>
    </div>
  )
}
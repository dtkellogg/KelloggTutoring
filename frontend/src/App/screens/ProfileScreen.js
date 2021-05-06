import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

// actions
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { subheader } from "../actions/subheader";

import { useToasts } from "react-toast-notifications";


export default function Profile({ location, history }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading, 
    error, 
  user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  if (success) {
    history.push("/");
  }

  useEffect(() => {
    if (user) {
      if (!userInfo) {
        history.push('/login');
      } else {
        if(!user.name) {
          dispatch(getUserDetails('profile'))
        } else {
          setName(user.name)
          setEmail(user.email)
        }
      }
    } else if (error) {
      console.log(error)
    } else if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
  }, [dispatch, history, user, error, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmPassword || !name || !email || !password) {
      addToast("Fill out all inputs.", {
        appearance: "error",
        autoDismiss: true,
      })
    } else if (password !== confirmPassword) {
      addToast("Passwords don't match.", {
        appearance: "error",
        autoDismiss: true,
      })
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
    
  };

  return (
    <div className="container__screen--no-sidebar">
      <form onSubmit={handleSubmit} className="container__profile--form">
        <h2 className="header__profile">
          Update your profile
        </h2>

        <div className="profile__content">
          <div className="profile__element">
            <label
              className="profile__label"
              htmlFor="name"
            >
              name
            </label>
            <input
              type="name"
              className="profile__input profile__input-contact"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="profile__element">
            <label
              className="profile__label"
              htmlFor="email"
            >
              email
            </label>
            <input
              type="email"
              className="profile__input profile__input-contact"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="profile__element">
            <label className="profile__label">
              password
            </label>
            <input
              type="password"
              className="profile__input profile__input-contact"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="profile__element">
            <label className="profile__label">
              confirm password
            </label>
            <input
              type="password"
              className="profile__input profile__input-contact"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="btn__profile"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
        
      </form>
    </div>
  );
}
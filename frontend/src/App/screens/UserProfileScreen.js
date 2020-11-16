import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

export default function Profile({ location, history }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {
    //  loading, 
    //  error, 
     user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  React.useEffect(() => {
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
    }
  }, [dispatch, history, userInfo, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profileScreen">
      <div className="profileScreen__header">
        <h2 className="profileScreen__title text-size-2 letter-spacing-sm">
          {/* Any Questions? */}
          Update your profile
        </h2>

        {message && <h1>{message}</h1>}
        {success && <h1>Profile successfully updated</h1>}
      </div>
      <div className="profileScreen__content">
        <div className="profileScreen__element">
          <label
            className="text-size-4 letter-spacing-md profileScreen__label"
            htmlFor="name"
          >
            name
          </label>
          <input
            type="name"
            className="profileScreen__input profileScreen__input-contact text-size-3"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="profileScreen__element">
          <label
            className="text-size-4 letter-spacing-md profileScreen__label"
            htmlFor="email"
          >
            email
          </label>
          <input
            type="email"
            className="profileScreen__input profileScreen__input-contact text-size-3"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="profileScreen__element">
          <label className="text-size-4 letter-spacing-md profileScreen__label">
            password
          </label>
          <input
            type="password"
            className="profileScreen__input profileScreen__input-contact text-size-3"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="profileScreen__element">
          <label className="text-size-4 letter-spacing-md profileScreen__label">
            confirm password
          </label>
          <input
            type="password"
            className="profileScreen__input profileScreen__input-contact text-size-3"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="btn__profileScreen"
          type="submit"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </form>
  );
}

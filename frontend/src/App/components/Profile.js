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
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  React.useEffect(() => {
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
    <div className="form user__page">
      <form onSubmit={handleSubmit}>
        <div className="form__header">
          <h2 className="text-size-2 letter-spacing-sm">
            {/* Any Questions? */}
            Update User Profile
          </h2>

          {message && <h1>{message}</h1>}
          {success && <h1>Profile successly updated</h1>}
        </div>
        <div className="form__content">
          <div className="form__element">
            <label
              className="text-size-4 letter-spacing-md form__label"
              for="name"
            >
              Name
            </label>
            <input
              type="name"
              className="form__input form__input-contact text-size-3"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form__element">
            <label
              className="text-size-4 letter-spacing-md form__label"
              for="email"
            >
              Email
            </label>
            <input
              type="email"
              className="form__input form__input-contact text-size-3"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__element">
            <label className="text-size-4 letter-spacing-md form__label">
              Password
            </label>
            <input
              type="text"
              className="form__input form__input-contact text-size-3"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__element">
            <label className="text-size-4 letter-spacing-md form__label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form__input form__input-contact text-size-3"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn__form"
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

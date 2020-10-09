import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { login } from '../actions/userActions'

export default function Login({ location, history }) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const dispatch= useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'

    React.useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleSubmit = async (e) => {
      e.preventDefault();
        // DISPATCH LOGIN

        dispatch(login(email, password))
    }


    return (
        <form onSubmit={handleSubmit} className="loginScreen user__page">
          <div className="loginScreen__header">
            <h2 className="text-size-2 letter-spacing-sm">
              {/* Any Questions? */}
              Please login.
            </h2>

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loading />}

          </div>
          <div className="loginScreen__content">
            <div className="loginScreen__input-container">
            
            <div className="loginScreen__element">
              <label
                className="text-size-4 letter-spacing-md loginScreen__label"
                htmlFor="email"
              >
                Email
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
              <label className="text-size-4 letter-spacing-md loginScreen__label">
                Password
              </label>
              <input
                type="text"
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
              Submit
            </button>

            <div className="text-size-5">
                New User?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              <span className="blue">Register</span>
                </Link>
            </div>
          </div>
        </form>
    );
}
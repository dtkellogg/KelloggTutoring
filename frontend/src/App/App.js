import React from 'react';
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import './App.scss';

// ACTIONS
import { subheader } from "./actions/subheader";

// COMPONENTS
import NavUpper from "./components/NavUpper";
import NavLower from "./components/NavLower";
import Footer from "./components/Footer";
import PageHeader from "./components/PageHeader";
import Loading from "./components/Loading";
import ApptsList from "./components/ApptsList"
import Calendar from "./components/Calendar"
import ReviewsList from "./components/ReviewsList"
import LoadingSpinner from "./components/LoadingSpinner"
// const ApptsList = React.lazy(() => import("./components/ApptsList"))
// const Calendar = React.lazy(() => import("./components/Calendar"))


// SCREENS
const AdminUserList = React.lazy(() => import("./screens/AdminUserListScreen"));
const AdminUserEdit = React.lazy(() => import("./screens/AdminUserEditScreen"));
const AdminAppointmentsList = React.lazy(() => import("./screens/AdminApptsListScreen"));
const AdminAppointmentEdit = React.lazy(() => import("./screens/AdminApptEditScreen"));
const AdminAppointmentCreate = React.lazy(() => import("./screens/AdminApptCreateScreen"));
const Booking = React.lazy(() => import("./screens/UserBookingScreen"));
const Blog = React.lazy(() => import("./screens/ToshiBlogScreen"));
const Checkout = React.lazy(() => import("./screens/PaymentCheckoutScreen"));    
const Home = React.lazy(() => import("./screens/HomeScreen"));
const Login = React.lazy(() => import("./screens/UserLoginScreen"));
const Zoom = React.lazy(() => import("./screens/ComingSoonScreen"));
const Resources = React.lazy(() => import("./screens/ComingSoonScreen"));
const Settings = React.lazy(() => import("./screens/ComingSoonScreen"));
const MessageScreen = React.lazy(() => import("./screens/MessageScreen"));
const Profile = React.lazy(() => import("./screens/UserProfileScreen"));
const Payments = React.lazy(() => import("./screens/PaymentsScreen"));
const PaymentMethod = React.lazy(() => import("./screens/PaymentMethodScreen"));
const Payment = React.lazy(() => import("./screens/PaymentScreen"));
const Register = React.lazy(() => import("./screens/UserRegisterScreen"));
// const Resources = React.lazy(() => import("./screens/ResourcesScreen"));
const ReviewEdit = React.lazy(() => import("./screens/ReviewEditScreen"))
const ReviewCreate = React.lazy(() => import("./screens/ReviewCreateScreen"))
const Reviews = React.lazy(() => import("./components/Reviews"));
const ToshiAbout = React.lazy(() => import("./screens/ToshiAboutScreen"));
const ToshiTeaching = React.lazy(() => import("./screens/ToshiTeachingScreen"));


// const SubmitPaymentScreen = React.lazy(() => import("./screens/PaymentSubmitScreen"));






export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleScrollToTop = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  const handleScrollToBottom = () =>
    window.scrollTo({
      top: 20000,
      left: 100,
      behavior: "smooth",
    });

  React.useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    // if (error) {
    //   dispatch(subheader({ error }));
    // }
  }, [
    dispatch,
    loading,
    // error
  ]);

  return (
    <React.Fragment>
      <div className="container__main">
        <NavUpper />
        <NavLower />

        <div className="container__btn--screen-nav">
          <button className="btn__screen-nav--up">
            <FaCaretUp
              size={40}
              fill="var(--old-blue)"
              className=""
              onClick={handleScrollToTop}
            />
          </button>
          <button className="btn__screen-nav--down">
            <FaCaretDown
              size={40}
              fill="var(--old-blue)"
              className="btn__calendar"
              onClick={handleScrollToBottom}
            />
          </button>
        </div>

        <div className="container__body">
          <React.Suspense
            //  fallback={() => setLoading(true)}
            fallback={<LoadingSpinner />}
          >
            <TransitionGroup>
              <CSSTransition timeout={250} classNames="fade" key={location.key}>
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/appointments"
                    component={() => <PageHeader page="appts" />}
                  />
                  <Route
                    exact
                    path="/appointments/booking"
                    component={() => <Booking type="booking" />}
                  />
                  {/* <Route exact path="/appointments/booking" component={() => <Booking type="appts"/>} /> */}

                  <Route exact path="/appointments/payments" component={Payments} />

                  <Route
                    exact
                    path="/appointments/appts-list"
                    component={() => <ApptsList type="all" />}
                  />
                  <Route
                    exact
                    path="/appointments/appts-calendar"
                    component={Calendar}
                  />
                  <Route exact path="/appointments/payment-method" component={PaymentMethod} />
                  <Route exact path="/appointments/checkout" component={Checkout} />
                  <Route
                    exact
                    path="/meetToshi"
                    component={() => <PageHeader page="meetToshi" />}
                  />
                  <Route exact path="/meetToshi/about" component={ToshiAbout} />
                  <Route
                    exact
                    path="/meetToshi/teaching"
                    component={ToshiTeaching}
                  />
                  <Route
                    exact
                    path="/meetToshi/reviews"
                    component={() => <Reviews type="meetToshi" />}
                  />
                  {/* <Route exact path="/meetToshi/reviews/UserCreateReview" component={UserCreateReview} />
                  UserCreateReview */}
                  <Route exact path="/meetToshi/blog" component={Blog} />
                  <Route
                    exact
                    path="/contact"
                    component={() => <PageHeader page="contact" />}
                  />
                  <Route
                    exact
                    path="/contact/message"
                    component={MessageScreen}
                  />
                  <Route
                    exact
                    path="/contact/schedule"
                    component={() => <Booking type="schedule" />}
                  />
                  <Route
                    exact
                    path="/admin"
                    component={() => <PageHeader page="admin" />}
                  />
                  <Route
                    exact
                    path="/admin/user-list"
                    component={AdminUserList}
                  />
                  <Route
                    exact
                    path="/admin/user/:id/edit"
                    component={AdminUserEdit}
                  />
                  <Route
                    exact
                    path="/admin/appointments"
                    component={AdminAppointmentsList}
                  />
                  <Route
                    exact
                    path="/admin/appointment/:id/edit"
                    component={AdminAppointmentEdit}
                  />
                  <Route
                    exact
                    path="/admin/appointments/create-appointment"
                    component={AdminAppointmentCreate}
                  />
                  <Route
                    exact
                    path="/admin/user/:id/edit"
                    component={AdminUserEdit}
                  />
                 
                  <Route exact path="/review/:id/edit" component={ReviewEdit} />
                  <Route exact path="/review/create-review" component={ReviewCreate} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/resources" component={Resources} />
                  <Route exact path="/zoom" component={Zoom} />
                  <Route exact path="/resources" component={Resources} />
                  <Route exact path="/settings" component={Settings} />
                  {/* <Route exact path="/submitPayment" component={SubmitPaymentScreen} /> */}
                  {/* <Route exact path="/payments/checkout" component={Checkout} /> */}
                  <Route exact path="/payment/:id/edit" component={Payment} />
                  <Route path="*" component={Home} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </React.Suspense>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}

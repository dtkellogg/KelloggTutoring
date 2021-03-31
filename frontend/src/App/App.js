import React from 'react';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastProvider } from "react-toast-notifications";
import './App.scss';

// components
import NavUpper from "./components/navigation/NavUpper";
import NavLower from "./components/navigation/NavLower";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar"
import LoadingSpinner from "./components/LoadingSpinner"

const ApptsList = React.lazy(() => import("./components/ApptsList"));
const PageHeader = React.lazy(() => import("./components/PageHeader"));


// screens
const AdminUsers = React.lazy(() => import("./screens/admin/AdminUsersScreen"));
const AdminUserEdit = React.lazy(() => import("./screens/admin/AdminUserEditScreen"));
const AdminApptRequests = React.lazy(() => import("./screens/admin/AdminApptRequestsScreen"));
const AdminReviewsList = React.lazy(() => import("./screens/admin/AdminReviewsListScreen"));
const AdminAppointmentsList = React.lazy(() => import("./screens/admin/AdminApptsListScreen"));
const AdminAppointmentEdit = React.lazy(() => import("./screens/admin/AdminApptEditScreen"));
const AdminAppointmentCreate = React.lazy(() => import("./screens/admin/AdminApptCreateScreen"));
const AdminStats = React.lazy(() => import("./screens/admin/AdminStatsScreen"));
const Booking = React.lazy(() => import("./screens/user/UserBookingScreen"));
const Blog = React.lazy(() => import("./screens/Toshi/ToshiBlogScreen"));
const Checkout = React.lazy(() => import("./screens/payments/PaymentCheckoutScreen"));    
const Home = React.lazy(() => import("./screens/HomeScreen"));
const Login = React.lazy(() => import("./screens/user/UserLoginScreen"));
const Zoom = React.lazy(() => import("./screens/ComingSoonScreen"));
const Resources = React.lazy(() => import("./screens/ComingSoonScreen"));
const Settings = React.lazy(() => import("./screens/ComingSoonScreen"));
const MessageScreen = React.lazy(() => import("./screens/MessageScreen"));
const Profile = React.lazy(() => import("./screens/user/UserProfileScreen"));
const Payments = React.lazy(() => import("./screens/payments/PaymentsScreen"));
const PaymentMethod = React.lazy(() => import("./screens/payments/PaymentMethodScreen"));
const Payment = React.lazy(() => import("./screens/payments/PaymentScreen"));
const Register = React.lazy(() => import("./screens/user/UserRegisterScreen"));
// const Resources = React.lazy(() => import("./screens/ResourcesScreen"));
const ReviewEdit = React.lazy(() => import("./screens/review/ReviewEditScreen"))
const ReviewCreate = React.lazy(() => import("./screens/review/ReviewCreateScreen"))
const Reviews = React.lazy(() => import("./components/reviews/Reviews"));
const ToshiAbout = React.lazy(() => import("./screens/Toshi/ToshiAboutScreen"));
const ToshiTeaching = React.lazy(() => import("./screens/Toshi/ToshiTeachingScreen"));
// const SubmitPaymentScreen = React.lazy(() => import("./screens/PaymentSubmitScreen"));



const ApptsScreen = React.lazy(() => import("./screens/appts/ApptsScreen"));


export default function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <div className="container__main">
        <NavUpper />
        <NavLower />
        <React.Suspense fallback={<LoadingSpinner />}>
          <TransitionGroup>
            <CSSTransition timeout={250} classNames="fade" key={location.key}>
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route
                  // exact
                  path="/appointments"
                  component={() => <ApptsScreen />}
                />
                {/*}
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
                  {/* <Route exact path="/appointments/booking" component={() => <Booking type="appts"/>} /> 
                <Route
                  exact
                  path="/appointments/payments"
                  component={Payments}
                />
                <Route
                  exact
                  path="/appointments/list"
                  component={() => <ApptsList type="all" />}
                />
                <Route
                  exact
                  path="/appointments/calendar"
                  component={Calendar}
                />
                <Route
                  exact
                  path="/appointments/payment-method"
                  component={PaymentMethod}
                />
                <Route
                  exact
                  path="/appointments/checkout"
                  component={Checkout}
                /> 
                */}
                <Route
                  exact
                  path="/Toshi"
                  component={() => <PageHeader page="meetToshi" />}
                />
                <Route exact path="/Toshi/about" component={ToshiAbout} />
                <Route exact path="/Toshi/teaching" component={ToshiTeaching} />
                <Route
                  exact
                  path="/Toshi/reviews"
                  component={() => <Reviews type="meetToshi" />}
                />
                {/* <Route exact path="/Toshi/reviews/UserCreateReview" component={UserCreateReview} /> */}
                <Route exact path="/Toshi/blog" component={Blog} />
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
                <Route exact path="/admin/users" component={AdminUsers} />
                <Route
                  exact
                  path="/admin/user/:id/edit"
                  component={AdminUserEdit}
                />
                <Route
                  exact
                  path="/admin/appts"
                  component={AdminAppointmentsList}
                />
                <Route
                  exact
                  path="/admin/appt/:id/edit"
                  component={AdminAppointmentEdit}
                />
                <Route
                  exact
                  path="/admin/appts/create-appointment"
                  component={AdminAppointmentCreate}
                />
                <Route
                  exact
                  path="/admin/blog"
                  component={AdminAppointmentsList}
                />
                <Route
                  exact
                  path="/admin/user/:id/edit"
                  component={AdminUserEdit}
                />
                <Route
                  exact
                  path="/admin/reviews"
                  component={AdminReviewsList}
                />
                <Route
                  exact
                  path="/admin/requests"
                  component={AdminApptRequests}
                />
                <Route exact path="/admin/stats" component={AdminStats} />
                <Route exact path="/review/:id/edit" component={ReviewEdit} />
                <Route
                  exact
                  path="/review/create-review"
                  component={ReviewCreate}
                />
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
        {/* </div> */}
        <Footer />
      </div>
    </ToastProvider>
  );
}

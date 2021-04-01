import React from 'react';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastProvider } from "react-toast-notifications";
import './App.scss';

// components
import NavUpper from "./components/navigation/NavUpper";
import NavLower from "./components/navigation/NavLower";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner"

import { Sidebar } from "./components/navigation/Sidebar";

// sidebar list
import { apptsList, contactList, toshiList, adminList } from "./data/lists";


// screens   
const Home = React.lazy(() => import("./screens/HomeScreen"));
const Login = React.lazy(() => import("./screens/user/UserLoginScreen"));
const Zoom = React.lazy(() => import("./screens/ComingSoonScreen"));
const Resources = React.lazy(() => import("./screens/ComingSoonScreen"));
const Settings = React.lazy(() => import("./screens/ComingSoonScreen"));
const Profile = React.lazy(() => import("./screens/user/UserProfileScreen"));
const Payment = React.lazy(() => import("./screens/payments/PaymentScreen"));
const Register = React.lazy(() => import("./screens/user/UserRegisterScreen"));
// const Resources = React.lazy(() => import("./screens/ResourcesScreen"));
const ReviewEdit = React.lazy(() => import("./screens/review/ReviewEditScreen"))
const ReviewCreate = React.lazy(() => import("./screens/review/ReviewCreateScreen"))
// const SubmitPaymentScreen = React.lazy(() => import("./screens/PaymentSubmitScreen"));



const ApptsScreen = React.lazy(() => import("./screens/appts/ApptsScreen"));
const ToshiScreen = React.lazy(() => import("./screens/Toshi/ToshiScreen"));
const ContactScreen = React.lazy(() => import("./screens/contact/ContactScreen"));
const AdminScreen = React.lazy(() => import("./screens/admin/AdminScreen"));


export default function App() {
  const [showSidebar, setShowSidebar] = React.useState(true)
  const [sidebarTitle, setSidebarTitle] = React.useState("");
  const [sidebarList, setSidebarList] = React.useState([]);
  const [sidebarUrl, setSidebarUrl] = React.useState("");

  const location = useLocation();


  React.useEffect(() => {
    setShowSidebar(true)
    console.log(`showSidebar: ${showSidebar}`)

    const locationForSidebar = location.pathname.split("/")[1]

    console.log(`locationSidebar: ${locationForSidebar}`)

    if(locationForSidebar === 'toshi') {
      setSidebarTitle('Toshi')
      setSidebarList(toshiList)
      setSidebarUrl('toshi')
    } else if (locationForSidebar === 'appointments') {
      setSidebarTitle("Appointments");
      setSidebarList(apptsList)
      setSidebarUrl('appointments')
    } else if (locationForSidebar === 'contact') {
      setSidebarTitle("Contact");
      setSidebarList(contactList)
      setSidebarUrl("contact");
    } else if (locationForSidebar === 'admin') {
      setSidebarTitle("Admin");
      setSidebarList(adminList)
      setSidebarUrl('admin')
    }

  }, [location])

  console.log(location.pathname.split("/").filter((word) => word !== ""));
  console.log(location.pathname.split("/"));
  console.log(location.pathname);

  return (
    <ToastProvider>
      <div className="container__main">
        <NavUpper />
        <NavLower />
        {/* {showSidebar && location.pathname.split("/").filter((word) => word !== "") > 0 && ( */}
        {showSidebar &&
          location.pathname.split("/").filter((word) => word !== "").length >
            0 && (
            <Sidebar
              key={sidebarTitle}
              title={sidebarTitle}
              list={sidebarList}
              url={sidebarUrl}
            />
          )}
        {/* <div className="container__body"> */}
        <React.Suspense fallback={<LoadingSpinner />}>
          <TransitionGroup>
            <CSSTransition timeout={250} classNames="fade" key={location.key}>
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route
                  path="/appointments"
                  component={() => <ApptsScreen />}
                />
                <Route
                  path="/toshi"
                  component={() => <ToshiScreen />}
                />
                <Route
                  path="/contact"
                  component={() => <ContactScreen />}
                />
                <Route
                  path="/admin"
                  component={() => <AdminScreen />}
                />
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
        {/* </div> */}
        <Footer />
      </div>
    </ToastProvider>
  );
}

import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastProvider } from "react-toast-notifications";
import './App.scss';

// components
import NavUpper from "./components/navigation/NavUpper";
import NavLower from "./components/navigation/NavLower";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/loading/LoadingSpinner"
import { Sidebar } from "./components/navigation/Sidebar";

// sidebar list
import { apptsList, contactList, toshiList, adminList } from "./data/lists";


// screens   
const Home = React.lazy(() => import("./screens/HomeScreen"));
const Login = React.lazy(() => import("./screens/LoginScreen"));
const Zoom = React.lazy(() => import("./screens/ComingSoonScreen"));
const Resources = React.lazy(() => import("./screens/ComingSoonScreen"));
const Settings = React.lazy(() => import("./screens/ComingSoonScreen"));
const Profile = React.lazy(() => import("./screens/ProfileScreen"));
const Register = React.lazy(() => import("./screens/RegisterScreen"));
// const Resources = React.lazy(() => import("./screens/ResourcesScreen"));
const ReviewEdit = React.lazy(() => import("./components/reviews/ReviewEdit"))
// const SubmitPaymentScreen = React.lazy(() => import("./screens/PaymentSubmitScreen"));
const ApptsScreen = React.lazy(() => import("./screens/ApptsScreen"));
const ToshiScreen = React.lazy(() => import("./screens/ToshiScreen"));
const ContactScreen = React.lazy(() => import("./screens/ContactScreen"));
const AdminScreen = React.lazy(() => import("./screens/AdminScreen"));
const FourOhFourScreen = React.lazy(() => import("./screens/FourOhFourScreen"));


export default function App() {
  const [showSidebar, setShowSidebar] = React.useState(false)
  const [sidebarTitle, setSidebarTitle] = React.useState("");
  const [sidebarList, setSidebarList] = React.useState([]);
  const [sidebarUrl, setSidebarUrl] = React.useState("");

  const location = useLocation();


  React.useEffect(() => {

      setShowSidebar(true)

    
      const locationForSidebar = location.pathname.split("/").filter((word) => word !== "")[0]
      // const locationForSidebar = await JSON.stringify(location.pathname.split("/").filter((word) => word !== ""))
    // const locationForSidebar = location.pathname.split("/")[location.pathname.split("/").length -1]
    console.log(`locationForSidebar: ${locationForSidebar}`)
    console.log(`location.pathname: ${location.pathname}`)
      console.log(`typeof locationForSidebar: ${typeof JSON.stringify(locationForSidebar)}`)
    


    if (locationForSidebar === 'toshi' || locationForSidebar === 'create-review') {
      setSidebarTitle('Toshi')
      setSidebarList(toshiList)
      setSidebarUrl('toshi')
    } else if (locationForSidebar === 'appointments') {
      console.log("IUBWIBWB")
      console.log(apptsList)
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
    } else if (locationForSidebar === 'profile' || locationForSidebar === 'register' || locationForSidebar === 'login') {
      setShowSidebar(false)
    }


  }, [location])


  return (
    <ToastProvider styles={{
      container: (provided) => ({ ...provided, zIndex: 100, top: 50 }),
      toastContent: (provided, state) => ({ ...provided, padding: state.appearance === 'success' ? 15 : 10 }),
      toastIcon: () => ({ display: 'none' }),
    }}>
      <div className="container__main">
        <NavUpper />
        <NavLower />
        {showSidebar &&
          location.pathname.split("/").filter((word) => word !== "").length > 0 && (
            <Sidebar key={sidebarTitle} title={sidebarTitle} list={sidebarList} url={sidebarUrl} />
        )}

        {/* <React.Suspense fallback={<LoadingSpinner />}> */}
        <React.Suspense fallback={""}>
          <TransitionGroup>
            <CSSTransition timeout={250} classNames="fade" key={location.key}>
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route path="/appointments" component={() => <ApptsScreen />} />
                <Route path="/toshi" component={() => <ToshiScreen />} />
                <Route path="/contact" component={() => <ContactScreen />} />
                <Route path="/admin" component={() => <AdminScreen />} />
                <Route exact path="/review/:id/edit" component={ReviewEdit} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/resources" component={Resources} />
                <Route exact path="/zoom" component={Zoom} />
                <Route exact path="/resources" component={Resources} />
                <Route exact path="/settings" component={Settings} />
                {/* <Route exact path="/submitPayment" component={SubmitPaymentScreen} /> */}
                {/* <Route exact path="/payments/checkout" component={Checkout} /> */}
                <Route path="*" component={FourOhFourScreen} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </React.Suspense>
        <Footer />
      </div>
    </ToastProvider>
  );
}

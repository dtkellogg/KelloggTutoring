import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastProvider } from "react-toast-notifications";
import './App.scss';

// components
import NavUpper from "./components/navigation/NavUpper";
import NavLower from "./components/navigation/NavLower";
import Footer from "./components/Footer";
// import LoadingSpinner from "./components/loading/LoadingSpinner"
import { Sidebar } from "./components/navigation/Sidebar";

// sidebar list
import { apptsList, contactList, toshiList, adminList } from "./data/lists";

// screens   
const Home = lazy(() => import("./screens/HomeScreen"));

const ApptsScreen = lazy(() => import("./screens/ApptsScreen"));
const ToshiScreen = lazy(() => import("./screens/ToshiScreen"));
const ContactScreen = lazy(() => import("./screens/ContactScreen"));
const AdminScreen = lazy(() => import("./screens/AdminScreen"));

const Login = lazy(() => import("./screens/LoginScreen"));
const Register = lazy(() => import("./screens/RegisterScreen"));
const Profile = lazy(() => import("./screens/ProfileScreen"));
const Zoom = lazy(() => import("./screens/ComingSoonScreen"));
const Resources = lazy(() => import("./screens/ComingSoonScreen"));
const Settings = lazy(() => import("./screens/ComingSoonScreen"));
// const Resources = lazy(() => import("./screens/ResourcesScreen"));
const ReviewEdit = lazy(() => import("./components/reviews/ReviewEdit"))
const FourOhFourScreen = lazy(() => import("./screens/FourOhFourScreen"));


export default function App() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarTitle, setSidebarTitle] = useState("");
  const [sidebarList, setSidebarList] = useState([]);
  const [sidebarUrl, setSidebarUrl] = useState("");

  const location = useLocation();

  useEffect(() => {
    setShowSidebar(true)

    const locationForSidebar = location.pathname.split("/").filter((word) => word !== "")[0]

    if (locationForSidebar === 'toshi') {
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
    } else {
    // } else if (locationForSidebar === 'profile' || locationForSidebar === 'register' || locationForSidebar === 'login') {
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

        {/* <Suspense fallback={<LoadingSpinner />}> */}
        <Suspense fallback={""}>
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
                <Route path="*" component={FourOhFourScreen} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Suspense>
        <Footer />
      </div>
    </ToastProvider>
  );
}

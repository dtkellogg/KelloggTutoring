import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NavUpper from "./components/NavUpper";
import NavLower from "./components/NavLower";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import '../index.css';

const Home = React.lazy(() => import("./pages/home"));
const MeetToshi = React.lazy(() => import("./pages/meetToshi"));
const StudentResources = React.lazy(() => import("./pages/studentResources"));
const Contact = React.lazy(() => import("./pages/contact"));
const Appointment = React.lazy(() => import("./pages/appointments"));

export default function App() {
  const location = useLocation();
  console.log(location);

  return (
    <React.Fragment>
      <div className="container__main">
        <NavUpper />
        <NavLower />
        <Sidebar />
        <div className="container__body">
          <React.Suspense fallback={<Loading />}>
            <TransitionGroup>
              <CSSTransition timeout={250} classNames="fade" key={location.key}>
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route path="/meetToshi" component={MeetToshi} />
                  <Route
                    path="/studentResources"
                    component={StudentResources}
                  />
                  <Route path="/contact" component={Contact} />
                  <Route path="/appointments" component={Appointment} />
                  <Route
                    render={() => (
                      <h2 className="text-size-2 _404">404: Page not found</h2>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </React.Suspense>
        </div>
        <Footer className="footer" />
      </div>
    </React.Fragment>
  );
}

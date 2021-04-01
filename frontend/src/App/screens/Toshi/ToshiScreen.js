import React from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Sidebar } from "../../components/navigation/Sidebar";
import Calendar from "../../components/Calendar";
import LoadingSpinner from "../../components/LoadingSpinner";

// sidebar list
import { apptsList } from "../../data/lists";

const ToshiAbout = React.lazy(() => import("./ToshiAboutScreen"));
const ToshiTeaching = React.lazy(() => import("./ToshiTeachingScreen"));
const PageHeader = React.lazy(() => import("../../components/PageHeader"));
const Blog = React.lazy(() => import("./ToshiBlogScreen"));
const Reviews = React.lazy(() => import("../../components/reviews/Reviews"));

function ApptsScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className="pg__appointment container__appts">
      {/* <Sidebar title="Appointments" list={apptsList} /> */}

      <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path={`${url}/about`} component={ToshiAbout} />
            <Route exact path={`${url}/teaching`} component={ToshiTeaching} />
            <Route
              exact
              path={`${url}/reviews`}
              component={() => <Reviews type="meetToshi" />}
            />
            {/* <Route exact path={`${url}/reviews/UserCreateReview`} component={UserCreateReview} /> */}
            <Route exact path={`${url}/blog`} component={Blog} />
            <Route path="*">
              <PageHeader page="appts" />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default ApptsScreen;

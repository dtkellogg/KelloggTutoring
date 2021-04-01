import React from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ToshiAbout = React.lazy(() => import("../components/toshi/ToshiAbout"));
const ToshiTeaching = React.lazy(() => import("../components/toshi/ToshiTeaching"));
const PageHeader = React.lazy(() => import("../components/PageHeader"));
const Blog = React.lazy(() => import("../components/toshi/ToshiBlog"));
const Reviews = React.lazy(() => import("../components/reviews/Reviews"));

function ApptsScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className="pg__appointment container__appts">
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

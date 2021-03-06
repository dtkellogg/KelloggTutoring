import React, { lazy } from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ToshiAbout = lazy(() => import("../components/toshi/ToshiAbout"));
const ToshiTeaching = lazy(() => import("../components/toshi/ToshiTeaching"));
const PageHeader = lazy(() => import("../components/layout/PageHeader"));

const Reviews = lazy(() => import("../components/reviews/Reviews"));
const ReviewEdit = lazy(() => import("../components/reviews/ReviewEdit"))
const ReviewCreate = lazy(() => import("../components/reviews/ReviewCreate"))


function ApptsScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
      <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path={`${url}/about`} component={ToshiAbout} />
            <Route exact path={`${url}/teaching`} component={ToshiTeaching} />
            <Route exact path={`${url}/reviews`} component={() => <Reviews type="meetToshi" />} />
            <Route exact path={`${url}/reviews/create-review`} component={ReviewCreate} />
            <Route exact path={`${url}/reviews/:id/edit`} component={ReviewEdit} />
            <Route path="*" component={PageHeader} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
  );
}

export default ApptsScreen;
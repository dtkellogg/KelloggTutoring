import React, { lazy } from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PageHeader = lazy(() => import("../components/layout/PageHeader"));
const AdminUsers = lazy(() => import("../components/admin/AdminUsers"));
const AdminUserEdit = lazy(() => import("../components/admin/AdminUserEdit"));
const AdminApptRequests = lazy(() => import("../components/admin/AdminApptRequests"));
const AdminReviewsList = lazy(() => import("../components/admin/AdminReviewsList"));
const AdminAppointmentsList = lazy(() => import("../components/admin/AdminApptsList"));
// const ApptsList = lazy(() => import("../components/appointments/ApptsList"));
const AdminAppointmentEdit = lazy(() => import("../components/admin/AdminApptEdit"));
const AdminAppointmentCreate = lazy(() => import("../components/admin/AdminApptCreate"));
const AdminStats = lazy(() => import("../components/admin/AdminStats"));

function AdminScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
      <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path={`${url}/users`} component={AdminUsers} />
            <Route exact path={`${url}/user/:id/edit`} component={AdminUserEdit} />
            {/* <Route exact path={`${url}/appts`} component={() => <ApptsList type="admin" />} /> */}
            <Route exact path={`${url}/appts`} component={AdminAppointmentsList} />
            <Route exact path={`${url}/appt/:id/edit`} component={AdminAppointmentEdit} />
            <Route exact path={`${url}/appts/create-appointment`} component={AdminAppointmentCreate} />
            <Route exact path={`${url}/blog`} component={AdminAppointmentsList} />
            <Route exact path={`${url}/user/:id/edit`} component={AdminUserEdit} />
            <Route exact path={`${url}/reviews`} component={AdminReviewsList} />
            <Route exact path={`${url}/requests`} component={AdminApptRequests} />
            <Route exact path={`${url}/stats`} component={AdminStats} />
            <Route path="*" component={PageHeader} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
  );
}

export default AdminScreen;
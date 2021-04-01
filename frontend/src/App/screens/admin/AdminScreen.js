import React from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Sidebar } from "../../components/navigation/Sidebar";
import Calendar from "../../components/Calendar";
import LoadingSpinner from "../../components/LoadingSpinner";

const PageHeader = React.lazy(() => import("../../components/PageHeader"));
const AdminUsers = React.lazy(() => import("./AdminUsersScreen"));
const AdminUserEdit = React.lazy(() => import("./AdminUserEditScreen"));
const AdminApptRequests = React.lazy(() => import("./AdminApptRequestsScreen"));
const AdminReviewsList = React.lazy(() => import("./AdminReviewsListScreen"));
const AdminAppointmentsList = React.lazy(() => import("./AdminApptsListScreen"));
const AdminAppointmentEdit = React.lazy(() => import("./AdminApptEditScreen"));
const AdminAppointmentCreate = React.lazy(() => import("./AdminApptCreateScreen"));
const AdminStats = React.lazy(() => import("./AdminStatsScreen"));

function AdminScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className="pg__appointment container__appts">
      {/* <Sidebar title="Appointments" list={apptsList} /> */}

      <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path={`${url}/users`} component={AdminUsers} />
            <Route
              exact
              path={`${url}/user/:id/edit`}
              component={AdminUserEdit}
            />
            <Route
              exact
              path={`${url}/appts`}
              component={AdminAppointmentsList}
            />
            <Route
              exact
              path={`${url}/appt/:id/edit`}
              component={AdminAppointmentEdit}
            />
            <Route
              exact
              path={`${url}/appts/create-appointment`}
              component={AdminAppointmentCreate}
            />
            <Route exact path={`${url}/blog`} component={AdminAppointmentsList} />
            <Route
              exact
              path={`${url}/user/:id/edit`}
              component={AdminUserEdit}
            />
            <Route exact path={`${url}/reviews`} component={AdminReviewsList} />
            <Route exact path={`${url}/requests`} component={AdminApptRequests} />
            <Route exact path={`${url}/stats`} component={AdminStats} />
            <Route path="*">
              <PageHeader page="appts" />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default AdminScreen;

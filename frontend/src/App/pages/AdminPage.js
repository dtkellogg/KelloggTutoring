import React from "react";
import {
    Route,
    Switch,
    useRouteMatch,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserList from "../screens/UserScreenList";
import UserEdit from "../screens/UserScreenEdit";
import AdminAppointmentsList from "../screens/AdminScreenAppointmentsList";
import AdminAppointmentCreate from "../screens/AdminScreenAppointmentCreate";
import PageHeader from "../screens/HeaderScreen";
import { useDispatch } from "react-redux";
import { subheader } from "../actions/subheader";

const toshiList = [
    "User List",
    "Appointments",
    // "Reviews",
    // "Blog",
];

export default function Admin() {
    const { url } = useRouteMatch();
    let location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(subheader("Expertise, Experience, Methodology"));
    }, [location, dispatch]);

    return (
        <div className="pg__meetToshi">
            <Sidebar title="Toshi" list={toshiList} />
            {/* <h1 className="text-size-1">Hello, it's a pleasure to meet you!</h1> */}
            <Switch>
                <Route exact path={`${url}`}>
                    <PageHeader />
                </Route>
                <Route path={`${url}/user-list`}>
                    <UserList />
                </Route>
                <Route path="/admin/user/:id/edit" component={UserEdit} />
                <Route path={`/admin/appointments`} component={AdminAppointmentsList} />
                <Route path={'/admin/appointments/create-appointment'} component={AdminAppointmentCreate} />
                <Route path="*">
                    <PageHeader />
                </Route>
            </Switch>

        </div>
    );
}

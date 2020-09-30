import React from "react";
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ToshiAbout from "../components/ToshiAbout";
import PageHeader from "../components/PageHeader";
import { useSelector, useDispatch } from "react-redux";
import { subheader } from "../actions/subheader";

const toshiList = [
  "About",
  "Teaching",
  "Blog",
];


export default function MeetToshi() {
    const { url } = useRouteMatch(); 
    let location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(subheader("Expertise, Experience, Methodology"));
    }, [location]);

  return (
    <div className="pg__meetToshi">
      <Sidebar title="Toshi" list={toshiList} />
      {/* <h1 className="text-size-1">Hello, it's a pleasure to meet you!</h1> */}
      <Switch>
        <Route exact path={`${url}`}>
          <PageHeader />
        </Route>
        <Route exact path={`${url}/about`}>
          <ToshiAbout />
        </Route>
        <Route path={`${url}/email`}>
          {/* <EmailForm /> */}
        </Route>
        <Route path={`${url}/phone`}>
          {/* <PhoneForm /> */}
        </Route>
        <Route path="*">
          <div className="text-size-1">
            Select a contact method to the left.
          </div>
        </Route>
      </Switch>

    </div>
  );
}

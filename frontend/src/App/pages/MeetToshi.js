import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ToshiAbout from "../components/ToshiAbout";
import PageHeader from "../components/PageHeader";
import { useDispatch } from "react-redux";
import { subheader } from "../actions/subheader";

const toshiList = [
  "About",
  "Teaching",
  "Reviews",
  "Blog",
];


export default function MeetToshi() {
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
        <Route exact path={`${url}/about`}>
          <ToshiAbout />
        </Route>
        <Route path={`${url}/teaching`}>
          {/* <EmailForm /> */}
        </Route>
        <Route path={`${url}/blog`}>
          {/* <PhoneForm /> */}
        </Route>
        <Route path="*">
          <PageHeader />
        </Route>
      </Switch>

    </div>
  );
}

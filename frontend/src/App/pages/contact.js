import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { subheader } from "../actions/subheader";

import Sidebar from "../components/Sidebar";
import ContactForm from "../components/ContactForm";
// import EmailForm from "../components/EmailForm";
// import PhoneForm from "../components/PhoneForm";
import PageHeader from "../components/PageHeader";

const contactList = ['message form', 'schedule an appointment', 'phone, text & email'];


export default function Contact() {
  let location = useLocation();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

    React.useEffect(() => {
      dispatch(subheader("Message, Email, Call"));
    }, [location, dispatch]);

  return (
    <div className="pg__contact">
      <Sidebar title="Contact" list={contactList} />
      {/* <h1 className="text-size-1">Any questions? Leave a message here.</h1> */}
      {/* <ContactForm /> */}

      <Switch>
        <Route exact path={`${url}`}>
          <PageHeader />
        </Route>
        <Route exact path={`${url}/message-form`}>
          <ContactForm />
        </Route>
        <Route path={`${url}/schedule-an-appointment`}>
          {/* <EmailForm /> */}
        </Route>
        <Route path={`${url}/phone-text-and-email`}>
          {/* <PhoneForm /> */}
        </Route>
        <Route path="*">
          <PageHeader />
        </Route>
      </Switch>
    </div>
  );
}


import React from "react";
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ContactForm from "../components/ContactForm";
import EmailForm from "../components/EmailForm";
import PhoneForm from "../components/PhoneForm";
import PageHeader from "../components/PageHeader";

const contactList = ['message form', 'schedule an appointment', 'phone, text & email'];


export default function Contact() {
  const { url } = useRouteMatch();

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

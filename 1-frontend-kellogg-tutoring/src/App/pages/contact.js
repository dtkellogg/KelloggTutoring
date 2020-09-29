import React from "react";
import Sidebar from "../components/Sidebar";
import ContactForm from "../components/ContactForm";


export default function contact() {
  return (
    <div className="pg__contact">
      <Sidebar />
      {/* <h1 className="text-size-1">Any questions? Leave a message here.</h1> */}
      <ContactForm />
    </div>
  );
}


export const apptsList = ["Booking", "Payments", "List", "Calendar"];
export const contactList = ['message', 'schedule', 'contact info'];
export const toshiList = ["About", "Teaching", "Reviews", "Blog"];
export const adminList = ["Users", "Appts", "Reviews", "Requests", "Stats"];

export const searchBar = [
    {
        name: "home",
        link: "/home",
    },
    {
        name: "booking",
        link: "/appointments/booking",
    },
    {
        name: "payments",
        link: "/appointments/payments",
    },
    {
        name: "appointments list",
        link: "/appointments/appointments-list",
    },
    {
        name: "appointments calendar",
        link: "/appointments/appointments-calendar",
    },
    {
        name: "about Toshi",
        link: "/Toshi/about",
    },
    {
        name: "teaching",
        link: "/Toshi/teaching",
    },
    {
        name: "reviews",
        link: "/Toshi/reviews",
    },
    {
        name: "blog",
        link: "/Toshi/blog",
    },
    {
        name: "messages",
        link: "/contact/message-form",
    },
    {
        name: "schedule an appointment",
        link: "/contact/schedule-an-appointment",
    },
    {
        name: "profile",
        link: "/profile",
    },
    {
        name: "settings",
        link: "/settings",
    },
    {
        name: "resources",
        link: "/studentResources",
    },
];

//
// --------------Nav Links-------------- //
//

export const navExpandedLinks = [
  {
    name: "Appts",
    to: "/appointments",
  },
  {
    name: "Toshi",
    to: "/toshi",
  },
  {
    name: "Contact",
    to: "/contact",
  },
];


export const navCondensedNotLoggedIn = [
    {
        name: "Login",
        to: "/login"
    },
    {
        name: "Settings",
        to: "/settings"
    },
]
export const navCondensedLoggedIn = [
  {
    name: "Profile",
    to: "/profile",
  },
  {
    name: "Zoom",
    to: "/zoom",
  },
  {
    name: "Resources",
    to: "/resources",
  },
  {
    name: "Settings",
    to: "/settings",
  },
];
export const navCondensedAdmin = [
  {
    name: "Admin",
    to: "/admin",
  },
  {
    name: "Profile",
    to: "/profile",
  },
  {
    name: "Zoom",
    to: "/zoom",
  },
  {
    name: "Resources",
    to: "/resources",
  },
  {
    name: "Settings",
    to: "/settings",
  },
];
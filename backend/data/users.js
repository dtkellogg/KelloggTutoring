const bcrypt = require('bcryptjs')

const users = [
  {
    name: "Toshi",
    email: "toshi@example.com",
    password: bcrypt.hashSync('123456', 10), // password to set to 123456. This will "hash" the password so it's encypted in db
    isAdmin: true,
  },
  {
    name: "Kyoko",
    email: "kyoko@example.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: "Nathan",
    email: "nathan@example.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: "Taran",
    email: "taran@example.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: "Kyle",
    email: "kyle@example.com",
    password: bcrypt.hashSync('123456', 10),
  }
];

module.exports = users
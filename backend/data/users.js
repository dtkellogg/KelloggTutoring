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
    name: "Mark",
    email: "mark@example.com",
    password: bcrypt.hashSync('123456', 10),
  }
];

module.exports = users
const bcrypt = require("bcrypt");

class User {
  constructor(id, name, surname, email, password) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }

  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = { User };

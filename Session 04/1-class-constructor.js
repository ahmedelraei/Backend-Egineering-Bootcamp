class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  welcome() {
    return `Welcome ${this.name}`;
  }
}

const u = new User();
const u2 = new User("Ahmed", "ahmed@example.com");
console.log(u2);
console.log(u2.welcome());

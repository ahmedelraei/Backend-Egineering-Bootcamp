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
console.log(u);

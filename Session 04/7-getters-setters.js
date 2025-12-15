// Getters and Setters - Special methods to get and set property values

class Person {
  constructor(firstName, lastName, age) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
  }

  // Getter for full name (computed property)
  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  // Setter for full name (allows setting both names at once)
  set fullName(name) {
    const parts = name.split(" ");
    this._firstName = parts[0] || "";
    this._lastName = parts.slice(1).join(" ") || "";
  }

  // Getter for age
  get age() {
    return this._age;
  }

  // Setter for age with validation
  set age(value) {
    if (value < 0 || value > 150) {
      throw new Error("Invalid age value");
    }
    this._age = value;
  }

  // Getter for a formatted string
  get info() {
    return `${this.fullName} is ${this._age} years old`;
  }
}

const person = new Person("Ahmed", "Elraei", 25);

console.log(person.fullName); // Ahmed Elraei (using getter)
console.log(person.age); // 25 (using getter)
console.log(person.info); // Ahmed Elraei is 25 years old

// Using setters
person.fullName = "Ahmed Mohamed";
console.log(person.fullName); // Ahmed Mohamed

person.age = 26;
console.log(person.age); // 26

// person.age = -5; // Error: Invalid age value


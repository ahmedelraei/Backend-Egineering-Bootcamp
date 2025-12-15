// Inheritance - A class can inherit properties and methods from another class
class Employee {
  constructor(name, email, employeeId) {
    this.name = name;
    this.email = email;
    this.employeeId = employeeId;
    this.department = "General";
  }

  getInfo() {
    return `${this.name} (ID: ${this.employeeId}) - ${this.email}`;
  }

  calculateSalary() {
    return 0; // Base salary, to be overridden
  }

  getRole() {
    return "Employee";
  }
}

// Developer class inherits from Employee
class Developer extends Employee {
  constructor(name, email, employeeId, programmingLanguage) {
    super(name, email, employeeId); // Call parent constructor
    this.programmingLanguage = programmingLanguage;
    this.department = "Engineering";
    this.baseSalary = 80000;
  }

  getRole() {
    return "Developer";
  }

  calculateSalary() {
    return this.baseSalary;
  }

  code() {
    return `${this.name} is coding in ${this.programmingLanguage}`;
  }
}

class SeniorDeveloper extends Developer {
  constructor(name, email, employeeId, programmingLanguage, yearsOfExperience) {
    super(name, email, employeeId, programmingLanguage);
    this.yearsOfExperience = yearsOfExperience;
  }
}

const seniorDeveloper = new SeniorDeveloper(
  "Ahmed",
  "ahmed@company.com",
  "EMP001",
  "JavaScript",
  5
);
console.log(seniorDeveloper.getInfo());

// // Manager class inherits from Employee
// class Manager extends Employee {
//   constructor(name, email, employeeId, teamSize) {
//     super(name, email, employeeId);
//     this.teamSize = teamSize;
//     this.department = "Management";
//     this.baseSalary = 100000;
//   }

//   getRole() {
//     return "Manager";
//   }

//   calculateSalary() {
//     // Managers get bonus based on team size
//     return this.baseSalary + this.teamSize * 2000;
//   }

//   conductMeeting() {
//     return `${this.name} is conducting a meeting with ${this.teamSize} team members`;
//   }
// }

// const developer = new Developer(
//   "Ahmed",
//   "ahmed@company.com",
//   "EMP001",
//   "JavaScript"
// );
// const manager = new Manager("Sarah", "sarah@company.com", "EMP002", 5);

// console.log(developer.getInfo()); // Ahmed (ID: EMP001) - ahmed@company.com
// console.log(developer.getRole()); // Developer
// console.log(developer.calculateSalary()); // 80000
// console.log(developer.code()); // Ahmed is coding in JavaScript

// console.log(manager.getInfo()); // Sarah (ID: EMP002) - sarah@company.com
// console.log(manager.getRole()); // Manager
// console.log(manager.calculateSalary()); // 110000 (100000 + 5*2000)
// console.log(manager.conductMeeting()); // Sarah is conducting a meeting with 5 team members

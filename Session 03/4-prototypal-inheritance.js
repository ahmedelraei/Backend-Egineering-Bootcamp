// ============================================
// PROTOTYPAL INHERITANCE
// ============================================

console.log("=== 1. BASIC PROTOTYPAL INHERITANCE ===");

// Prototypal inheritance allows objects to inherit properties and methods from other objects
// This is JavaScript's way of implementing object-oriented inheritance

// Parent constructor
function Animal(name, species) {
  this.name = name;
  this.species = species;
}

Animal.prototype.eat = function () {
  return `${this.name} is eating`;
};

Animal.prototype.sleep = function () {
  return `${this.name} is sleeping`;
};

// Child constructor
function Dog(name, species, breed) {
  // Call parent constructor with 'this' context
  Animal.call(this, name, species);
  this.breed = breed;
}

// Set Dog's prototype to inherit from Animal's prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

// Add Dog-specific methods
Dog.prototype.bark = function () {
  return `${this.name} is barking`;
};

const myDog = new Dog("Buddy", "Canine", "Golden Retriever");

console.log("myDog.name:", myDog.name); // Own property
console.log("myDog.species:", myDog.species); // Inherited from Animal
console.log("myDog.bark():", myDog.bark()); // From Dog.prototype
console.log("myDog.eat():", myDog.eat()); // Inherited from Animal.prototype
console.log("myDog.sleep():", myDog.sleep()); // Inherited from Animal.prototype

// ============================================
console.log("\n=== 2. INHERITANCE CHAIN ===");

// Prototype chain: myDog -> Dog.prototype -> Animal.prototype -> Object.prototype -> null

console.log("myDog instanceof Dog:", myDog instanceof Dog); // true
console.log("myDog instanceof Animal:", myDog instanceof Animal); // true
console.log("myDog instanceof Object:", myDog instanceof Object); // true

console.log(
  "Dog.prototype.isPrototypeOf(myDog):",
  Dog.prototype.isPrototypeOf(myDog)
); // true
console.log(
  "Animal.prototype.isPrototypeOf(myDog):",
  Animal.prototype.isPrototypeOf(myDog)
); // true

// ============================================
console.log("\n=== 3. METHOD OVERRIDING ===");

// Child can override parent methods

function Cat(name, species, color) {
  Animal.call(this, name, species);
  this.color = color;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

// Override the sleep method
Cat.prototype.sleep = function () {
  return `${this.name} is sleeping (cats sleep a lot!)`;
};

// Add Cat-specific method
Cat.prototype.meow = function () {
  return `${this.name} says meow`;
};

const myCat = new Cat("Whiskers", "Feline", "Orange");

console.log("myCat.sleep():", myCat.sleep()); // Overridden method
console.log("myCat.eat():", myCat.eat()); // Inherited method
console.log("myCat.meow():", myCat.meow()); // Cat-specific method

// ============================================
console.log("\n=== 4. MULTI-LEVEL INHERITANCE ===");

// You can create inheritance chains with multiple levels

function Vehicle(brand, year) {
  this.brand = brand;
  this.year = year;
}

Vehicle.prototype.start = function () {
  return `${this.brand} vehicle started`;
};

function Car(brand, year, doors) {
  Vehicle.call(this, brand, year);
  this.doors = doors;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.drive = function () {
  return `Driving ${this.brand} car`;
};

function ElectricCar(brand, year, doors, batteryCapacity) {
  Car.call(this, brand, year, doors);
  this.batteryCapacity = batteryCapacity;
}

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

ElectricCar.prototype.charge = function () {
  return `Charging ${this.brand} electric car`;
};

// Override start method
ElectricCar.prototype.start = function () {
  return `${this.brand} electric car started silently`;
};

const tesla = new ElectricCar("Tesla", 2023, 4, "100kWh");

console.log("tesla.start():", tesla.start()); // From ElectricCar.prototype
console.log("tesla.drive():", tesla.drive()); // From Car.prototype
console.log("tesla.charge():", tesla.charge()); // From ElectricCar.prototype

// Chain: tesla -> ElectricCar.prototype -> Car.prototype -> Vehicle.prototype -> Object.prototype -> null

// ============================================
console.log("\n=== 5. CALLING PARENT METHODS ===");

// Sometimes you want to call the parent method from an overridden method

function Shape(color) {
  this.color = color;
}

Shape.prototype.getArea = function () {
  return 0; // Base implementation
};

Shape.prototype.getInfo = function () {
  return `Shape with color ${this.color}`;
};

function Circle(color, radius) {
  Shape.call(this, color);
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.getArea = function () {
  return Math.PI * this.radius * this.radius;
};

// Override getInfo but call parent's getInfo
Circle.prototype.getInfo = function () {
  // Call parent method using call/apply
  const parentInfo = Shape.prototype.getInfo.call(this);
  return `${parentInfo}, radius: ${this.radius}, area: ${this.getArea().toFixed(
    2
  )}`;
};

const circle = new Circle("red", 5);
console.log("circle.getArea():", circle.getArea());
console.log("circle.getInfo():", circle.getInfo());

// ============================================
console.log("\n=== 6. MIXINS (MULTIPLE INHERITANCE SIMULATION) ===");

// JavaScript doesn't support multiple inheritance, but you can use mixins

// Mixin 1: CanFly
const CanFly = {
  fly() {
    return `${this.name} is flying`;
  },
  land() {
    return `${this.name} has landed`;
  },
};

// Mixin 2: CanSwim
const CanSwim = {
  swim() {
    return `${this.name} is swimming`;
  },
  dive() {
    return `${this.name} is diving`;
  },
};

function Bird(name, species) {
  this.name = name;
  this.species = species;
}

Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;

// Mix in CanFly
Object.assign(Bird.prototype, CanFly);

function Duck(name, species) {
  Bird.call(this, name, species);
}

Duck.prototype = Object.create(Bird.prototype);
Duck.prototype.constructor = Duck;

// Mix in CanSwim
Object.assign(Duck.prototype, CanSwim);

const duck = new Duck("Donald", "Mallard");

console.log("duck.fly():", duck.fly()); // From CanFly mixin
console.log("duck.swim():", duck.swim()); // From CanSwim mixin
console.log("duck.eat():", duck.eat()); // From Animal.prototype

// ============================================
console.log("\n=== 7. COMPOSITION OVER INHERITANCE ===");

// Sometimes composition is better than deep inheritance chains

// Instead of deep inheritance, compose objects
function Engine(type) {
  this.type = type;
  this.isRunning = false;
}

Engine.prototype.start = function () {
  this.isRunning = true;
  return `Engine started`;
};

Engine.prototype.stop = function () {
  this.isRunning = false;
  return `Engine stopped`;
};

function Wheel(position) {
  this.position = position;
  this.pressure = 32;
}

Wheel.prototype.inflate = function (psi) {
  this.pressure = psi;
  return `Wheel ${this.position} inflated to ${psi} PSI`;
};

function CarComposition(brand) {
  this.brand = brand;
  this.engine = new Engine("V8");
  this.wheels = [
    new Wheel("front-left"),
    new Wheel("front-right"),
    new Wheel("rear-left"),
    new Wheel("rear-right"),
  ];
}

CarComposition.prototype.start = function () {
  return `${this.brand}: ${this.engine.start()}`;
};

CarComposition.prototype.checkTires = function () {
  return this.wheels.map((wheel) => wheel.inflate(35));
};

const myCar = new CarComposition("BMW");
console.log("myCar.start():", myCar.start());
console.log("myCar.checkTires():", myCar.checkTires());

// ============================================
console.log("\n=== 8. COMPLETE INHERITANCE EXAMPLE ===");

// Employee -> Manager -> Director

function Employee(name, id, department) {
  this.name = name;
  this.id = id;
  this.department = department;
}

Employee.prototype.getInfo = function () {
  return `${this.name} (${this.id}) - ${this.department}`;
};

Employee.prototype.work = function () {
  return `${this.name} is working`;
};

function Manager(name, id, department, teamSize) {
  Employee.call(this, name, id, department);
  this.teamSize = teamSize;
}

Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.conductMeeting = function () {
  return `${this.name} is conducting a meeting with ${this.teamSize} team members`;
};

Manager.prototype.work = function () {
  const parentWork = Employee.prototype.work.call(this);
  return `${parentWork} and managing a team`;
};

function Director(name, id, department, teamSize, budget) {
  Manager.call(this, name, id, department, teamSize);
  this.budget = budget;
}

Director.prototype = Object.create(Manager.prototype);
Director.prototype.constructor = Director;

Director.prototype.approveBudget = function () {
  return `${this.name} approved budget of $${this.budget}`;
};

Director.prototype.work = function () {
  const parentWork = Manager.prototype.work.call(this);
  return `${parentWork} and overseeing operations`;
};

const employee = new Employee("John", "E001", "Engineering");
const manager = new Manager("Sarah", "M001", "Engineering", 5);
const director = new Director("Mike", "D001", "Engineering", 20, 1000000);

console.log(employee.getInfo());
console.log(employee.work());

console.log(manager.getInfo());
console.log(manager.work());
console.log(manager.conductMeeting());

console.log(director.getInfo());
console.log(director.work());
console.log(director.conductMeeting());
console.log(director.approveBudget());

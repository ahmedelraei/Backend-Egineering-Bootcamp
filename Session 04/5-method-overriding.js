// Method Overriding - Child class can override parent class methods

class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  start() {
    return `${this.brand} vehicle is starting...`;
  }

  stop() {
    return `${this.brand} vehicle is stopping...`;
  }

  getInfo() {
    return `This is a ${this.brand} vehicle`;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand);
    this.model = model;
  }

  // Override the start method
  start() {
    return `${this.brand} ${this.model} car engine is starting... Vroom!`;
  }

  // Override getInfo and extend it using super
  getInfo() {
    return `${super.getInfo()} - Model: ${this.model}`;
  }
}

class Bicycle extends Vehicle {
  start() {
    return `${this.brand} bicycle is ready to ride!`;
  }
}

const car = new Car("Toyota", "Camry");
const bicycle = new Bicycle("Trek");

console.log(car.start()); // Toyota Camry car engine is starting... Vroom!
console.log(car.getInfo()); // This is a Toyota vehicle - Model: Camry
console.log(bicycle.start()); // Trek bicycle is ready to ride!
console.log(car.stop()); // Toyota vehicle is stopping... (inherited from parent)


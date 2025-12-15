// Composition - Building complex objects by combining simpler objects
// "Has-a" relationship instead of "Is-a" relationship (inheritance)

class Engine {
  constructor(type) {
    this.type = type;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    return `${this.type} engine started`;
  }

  stop() {
    this.isRunning = false;
    return `${this.type} engine stopped`;
  }
}

class Wheel {
  constructor(position) {
    this.position = position;
    this.pressure = 32; // PSI
  }

  inflate(psi) {
    this.pressure = psi;
    return `Wheel at ${this.position} inflated to ${psi} PSI`;
  }
}

class Car {
  constructor(brand, engineType) {
    this.brand = brand;
    this.engine = new Engine(engineType); // Composition: Car HAS-A Engine
    this.wheels = [
      new Wheel("front-left"),
      new Wheel("front-right"),
      new Wheel("rear-left"),
      new Wheel("rear-right"),
    ]; // Composition: Car HAS-A Wheels
  }

  start() {
    return `${this.brand} car: ${this.engine.start()}`;
  }

  stop() {
    return `${this.brand} car: ${this.engine.stop()}`;
  }

  checkWheels() {
    return this.wheels
      .map((wheel) => `${wheel.position}: ${wheel.pressure} PSI`)
      .join(", ");
  }
}

const myCar = new Car("Toyota", "V6");
console.log(myCar.start()); // Toyota car: V6 engine started

// console.log(myCar.checkWheels()); // front-left: 32 PSI, front-right: 32 PSI, ...
// console.log(myCar.wheels[0].inflate(35)); // Wheel at front-left inflated to 35 PSI
// console.log(myCar.stop()); // Toyota car: V6 engine stopped

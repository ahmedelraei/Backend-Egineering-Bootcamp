// ============================================
// OBJECT.CREATE() FOR INHERITANCE
// ============================================

console.log("=== 1. OBJECT.CREATE() BASICS ===");

// Object.create() creates a new object with a specified prototype
// It's a cleaner way to set up inheritance compared to constructor functions

// Create a prototype object
const animalPrototype = {
  eat() {
    return `${this.name} is eating`;
  },
  sleep() {
    return `${this.name} is sleeping`;
  },
};

// Create an object that inherits from animalPrototype
const dog = Object.create(animalPrototype);
dog.name = "Buddy";
dog.breed = "Golden Retriever";

console.log("dog.name:", dog.name); // Own property
console.log("dog.eat():", dog.eat()); // Inherited method
console.log("dog.sleep():", dog.sleep()); // Inherited method

console.log("dog's prototype:", Object.getPrototypeOf(dog) === animalPrototype); // true

// ============================================
console.log("\n=== 2. OBJECT.CREATE(NULL) ===");

// Object.create(null) creates an object with no prototype
// Useful for creating pure dictionaries/maps

const pureObject = Object.create(null);
pureObject.name = "Pure Object";
pureObject.value = 42;

console.log("pureObject:", pureObject);
console.log("pureObject's prototype:", Object.getPrototypeOf(pureObject)); // null
console.log("pureObject.toString:", pureObject.toString); // undefined

// No built-in Object methods
// pureObject.toString(); // Error: pureObject.toString is not a function

// ============================================
console.log("\n=== 3. OBJECT.CREATE() WITH PROPERTY DESCRIPTORS ===");

// Object.create() can accept a second parameter for property descriptors

const personPrototype = {
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

const person = Object.create(personPrototype, {
  name: {
    value: "Ahmed",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  age: {
    value: 25,
    writable: true,
    enumerable: true,
    configurable: false, // Cannot delete
  },
  id: {
    value: "P001",
    writable: false, // Read-only
    enumerable: true,
    configurable: false,
  },
});

console.log("person.name:", person.name);
console.log("person.age:", person.age);
console.log("person.greet():", person.greet());

person.name = "Sarah"; // Allowed (writable: true)
person.age = 30; // Allowed (writable: true)
// person.id = "P002"; // Error in strict mode (writable: false)

console.log("After changes - person.name:", person.name);
console.log("After changes - person.age:", person.age);

// ============================================
console.log("\n=== 4. FACTORY PATTERN WITH OBJECT.CREATE() ===");

// Object.create() is great for factory functions

function createAnimal(name, species) {
  const animal = Object.create(animalPrototype);
  animal.name = name;
  animal.species = species;
  return animal;
}

const cat = createAnimal("Whiskers", "Feline");
const bird = createAnimal("Tweety", "Avian");

console.log("cat.eat():", cat.eat());
console.log("bird.eat():", bird.eat());

// ============================================
console.log("\n=== 5. INHERITANCE WITH OBJECT.CREATE() ===");

// Create a chain of prototypes using Object.create()

// Base prototype
const vehiclePrototype = {
  start() {
    return `${this.brand} started`;
  },
  stop() {
    return `${this.brand} stopped`;
  },
};

// Car prototype inherits from vehiclePrototype
const carPrototype = Object.create(vehiclePrototype);
carPrototype.drive = function () {
  return `Driving ${this.brand} ${this.model}`;
};

// Create car instances
function createCar(brand, model) {
  const car = Object.create(carPrototype);
  car.brand = brand;
  car.model = model;
  return car;
}

const myCar = createCar("Toyota", "Camry");

console.log("myCar.start():", myCar.start()); // From vehiclePrototype
console.log("myCar.drive():", myCar.drive()); // From carPrototype

// Chain: myCar -> carPrototype -> vehiclePrototype -> Object.prototype -> null

// ============================================
console.log("\n=== 6. OBJECT.CREATE() VS CONSTRUCTOR FUNCTIONS ===");

// Method 1: Constructor functions
function PersonConstructor(name) {
  this.name = name;
}
PersonConstructor.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const person1 = new PersonConstructor("Ahmed");

// Method 2: Object.create() with factory
const personPrototype2 = {
  greet() {
    return `Hello, ${this.name}`;
  },
};

function createPerson(name) {
  const person = Object.create(personPrototype2);
  person.name = name;
  return person;
}

const person2 = createPerson("Ahmed");

// Both work the same way
console.log("person1.greet():", person1.greet());
console.log("person2.greet():", person2.greet());

// Difference: person1 needs 'new', person2 doesn't
// person1 has constructor property, person2 doesn't

console.log("person1.constructor:", person1.constructor);
console.log("person2.constructor:", person2.constructor);

// ============================================
console.log("\n=== 7. COMPOSITION WITH OBJECT.CREATE() ===");

// You can compose multiple prototypes

const canFly = {
  fly() {
    return `${this.name} is flying`;
  },
};

const canSwim = {
  swim() {
    return `${this.name} is swimming`;
  },
};

// Create a prototype that combines both
const duckPrototype = Object.create(animalPrototype);
Object.assign(duckPrototype, canFly, canSwim);

function createDuck(name) {
  const duck = Object.create(duckPrototype);
  duck.name = name;
  return duck;
}

const duck = createDuck("Donald");

console.log("duck.eat():", duck.eat()); // From animalPrototype
console.log("duck.fly():", duck.fly()); // From canFly
console.log("duck.swim():", duck.swim()); // From canSwim

// ============================================
console.log("\n=== 8. PROTOTYPE CHAIN WITH OBJECT.CREATE() ===");

// Create a multi-level prototype chain

const level1 = { a: 1 };
const level2 = Object.create(level1);
level2.b = 2;
const level3 = Object.create(level2);
level3.c = 3;

console.log("level3.c:", level3.c); // Own property: 3
console.log("level3.b:", level3.b); // From level2: 2
console.log("level3.a:", level3.a); // From level1: 1

// Chain: level3 -> level2 -> level1 -> Object.prototype -> null

// ============================================
console.log("\n=== 9. COMPLETE EXAMPLE: GAME ENTITIES ===");

// Base entity prototype
const entityPrototype = {
  move(x, y) {
    this.x = x;
    this.y = y;
    return `${this.name} moved to (${x}, ${y})`;
  },
  getPosition() {
    return `Position: (${this.x}, ${this.y})`;
  },
};

// Player prototype
const playerPrototype = Object.create(entityPrototype);
playerPrototype.attack = function (target) {
  return `${this.name} attacks ${target.name} for ${this.damage} damage`;
};
playerPrototype.takeDamage = function (damage) {
  this.health -= damage;
  if (this.health <= 0) {
    return `${this.name} is defeated!`;
  }
  return `${this.name} took ${damage} damage. Health: ${this.health}`;
};

// Enemy prototype
const enemyPrototype = Object.create(entityPrototype);
enemyPrototype.patrol = function () {
  return `${this.name} is patrolling`;
};

function createPlayer(name, x, y, damage) {
  const player = Object.create(playerPrototype);
  player.name = name;
  player.x = x;
  player.y = y;
  player.damage = damage;
  player.health = 100;
  return player;
}

function createEnemy(name, x, y) {
  const enemy = Object.create(enemyPrototype);
  enemy.name = name;
  enemy.x = x;
  enemy.y = y;
  enemy.health = 50;
  return enemy;
}

const player = createPlayer("Hero", 0, 0, 25);
const enemy = createEnemy("Goblin", 10, 10);

console.log(player.move(5, 5));
console.log(player.getPosition());
console.log(enemy.patrol());
console.log(player.attack(enemy));
console.log(enemy.takeDamage(25));

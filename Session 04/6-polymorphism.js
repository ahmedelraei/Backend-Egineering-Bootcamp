// Polymorphism - Different classes can be treated the same way
// Objects of different types can respond to the same method call differently

class Shape {
  constructor(name) {
    this.name = name;
  }

  // This method will be overridden by child classes
  calculateArea() {
    return "Area calculation not implemented";
  }

  displayInfo() {
    return `${this.name} - Area: ${this.calculateArea()}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super("Triangle");
    this.base = base;
    this.height = height;
  }

  calculateArea() {
    return (this.base * this.height) / 2;
  }
}

// Polymorphism in action - all shapes can be treated the same way
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Triangle(3, 4)
];

// Each shape responds to calculateArea() differently
shapes.forEach(shape => {
  console.log(shape.displayInfo());
});


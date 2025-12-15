// Static Methods and Properties - Belong to the class itself, not instances

class MathHelper {
  // Static property
  static PI = 3.14159;

  // Static method - called on the class, not an instance
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static calculateCircleArea(radius) {
    return this.PI * radius * radius;
  }

  // Instance method - called on an instance
  greet() {
    return "Hello from MathHelper instance";
  }
}

// Using static methods (no need to create an instance)
console.log(MathHelper.add(5, 3)); // 8
console.log(MathHelper.multiply(4, 7)); // 28
console.log(MathHelper.calculateCircleArea(5)); // 78.53975
console.log(MathHelper.PI); // 3.14159

// Instance methods require an instance
const helper = new MathHelper();
console.log(helper.greet()); // Hello from MathHelper instance
// console.log(helper.add(1, 2)); // Error: helper.add is not a function

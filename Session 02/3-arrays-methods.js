// ============================================
// ARRAYS & ARRAY METHODS
// ============================================

console.log("=== 1. ARRAY BASICS ===");

// Creating arrays
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(1, 2, 3);
const arr3 = Array.of(1, 2, 3);
const arr4 = Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']

console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log(arr4);

// Array properties
console.log(arr1.length); // 5
console.log(arr1[0]); // 1

// ============================================
console.log("\n=== 2. forEach ===");
// Executes a function for each element (doesn't return new array)

const numbers = [1, 2, 3, 4, 5];

// Basic forEach
numbers.forEach(function (number) {
  console.log(number * 2);
});

// With arrow function
numbers.forEach((num) => console.log(`Number: ${num}`));

// With index
numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

// Modifying array (be careful!)
const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
items.forEach((item) => {
  item.value *= 2; // Modifies original objects
});
console.log(items); // [{ value: 2 }, { value: 4 }, { value: 6 }]

// ============================================
console.log("\n=== 3. map ===");
// Creates new array by transforming each element

const numbers2 = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers2.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers2); // [1, 2, 3, 4, 5] (original unchanged)

// Transform objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

const names = users.map((user) => user.name);
console.log(names); // ["Alice", "Bob", "Charlie"]

const userInfo = users.map((user) => `${user.name} is ${user.age} years old`);
console.log(userInfo);

// With index
const indexed = numbers2.map((num, index) => `${index}: ${num}`);
console.log(indexed);

// ============================================
console.log("\n=== 4. filter ===");
// Creates new array with elements that pass test

const numbers3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers
const evens = numbers3.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Filter by condition
const greaterThan5 = numbers3.filter((num) => num > 5);
console.log(greaterThan5); // [6, 7, 8, 9, 10]

// Filter objects
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 },
  { name: "David", age: 16 },
];

const adults = people.filter((person) => person.age >= 18);
console.log(adults); // [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }]

// ============================================
console.log("\n=== 5. reduce ===");
// Reduces array to single value (accumulator pattern)

const numbers4 = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers4.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0); // 0 is initial value
console.log(sum); // 15

// Shorter version
const sum2 = numbers4.reduce((acc, curr) => acc + curr, 0);
console.log(sum2); // 15

// Product
const product = numbers4.reduce((acc, curr) => acc * curr, 1);
console.log(product); // 120

// Find maximum
const max = numbers4.reduce(
  (acc, curr) => (curr > acc ? curr : acc),
  numbers4[0]
);
console.log(max); // 5

// Count occurrences
const words = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Flatten array
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flat = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// Group by property
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
  { name: "David", grade: "C" },
];

const grouped = students.reduce((acc, student) => {
  const grade = student.grade;
  if (!acc[grade]) {
    acc[grade] = [];
  }
  acc[grade].push(student);
  return acc;
}, {});
console.log(grouped);

// ============================================
console.log("\n=== 6. CHAINING METHODS ===");
// Combine multiple array methods

const numbers5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers, double them, then sum
const result = numbers5
  .filter((num) => num % 2 === 0) // [2, 4, 6, 8, 10]
  .map((num) => num * 2) // [4, 8, 12, 16, 20]
  .reduce((acc, curr) => acc + curr, 0); // 60

console.log(result); // 60

// Real-world example
const products = [
  { name: "Laptop", price: 1000, category: "electronics" },
  { name: "Phone", price: 500, category: "electronics" },
  { name: "Book", price: 20, category: "books" },
  { name: "Tablet", price: 300, category: "electronics" },
];

// Get total price of electronics over $400
const total = products
  .filter((p) => p.category === "electronics")
  .filter((p) => p.price > 400)
  .map((p) => p.price) // [1000, 500]
  .reduce((acc, price) => acc + price, 0);

console.log(total); // 1500

// ============================================
console.log("\n=== 7. OTHER USEFUL ARRAY METHODS ===");

// find - returns first element that matches
const numbers6 = [1, 2, 3, 4, 5];
const found = numbers6.find((num) => num > 3);
console.log(found); // 4

// findIndex - returns index of first matching element
const index = numbers6.findIndex((num) => num > 3);
console.log(index); // 3

// some - returns true if any element passes test
const hasEven = numbers6.some((num) => num % 2 === 0);
console.log(hasEven); // true

// every - returns true if all elements pass test
const allPositive = numbers6.every((num) => num > 0);
console.log(allPositive); // true

// includes - checks if array contains value
console.log(numbers6.includes(3)); // true
console.log(numbers6.includes(10)); // false

// slice - returns new array (doesn't modify original)
const sliced = numbers6.slice(1, 4);
console.log(sliced); // [2, 3, 4]
console.log(numbers6); // [1, 2, 3, 4, 5] (unchanged)

// splice - modifies array (removes/adds elements)
const numbers7 = [1, 2, 3, 4, 5];
numbers7.splice(2, 1, 99); // Remove 1 element at index 2, add 99
console.log(numbers7); // [1, 2, 99, 4, 5]

// concat - combines arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]

// join - converts array to string
const words2 = ["Hello", "World"];
console.log(words2.join(" ")); // "Hello World"
console.log(words2.join("-")); // "Hello-World"

// reverse - reverses array (modifies original)
const numbers8 = [1, 2, 3];
numbers8.reverse();
console.log(numbers8); // [3, 2, 1]

// sort - sorts array (modifies original)
const numbers9 = [3, 1, 4, 1, 5, 9, 2, 6];
numbers9.sort((a, b) => a - b); // Ascending
console.log(numbers9); // [1, 1, 2, 3, 4, 5, 6, 9]

numbers9.sort((a, b) => b - a); // Descending
console.log(numbers9); // [9, 6, 5, 4, 3, 2, 1, 1]

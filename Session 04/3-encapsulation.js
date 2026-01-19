// Encapsulation - Controlling access to properties and methods
// Using private fields (#) and getters/setters

class BankAccount {
  #balance = 0; // Private field (cannot be accessed directly)

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  // Getter - allows read access
  get balance() {
    return this.#balance;
  }

  // Setter - allows controlled write access
  set balance(amount) {
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }
    this.#balance = amount;
  }

  // Public method to deposit
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return `Deposited ${amount}. New balance: ${this.#balance}`;
    }
    return "Invalid deposit amount";
  }

  // Public method to withdraw
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return `Withdrew ${amount}. New balance: ${this.#balance}`;
    }
    return "Insufficient funds or invalid amount";
  }
}

const account = new BankAccount("Ahmed", 1000);
account.balance = -100;

// console.log(account.deposit(500)); // Deposited 500. New balance: 1500
// console.log(account.withdraw(200)); // Withdrew 200. New balance: 1300
// console.log(account.#balance); // Error: Private field cannot be accessed

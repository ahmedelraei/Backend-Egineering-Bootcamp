# Session 9: SOLID Principles in Backend

## Table of Contents
1. [Why SOLID in Backend](#why-solid-in-backend)
2. [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
3. [Open/Closed Principle (OCP)](#openclosed-principle-ocp)
4. [Liskov Substitution Principle (LSP)](#liskov-substitution-principle-lsp)
5. [Interface Segregation Principle (ISP)](#interface-segregation-principle-isp)
6. [Dependency Inversion Principle (DIP)](#dependency-inversion-principle-dip)
7. [Dependency Injection (DI) Concept](#dependency-injection-di-concept)
8. [Key Takeaways](#key-takeaways)

---

## Why SOLID in Backend

Backend systems change a lot: new payment methods, new integrations, new rules.
SOLID keeps code:

- Easier to extend without breaking old features
- Easier to test and debug
- Easier to read when teams grow

All examples below are real-world backend situations, simplified.

---

## Single Responsibility Principle (SRP)

**Definition:** A class or module should have only one reason to change.

### Problem (one class does too much)

```javascript
class OrderService {
  async placeOrder(order) {
    // validate
    if (!order.items || order.items.length === 0) {
      throw new Error("Order is empty");
    }

    // save to database
    await db.insert("orders", order);

    // send email
    await emailClient.send(order.customerEmail, "Order confirmed");
  }
}
```

### Better (split responsibilities)

```javascript
class OrderValidator {
  validate(order) {
    if (!order.items || order.items.length === 0) {
      throw new Error("Order is empty");
    }
  }
}

class OrderRepository {
  async save(order) {
    return db.insert("orders", order);
  }
}

class OrderNotifier {
  async sendConfirmation(email) {
    return emailClient.send(email, "Order confirmed");
  }
}

class OrderService {
  constructor(validator, repository, notifier) {
    this.validator = validator;
    this.repository = repository;
    this.notifier = notifier;
  }

  async placeOrder(order) {
    this.validator.validate(order);
    await this.repository.save(order);
    await this.notifier.sendConfirmation(order.customerEmail);
  }
}
```

**Real-world backend result:** You can change email logic without touching validation or database logic.

---

## Open/Closed Principle (OCP)

**Definition:** Code should be open for extension but closed for modification.

### Real-world example: Payment methods

```javascript
class PaymentProcessor {
  pay(amount) {
    throw new Error("Not implemented");
  }
}

class CardPayment extends PaymentProcessor {
  pay(amount) {
    return paymentGateway.chargeCard(amount);
  }
}

class WalletPayment extends PaymentProcessor {
  pay(amount) {
    return walletService.chargeWallet(amount);
  }
}

function checkout(order, paymentMethod) {
  return paymentMethod.pay(order.total);
}
```

**Add new method** (e.g. BankTransfer) by creating a new class, without changing `checkout`.

---

## Liskov Substitution Principle (LSP)

**Definition:** Subclasses should be usable wherever their base class is expected.

### Bad example (breaks behavior)

```javascript
class FileStorage {
  save(path, content) {
    return fs.writeFileSync(path, content);
  }
}

class ReadOnlyStorage extends FileStorage {
  save(path, content) {
    throw new Error("Read-only storage");
  }
}
```

If code expects `FileStorage`, swapping with `ReadOnlyStorage` breaks it.

### Better (separate interfaces)

```javascript
class ReadableStorage {
  read(path) {
    return fs.readFileSync(path, "utf8");
  }
}

class WritableStorage {
  save(path, content) {
    return fs.writeFileSync(path, content);
  }
}

class DiskStorage extends ReadableStorage {
  save(path, content) {
    return fs.writeFileSync(path, content);
  }
}
```

**Real-world backend result:** If a service needs write access, it should depend on a writable abstraction.

---

## Interface Segregation Principle (ISP)

**Definition:** Clients should not be forced to depend on methods they do not use.

### Bad (fat interface)

```javascript
class Notifier {
  sendEmail(to, message) {}
  sendSMS(to, message) {}
  sendPush(userId, message) {}
}
```

### Better (small interfaces)

```javascript
class EmailNotifier {
  sendEmail(to, message) {
    return emailClient.send(to, message);
  }
}

class SmsNotifier {
  sendSMS(to, message) {
    return smsClient.send(to, message);
  }
}

class InvoiceService {
  constructor(emailNotifier) {
    this.emailNotifier = emailNotifier;
  }

  sendInvoice(email, pdfLink) {
    return this.emailNotifier.sendEmail(email, `Invoice: ${pdfLink}`);
  }
}
```

**Real-world backend result:** Invoice logic only depends on email, not SMS or push.

---

## Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules. Both should depend on abstractions.

### Example: User service depends on repository abstraction

```javascript
class UserRepository {
  async findById(id) {
    throw new Error("Not implemented");
  }
}

class PostgresUserRepository extends UserRepository {
  async findById(id) {
    return db.query("SELECT * FROM users WHERE id=$1", [id]);
  }
}

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getProfile(userId) {
    return this.userRepository.findById(userId);
  }
}
```

**Real-world backend result:** You can swap PostgreSQL with MongoDB without changing `UserService`.

---

## Dependency Injection (DI) Concept

**Definition:** DI is the practice of providing dependencies from the outside instead of creating them inside a class.

### Simple manual DI example

```javascript
const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);
```

### Why DI is useful

- Easier testing with fake dependencies
- Clearer module boundaries
- Reusable services

### Example: Testing with a fake repository

```javascript
class FakeUserRepository extends UserRepository {
  async findById(id) {
    return { id, name: "Test User" };
  }
}

const userService = new UserService(new FakeUserRepository());
const profile = await userService.getProfile(123);
```

---

## Key Takeaways

1. **SRP** keeps backend classes focused.
2. **OCP** lets you add features without editing stable code.
3. **LSP** ensures replacements do not break behavior.
4. **ISP** avoids forcing unused methods on services.
5. **DIP** makes high-level logic independent from details.
6. **DI** makes all of the above easier to test and maintain.


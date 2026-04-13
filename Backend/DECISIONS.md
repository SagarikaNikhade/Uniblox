# 📄 DECISIONS.md

This document outlines key design decisions made while implementing the e-commerce backend assignment.

---

## 🧠 Decision 1: Use In-Memory Storage Instead of Database

**Context:**
The assignment explicitly mentioned that a database is not required.

**Options Considered:**

* Option A: Use MongoDB
* Option B: Use in-memory storage

**Choice:**
Used in-memory storage (`store.ts`)

**Why:**

* Faster to implement
* No setup required
* Keeps focus on business logic
* Easy to replace with database later

---

## 🧠 Decision 2: Use TypeScript Instead of JavaScript

**Context:**
Need to ensure code quality and type safety.

**Options Considered:**

* Option A: JavaScript
* Option B: TypeScript

**Choice:**
Used TypeScript

**Why:**

* Provides type safety
* Reduces runtime errors
* Improves code readability and maintainability
* Aligns with production-level backend practices

---

## 🧠 Decision 3: Follow MVC Structure (Model–Controller–Route)

**Context:**
Organizing code for scalability and clarity.

**Options Considered:**

* Option A: Single file (monolithic)
* Option B: Layered architecture (MVC)

**Choice:**
Used MVC structure

**Why:**

* Separates concerns clearly
* Easier to maintain and scale
* Improves readability
* Industry-standard practice

---

## 🧠 Decision 4: Implement Discount Logic in Checkout Flow

**Context:**
Where to handle coupon generation and validation.

**Options Considered:**

* Option A: Separate discount service
* Option B: Handle inside checkout

**Choice:**
Implemented inside checkout controller

**Why:**

* Discount is tightly coupled with order placement
* Keeps logic centralized
* Simpler implementation for assignment scope

---

## 🧠 Decision 5: Use “Every Nth Order” Logic for Coupon Generation

**Context:**
Assignment required generating coupons based on order count.

**Options Considered:**

* Option A: Time-based coupons
* Option B: Order count-based coupons

**Choice:**
Used order count logic (every 3rd order)

**Why:**

* Matches assignment requirement
* Easy to implement and test
* Scalable for future changes

---

## 🧠 Decision 6: Use `isUsed` Flag for Coupon Validation

**Context:**
Prevent reuse of coupons.

**Options Considered:**

* Option A: Delete coupon after use
* Option B: Mark coupon as used

**Choice:**
Used `isUsed` flag

**Why:**

* Keeps coupon history intact
* Allows tracking usage
* Easier for analytics and debugging

---

## 🧠 Decision 7: Generate Unique Coupon Codes

**Context:**
Ensure coupon codes are unique.

**Options Considered:**

* Option A: Static codes
* Option B: Dynamic codes

**Choice:**
Generated dynamic codes (e.g., `SAVE10-3`, `ADMIN-<timestamp>`)

**Why:**

* Prevents duplication
* Easy identification
* More realistic approach

---

## 🧠 Decision 8: Basic Validation in Controllers

**Context:**
Where to validate request data.

**Options Considered:**

* Option A: Middleware validation (Zod/Joi)
* Option B: Inline validation in controller

**Choice:**
Used inline validation

**Why:**

* Simpler for assignment scope
* Faster implementation
* Can be refactored later

---

## 🧠 Decision 9: No Authentication Layer

**Context:**
Whether to secure admin APIs.

**Options Considered:**

* Option A: Add authentication (JWT)
* Option B: Keep APIs open

**Choice:**
Kept APIs open

**Why:**

* Not required by assignment
* Focus was on core functionality
* Can be added later as enhancement

---

## 🧠 Decision 10: Use UUID for Order IDs

**Context:**
Need unique identifiers for orders.

**Options Considered:**

* Option A: Incremental IDs
* Option B: UUID

**Choice:**
Used UUID

**Why:**

* Guarantees uniqueness
* Suitable for distributed systems
* Industry best practice

---

## 🎯 Summary

The overall design prioritizes:

* Simplicity
* Clean structure
* Business logic clarity
* Easy extensibility

The system can be easily extended with:

* Database integration
* Authentication
* Product catalog
* Frontend UI

---
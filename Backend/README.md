# 🛒 E-commerce Backend Assignment (TypeScript + Node.js)

## 📌 Overview

This project is a **mini e-commerce backend system** that allows users to:

* Add items to a cart
* Checkout and place orders
* Apply discount coupons
* Automatically receive coupons based on order count

It also includes **admin APIs** to manage coupons and view system statistics.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **In-Memory Storage (No Database)**

---

## 📂 Project Structure

```
src/
  app.ts
  models/
  controllers/
  routes/
  store/
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>

```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

Server will run on:

```
http://localhost:8000
```

---

## 📡 API Endpoints

---

### 🛒 Cart APIs

#### ➤ Add Item to Cart

```
POST /cart/add
```

**Request Body:**

```json
{
  "productId": "p1",
  "name": "Shoes",
  "price": 1000,
  "quantity": 2
}
```

---

#### ➤ Get Cart

```
GET /cart
```

---

### 💳 Checkout API

#### ➤ Checkout

```
POST /checkout
```

**Request Body (optional coupon):**

```json
{
  "couponCode": "SAVE10-3"
}
```

---

### 🎟️ Discount System

* Every **3rd order** generates a coupon
* Example coupon:

```
SAVE10-3
```

* Coupons provide **10% discount**
* Coupons can only be used **once**

---

### 🧑‍💼 Admin APIs

#### ➤ Generate Coupon

```
POST /admin/generate-coupon
```

**Request Body:**

```json
{
  "discountPercent": 20
}
```

---

#### ➤ Get Stats

```
GET /admin/stats
```

**Response includes:**

* Total items sold
* Total revenue
* Total discount given
* Total orders
* All coupons

---

## 🧠 Business Logic

### ✅ Cart

* Adds items
* Updates quantity if item exists

### ✅ Checkout

* Calculates total price
* Applies coupon (if valid)
* Creates order
* Updates stats
* Clears cart

### ✅ Discount System

* Every 3rd order → auto-generate coupon

### ✅ Coupon Validation

* Checks if coupon exists
* Checks if already used
* Applies discount

---

## 📊 Data Storage

This project uses **in-memory storage**:

* No database required
* Data resets when server restarts

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client
* cURL

---

## 📄 Future Improvements

* Add database (MongoDB)
* Add authentication
* Add product catalog
* Add frontend UI

---

## 📌 Notes

This project focuses on:

* Clean architecture
* Business logic implementation
* Scalable design thinking

---

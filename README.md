# 🛒 E-Commerce Store (MERN + TypeScript)

A full-stack ecommerce system built using **Node.js, Express, TypeScript, and React** with an in-memory JSON database.  
The system supports cart management, checkout, coupon generation, and an admin dashboard.

---

## 🚀 Features

### 🧑 User Features
- Add products to cart
- View cart with real-time updates
- Checkout system
- Apply discount coupons
- Automatic discount applied on checkout

---

### 🎟️ Coupon System
- Every **nth order** generates a coupon automatically
- Coupon provides **x% discount**
- Coupons can be used only once
- Coupon validation during checkout

---

### 🧑‍💼 Admin Features
- Dashboard with tabs:
  - 📊 Stats
  - 🎟️ Coupons
  - 📦 Orders
- Update discount configuration:
  - nth order rule
  - discount percentage
- View:
  - Total revenue
  - Total orders
  - Total discount given
  - All coupons with status

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- File-based JSON storage (no database)

### Frontend
- React (TypeScript)
- CSS (Flexbox layout)
- Fetch API

---

## 📦 Project Structure
Backend/
src/
controllers/
routes/
utils/
db.json

Frontend/
src/
components/
App.tsx


---

## ⚙️ Setup Instructions

### Backend

```bash
cd Backend
npm install
npm run dev

### Frontend

```bash
cd frontend
npm install
npm start

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

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client
* cURL

## 📄 Future Improvements

* Add database (MongoDB)
* Add authentication
* Add product catalog

---

## 📌 Notes

This project focuses on:

* Clean architecture
* Business logic implementation
* Scalable design thinking

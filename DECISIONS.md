
---

# ✅ DECISIONS.md (FINAL)

```md
# 📘 Design Decisions

---

## Decision 1: Using JSON File Instead of Database

**Context:**  
The assignment did not require a database.

**Options Considered:**
- MongoDB database
- PostgreSQL database
- JSON file storage

**Choice:**  
JSON file storage

**Why:**  
- Faster development
- No setup overhead
- Suitable for in-memory simulation
- Easy to debug and inspect state

---

## Decision 2: Cart-Level Discount System

**Context:**  
Need to apply discount during checkout.

**Options Considered:**
- Product-level discount
- Category-level discount
- Cart-level discount

**Choice:**  
Cart-level discount

**Why:**
- Simpler implementation
- Covers full order value
- Easier to validate coupon logic
- Matches typical ecommerce checkout flow

---

## Decision 3: Automatic Coupon Generation

**Context:**  
Every nth order should generate a coupon.

**Options Considered:**
- Manual admin-generated coupons
- Automatic generation during checkout

**Choice:**  
Automatic generation during checkout

**Why:**
- Reduces API complexity
- Ensures consistency with order flow
- Eliminates unnecessary admin actions

---

## Decision 4: Dynamic Discount Configuration

**Context:**  
nth order and discount value should not be hardcoded.

**Options Considered:**
- Hardcoded values
- Environment variables
- Admin-configurable API

**Choice:**  
Admin-configurable API

**Why:**
- Allows runtime updates
- More flexible and scalable
- Simulates real-world ecommerce systems

---

## Decision 5: Tab-Based Admin Dashboard UI

**Context:**  
Admin needs to manage multiple data types (stats, coupons, orders).

**Options Considered:**
- Separate pages
- Single scroll page
- Tab-based UI

**Choice:**  
Tab-based UI

**Why:**
- Better UX
- Organized data separation
- Easier navigation
- Scalable for future features

---

## Decision 6: No Manual Coupon Generation API

**Context:**  
Initial design included manual coupon creation.

**Change:**
Removed manual coupon API

**Why:**
- Coupons are already generated automatically via nth order logic
- Avoids redundancy
- Keeps system simple and clean

---

## Final Outcome

The system demonstrates:
- Full-stack integration
- Dynamic business logic
- Scalable architecture thinking
- Clean separation of concerns
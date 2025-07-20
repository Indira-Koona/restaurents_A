# RestoRoute API

A lightweight RESTful API built using **Express.js** and **SQLite** for managing restaurants and dishes. This project supports filtering and sorting through query parameters and includes sample seed data.

---

## 🚀 Features

- Get all restaurants and dishes
- Filter and sort restaurants by cuisine, rating, price, etc.
- Filter and sort dishes by type (Veg/Non-Veg), rating, and price
- Easy to set up with SQLite and Express

---

## 📁 Project Structure
├── app.js # Main Express server
├── database.js # SQLite database setup and seed data
├── package.json
└── static/ # Static files (if any)

---

## 📦 Installation

1. Clone the repository:

```bash
https://github.com/your-username/RestoRoute-API.git
cd RestoRoute-API
🔗 API Endpoints
🍽️ Restaurants
GET /restaurants

Query params: cuisine, location, isVeg, isLuxury, sortBy

Example: /restaurants?cuisine=Indian&sortBy=rating

🥘 Dishes
GET /dishes

Query params: isVeg, sortBy

Example: /dishes?isVeg=true&sortBy=price

🗃️ Sample Data
The app comes preloaded with 3 restaurants and 3 dishes. Check database.js to edit or add more.

📌 Technologies Used
Node.js

Express.js

SQLite

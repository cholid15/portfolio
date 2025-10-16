# 💻 Portfolio Full Stack (React + Node.js + MySQL)

Project ini merupakan website portfolio dengan **frontend React** dan **backend Node.js (Express)** yang terhubung ke **database MySQL (phpMyAdmin)**.  
Frontend dibuat menggunakan **Yarn**, dan backend berfungsi untuk menangani form kontak serta menyimpan data ke database MySQL.

---

## 🧩 Struktur Folder

portfolio/
│
├── backend/ # Server Node.js (Express + MySQL)
│ ├── server.js
│ ├── package.json
│ └── node_modules/
│
├── src/ # Frontend React
│ └── components/
│
├── public/
├── package.json # Frontend dependencies
├── yarn.lock
└── README.md

---

## ⚙️ Instalasi & Persiapan

yarn install

yarn add axios sweetalert2

cd backend
yarn init -y
yarn add express mysql2 cors dotenv

## jalankan "yarn start" pada 2 terminal

yarn start (front end)
yarn start (back end)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/portfolio.git
cd portfolio
```

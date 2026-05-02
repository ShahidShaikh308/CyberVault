# ⚡ CyberVault: Next-Gen Digital Storefront

CyberVault is a high-performance, full-stack digital game distribution platform built with the *MERN stack*. It features a state-driven "Cyberpunk" UI, automated featured asset circulation, and a secure transaction migration protocol.<br><br>

## 🚀 Technical Core (The Stack)
This project operates as a decoupled architecture where the frontend and backend communicate via RESTful API protocols.

* **Frontend:** React.js with Vite for high-speed development.

* **Styling:** Tailwind CSS combined with custom CSS for "Glitch" effects and scanline overlays.

* **Backend:** Node.js and Express.js powering a modular routing system.

* **Database:** MongoDB Atlas utilizing structured collections for Games, Users, Carts, and Owned assets.
<br><br>

## 🛠️ Key Features
**Automated Circulation:** A smart carousel that cycles through first 5 games in the database every 8 seconds.

**Cinematic Rendering:** High-resolution banners (Elden Ring, Zelda, etc.) are rendered with a slow-zoom effect and readable glassmorphism overlays.
<br><br>

## 🔐 Transaction Migration Protocol
**Atomic Checkout:** A custom backend process that migrates data from the Cart to the Owned collection and records a permanent ledger in Orders in a single transaction.

**Instant Authorization:** A simulated high-tech payment terminal handles direct "Buy Now" requests and multi-item cart checkouts.
<br><br>

## 📂 Asset Management
**Library Systems:** Dual-tabbed inventory allowing users to switch between their permanent Owned assets and Wishlist priority tracking.

**Dynamic Details:** Dynamic routing allows for deep-dives into game metadata, descriptions, and high-fidelity trailers using URL parameters.
<br><br>

## 🔧 Installation & Setup

### Clone the Vault:
```Bash
git clone https://github.com/ShahidShaikh308/CyberVault.git
cd CyberVault
```

### Configure Neural Keys:
Create a .env file in the backend/ directory and add your MongoDB connection string.
```Code snippet
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Initialize Backend:
```Bash
cd backend
npm install
node seed.js
npm start
```

### Initialize Frontend:
``` Bash
cd ../frontend
npm install
npm run dev 
```

## 🎨 Visual Identity

* **Aesthetic:** Cyberpunk / Terminal.
* **Primary Colors:** Cyan #06b6d4, Fuchsia #c026d3, and Deep Black #000000.
* **Effects:** Scanline CRT overlays, backdrop blurring, and neon glow text-shadows.
<br><br>

***Developed by Shahid Shaikh.***<br>
*Specializing in Computer Science and Machine Learning research.*

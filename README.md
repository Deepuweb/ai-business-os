# 🤖 AI Operating System for Small Businesses

A full-stack **MERN + AI** application that gives small business owners (such as neighborhood grocery stores) a single dashboard for **sales, inventory, customers, and an AI assistant**.

---

## ✨ Key Features

- **Dashboard** with sales analytics and weekly sales charts
- **Product & Inventory Management** (add, update, track products)
- **Sales Management** (create and record sales)
- **Customer Management**
- **Secure Authentication** using JWT and bcrypt
- **AI Assistant** that answers business questions in natural language using **LLM tool calling** (e.g., *"How much did I sell today?"*)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Authentication | JWT + bcrypt |
| AI | Groq API (LLM with tool calling) |
| Charts | Recharts |

---

## 📂 Project Structure

```
ai-business-os/
├── backend/     → Node.js + Express + MongoDB REST API
└── frontend/    → React + Vite + Tailwind CSS web app
```

---

## 🧠 How It Works

### Frontend (React)
The user-facing part of the app: dashboard, forms, buttons, tables, charts, and the AI chat box. It never talks to the database directly. It only sends requests to the backend.

### Backend (Node.js + Express)
The bridge between the frontend and the database. When the frontend asks for data (e.g., "show me all products"), the backend fetches it from MongoDB and returns it. It also handles login, password verification, and security.

### Database (MongoDB)
Stores all application data: products, customers, sales records, and users. It can be hosted for free on the cloud using MongoDB Atlas.

### Authentication (JWT + bcrypt)
When an owner logs in, the backend issues a **token** (a digital pass). The token is sent with every subsequent request so the backend knows who is making it. Passwords are never stored in plain text. They are hashed with **bcrypt** before being saved.

### AI Assistant (Groq API + Tool Calling)
The most interesting part of the project. Here is what happens when the owner asks, *"How much did I sell today?"*:

1. The question is sent to the AI model (Groq LLM).
2. The AI cannot access MongoDB directly, so it decides to call a function such as `getTodaySales()`.
3. The backend actually executes that function and fetches the real number from MongoDB.
4. The result is passed back to the AI.
5. The AI turns it into a human-friendly answer: *"Your total sales today were ₹5,500."*

This pattern is called **Tool Calling** (or **Function Calling**). The AI acts only as the "brain". The real data always comes from the database.

### Charts (Recharts)
The dashboard displays a weekly sales line chart built with Recharts, using data fetched from the API.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js and npm
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A free [Groq](https://console.groq.com) API key

### Step 1: Set up MongoDB Atlas
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster, click **Connect**, and copy the connection string

### Step 2: Get a Groq API key
1. Sign up for free at https://console.groq.com
2. Generate an API key

### Step 3: Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open the `.env` file and fill in your values:

```env
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any long random string>
GROQ_API_KEY=<your Groq API key>
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend will run at `http://localhost:5000`.

### Step 4: Set up the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

### Step 5: Try it out
1. Register a business account on the **Register** page
2. Add a few products on the **Products** page
3. Create a sale on the **Sales** page
4. Open the **AI Assistant** page and ask: *"How much did I sell today?"*

---

## 🚀 Future Enhancements

- WhatsApp integration
- Hindi voice-based AI assistant
- GST invoice generation
- AI-powered sales prediction (demand forecasting from historical data)
- Multi-business and multi-user support

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


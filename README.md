# 🤖 AI Operating System for Small Businesses

Ye ek **MERN + AI** project hai jo small business owners (jaise kirana shop) ke
liye sales, inventory, customers aur AI assistant ek hi dashboard mein deta hai.

## 📂 Project Structure

```
ai-business-os/
├── backend/          → Node.js + Express + MongoDB API
└── frontend/         → React + Vite + Tailwind website
```

## 🧠 Ye Project Kaam Kaise Karta Hai (Hinglish mein)

1. **Frontend (React)** — ye website ka wo part hai jo user dekhta hai:
   dashboard, forms, buttons, tables, charts, AI chat box. Ye khud database
   se baat nahi karta — sirf backend ko request bhejta hai.

2. **Backend (Node + Express)** — ye "beech ka pul" hai. Frontend se request
   aati hai (jaise "mujhe products dikhao"), backend MongoDB se data nikaal ke
   wapas bhej deta hai. Login/password check karna, security, sab yahin hota hai.

3. **Database (MongoDB)** — yahan asli data store hota hai: products,
   customers, sales records, users. MongoDB Atlas use karke ise cloud mein
   free mein host kar sakte ho.

4. **Authentication (JWT + bcrypt)** — jab owner login karta hai, backend ek
   "token" deta hai (jaise ek digital pass). Har agli request mein ye token
   bhejna padta hai taaki backend jaan sake "ye request kisne bheji hai".
   Password kabhi plain text mein store nahi hota — bcrypt use karke usse
   hash (scramble) kar dete hain.

5. **AI Assistant (Groq API + Tool Calling)** — ye project ka sabse interesting
   part hai. Jab owner poochta hai "Aaj ki sales kitni hui?":
   - Ye sawaal AI (Groq LLM) ko jata hai
   - AI khud MongoDB se data nahi nikal sakta, isliye AI decide karta hai
     "mujhe `getTodaySales()` function chalana hai"
   - Backend wo function actually chalata hai, MongoDB se real number laata hai
   - Wo number wapas AI ko diya jata hai
   - AI usse insaani language mein jawab banata hai: "Aaj aapki total sales
     ₹5,500 hui."

   Isko **"Tool Calling"** ya **"Function Calling"** kehte hain — AI sirf
   "dimag" hai, asli data uska nahi, database ka hai.

6. **Charts (Recharts)** — dashboard par sales ka graph dikhane ke liye
   Recharts library use hui hai, jisme `weekly sales` API se data leke line
   chart banaya jata hai.

## ⚙️ Setup Kaise Karein

### Step 1 — MongoDB Atlas account banao
1. https://www.mongodb.com/cloud/atlas par free account banao
2. Ek free cluster banao, "Connect" karke connection string copy karo

### Step 2 — Groq API key lo
1. https://console.groq.com par jaake free signup karo
2. API key generate karo

### Step 3 — Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

`.env` file kholo aur apni values daalo:
```
MONGO_URI=<apna MongoDB Atlas connection string>
JWT_SECRET=<koi bhi random long string>
GROQ_API_KEY=<apni Groq API key>
PORT=5000
```

Backend start karo:
```bash
npm run dev
```
Ab `http://localhost:5000` par backend chal raha hoga.

### Step 4 — Frontend setup

Naye terminal mein:
```bash
cd frontend
npm install
npm run dev
```
Ab `http://localhost:5173` par website khulegi.

### Step 5 — Test karo
1. Register page par apna business account banao
2. Kuch products add karo (Products page)
3. Ek sale create karo (Sales page)
4. AI Assistant page par poocho: "Aaj ki sales kitni hui?"

## 🚀 Future Features (baad mein add kar sakte ho)
- WhatsApp integration
- Hindi voice-based AI
- GST invoice generation
- AI sales prediction (historical data se demand forecast)
- Multiple businesses / multi-user support

## 📊 Tech Stack

| Layer              | Technology       |
|--------------------|------------------|
| Frontend           | React + Vite     |
| Styling            | Tailwind CSS     |
| Backend            | Node.js + Express|
| Database           | MongoDB Atlas    |
| Auth               | JWT + bcrypt     |
| AI                 | Groq API         |
| Charts             | Recharts         |

---


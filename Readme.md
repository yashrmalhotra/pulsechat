# PulseChat ⚡

**PulseChat** is a real-time messaging and calling platform built with an event-driven architecture.
It supports instant messaging, delivery and read receipts, voice/video calls, and scalable message persistence using Kafka.

The system is designed to demonstrate **modern backend architecture**, including streaming pipelines, caching, presence systems, and containerized development.

---

# 🚀 Features

### 💬 Messaging

* Real-time messaging using Socket.IO
* **Single tick** – message sent
* **Double black tick** – message delivered
* **Double blue tick** – message read
* Messages grouped by date similar to modern chat apps
* Recent chat list with last message preview

### 📞 Calling

* Voice calls using WebRTC
* Video calls using WebRTC
* Call logs saved asynchronously via Kafka

### 👁️ Presence System

* Online/offline status
* Last seen tracking
* Presence stored in Redis

### ⚙️ Settings

* Option to disable read receipts
* Privacy controls for last seen

---

# 🧠 System Architecture

PulseChat follows an **event-driven architecture**.

```
Client
   │
   ▼
Frontend (Next.js / Vercel)
   │
   ▼
Backend API + Socket.IO (Render)
   │
   ▼
Kafka Event Stream
   │
   ▼
Kafka Consumer Service
   │
   ▼
MongoDB (Atlas)
```

### Supporting Services

```
Redis (Aiven)
 ├─ user cache
 └─ presence status

Kafka (Aiven)
 ├─ chat events
 └─ call events
```

---

# 🛠 Tech Stack

### Frontend

* Next.js
* React
* Socket.IO client
* WebRTC

### Backend

* Node.js
* Express
* Socket.IO
* Kafka (KafkaJS)

### Databases & Infrastructure

* MongoDB Atlas
* Redis (Aiven)
* Kafka (Aiven)

### DevOps

* Docker
* Docker Compose
* Vercel (frontend hosting)
* Render (backend hosting)

---

# 📦 Event Driven Messaging

Instead of writing messages directly to the database, PulseChat publishes events to Kafka.

```
sendMessage
   │
   ▼
Kafka Topic
   │
   ▼
Consumer
   │
   ▼
MongoDB
```

Advantages:

* Prevents message loss if DB is down
* Allows replaying events
* Enables scalable microservices

---

# 🔄 Redis Usage

Redis is used for:

* caching user details
* tracking presence status
* storing active socket connections

Example presence key:
```
user:{userId}:online
```

---

# 🐳 Local Development (Docker)

In development, infrastructure runs inside Docker containers.

Services:

* MongoDB
* Redis
* Kafka

Run:

```
docker-compose up
```

---

# 📁 Project Structure

```
pulsechat/
│
├── client/                         # Next.js Frontend
│   │
│   ├── app/                        # App Router pages
│   │   ├── chat/
│   │   ├── calls/
│   │   └── settings/
│   │
│   ├── public/                     # Static assets (favicon, icons)
│   │
│   ├── Types/                      # TypeScript types
│   │
│   ├── utils/                      # Helper functions
│   │
│   ├── .env                        # Frontend environment variables
│   ├── Dockerfile                  # Client docker image
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
│
│
├── server/                         # Backend API + Socket Server
│   │
│   ├── src/
│   │   │
│   │   ├── config/                 # DB, Redis, Kafka configs
│   │   │
│   │   ├── controllers/            # Route handlers
│   │   │
│   │   ├── models/                 # MongoDB models
│   │   │   ├── Message.ts
│   │   │   └── Call.ts
│   │   │
│   │   ├── services/               # Business logic
│   │   │   ├── chat.service.ts
│   │   │   └── call.service.ts
│   │   │
│   │   ├── kafka/
│   │   │   ├── producer.ts
│   │   │   └── consumer.ts
│   │   │
│   │   ├── redis/
│   │   │   └── presence.ts
│   │   │
│   │   ├── socket/
│   │   │   └── socket.ts           # Socket.IO events
│   │   │
│   │   ├── routes/
│   │   │
│   │   ├── utils/
│   │   │
│   │   └── index.ts                # App entry point
│   │
│   ├── dist/                       # Compiled JS output
│   ├── .env
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
│
│
├── docker-compose.yml              # Local dev infrastructure
│
└── README.md
```

---

# 🔐 Environment Variables

Create a `.env` file in the backend root.

```
# Server
PORT=3001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pulsechat
REDIS_URL=
KAFKA_BROKER=your-kafka-broker:9092
KAFKA_USERNAME=yourusername
KAFKA_PASSWORD=yourpassword
KAFKA_CA=your-kafka-certificate
CLIENT_URL=http://localhost:3000


#For email verificatin
APP_PASS=your_app_pass
EMAIL=sender_email

#for google oauth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_id
CALLBACK_URL=oauth_callback_url






Frontend `.env`:

```
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
```

---

# 🧪 Running Locally

1️⃣ Clone repo

```
git clone https://github.com/yourusername/pulsechat.git
```

2️⃣ Install dependencies

```
npm install
```

3️⃣ Start Docker services

```
docker-compose up
```

4️⃣ Start backend

```
npm run dev
```

5️⃣ Start frontend

```
npm run dev
```

---

# 📊 Resume Highlight

This project demonstrates:

* Real-time system design
* Event-driven architecture
* Kafka message pipelines
* Redis caching & presence systems
* WebRTC calling infrastructure
* Scalable chat backend

---

# 📜 License

MIT License

---

# 👨‍💻 Author

Yash Malhotra

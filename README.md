# Conversa

Conversa is a full-stack social media application that allows users to create posts, discover people, follow users, like posts, and connect through conversations across both mobile and web platforms.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Auto Login
- Logout
- Secure Token Storage
- API Rate Limiting

### Posts

- Create Posts
- View Feed
- Like Posts
- Unlike Posts
- Delete Own Posts
- View User Posts
- View Liked Posts

### Users

- Search Users
- View User Profiles
- Follow Users
- Unfollow Users
- View Followers & Following
- Click User to Open Their Profile

### Mobile App

- React Native
- Expo Router
- Dark Theme UI
- Bottom Tab Navigation
- Secure Authentication

### Web App

- React + Vite
- Tailwind CSS
- Protected Routes
- Responsive UI
- Same Design Language as Mobile

---

# Tech Stack

## Frontend (Mobile)

- React Native
- Expo
- Expo Router
- TypeScript
- Zustand
- Axios
- Expo Secure Store
- React Native Safe Area Context

## Frontend (Web)

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-rate-limit
- CORS
- dotenv

---

# Folder Structure

```text
Conversa
│
├── Backend
│   ├── Config
│   ├── Controllers
│   ├── Middlewares
│   ├── Models
│   ├── Routes
│   ├── server.ts
│   └── package.json
│
├── Mobile
│   ├── api
│   ├── app
│   │   ├── (tabs)
│   │   ├── Index.tsx
│   │   ├── Register.tsx
│   │   └── _layout.tsx
│   ├── constants
│   ├── store
│   ├── utils
│   └── package.json
│
└── Web
    ├── src
    │   ├── api
    │   ├── components
    │   ├── constants
    │   ├── pages
    │   ├── store
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/conversa.git
```

```bash
cd conversa
```

---

# Backend Setup

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run

```bash
npm run dev
```

Backend

```
http://localhost:5000
```

---

# Mobile Setup

```bash
cd Mobile
```

Install

```bash
npm install
```

Run

```bash
npx expo start
```

For Android Emulator

```ts
baseURL: "http://10.0.2.2:5000/api";
```

For Physical Device

```ts
baseURL: "http://YOUR_LOCAL_IP:5000/api";
```

---

# Web Setup

```bash
cd Web
```

Install

```bash
npm install
```

Run

```bash
npm run dev
```

Web

```
http://localhost:5173
```

---

# API Routes

## Authentication

| Method | Route              | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register User    |
| POST   | /api/auth/login    | Login User       |
| GET    | /api/auth/me       | Get Current User |

---

## Posts

| Method | Route                 | Description |
| ------ | --------------------- | ----------- |
| POST   | /api/posts            | Create Post |
| GET    | /api/posts/feed       | Get Feed    |
| POST   | /api/posts/:id/like   | Like Post   |
| POST   | /api/posts/:id/unlike | Unlike Post |
| DELETE | /api/posts/:id        | Delete Post |

---

## Users

| Method | Route                       | Description   |
| ------ | --------------------------- | ------------- |
| GET    | /api/users/search           | Search Users  |
| GET    | /api/users/:username        | User Profile  |
| PUT    | /api/users/:userId/follow   | Follow User   |
| PUT    | /api/users/:userId/unfollow | Unfollow User |

---

# Authentication Flow

```text
Register/Login
      │
      ▼
Backend returns JWT
      │
      ▼
Token stored securely
      │
      ▼
User stored in Zustand
      │
      ▼
Protected Routes
      │
      ▼
Access Granted
```

---

# Screens

## Mobile

- Login
- Register
- Home
- Search
- Create
- Profile

## Web

- Login
- Register
- Home
- Search
- Create
- Profile

---

# Security

- JWT Authentication
- Protected Routes
- API Rate Limiting
- Password Hashing (bcrypt)
- Secure Token Storage
- Authentication Middleware


---

# Author

Developed by Tanishq Chauhan

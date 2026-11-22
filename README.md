# Conversa

Conversa is a full-stack social media application for sharing text posts, discovering people, following users, and liking posts across mobile and web.

---

## Features

### Authentication

- User Registration
- User Login
- Google Sign-in through Better Auth
- JWT Authentication
- Protected Routes
- Auto Login
- Logout
- Secure Token Storage on Mobile; Browser localStorage on Web
- API Rate Limiting

### Posts

- Create Posts
- View Feed from Yourself and Followed Users
- Like Posts
- Unlike Posts
- Delete Own Posts through the API
- View User Posts
- View Liked Posts

### Users

- Search Users
- View User Profiles
- Follow Users
- Unfollow Users
- View Follower & Following Counts
- Click User to Open Their Profile

### Mobile App

- React Native
- Expo Router
- Bottom Tab Navigation
- Secure Authentication
- Google Sign-in in Expo Development Builds

### Web App

- React + Vite
- Protected Routes
- Responsive UI
- Public Landing Page
- Google Sign-in

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
- Better Auth Expo Client
- React Native Safe Area Context

## Frontend (Web)

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- Axios
- Better Auth Client

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
- Better Auth
- Redis (Optional Response Cache)

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
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── Mobile
│   ├── api
│   ├── app
│   │   ├── (tabs)
│   │   ├── index.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── _layout.tsx
│   ├── constants
│   ├── components
│   ├── store
│   ├── utils
│   ├── .env.example
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
    │   ├── tokens.css
    │   ├── base.css
    │   ├── index.css
    │   └── main.tsx
    ├── .env.example
    └── package.json
```

---

# Installation

Install Node.js with npm and have a running MongoDB instance or MongoDB Atlas connection. Redis is optional; requests use MongoDB directly when Redis is unavailable. Google sign-in requires a Google OAuth Web application client.

## Clone Repository

```bash
git clone https://github.com/Alwaystanishq/Conversa.git
```

```bash
cd Conversa
```

Run each setup section below from the repository root. Each app has its own dependencies and runs in a separate terminal.

---

# Backend Setup

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

Copy the environment template to `.env` and replace the placeholder secrets and credentials.

```bash
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/conversa
JWT_SECRET=replace-with-a-random-secret
REDIS_URL=redis://127.0.0.1:6379
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET=replace-with-a-random-secret-at-least-32-characters
WEB_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=your-google-web-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Keep an existing `JWT_SECRET` when upgrading. See the Google sign-in and Redis section below for OAuth configuration.

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

Create the mobile `.env` from its template:

```bash
cp .env.example .env
```

Run

```bash
npx expo start
```

For an Android emulator, set this in `Mobile/.env`:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

For a physical device, use your computer's LAN address and keep both devices on the same network:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000
```

Use the backend origin without `/api`; the API client appends it. Restart Expo after changing the environment. Google sign-in requires an Expo development build and a publicly reachable HTTPS backend, as described below.

---

# Web Setup

```bash
cd Web
```

Install

```bash
npm install
```

Create `Web/.env` from the template:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000
```

Use the backend origin without `/api`. Keep `WEB_ORIGIN` in the backend environment aligned with the web app's origin.

Run

```bash
npm run dev
```

Web

```
http://localhost:5173
```

Build and check the web app:

```bash
npm run build
npm run lint
```

---

# API Routes

## Authentication

| Method | Route                    | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| POST   | /api/auth/register       | Register User                           |
| POST   | /api/auth/login          | Login User                              |
| GET    | /api/auth/me             | Get Current User                        |
| POST   | /api/auth/sign-in/social | Start Google Sign-in (Better Auth) |
| POST   | /api/auth/google         | Exchange a Google Session for an App JWT |

---

## Posts

| Method | Route                 | Description |
| ------ | --------------------- | ----------- |
| POST   | /api/posts            | Create Post |
| GET    | /api/posts/feed       | Get Feed    |
| POST   | /api/posts/:id/like   | Like Post   |
| POST   | /api/posts/:id/unlike | Unlike Post |
| DELETE | /api/posts/:id        | Delete Post |

All post routes require an `Authorization: Bearer <token>` header. Only the post's author can delete it.

---

## Users

| Method | Route                       | Description   |
| ------ | --------------------------- | ------------- |
| GET    | /api/users/search           | Search Users  |
| GET    | /api/users/:username        | User Profile  |
| PUT    | /api/users/:userId/follow   | Follow User   |
| PUT    | /api/users/:userId/unfollow | Unfollow User |

All user routes require an `Authorization: Bearer <token>` header. Search accepts `?query=...`; profile responses include the user's posts and liked posts.

---

# Authentication Flow

```text
Email/Password Register/Login
or Google Sign-in → Better Auth Session → /api/auth/google
      │
      ▼
Backend returns JWT
      │
      ▼
Token stored in SecureStore (mobile)
or localStorage (web)
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

- Landing
- Login
- Register
- Home
- Search
- Create
- Profile

---

# Security

- JWT Authentication with 30-day Token Expiry
- Protected Routes
- API Rate Limiting
- Password Hashing (bcrypt)
- Expo SecureStore on Mobile; localStorage on Web
- Authentication Middleware
- Google OAuth through Better Auth
- Backend-only Google Client Secret


---

## Google sign-in and Redis

Email/password login and JWT storage continue to work as before. Google sign-in uses Better Auth, then exchanges its session at `POST /api/auth/google` for the app's existing JWT. No account migration is needed. Better Auth blocks automatic linking to existing password accounts whose local email has not been verified; those accounts can continue using password login.

Add the values from `Backend/.env.example` to your existing backend `.env`, keeping your existing `JWT_SECRET`. Configure a Google **Web application** OAuth client with `BETTER_AUTH_URL/api/auth/callback/google` as its authorized redirect URI. Keep the Google client secret on the backend.

Set `VITE_API_URL` (web) and `EXPO_PUBLIC_API_URL` (mobile) to the backend origin, without `/api`. Mobile Google sign-in needs an Expo development build using the existing `mobile` scheme and a publicly reachable HTTPS backend URL; use that same URL for `BETTER_AUTH_URL` and the Google redirect URI. Use the actual web origin for `WEB_ORIGIN`.

Start Redis and set `REDIS_URL`. Authenticated feed, profile, and search responses are cached per user for 30 seconds. Successful post/follow changes invalidate cached responses. If Redis is unavailable, requests go directly to MongoDB; a failed invalidation may leave data cached until its 30-second TTL expires. Existing Express auth rate limits are retained, including Google sign-in.

---

# Author

Developed by Tanishq Chauhan

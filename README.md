# Conversa

Conversa is a full-stack social media application where users can create posts, like posts, follow other users, search users, and view profiles.

## Features

### Authentication

- User registration
- User login
- JWT authentication
- Secure token storage with Expo SecureStore
- Auto-login using saved token
- Protected tab screens
- Logout

### Posts

- Create posts
- View feed posts
- Like posts
- Unlike posts
- Delete posts
- View user posts
- View liked posts in profile

### Users

- View user profile
- Follow users
- Unfollow users
- Search users by name or username
- View followers and following count

### Mobile App Screens

- Login
- Register
- Home feed
- Search users
- Create post
- Profile
- Protected tabs navigation

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Mobile App

- React Native
- Expo
- Expo Router
- Axios
- Zustand
- Expo SecureStore
- React Native Safe Area Context
- Expo Vector Icons
- StyleSheet

---

## Project Structure

```text
Conversa/
├── Backend/
│   ├── Config/
│   ├── Controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   └── server.js
│
└── Mobile/
    ├── api/
    │   └── client.ts
    ├── app/
    │   ├── _layout.tsx
    │   ├── Index.tsx
    │   ├── Register.tsx
    │   └── (tabs)/
    │       ├── _layout.tsx
    │       ├── Home.tsx
    │       ├── Search.tsx
    │       ├── Create.tsx
    │       └── Profile.tsx
    ├── constants/
    │   └── theme.ts
    ├── store/
    │   └── authStore.ts
    └── utils/
        └── storage.ts
```

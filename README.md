# Authify 🔐

Production-grade Authentication System (Full Stack)

---

## 🚀 Overview

Authify is a complete authentication and session management system built with a modern full-stack architecture. It handles secure user onboarding, session control, and email workflows with scalability in mind.

---

## Demo

**Live** - [Authify](https://authify.brijeshdev.in)

## 🧱 Tech Stack

### Frontend

- React + TypeScript
- TanStack Query
- Axios
- React Hook Form + Zod
- React Router DOM
- Tailwind CSS + DaisyUI
- Sonner (toasts)
- Lucide React (icons)

### Backend

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT (Access + Refresh tokens)
- Redis + BullMQ (background jobs)
- Zod (validation)
- Express Rate Limit (security)
- Helmet (headers security)
- CORS

---

## ⚙️ Core Features

### 🔑 Authentication

- User Registration
- Login (JWT-based)
- Email Verification
- Send Verification Email

### 🔄 Password Management

- Forgot Password
- Reset Password
- Change Password

### 👤 User Profile

- Get Profile
- Update Profile

### 📱 Session Management

- Multi-device session tracking
- View active sessions
- Logout from specific devices
- Refresh Token rotation

### ⚡ Background Jobs

- Email queue (verification, reset, etc.) using BullMQ + Redis

---

## 🔐 Security Practices

- Access & Refresh token separation
- HTTP-only cookies for sensitive tokens
- Rate limiting to prevent brute-force attacks
- Input validation using Zod
- Secure headers via Helmet
- Hashed passwords (argon2)

---

## 🧠 Architecture

```
Client (React)
   ↓
API (Express)
   ↓
PostgreSQL (Prisma)
   ↓
Redis (Queues + Sessions)
   ↓
Worker (BullMQ)
```

---

## 📦 Installation

### 1. Clone Repo

```bash
git clone https://github.com/brijeshdevio/authify.git
cd authify
```

### 2. Install Dependencies

```bash
# client
cd client && pnpm install

# server
cd ../server && pnpm install
```

---

## 🔑 Environment Variables

### Client `.env`

```
VITE_API_URL=""
```

### Server `.env`

```
NODE_ENV=""
PORT=
DATABASE_URL=""
JWT_SECRET=""
FRONTEND=""
EMAIL_USERNAME=""
EMAIL_PASSWORD=""
REDIS_URL=""
```

---

## ▶️ Run Locally

```bash
# backend
pnpm run dev

# frontend
pnpm run dev

```

---

## 📡 API Highlights

### Base URL `/api`

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| POST   | /auth/register                | Register user           |
| POST   | /auth/login                   | Login user              |
| POST   | /auth/refresh                 | Rotate refresh token    |
| POST   | /auth/verify-email/:token     | Verify email            |
| POST   | /auth/send-verification-email | Send verification email |
| POST   | /auth/forgot-password         | Send reset link         |
| POST   | /auth/reset-password/:token   | Reset password          |
| POST   | /users/change-password        | Change password         |
| GET    | /users/me                     | Get user profile        |
| PATCH  | /users/me                     | Update profile          |
| GET    | /users/sessions               | Get active sessions     |

---

## ⚠️ Common Pitfalls

- Not running worker → emails won’t send
- Wrong Redis URL → queues fail silently
- Missing `trust proxy` → wrong IP logging
- Storing tokens in localStorage → insecure

---

## 🛠 Future Improvements

- OAuth (Google, GitHub)
- 2FA (OTP / Authenticator apps)
- Role-based access control (RBAC)
- Audit logs

---

## 👨‍💻 Author

Built by a developer focused on real-world backend systems and production-ready architecture.

---

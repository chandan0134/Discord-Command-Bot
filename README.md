# Discord Slash Command Bot

A production-ready Discord Slash Command Bot with an HTTP Interactions API, MongoDB persistence, report mirroring, and an authenticated React admin dashboard.

The application supports Discord slash commands, securely verifies Discord requests using Ed25519 signatures, stores interaction records in MongoDB, and provides an admin dashboard for monitoring bot activity.

---

## 🚀 Live Application

### Frontend — Admin Dashboard

https://discord-command-bot.vercel.app/

### Backend — API

https://discord-command-bot-api.onrender.com/

### Discord Interactions Endpoint

https://discord-command-bot-api.onrender.com/api/discord/interactions

---

## 🔐 Admin Dashboard Login

The admin dashboard is protected using JWT-based authentication.

### Login URL

https://discord-command-bot.vercel.app/

### Credentials

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `<YOUR_ADMIN_PASSWORD>` |

> **Note:** Replace `<YOUR_ADMIN_PASSWORD>` with the actual configured admin password before submitting this README.

The password is stored as an environment variable and is not committed to the repository.

---

# ✨ Features

- Discord Slash Commands
- `/status` command
- `/report` command
- Discord HTTP Interactions
- Ed25519 signature verification
- Discord PING/PONG handling
- MongoDB interaction persistence
- Duplicate interaction protection using Discord Interaction ID
- Admin authentication using JWT
- Protected admin APIs
- Admin dashboard
- Interaction statistics
- Recent interaction history
- Report mirroring to a dedicated Discord channel
- Production deployment
- CORS configuration
- Environment-based configuration
- Separation of controllers, services, models, routes and middleware

---

# 🏗️ Architecture

```text
                         Discord
                            │
                            │ HTTP Interaction
                            ▼
              ┌──────────────────────────┐
              │     Render Backend       │
              │      Node.js/Express     │
              │                          │
              │  Signature Verification  │
              │  Interaction Processing  │
              │  Authentication          │
              │  Admin APIs              │
              └────────────┬─────────────┘
                           │
                           │ Mongoose
                           ▼
                   ┌───────────────┐
                   │ MongoDB Atlas │
                   │               │
                   │ Interactions  │
                   └───────────────┘
                           ▲
                           │
                           │ REST API
                           │
              ┌────────────┴─────────────┐
              │                          │
              │      Vercel Frontend     │
              │       React + Vite       │
              │                          │
              │     Admin Dashboard      │
              └──────────────────────────┘

                           │
                           │ Report Mirror
                           ▼
                    Discord Channel

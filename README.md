# 📅 Appointment Web Application

A Symfony-based web application to manage participants and schedule appointments without overlapping time slots for any participant.

---

## 🚀 Features

- Create and manage **Participants**
- Create and manage **Appointments**
- Prevent **overlapping appointments** for the same participant
- Backend: **Symfony + Doctrine + MySQL + React**
- Containerized using **Docker + Docker Compose**

---

## 🛠️ Tech Stack

- PHP 8.3 (FPM)
- Symfony 6.x
- MySQL 8.0
- Docker / Docker Compose
- React

---

## 🐳 Getting Started with Docker

### Clone the repository

```bash
git clone https://github.com/kailashkds/appointment-app.git
cd appointment-app
docker-compose up --build -d
```
🌐 Access the App

Visit: http://localhost:8000

## 🧪 API Testing with Postman

You can test the API using the included Postman collection.

### 🔗 Postman Collection

- [Download Postman Collection](https://github.com/kailashkds/appointment-app/blob/main/appointment-app.postman_collection.json)

### 📌 Import Instructions

1. Open [Postman](https://www.postman.com/).
2. Click on **"Import"** in the top-left.
3. Choose **"File"**, then select `appointment-api.postman_collection.json` from the `postman/` folder.
4. You will see the collection under "Collections" in the sidebar.

### ✅ Available API Endpoints

| Method | Endpoint              | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/api/login`          | Login to get JWT token            |
| POST   | `/api/participants`   | Create a new participant          |
| GET    | `/api/participants`   | List all participants             |
| POST   | `/api/appointments`   | Create an appointment             |
| GET    | `/api/appointments`   | List all appointments             |



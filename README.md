# Issue Tracker System

A full-stack Issue Tracker System built with **React.js, Spring Boot, MySQL, Spring Security, JWT, and REST APIs**.

The application allows users to register and log in, create and manage issues, assign issues to users, track issue status, add comments, and view dashboard statistics.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Technology Stack](#technology-stack)
* [Project Architecture](#project-architecture)
* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Database Setup](#database-setup)
* [Backend Setup](#backend-setup)
* [Frontend Setup](#frontend-setup)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [Application URLs](#application-urls)
* [Authentication](#authentication)
* [API Documentation](#api-documentation)
* [API Testing with Postman](#api-testing-with-postman)
* [Build for Production](#build-for-production)
* [Deployment](#deployment)
* [GitHub Setup](#github-setup)
* [Troubleshooting](#troubleshooting)
* [Future Improvements](#future-improvements)
* [Author](#author)

---

## Project Overview

The Issue Tracker System is a web-based application designed to help teams manage software issues and track their progress.

Users can:

* Create an account
* Log in securely
* Create issues
* Edit issues
* Delete issues
* Assign issues to other users
* Change issue status
* Add comments
* Delete their own comments
* View all issues
* Filter issues by status
* View dashboard statistics

The backend exposes RESTful APIs and uses JWT-based authentication. The frontend communicates with the backend through Axios.

---

## Features

### Authentication

* User registration
* User login
* Password hashing using BCrypt
* JWT-based authentication
* Protected API endpoints
* Role support with `USER` and `ADMIN`

### Issue Management

* Create issues
* View issues
* View individual issue details
* Update issues
* Delete issues
* Assign issues to users
* Track issue status

Supported statuses:

* `OPEN`
* `IN_PROGRESS`
* `CLOSED`

### Comments

* Add comments to issues
* View comments
* Delete comments created by the logged-in user

### Dashboard

The dashboard displays:

* Total issues
* Open issues
* In-progress issues
* Closed issues

### Frontend

* React.js
* Vite
* React Router
* Axios
* Protected routes
* Responsive UI
* Issue management interface
* Dashboard
* Login and registration pages

---

## Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* React Router DOM

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* Hibernate
* Bean Validation
* Lombok
* Maven

### Database

* MySQL

### Development Tools

* Git
* GitHub
* VS Code
* IntelliJ IDEA / Eclipse
* Postman

---

## Project Architecture

```text
                         +----------------------+
                         |       React UI       |
                         |      Vite + React    |
                         +----------+-----------+
                                    |
                                    | REST API
                                    | JSON
                                    v
                         +----------------------+
                         |    Spring Boot API   |
                         |                      |
                         | Controllers          |
                         | Services             |
                         | Repositories         |
                         | Security             |
                         +----------+-----------+
                                    |
                                    | JPA / Hibernate
                                    v
                         +----------------------+
                         |        MySQL         |
                         |    issue_tracker     |
                         +----------------------+
```

### Authentication Flow

```text
User
  |
  v
Login / Register
  |
  v
Spring Boot
  |
  v
Validate Credentials
  |
  v
Generate JWT
  |
  v
React stores JWT
  |
  v
JWT sent with protected API requests
  |
  v
JwtAuthenticationFilter
  |
  v
Spring Security
  |
  v
Protected Controller
```

---

## Project Structure

```text
issue-tracker/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── lokesh/
│   │   │   │           └── issuetracker/
│   │   │   │               │
│   │   │   │               ├── controller/
│   │   │   │               ├── dto/
│   │   │   │               ├── entity/
│   │   │   │               ├── repository/
│   │   │   │               ├── security/
│   │   │   │               └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── BRD.md
```

---

# Prerequisites

Install the following software before running the application.

### Java

Java 17 or a compatible newer JDK.

Check Java:

```powershell
java -version
```

### Maven

The project includes Maven Wrapper, so Maven does not need to be installed globally.

Check the wrapper:

```powershell
cd backend
.\mvnw.cmd -version
```

### Node.js

Install Node.js.

Check:

```powershell
node -v
npm -v
```

### MySQL

Install MySQL 8.x.

Check that MySQL is running.

On Windows, the service is normally named:

```text
MySQL80
```

### Git

Check:

```powershell
git --version
```

---

# Database Setup

The application uses MySQL.

## 1. Start MySQL

On Windows:

```powershell
net start MySQL80
```

If the service is already running, Windows may report that it has already been started.

---

## 2. Open MySQL

Using MySQL command line:

```powershell
mysql -u root -p
```

Enter your MySQL password when prompted.

---

## 3. Create the database

Run:

```sql
CREATE DATABASE issue_tracker;
```

Verify:

```sql
SHOW DATABASES;
```

You should see:

```text
issue_tracker
```

Exit MySQL:

```sql
exit;
```

---

# Backend Setup

Open a terminal and move to the backend directory:

```powershell
cd issue-tracker\backend
```

Or, if already inside the project root:

```powershell
cd backend
```

---

## Configure Database and JWT

The backend reads sensitive values from environment variables.

The `application.properties` file uses:

```properties
spring.application.name=issue-tracker

spring.datasource.url=jdbc:mysql://localhost:3306/issue_tracker
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION:86400000}
```

Set the required environment variables before starting the backend.

### Windows PowerShell example

```powershell
$env:DB_USERNAME="your_mysql_username"
$env:DB_PASSWORD="your_mysql_password"
$env:JWT_SECRET="your_secure_jwt_secret"
$env:JWT_EXPIRATION="86400000"
```

Do not commit real passwords or JWT secrets to GitHub.

---

## Build the Backend

From:

```text
backend/
```

run:

```powershell
.\mvnw.cmd clean compile
```

For a full package build:

```powershell
.\mvnw.cmd clean package
```

---

## Run the Backend

Run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs by default on:

```text
http://localhost:8080
```

---

# Frontend Setup

Open another terminal.

Move to the frontend directory:

```powershell
cd issue-tracker\frontend
```

Install dependencies:

```powershell
npm install
```

---

## Run Frontend

Start the Vite development server:

```powershell
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Running the Application

The easiest way to run the complete application is to use two terminals.

## Terminal 1 — Backend

```powershell
cd C:\Users\lokes\issue-tracker\backend
```

Set environment variables:

```powershell
$env:DB_USERNAME="your_mysql_username"
$env:DB_PASSWORD="your_mysql_password"
$env:JWT_SECRET="your_secure_jwt_secret"
$env:JWT_EXPIRATION="86400000"
```

Start Spring Boot:

```powershell
.\mvnw.cmd spring-boot:run
```

Keep this terminal running.

---

## Terminal 2 — Frontend

```powershell
cd C:\Users\lokes\issue-tracker\frontend
```

Install dependencies if required:

```powershell
npm install
```

Start Vite:

```powershell
npm run dev
```

Keep this terminal running.

---

## Open the Application

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

---

# Application URLs

| Component   | URL                         |
| ----------- | --------------------------- |
| Frontend    | `http://localhost:5173`     |
| Backend     | `http://localhost:8080`     |
| Backend API | `http://localhost:8080/api` |

---

# Authentication

The application uses JWT authentication.

After successful registration or login, the backend returns a JWT token.

Example response:

```json
{
  "token": "JWT_TOKEN",
  "userId": 1,
  "name": "User Name",
  "email": "user@example.com",
  "role": "USER"
}
```

The frontend stores the token and sends it with protected requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# API Documentation

Base URL:

```text
http://localhost:8080/api
```

## Authentication APIs

### Register

```http
POST /auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

---

# Issue APIs

All issue APIs require authentication.

### Get all issues

```http
GET /issues
```

### Get issue by ID

```http
GET /issues/{id}
```

Example:

```text
GET /issues/1
```

### Get issues by status

```http
GET /issues/status/{status}
```

Examples:

```text
GET /issues/status/OPEN
GET /issues/status/IN_PROGRESS
GET /issues/status/CLOSED
```

### Create issue

```http
POST /issues
```

Request:

```json
{
  "title": "Login page issue",
  "description": "Users are unable to log in.",
  "status": "OPEN",
  "assignedToId": 1
}
```

### Update issue

```http
PUT /issues/{id}
```

Request:

```json
{
  "title": "Updated login issue",
  "description": "Updated issue description.",
  "status": "IN_PROGRESS",
  "assignedToId": 1
}
```

### Delete issue

```http
DELETE /issues/{id}
```

---

# Comment APIs

### Get comments

```http
GET /issues/{issueId}/comments
```

Example:

```text
GET /issues/1/comments
```

### Add comment

```http
POST /issues/{issueId}/comments
```

Request:

```json
{
  "content": "I am investigating this issue."
}
```

### Delete comment

```http
DELETE /issues/{issueId}/comments/{commentId}
```

A user can delete their own comment.

---

# User APIs

### Get all users

```http
GET /users
```

This endpoint is used for assigning issues to users.

---

# Dashboard API

### Get issue counts

```http
GET /dashboard/counts
```

Example response:

```json
{
  "total": 10,
  "open": 4,
  "inProgress": 3,
  "closed": 3
}
```

---

# API Testing with Postman

You can test the backend independently using Postman.

## 1. Register

Send:

```http
POST http://localhost:8080/api/auth/register
```

Body → raw → JSON:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@12345"
}
```

---

## 2. Login

Send:

```http
POST http://localhost:8080/api/auth/login
```

Body:

```json
{
  "email": "test@example.com",
  "password": "Test@12345"
}
```

Copy the returned JWT token.

---

## 3. Call a Protected API

For example:

```http
GET http://localhost:8080/api/issues
```

Add the header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# Build for Production

## Backend

From the backend directory:

```powershell
.\mvnw.cmd clean package
```

The generated JAR will be available under:

```text
backend\target\
```

Run the packaged application:

```powershell
java -jar target\issue-tracker-0.0.1-SNAPSHOT.jar
```

The exact JAR filename may vary depending on the project version.

---

## Frontend

From the frontend directory:

```powershell
npm run build
```

The production files are generated inside:

```text
frontend\dist\
```

Preview the production build locally:

```powershell
npm run preview
```

---

# Deployment

The application is designed for separate frontend and backend deployment.

## Frontend

Recommended hosting:

* Vercel

The React/Vite application can be deployed from the `frontend` directory.

The frontend should use the deployed backend URL instead of:

```text
http://localhost:8080
```

For example:

```text
https://your-backend-domain.com/api
```

---

## Backend

The Spring Boot backend can be deployed using:

* Render
* Railway
* Other Java-compatible cloud platforms

The backend deployment must provide:

* Java runtime
* Maven build support
* Environment variables
* Public HTTP/HTTPS endpoint

---

## Database

The production backend requires a cloud-hosted MySQL database.

Configure:

```text
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION
```

and update the production database URL accordingly.

---

## CORS

The production backend must allow requests from the deployed frontend domain.

For example:

```text
https://your-frontend-domain.vercel.app
```

The production CORS configuration should not rely only on the local development origin.

---

# Deployment Architecture

```text
             Internet
                 |
                 v
       +-------------------+
       |   Vercel          |
       | React Frontend    |
       +---------+---------+
                 |
                 | HTTPS REST API
                 v
       +-------------------+
       | Render / Railway  |
       | Spring Boot API   |
       +---------+---------+
                 |
                 | JDBC
                 v
       +-------------------+
       | Cloud MySQL       |
       | issue_tracker     |
       +-------------------+
```

---

# GitHub Setup

Clone the project:

```powershell
git clone https://github.com/Lokesh-ganig-24/issue-tracker-system.git
```

Enter the project:

```powershell
cd issue-tracker-system
```

Backend:

```powershell
cd backend
.\mvnw.cmd clean package
```

Frontend:

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

---

# Troubleshooting

## MySQL connection error

Check that MySQL is running.

Windows:

```powershell
Get-Service MySQL80
```

Start it if required:

```powershell
net start MySQL80
```

Verify the database exists:

```sql
SHOW DATABASES;
```

---

## Backend does not start

Check:

```powershell
java -version
```

Then run:

```powershell
.\mvnw.cmd clean compile
```

Check that all required environment variables are configured.

---

## Frontend dependencies are missing

Run:

```powershell
npm install
```

Then:

```powershell
npm run dev
```

---

## Frontend cannot connect to backend

Check that Spring Boot is running:

```text
http://localhost:8080
```

Check the frontend API configuration and confirm that it points to:

```text
http://localhost:8080/api
```

Also verify the backend CORS configuration.

---

## Port 8080 is already in use

Find the process:

```powershell
netstat -ano | findstr :8080
```

Terminate the process if necessary:

```powershell
taskkill /PID <PID> /F
```

---

## Port 5173 is already in use

Find the process:

```powershell
netstat -ano | findstr :5173
```

Vite can also automatically use another available port.

---

# Security Notes

Do not commit sensitive information to GitHub.

Never commit:

* Database passwords
* JWT secrets
* Production credentials
* API keys
* `.env` files containing real secrets

Use environment variables for sensitive configuration.

The repository includes `.gitignore` rules for environment files and generated dependencies/build files.

---

# Future Improvements

Potential improvements include:

* Role-based authorization for administrative operations
* Pagination for issues
* Issue priority and severity
* File attachments
* Search and advanced filtering
* Email notifications
* Activity history/audit logs
* Automated unit and integration test coverage
* API documentation with Swagger/OpenAPI
* Docker support
* CI/CD using GitHub Actions
* Production monitoring and logging

---

# Author

**Lokesh Ganiga**

B.E. Computer Science and Engineering

GitHub:

https://github.com/Lokesh-ganig-24

Project Repository:

https://github.com/Lokesh-ganig-24/issue-tracker-system

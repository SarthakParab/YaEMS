# YaEMS — Yet Another Employee Management System

A full-stack CRUD application for managing employee records, built with Spring Boot and Angular.

![Java](https://img.shields.io/badge/Java_17-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.2-6DB33F?style=flat&logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular_17-DD0031?style=flat&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)

---

## Features

- View all employees in a sortable table
- Add, edit, and delete employee records
- Search employees by name in real time
- Input validation on both frontend and backend
- Structured JSON error responses

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 17, TypeScript, Angular Router, HttpClient |
| Backend | Spring Boot 3.2, Spring Data JPA, Spring Validation |
| Database | MySQL 8 |
| ORM | Hibernate (via Spring Data JPA) |
| Build | Maven (backend), Angular CLI (frontend) |

---

## Project Structure

```
ems/
├── backend/                  # Spring Boot application
│   ├── src/main/java/com/ems/employeemanagement/
│   │   ├── controller/       # REST endpoints
│   │   ├── service/          # Business logic
│   │   ├── repository/       # Spring Data JPA interfaces
│   │   ├── model/            # JPA entity
│   │   ├── exception/        # Global error handling
│   │   └── config/           # CORS configuration
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/                 # Angular application
    ├── src/app/
    │   ├── employee-list/    # List + search + delete
    │   ├── employee-form/    # Create + edit form
    │   ├── services/         # HTTP service layer
    │   └── models/           # TypeScript interfaces
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## Prerequisites

- Java 17+
- Maven
- Node.js 18+ and Angular CLI (`npm install -g @angular/cli`)
- MySQL 8

---

## Getting Started

### 1. Database

```sql
CREATE DATABASE ems_db;
```

### 2. Backend

Open `backend/src/main/resources/application.properties` and fill in your MySQL credentials:

```properties
spring.datasource.username=root
spring.datasource.password=        # ← add your password here
```

Then run:

```bash
cd backend
mvn spring-boot:run
```

The API starts at `http://localhost:8080`. Hibernate auto-creates the `employees` table on first boot.

### 3. Frontend

```bash
cd frontend
npm install
ng serve
```

The app starts at `http://localhost:4200`.

---

## API Reference

Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees?search={query}` | Search by name |
| GET | `/employees/{id}` | Get employee by ID |
| POST | `/employees` | Create employee |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

### Example request body (POST / PUT)

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "department": "Engineering",
  "jobTitle": "Software Engineer"
}
```

---

## Notes

- `application.properties` is tracked in git with a blank password field — fill it in locally before running.
- `node_modules/` and `backend/target/` are excluded via `.gitignore`.

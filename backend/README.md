# OpportunityHub NG Backend API

![Django](https://img.shields.io/badge/Django-5.x-092E20?logo=django)
![DRF](https://img.shields.io/badge/Django%20REST%20Framework-API-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Background%20Tasks-red?logo=redis)
![Celery](https://img.shields.io/badge/Celery-Task%20Queue-37814A?logo=celery)
![License](https://img.shields.io/badge/License-MIT-green)

A production-ready REST API powering **OpportunityHub NG**, a platform that helps students and recent graduates discover verified internships, scholarships, and job opportunities.

Built with **Django**, **Django REST Framework**, **PostgreSQL**, **Redis**, and **Celery**, following an API-first architecture with clean separation between Views, Selectors, Services, and Models.

---

# Table of Contents

- Overview
- Features
- Technology Stack
- Architecture
- Project Structure
- Data Model
- API Documentation
- Authentication
- API Modules
- Getting Started
- Environment Variables
- Background Tasks
- Testing
- Deployment
- License

---

# Overview

OpportunityHub NG centralizes verified career opportunities into a single API.

The platform enables:

- Student accounts
- Recruiter accounts
- Recruiter profiles
- Student profiles
- Opportunity publishing
- Opportunity discovery
- Saved opportunities
- Deadline reminder emails
- JWT authentication

---

# Features

## Authentication

- User Registration
- Login
- Logout
- Email Verification
- Password Reset
- JWT Authentication

## Student Features

- Create Profile
- Update Profile
- Delete Profile
- Save Opportunities
- View Saved Opportunities

## Recruiter Features

- Create Recruiter Profile
- Publish Opportunities
- Update Pending Opportunities
- Delete Pending Opportunities

## Opportunities

- Public Opportunity Listing
- Opportunity Detail Page
- Opportunity Fields
- Search
- Filtering
- Pagination

## Background Tasks

- Deadline Reminder Emails
- Celery Workers
- Redis Queue

---

# Technology Stack

| Technology | Purpose |
|------------|----------|
| Python | Programming Language |
| Django | Web Framework |
| Django REST Framework | REST API |
| PostgreSQL | Database |
| SQLite | Local Development |
| Redis | Message Broker |
| Celery | Background Tasks |
| Resend | Transactional Emails |
| Cloudinary | Media Storage |
| JWT | Authentication |
| drf-spectacular | OpenAPI Documentation |
| GitHub Actions | Continuous Integration |

---

# Architecture

The project follows a layered architecture.

```
Client
    │
    ▼
APIView
    │
    ▼
Serializer
    │
    ▼
Service
    │
    ▼
Selector
    │
    ▼
Database
```

Business logic is kept out of views to improve maintainability and testing.

---

# Project Structure

```
backend
│
├── apps
│   ├── common
│   ├── opportunities
│   └── users
│
├── config
│
├── manage.py
├── requirements.txt
└── README.md
```

---

# Data Model

The core entities are:

- User
- Student Profile
- Recruiter Profile
- Opportunity
- Opportunity Field
- Saved Opportunity
- Deadline Reminder



```
docs/images/OpportunityHubNG_ERDiagram.png
```

---

# API Documentation

## Production API

```
https://opportunityhubng.my.to/api/
```

## Swagger UI

```
https://opportunityhubng.my.to/api/schema/swagger-ui/
```

Swagger contains the complete request and response schemas for every endpoint.

---

# Authentication

The API uses JWT Authentication.

```
Authorization: Bearer <access_token>
```

Authentication Flow

```
Register
      │
      ▼
Activate Account
      │
      ▼
Login
      │
      ▼
Receive JWT Tokens
      │
      ▼
Access Protected Endpoints
```

---

# API Modules

## Health

| Method | Endpoint |
|---------|----------|
| GET | /api/health/ |

---

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/auth/register/ |
| POST | /api/v1/auth/login/ |
| POST | /api/v1/auth/logout/ |
| POST | /api/v1/auth/activate-account/ |
| POST | /api/v1/auth/resend-activation/ |
| POST | /api/v1/auth/forgot-password/ |
| POST | /api/v1/auth/reset-password/ |
| POST | /api/v1/auth/token/refresh/ |

---

## Student Profile

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/me/profile/student/ |
| POST | /api/v1/me/profile/student/ |
| PATCH | /api/v1/me/profile/student/ |
| DELETE | /api/v1/me/profile/student/ |

---

## Recruiter Profile

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/me/profile/recruiter/ |
| POST | /api/v1/me/profile/recruiter/ |
| PATCH | /api/v1/me/profile/recruiter/ |
| DELETE | /api/v1/me/profile/recruiter/ |

---

## Public Opportunities

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/opportunities/ |
| GET | /api/v1/opportunities/{slug}/ |
| GET | /api/v1/opportunities/fields/ |

---

## My Opportunities

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/me/opportunities/ |
| POST | /api/v1/me/opportunities/ |
| GET | /api/v1/me/opportunities/{opportunity_id}/ |
| PATCH | /api/v1/me/opportunities/{opportunity_id}/ |
| DELETE | /api/v1/me/opportunities/{opportunity_id}/ |

---

## Saved Opportunities

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/me/opportunities/{opportunity_id}/save/ |
| DELETE | /api/v1/me/opportunities/{opportunity_id}/save/ |
| GET | /api/v1/me/opportunities/saved-opportunities/ |

---

## Django Admin

```
/admin/
```

---

# Getting Started

## Clone Repository

```bash
git clone <repository-url>
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Configure Environment Variables

Copy:

```
.env.sample
```

to

```
.env
```

---

## Apply Migrations

```bash
python manage.py migrate
```

---

## Seed Database

```bash
python manage.py seed_data
```

---

## Run Server

```bash
python manage.py runserver
```

---

# Environment Variables

```env
SECRET_KEY=your-secret-key
DEBUG=False

ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com

DATABASE_URL=postgres://username:password@localhost:5432/database_name

REDIS_URL=redis://127.0.0.1:6379/0

CELERY_BROKER_URL=redis://127.0.0.1:6379/1
CELERY_RESULT_BACKEND=redis://127.0.0.1:6379/2

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx

DEFAULT_FROM_EMAIL=noreply@yourdomain.com

BACKEND_BASE_URL=http://127.0.0.1:8000

FRONTEND_BASE_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

# Background Tasks

Start Redis

```bash
redis-server
```

Run Celery Worker

```bash
python -m celery -A config worker --loglevel=info --pool=solo
```

Run Celery Beat

```bash
python -m celery -A config beat --loglevel=info
```

Current scheduled task:

- Opportunity deadline reminder emails

---

# Testing

Run all tests

```bash
python manage.py test
```

Run a single app

```bash
python manage.py test apps.opportunities
```

---

# Deployment

Production API

```
https://opportunityhubng.my.to/api/
```

Swagger Documentation

```
https://opportunityhubng.my.to/api/schema/swagger-ui/
```

Typical production stack

```
Frontend
      │
      ▼
Django API
      │
      ├── PostgreSQL
      ├── Redis
      ├── Celery Worker
      └── Resend
```

---

# License

This project is licensed under the MIT License.

---

## Author

**OpportunityHub NG**

Helping students discover verified internships, scholarships, and job opportunities.
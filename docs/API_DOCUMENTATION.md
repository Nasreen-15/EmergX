# EmergX API Documentation

The **EmergX** backend is built with FastAPI and PostgreSQL, providing a high-performance RESTful API for emergency dispatch and multi-role coordination.

---

## 🌐 Base URLs & Interactive OpenAPI Specs

- **Production Deployment (Render)**: `https://emergx-50l5.onrender.com`
- **Swagger / OpenAPI Interactive UI**: `https://emergx-50l5.onrender.com/docs`
- **ReDoc Interactive Specs**: `https://emergx-50l5.onrender.com/redoc`
- **Local Development Host**: `http://localhost:8000`

---

## 🔐 Authentication & Security

All authenticated endpoints require an `Authorization` HTTP header with a valid Bearer JWT Token:

```http
Authorization: Bearer <access_token>
```

### 1. User Login
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate user using email/username and password. Accepts JSON or `application/x-www-form-urlencoded`.
- **Request Body (JSON)**:
  ```json
  {
    "email": "resident@test.com",
    "password": "Resident@123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
  }
  ```

---

## 👤 User & Role Management (`/users`)

### 2. Register New User
- **Endpoint**: `POST /users/`
- **Description**: Public registration endpoint to create new resident or user accounts.
- **Request Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "password": "SecurePassword123"
  }
  ```
- **Response (201 Created)**: User profile object with assigned roles.

### 3. Get Current User Profile
- **Endpoint**: `GET /users/me`
- **Authorization**: Bearer JWT
- **Response (200 OK)**:
  ```json
  {
    "id": 1,
    "first_name": "System",
    "last_name": "Admin",
    "email": "admin@test.com",
    "phone": "000-000-0001",
    "is_active": true,
    "roles": ["ADMIN"]
  }
  ```

### 4. Get All Users (Admin Only)
- **Endpoint**: `GET /users/`
- **Authorization**: Bearer JWT (Admin role required)

### 5. Get User by ID
- **Endpoint**: `GET /users/{user_id}`
- **Authorization**: Bearer JWT (Admin or matching User)

### 6. Update User Profile
- **Endpoint**: `PUT /users/{user_id}`
- **Authorization**: Bearer JWT (Admin or matching User)

### 7. Delete User
- **Endpoint**: `DELETE /users/{user_id}`
- **Authorization**: Bearer JWT (Admin role required)

---

## 🚨 SOS Alerts (`/sos` & `/api/sos`)

### 8. Raise SOS Alert (Resident)
- **Endpoint**: `POST /sos/raise`
- **Authorization**: Bearer JWT (Resident role)
- **Description**: Triggers an emergency SOS alert attached to the resident's flat and society location. Instantiates escalation routing and notifies registered emergency contacts.
- **Response (201 Created)**:
  ```json
  {
    "alert": {
      "id": 1,
      "resident_id": 3,
      "flat_id": 1,
      "society_id": 1,
      "status": "Open",
      "emergency_type": "Medical Emergency",
      "created_at": "2026-09-11T12:00:00Z"
    },
    "notified_contacts": [
      {
        "name": "Jane Doe",
        "phone": "9876543211",
        "priority": 1
      }
    ]
  }
  ```

### 9. Get Active SOS Alerts
- **Endpoint**: `GET /sos/active`
- **Authorization**: Bearer JWT (Admin, Security, Volunteer)
- **Description**: Returns all unhandled and ongoing emergency SOS alerts.

### 10. Get All SOS Alerts
- **Endpoint**: `GET /sos/`
- **Authorization**: Bearer JWT

### 11. Resolve SOS Alert
- **Endpoint**: `POST /sos/{alert_id}/resolve`
- **Authorization**: Bearer JWT (Resident owner, Security, Admin)

### 12. Mobile SOS Trigger Alias
- **Endpoint**: `POST /api/sos/`
- **Request Body**:
  ```json
  {
    "emergency_type": "Fire Emergency",
    "remarks": "Smoke detected near Block A",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
  ```

---

## 🛡️ Incident Lifecycle & Management (`/api/incidents`)

### 13. Get Incident Dashboard Summary
- **Endpoint**: `GET /api/incidents/summary/`
- **Authorization**: Bearer JWT (Admin, Security)

### 14. Get Active Incidents Queue
- **Endpoint**: `GET /api/incidents/active/`
- **Authorization**: Bearer JWT (Admin, Security)

### 15. Get Incident Details
- **Endpoint**: `GET /api/incidents/{id}/`
- **Authorization**: Bearer JWT

### 16. Accept / Respond to Incident
- **Endpoint**: `POST /api/incidents/{id}/accept/`
- **Authorization**: Bearer JWT (Security, Volunteer, Guardian, Admin)
- **Description**: Assigns responder to incident, updates status to `Assigned` / `In Progress`, and halts escalation.

### 17. Decline / Reject Incident
- **Endpoint**: `POST /api/incidents/{id}/reject/`
- **Authorization**: Bearer JWT

### 18. Patch Incident Status
- **Endpoint**: `PATCH /api/incidents/{id}/status/`
- **Request Body**:
  ```json
  {
    "status": "Reached Location"
  }
  ```
- **Allowed Statuses**: `Open`, `Assigned`, `In Progress`, `Reached Location`, `Assistance Started`, `Resolved`, `Closed`

### 19. Close Incident & Record Documentation
- **Endpoint**: `POST /api/incidents/{id}/close/`
- **Authorization**: Bearer JWT (Security, Admin)
- **Request Body**:
  ```json
  {
    "resolution_summary": "First aid provided, medical team dispatched.",
    "remarks": "All safety protocols followed."
  }
  ```

### 20. Incident Timeline & Escalation Logs
- **Endpoint**: `GET /api/incidents/{id}/timeline/`
- **Endpoint**: `GET /api/incidents/{id}/escalation-logs/`

---

## 🔔 Notifications (`/api/notifications`)

### 21. Get User Notifications
- **Endpoint**: `GET /api/notifications/`
- **Authorization**: Bearer JWT

### 22. Mark Notification as Read
- **Endpoint**: `PATCH /api/notifications/{id}/read/`
- **Authorization**: Bearer JWT

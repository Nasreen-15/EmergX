# EmergX

### Community Emergency Coordination & Citizen Assistance Network

[![FastAPI](https://img.shields.io/badge/FastAPI-0.141.1-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React Native](https://img.shields.io/badge/React_Native-Mobile-61DAFB.svg?style=flat&logo=react)](https://reactnative.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1.svg?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Render Deployed](https://img.shields.io/badge/Render-Live_API-46E3B7.svg?style=flat&logo=render)](https://emergx-50l5.onrender.com)

**EmergX** is an emergency coordination platform designed for residential societies, gated communities, and local networks. It enables residents to trigger rapid SOS emergency alerts during medical, security, or fire incidents, seamlessly routing alerts to security guards, designated community volunteers, and administrators for immediate assistance and tracking.

---

## 📌 Live Production Deployment

- **Live Backend API**: [https://emergx-50l5.onrender.com](https://emergx-50l5.onrender.com)
- **Interactive API Documentation (Swagger)**: [https://emergx-50l5.onrender.com/docs](https://emergx-50l5.onrender.com/docs)
- **Alternative Documentation (ReDoc)**: [https://emergx-50l5.onrender.com/redoc](https://emergx-50l5.onrender.com/redoc)

---

## 🎯 Problem Statement

In residential societies and urban neighborhoods, emergency response often suffers from critical delays:
1. **Delayed Communication**: Dialing emergency numbers or searching for security contacts takes precious time during high-stress situations.
2. **Lack of Location Specificity**: Emergency responders struggle to locate the exact building block, floor, or flat number quickly.
3. **Uncoordinated Response**: Community security officers and nearby qualified volunteers are often unaware of active emergencies in their immediate vicinity.
4. **No Incident Audit Trail**: Manual logbooks fail to record exact timestamps, responder assignments, or incident resolution summaries for accountability.

---

## 💡 Solution

**EmergX** bridges the gap between residents in distress and immediate local responders through a dual-layer system combining a **FastAPI REST API** and a **Cross-Platform React Native Mobile Application**:

- **One-Tap SOS Dispatch**: Residents trigger emergency alerts linked directly to their exact flat and society location.
- **Role-Based Incident Queue**: Security guards and community volunteers view active SOS alerts in real time.
- **Single-Click Response & Assignment**: First responders claim and accept emergency tasks, updating status automatically to prevent redundant dispatch.
- **Incident Lifecycle Documentation**: Every incident records step-by-step progress from trigger to on-site arrival and final resolution logging.

---

## 🚀 Key Features

- **Multi-Role Access Control**: Tailored workflows for Residents, Security personnel, Volunteers, Guardians, and System Administrators.
- **Precision Location Mapping**: Links SOS alerts directly to Society, Block, and Flat details.
- **Emergency Escalation Matrix**: Automatically routes unhandled alerts to higher priority responder tiers.
- **Priority Emergency Contact Broadcasting**: Notifies designated family guardians in priority order upon SOS dispatch.
- **Incident Audit Logging**: Permanent, tamper-proof audit trail storing timestamps, status changes, responder actions, and resolution summaries.

---

## 👥 Role-Based Access Control (RBAC)

EmergX defines 5 specialized operational roles:

| Role | Target Interface | Core Functionality |
| :--- | :--- | :--- |
| 🏡 **Resident** | Mobile App | Triggers one-tap SOS alerts, manages personal profiles & emergency contacts, tracks incident progress. |
| 🛡️ **Security** | Mobile App / Portal | Monitors active SOS queue, accepts emergency assignments, responds on-site, updates status, and closes resolved incidents. |
| 🤝 **Volunteer** | Mobile App | Designated community members who receive escalated emergency alerts to provide rapid medical or physical support. |
| 👨‍👩‍👧 **Guardian** | Mobile App | Primary emergency contacts who receive priority notifications and incident status tracking. |
| ⚙️ **Admin** | API / Dashboard | Manages society structures, block mappings, flat allocations, user roles, system settings, and analytics reports. |

---

## 🔄 Verified SOS Emergency Workflow

The production emergency dispatch lifecycle operates as follows:

```
┌─────────────────────────────────────────────────────────┐
│                     1. Resident Login                   │
│   Resident logs into the EmergX React Native Mobile App │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     2. Raise SOS                        │
│   Resident triggers SOS; alert payload sent to FastAPI  │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               3. SOS Stored in PostgreSQL               │
│   Alert created with status "Open", flat location & ID  │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              4. Security Views Active SOS               │
│   Security personnel query /sos/active & incident queue │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              5. Security Accepts Incident               │
│   Responder claims alert; status becomes "Assigned"     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               6. Security Closes Incident               │
│   On-site emergency resolved; responder submits summary │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               7. Resolution Recorded                    │
│   Status updated to "Closed"; resolution notes stored   │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Authorization

EmergX uses standard **JSON Web Tokens (JWT)** for stateless authentication:
- Password hashing is enforced using **Bcrypt**.
- Authentication endpoint: `POST /auth/login` returns a signed Bearer JWT token.
- Protected endpoints validate permissions against user roles (`ADMIN`, `RESIDENT`, `SECURITY`, `VOLUNTEER`, `GUARDIAN`) via FastAPI dependency injection.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│             React Native Mobile Application             │
│            (TypeScript / Cross-Platform iOS & Android)   │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ HTTPS / REST API
                             ▼
┌─────────────────────────────────────────────────────────┐
│               FastAPI Backend REST Service              │
│               (Hosted on Render Platform)               │
│               https://emergx-50l5.onrender.com          │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ SQLAlchemy ORM Engine
                             ▼
┌─────────────────────────────────────────────────────────┐
│               PostgreSQL Database Layer                 │
│             (Relational Database on Render)             │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Backend & Database
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **ASGI Server**: [Uvicorn](https://www.uvicorn.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/)
- **Authentication**: [PyJWT](https://pyjwt.readthedocs.io/) & [Bcrypt](https://pypi.org/project/bcrypt/)
- **Data Validation**: [Pydantic v2](https://docs.pydantic.dev/)
- **Hosting**: [Render Platform](https://render.com/)

### Mobile Application
- **Framework**: [React Native](https://reactnative.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State & API**: React Context & Fetch API

---

## 📁 Project Directory Structure

```
EmergX/
├── app/                        # FastAPI Backend Application Source
│   ├── models/                 # SQLAlchemy Database Models
│   ├── routers/                # REST API Route Handlers
│   │   ├── auth.py             # User Login & JWT Authentication
│   │   ├── users.py            # User Profile CRUD & Role Check
│   │   ├── sos.py              # SOS Alert Dispatcher
│   │   ├── incidents.py        # Incident Queue, Lifecycle & Closure
│   │   ├── notifications.py    # Notification Management
│   │   └── ...                 # Society, Block, Flat, Security routers
│   ├── services/               # Escalation & Alert Routing Services
│   ├── auth.py                 # JWT Helper Functions & Password Hashing
│   ├── config.py               # Application Settings & Env Parsers
│   ├── database.py             # SQLAlchemy Engine & Session Setup
│   ├── dependencies.py         # Authentication & Authorization Middleware
│   └── main.py                 # FastAPI App Initialization & CORS Setup
├── MobileApp/                  # React Native Cross-Platform Mobile Code
│   ├── src/                    # Mobile Application Source Code
│   │   ├── api/                # API Client Configurations
│   │   ├── components/         # Reusable UI Components
│   │   ├── context/            # Authentication & State Providers
│   │   ├── navigation/         # App Navigation Stack
│   │   ├── screens/            # Screen Components (SOS, Queue, History)
│   │   ├── services/           # Service Integrations
│   │   └── theme/              # Color Palettes & Styling Guidelines
│   ├── App.tsx                 # Mobile Entry Point
│   ├── package.json            # React Native Dependencies
│   └── tsconfig.json           # TypeScript Configuration
├── docs/                       # Project Documentation
│   ├── API_DOCUMENTATION.md    # Verified REST API Specification
│   └── ARCHITECTURE.md         # System Architecture & Flow Diagrams
├── seed.py                     # Initial Seed Script for Users, Roles & Data
├── requirements.txt            # Python Backend Dependencies
├── .env.example                # Safe Environment Variables Template
├── .gitignore                  # Git Ignore Rules for Secrets & Artifacts
└── README.md                   # Project Portfolio & Documentation
```

---

## 🔌 API Summary & Endpoints

All endpoints are fully documented and interactive on the deployed Swagger UI:  
👉 **[https://emergx-50l5.onrender.com/docs](https://emergx-50l5.onrender.com/docs)**

### Key Endpoint Groups
- **Authentication**: `POST /auth/login`
- **Users**: `POST /users/`, `GET /users/me`, `GET /users/`, `GET /users/{id}`
- **SOS Dispatch**: `POST /sos/raise`, `GET /sos/active`, `POST /sos/{alert_id}/resolve`
- **Incident Lifecycle**: `GET /api/incidents/active/`, `POST /api/incidents/{id}/accept/`, `PATCH /api/incidents/{id}/status/`, `POST /api/incidents/{id}/close/`
- **Notifications**: `GET /api/notifications/`, `PATCH /api/notifications/{id}/read/`

*For complete endpoint request/response payloads, refer to [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).*

---

## 💻 Local Setup & Installation

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/EmergX.git
   cd EmergX
   ```

2. **Create and activate a Python virtual environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. **Initialize Database & Seed Test Users**:
   ```bash
   python seed.py
   ```

6. **Start the FastAPI server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   Access Swagger API documentation locally at `http://localhost:8000/docs`.

### Mobile Application Setup
1. **Navigate to the MobileApp directory**:
   ```bash
   cd MobileApp
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Launch Metro Bundler**:
   ```bash
   npx react-native start
   ```

4. **Run on Emulator / Device**:
   ```bash
   # For Android:
   npx react-native run-android
   # For iOS (macOS only):
   npx react-native run-ios
   ```

---

## ⚙️ Environment Variables

Create a local `.env` file following the template in `.env.example`:

| Variable Name | Purpose | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL Connection URI | `postgresql://user:pass@localhost:5432/emergx_db` |
| `ESCALATION_TIMEOUT_SECONDS` | Timeout before escalating SOS | `30` |
| `SMTP_HOST` | Email SMTP Server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP Port | `587` |
| `SMTP_USERNAME` | SMTP Username | `your_email@example.com` |
| `SMTP_PASSWORD` | SMTP Password / App Secret | `your_app_password` |
| `EMAIL_ENABLED` | Email Notification Toggle | `true` |
| `SECRET_KEY` | JWT Secret Key | `your_secret_key` |
| `ALGORITHM` | JWT Encryption Algorithm | `HS256` |

---

## 🧪 Testing & Verification

The project includes unit, integration, and user workflow verification scripts:

```bash
# Run Admin login & role verification
python test_admin_login.py

# Verify complete incident lifecycle (Raise -> Accept -> Status Update -> Close)
python test_incident_lifecycle.py

# Verify role assignment persistence
python test_role_assignment_persistence.py

# Run all endpoint integration tests
python test_all_endpoints.py
```

---

## 📷 Screenshots

*(Placeholder section for application screenshots)*

| Resident SOS Screen | Active Incident Queue | Incident Resolution |
| :---: | :---: | :---: |
| *[Screenshot Placeholder]* | *[Screenshot Placeholder]* | *[Screenshot Placeholder]* |

---

## 🚀 Future Enhancements

- **Push Notifications Integration**: Mobile push notifications for instant responder dispatch.
- **Live GPS Tracking**: Real-time map view of responders en route to an emergency location.
- **Offline SOS Signaling**: SMS fallback trigger when cellular data is unavailable.
- **Audio / Video Attachment**: Ability to attach emergency voice notes or scene photos during active incidents.

---

## 👥 Team & Credits

Developed as a college / internship capstone engineering project:  
**Community Emergency Coordination & Citizen Assistance Network (EmergX)**

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

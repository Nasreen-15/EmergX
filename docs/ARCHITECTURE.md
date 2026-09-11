# EmergX System Architecture

**EmergX** (Community Emergency Coordination & Citizen Assistance Network) is designed as a dual-layer, multi-role emergency dispatch and management system.

---

## 🏗️ System Overview & Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│              React Native Mobile Application             │
│            (Resident / Security / Volunteer)            │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ HTTPS / REST (JSON)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   FastAPI Backend API                   │
│             (Deployed on Render Platform)               │
│               https://emergx-50l5.onrender.com          │
│                                                         │
│  ├── Auth & JWT Engine                                  │
│  ├── Role-Based Access Control (RBAC)                   │
│  ├── SOS Alert Dispatcher                               │
│  └── Incident Audit Logger                              │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ SQLAlchemy ORM
                             ▼
┌─────────────────────────────────────────────────────────┐
│               PostgreSQL Database Layer                 │
│                 (Hosted on Render)                      │
│                                                         │
│  ├── Users & Roles Schema                               │
│  ├── Society / Block / Flat Mapping                     │
│  ├── SOS Alerts & Incidents Table                       │
│  ├── Emergency Contacts & Audit Logs                    │
│  └── Incident Timelines & Summaries                     │
└─────────────────────────────────────────────────────────┘
```

---

## 👥 Role-Based Access Control (RBAC)

EmergX enforces 5 distinct roles to streamline emergency response workflows:

| Role | Access & Scope | Key Responsibilities |
| :--- | :--- | :--- |
| **Resident** | Mobile App | Triggers SOS alerts, manages emergency contacts, tracks incident resolution. |
| **Security** | Mobile App / Portal | Monitors active SOS queue, accepts emergency assignments, responds on-site, closes incidents with resolution notes. |
| **Volunteer** | Mobile App | Receives escalated community alerts, provides first responder support upon accepting incidents. |
| **Guardian** | Mobile App | Receives priority emergency notifications and status updates for family/relatives. |
| **Admin** | API / Admin Dashboard | Full system control, user role management, analytics, audit reports, and society onboarding. |

---

## 🔄 Emergency SOS Workflow

The verified production emergency workflow operates as follows:

```
┌──────────────────┐
│  Resident Login  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    Raise SOS     │  Trigger SOS via mobile button with location/details
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ PostgreSQL Storage│  Alert persisted with status "Open", timestamped & linked to Flat/Society
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Security Views   │  Security personnel see active SOS alert in dashboard queue
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Security Accepts │  Security claims incident; status changes to "Assigned" / "In Progress"
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Security Closes │  Security resolves emergency on-site and closes incident
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Resolution Recorded│ Resolution summary and remarks logged permanently in PostgreSQL audit table
└──────────────────┘
```

---

## 💾 Data Models & Relational Schema

1. **Users & UserRole**: Stores user credentials, phone, email, and maps users to one or more roles (`ADMIN`, `RESIDENT`, `SECURITY`, `GUARDIAN`, `VOLUNTEER`).
2. **Society, Block & Flat**: Hierarchical mapping of physical residences for accurate location pinpointing.
3. **SOSAlert**: Central entity recording resident ID, location, emergency type, coordinates, status (`Open`, `Assigned`, `In Progress`, `Resolved`, `Closed`), responder details, and timestamps.
4. **IncidentTimeline & EscalationLog**: Comprehensive audit trail recording every state change, status update, responder assignment, and resolution note.

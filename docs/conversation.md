# MailTaskManager - Conversation Documentation

## Projektbeschreibung

MailTaskManager ist ein Full-Stack-Projekt zum automatischen Verarbeiten eingehender E-Mails in Aufgaben. Das System nutzt Machine Learning zur Klassifizierung und Priorisierung von E-Mails und bietet eine intuitive Web-Oberfläche zur Verwaltung.

### Hauptkomponenten

1. **Backend** (Node.js + TypeScript)
   - Express-basierte REST API
   - CRUD-Operationen für Tasks
   - Integration mit ML-Service für automatische Klassifizierung
   - PostgreSQL-Datenbankanbindung (vorbereitet)
   - Health-Check-Endpoint

2. **ML-Service** (Python + FastAPI)
   - FastAPI-basierter Microservice
   - Endpoint `/predict` für E-Mail-Klassifizierung
   - Regelbasierte Klassifizierung (Stub für spätere ML-Modelle)
   - Priorisierung und Kategorisierung
   - Health-Check-Endpoint

3. **Frontend** (React + Vite)
   - Moderne React-Anwendung
   - Task-Übersicht und -Verwaltung
   - Erstellen, Bearbeiten, Löschen von Tasks
   - Status-Updates
   - Responsive Design

4. **Datenbank** (PostgreSQL)
   - Containerisiert via Docker Compose
   - Vorbereitet für Task-Persistierung

### Technologie-Stack

**Backend:**
- Node.js 18
- TypeScript
- Express.js
- Jest & Supertest (Testing)
- ESLint (Code Quality)

**ML-Service:**
- Python 3.11
- FastAPI
- Pydantic
- Pytest (Testing)
- Uvicorn (ASGI Server)

**Frontend:**
- React 18
- Vite (Build Tool)
- Axios (HTTP Client)
- ESLint (Code Quality)

**Infrastructure:**
- Docker & Docker Compose
- PostgreSQL 15
- GitHub Actions (CI/CD)

## Projektstruktur

```
MailTaskManager/
├── backend/
│   ├── src/
│   │   └── server.ts          # Express-Server mit REST-API
│   ├── tests/
│   │   └── health.test.ts     # Jest-Tests
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── .eslintrc.js
│   └── Dockerfile
├── ml-service/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py            # FastAPI-App mit ML-Endpoints
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_main.py       # Pytest-Tests
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   ├── pytest.ini
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── main.jsx           # React-Entry-Point
│   │   ├── App.jsx            # Hauptkomponente
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .eslintrc.cjs
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI-Pipeline
├── docs/
│   └── conversation.md        # Diese Datei
├── docker-compose.yml         # Multi-Container-Setup
├── .env.example               # Umgebungsvariablen-Template
├── .gitignore
└── README.md

```

## Entwicklungsanweisungen

### Initial Setup

1. **Repository klonen:**
   ```bash
   git clone https://github.com/ChrisRem85/MailTaskManager.git
   cd MailTaskManager
   ```

2. **Umgebungsvariablen konfigurieren:**
   ```bash
   cp .env.example .env
   # Bearbeite .env bei Bedarf
   ```

3. **Docker Compose starten:**
   ```bash
   docker compose up --build
   ```

### Lokale Entwicklung (ohne Docker)

**Backend:**
```bash
cd backend
npm install
npm run dev          # Development Server
npm test            # Tests ausführen
npm run lint        # Linting
npm run build       # TypeScript kompilieren
```

**ML-Service:**
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
pip install -r requirements-dev.txt
uvicorn app.main:app --reload  # Development Server
pytest                         # Tests ausführen
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev          # Development Server
npm run build        # Production Build
npm run lint         # Linting
```

## API-Dokumentation

### Backend API (Port 3000)

**Health Check:**
```
GET /health
Response: {"status": "ok"}
```

**Tasks:**
```
GET    /api/tasks          # Alle Tasks abrufen
POST   /api/tasks          # Neuen Task erstellen
GET    /api/tasks/:id      # Task nach ID abrufen
PUT    /api/tasks/:id      # Task aktualisieren
DELETE /api/tasks/:id      # Task löschen
```

**Task-Objekt:**
```json
{
  "id": "1",
  "title": "Task-Titel",
  "description": "Beschreibung",
  "priority": "high|medium|low",
  "status": "open|in-progress|completed",
  "createdAt": "2025-10-26T10:00:00.000Z"
}
```

### ML-Service API (Port 8000)

**Health Check:**
```
GET /health
Response: {"status": "ok"}
```

**Prediction:**
```
POST /predict
Request: {"text": "E-Mail-Text"}
Response: {
  "priority": "high|medium|low",
  "category": "bug|feature|question|meeting|general",
  "confidence": 0.85
}
```

## CI/CD Pipeline

Die GitHub Actions Pipeline führt bei jedem Push automatisch aus:

1. **Backend Tests:**
   - Dependency-Installation
   - ESLint-Prüfung
   - Jest-Tests
   - TypeScript-Build

2. **ML-Service Tests:**
   - Dependency-Installation
   - Pytest-Tests

3. **Frontend Build:**
   - Dependency-Installation
   - ESLint-Prüfung
   - Vite-Build

4. **Docker Build Test:**
   - Docker-Images bauen
   - Services starten
   - Health-Checks durchführen
   - Services herunterfahren

## Sicherheitshinweise

- ⚠️ Keine Secrets im Repository einchecken
- `.env` wird via `.gitignore` ausgeschlossen
- `.env.example` dient als Template ohne echte Credentials
- Für Production: Sichere Secret-Management-Lösungen nutzen
- Default-Passwörter in Production ändern

## Nächste Schritte

### Kurzfristig:
1. PostgreSQL-Integration im Backend implementieren
2. Datenbankmigrationen einrichten
3. ML-Modell trainieren und integrieren
4. E-Mail-Connector implementieren

### Mittelfristig:
1. Authentifizierung & Authorization
2. Benutzer-Management
3. E-Mail-Synchronisation
4. Benachrichtigungen

### Langfristig:
1. Advanced ML-Features
2. Dashboard & Analytics
3. Mobile App
4. Integration mit anderen Diensten

## Lizenz

MIT License - siehe LICENSE-Datei für Details.

## Autor

ChrisRem85

## Projektinitialisierung

Dieses Projekt wurde am 26. Oktober 2025 als initiales Scaffold erstellt mit:
- Node.js + TypeScript Backend
- Python + FastAPI ML-Service
- React + Vite Frontend
- PostgreSQL Datenbank
- Docker Compose Setup
- GitHub Actions CI/CD

Initial Commit: "Initial scaffold: backend, ml-service, frontend, docker compose, docs"

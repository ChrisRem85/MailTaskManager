# MailTaskManager

MailTaskManager ist ein Full-Stack-Projekt zum automatischen Verarbeiten eingehender E-Mails in Aufgaben. Das System nutzt Machine Learning zur Klassifizierung und Priorisierung von E-Mails und bietet eine intuitive Web-Oberfläche zur Verwaltung.

## 📋 Projektübersicht

**Hauptkomponenten:**
- **Backend** (Node.js + TypeScript): REST API für Task-Management (CRUD-Operationen)
- **ML-Service** (Python + FastAPI): Machine Learning Microservice für E-Mail-Klassifizierung und Priorisierung
- **Frontend** (React + Vite): Benutzeroberfläche zur Aufgabenverwaltung
- **Datenbank** (PostgreSQL): Persistente Datenspeicherung

## 🚀 Quick Start

### Voraussetzungen

- Docker & Docker Compose
- Git

### Installation & Start

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

3. **Alle Services starten:**
```bash
docker compose up --build
```

Die Services sind dann verfügbar unter:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **ML Service**: http://localhost:8000
- **PostgreSQL**: localhost:5432

### Health Checks

Überprüfe, ob alle Services laufen:

```bash
# Backend Health Check
curl http://localhost:3000/health

# ML Service Health Check
curl http://localhost:8000/health
```

Erwartete Antwort (beide): `{"status":"ok"}`

## 🧪 Tests ausführen

### Backend Tests
```bash
cd backend
npm install
npm test
```

### ML Service Tests
```bash
cd ml-service
pip install -r requirements.txt
pytest
```

## 🏗️ Projektstruktur

```
MailTaskManager/
├── backend/              # Node.js + TypeScript Backend
│   ├── src/
│   │   └── server.ts    # Express Server mit REST API
│   ├── tests/           # Jest Tests
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── ml-service/          # Python FastAPI ML Service
│   ├── app/
│   │   └── main.py     # FastAPI App mit /predict Endpoint
│   ├── tests/          # Pytest Tests
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/            # React + Vite Frontend
│   ├── src/
│   │   └── App.jsx     # Hauptkomponente
│   ├── package.json
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci.yml      # CI/CD Pipeline
├── docs/
│   └── conversation.md # Projekt-Dokumentation
├── docker-compose.yml  # Multi-Container Setup
├── .env.example        # Umgebungsvariablen Template
├── .gitignore
└── README.md
```

## 🔧 Entwicklung

### Lokale Entwicklung (ohne Docker)

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**ML Service:**
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpunkte

### Backend (Port 3000)
- `GET /health` - Health Check
- `GET /api/tasks` - Alle Tasks abrufen
- `POST /api/tasks` - Neuen Task erstellen
- `GET /api/tasks/:id` - Task nach ID abrufen
- `PUT /api/tasks/:id` - Task aktualisieren
- `DELETE /api/tasks/:id` - Task löschen

### ML Service (Port 8000)
- `GET /health` - Health Check
- `POST /predict` - E-Mail klassifizieren
  ```json
  {
    "text": "E-Mail Text hier"
  }
  ```

## 🔐 Sicherheit

⚠️ **Wichtig:** Keine Secrets im Repository einchecken!
- Verwende `.env` für lokale Entwicklung (wird nicht versioniert)
- `.env.example` dient als Template ohne echte Credentials
- Für Production: Nutze sichere Secret-Management-Lösungen

## 🧑‍💻 CI/CD

GitHub Actions Workflow führt bei jedem Push automatisch aus:
- Linting (ESLint, Pylint)
- Unit Tests (Jest, Pytest)
- Build-Checks

## 📄 Lizenz

MIT License - siehe LICENSE Datei für Details.

## 🤝 Beitragen

Contributions sind willkommen! Bitte erstelle einen Pull Request oder öffne ein Issue.

## 📞 Support

Bei Fragen oder Problemen erstelle bitte ein Issue im GitHub Repository.
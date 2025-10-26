# MailTaskManager - Project Documentation

## Project Description

MailTaskManager is a full-stack project for automatically processing incoming emails into tasks. The system uses machine learning for email classification and prioritization and provides an intuitive web interface for management.

### Main Components

1. **Backend** (Node.js + TypeScript)
   - Express-based REST API
   - CRUD operations for tasks
   - Integration with ML service for automatic classification
   - PostgreSQL database connection (prepared)
   - Health check endpoint

2. **ML-Service** (Python + FastAPI)
   - FastAPI-based microservice
   - `/predict` endpoint for email classification
   - Rule-based classification (stub for future ML models)
   - Prioritization and categorization
   - Health check endpoint

3. **Frontend** (React + Vite)
   - Modern React application
   - Task overview and management
   - Create, edit, delete tasks
   - Status updates
   - Responsive design

4. **Database** (PostgreSQL)
   - Containerized via Docker Compose
   - Prepared for task persistence

### Technology Stack

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

## Project Structure

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

## Development Instructions

### Initial Setup

1. **Clone repository:**
   ```bash
   git clone https://github.com/ChrisRem85/MailTaskManager.git
   cd MailTaskManager
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

3. **Start Docker Compose:**
   ```bash
   docker compose up --build
   ```

### Local Development (without Docker)

**Backend:**
```bash
cd backend
npm install
npm run dev          # Development server
npm test            # Run tests
npm run lint        # Linting
npm run build       # Compile TypeScript
```

**ML-Service:**
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
pip install -r requirements-dev.txt
uvicorn app.main:app --reload  # Development server
pytest                         # Run tests
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Linting
```

## API Documentation

### Backend API (Port 3000)

**Health Check:**
```
GET /health
Response: {"status": "ok"}
```

**Tasks:**
```
GET    /api/tasks          # Get all tasks
POST   /api/tasks          # Create new task
GET    /api/tasks/:id      # Get task by ID
PUT    /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task
```

**Task Object:**
```json
{
  "id": "1",
  "title": "Task title",
  "description": "Description",
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
Request: {"text": "Email text"}
Response: {
  "priority": "high|medium|low",
  "category": "bug|feature|question|meeting|general",
  "confidence": 0.85
}
```

## CI/CD Pipeline

The GitHub Actions pipeline automatically runs on every push:

1. **Backend Tests:**
   - Dependency installation
   - ESLint checks
   - Jest tests
   - TypeScript build

2. **ML-Service Tests:**
   - Dependency installation
   - Pytest tests

3. **Frontend Build:**
   - Dependency installation
   - ESLint checks
   - Vite build

4. **Docker Build Test:**
   - Build Docker images
   - Start services
   - Run health checks
   - Shut down services

## Security Notes

- ⚠️ Never commit secrets to the repository
- `.env` is excluded via `.gitignore`
- `.env.example` serves as a template without real credentials
- For production: Use secure secret management solutions
- Change default passwords in production

## Next Steps

### Short-term:
1. Implement PostgreSQL integration in backend
2. Set up database migrations
3. Train and integrate ML model
4. Implement email connector

### Medium-term:
1. Authentication & authorization
2. User management
3. Email synchronization
4. Notifications

### Long-term:
1. Advanced ML features
2. Dashboard & analytics
3. Mobile app
4. Integration with other services

## License

MIT License - see LICENSE file for details.

## Author

ChrisRem85

## Project Initialization

This project was created on October 26, 2025 as an initial scaffold with:
- Node.js + TypeScript backend
- Python + FastAPI ML service
- React + Vite frontend
- PostgreSQL database
- Docker Compose setup
- GitHub Actions CI/CD

Initial commit: "Initial scaffold: backend, ml-service, frontend, docker compose, docs"

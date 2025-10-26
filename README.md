# MailTaskManager

MailTaskManager is a full-stack project for automatically processing incoming emails into tasks. The system uses machine learning for email classification and prioritization and provides an intuitive web interface for management.

## 📋 Project Overview

**Main Components:**
- **Backend** (Node.js + TypeScript): REST API for task management (CRUD operations)
- **ML-Service** (Python + FastAPI): Machine Learning microservice for email classification and prioritization (supports English and German emails)
- **Frontend** (React + Vite): User interface for task management
- **Database** (PostgreSQL): Persistent data storage

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Installation & Setup

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

3. **Start all services:**
```bash
docker compose up --build
```

The services will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **ML Service**: http://localhost:8000
- **PostgreSQL**: localhost:5432

### Health Checks

Verify that all services are running:

```bash
# Backend Health Check
curl http://localhost:3000/health

# ML Service Health Check
curl http://localhost:8000/health
```

Expected response (both): `{"status":"ok"}`

## 🧪 Running Tests

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

**Test Results:**
- ✅ 10/10 ML Service tests passing (including bilingual support)
- ✅ Backend unit tests with Jest
- ✅ Health check tests for all services

## 🏗️ Project Structure

```
MailTaskManager/
├── backend/              # Node.js + TypeScript Backend
│   ├── src/
│   │   └── server.ts    # Express Server with REST API
│   ├── tests/           # Jest Tests
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── ml-service/          # Python FastAPI ML Service
│   ├── app/
│   │   └── main.py     # FastAPI App with /predict Endpoint
│   ├── tests/          # Pytest Tests
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/            # React + Vite Frontend
│   ├── src/
│   │   └── App.jsx     # Main Component
│   ├── package.json
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci.yml      # CI/CD Pipeline
├── docs/
│   └── conversation.md # Project Documentation
├── docker-compose.yml  # Multi-Container Setup
├── .env.example        # Environment Variables Template
├── .gitignore
└── README.md
```

## 🔧 Development

### Local Development (without Docker)

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

## 📡 API Endpoints

### Backend (Port 3000)
- `GET /health` - Health Check
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### ML Service (Port 8000)
- `GET /health` - Health Check
- `POST /predict` - Classify email (supports both English and German)
  
  **Request:**
  ```json
  {
    "text": "Email text here / E-Mail Text hier"
  }
  ```
  
  **Response:**
  ```json
  {
    "priority": "high|medium|low",
    "category": "bug|feature|question|meeting|general",
    "confidence": 0.9
  }
  ```

**🌐 Bilingual Support:**
The ML service automatically detects and classifies emails in both English and German.

**Priority Keywords:**
- **High Priority:** urgent, asap, critical, emergency, important, immediately, dringend, sofort, kritisch, notfall, wichtig, unverzüglich
- **Low Priority:** low priority, when possible, eventually, niedrige priorität, irgendwann, gelegentlich

**Category Keywords:**
- **Bug:** bug, error, issue, problem, fehler, defekt, störung
- **Feature:** feature, enhancement, request, funktion, erweiterung, anfrage
- **Question:** question, help, how to, frage, hilfe, wie
- **Meeting:** meeting, call, schedule, besprechung, termin, anruf

**Example Requests:**

*English:*
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "URGENT: Critical bug in production system!"}'
# Response: {"priority": "high", "category": "bug", "confidence": 0.9}
```

*German:*
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Dringend: Kritischer Fehler im System!"}'
# Response: {"priority": "high", "category": "bug", "confidence": 0.9}
```

## 🔐 Security

⚠️ **Important:** Never commit secrets to the repository!
- Use `.env` for local development (not version controlled)
- `.env.example` serves as a template without real credentials
- For production: Use secure secret management solutions
- Change default passwords before deploying to production

## 🧑‍💻 CI/CD

GitHub Actions workflow automatically runs on every push:
- Linting (ESLint, Pylint)
- Unit Tests (Jest, Pytest)
- Build Checks
- Docker Container Tests

## 🚀 Deployment

**Quick Start with Docker:**
```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# Rebuild and restart
docker compose up --build -d
```

**Container Status:**
```bash
docker compose ps
```

All services include health checks and will automatically restart on failure.

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please create a pull request or open an issue.

## 📞 Support

For questions or issues, please create an issue in the GitHub repository.

## 🎯 Features

- ✅ Full-stack TypeScript/JavaScript architecture
- ✅ Bilingual email classification (English/German)
- ✅ RESTful API with comprehensive CRUD operations
- ✅ Machine Learning service for intelligent email processing
- ✅ Modern React frontend with Vite
- ✅ Docker Compose for easy deployment
- ✅ Comprehensive test coverage
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Health monitoring for all services
- ✅ PostgreSQL for reliable data persistence

## 🔮 Roadmap

**Short-term:**
- [ ] PostgreSQL integration in backend
- [ ] Database migrations
- [ ] Advanced ML model training
- [ ] Email connector implementation

**Medium-term:**
- [ ] User authentication & authorization
- [ ] User management system
- [ ] Email synchronization
- [ ] Notification system

**Long-term:**
- [ ] Advanced ML features
- [ ] Analytics dashboard
- [ ] Mobile application
- [ ] Third-party integrations

---

**Built with ❤️ by ChrisRem85**
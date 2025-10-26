import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_root_endpoint():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "service" in data
    assert "version" in data

def test_predict_endpoint():
    """Test prediction endpoint"""
    test_data = {"text": "This is an urgent bug that needs to be fixed"}
    response = client.post("/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert "priority" in data
    assert "category" in data
    assert "confidence" in data
    assert data["priority"] in ["low", "medium", "high"]

def test_predict_high_priority():
    """Test high priority detection"""
    test_data = {"text": "URGENT: Critical system error"}
    response = client.post("/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert data["priority"] == "high"

def test_predict_bug_category():
    """Test bug category detection"""
    test_data = {"text": "There is a bug in the login system"}
    response = client.post("/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert data["category"] == "bug"

def test_predict_missing_text():
    """Test prediction with missing text field"""
    response = client.post("/predict", json={})
    assert response.status_code == 422  # Validation error

def test_predict_german_high_priority():
    """Test high priority detection with German text"""
    test_data = {"text": "Dringend: Kritischer Fehler im System"}
    response = client.post("/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert data["priority"] == "high"

def test_predict_german_bug_category():
    """Test bug category detection with German text"""
    test_data = {"text": "Es gibt einen Fehler in der Anwendung"}
    response = client.post("/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert data["category"] == "bug"

def test_predict_german_feature_request():
    """Test feature category detection with German text"""
    test_data = {"text": "Ich hätte gerne eine neue Funktion"}
    response = client.post("/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert data["category"] == "feature"

def test_predict_german_question():
    """Test question category detection with German text"""
    test_data = {"text": "Ich brauche Hilfe mit dieser Frage"}
    response = client.post("/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert data["category"] == "question"

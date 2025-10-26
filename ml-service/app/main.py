from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import re

app = FastAPI(title="MailTaskManager ML Service")

class PredictionRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    priority: str
    category: str
    confidence: float

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """
    Classify and prioritize email text.
    Supports both English and German language emails.
    This is a stub implementation using simple rule-based classification.
    In production, replace with actual ML model inference.
    """
    text = request.text.lower()
    
    # Simple rule-based classification (stub)
    priority = "medium"
    category = "general"
    confidence = 0.75
    
    # Priority detection based on keywords (English and German)
    high_priority_keywords = [
        "urgent", "asap", "critical", "emergency", "important", "immediately",
        "dringend", "sofort", "kritisch", "notfall", "wichtig", "unverzüglich"
    ]
    low_priority_keywords = [
        "low priority", "when possible", "eventually", "sometime",
        "niedrige priorität", "irgendwann", "gelegentlich", "bei gelegenheit"
    ]
    
    if any(word in text for word in high_priority_keywords):
        priority = "high"
        confidence = 0.90
    elif any(word in text for word in low_priority_keywords):
        priority = "low"
        confidence = 0.85
    
    # Category detection (English and German)
    bug_keywords = ["bug", "error", "issue", "problem", "fehler", "defekt", "störung"]
    feature_keywords = ["feature", "enhancement", "request", "funktion", "erweiterung", "anfrage"]
    question_keywords = ["question", "help", "how to", "frage", "hilfe", "wie"]
    meeting_keywords = ["meeting", "call", "schedule", "besprechung", "termin", "anruf"]
    
    if any(word in text for word in bug_keywords):
        category = "bug"
    elif any(word in text for word in feature_keywords):
        category = "feature"
    elif any(word in text for word in question_keywords):
        category = "question"
    elif any(word in text for word in meeting_keywords):
        category = "meeting"
    
    return PredictionResponse(
        priority=priority,
        category=category,
        confidence=confidence
    )

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "MailTaskManager ML Service",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)"
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

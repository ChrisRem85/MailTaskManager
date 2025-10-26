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
    This is a stub implementation using simple rule-based classification.
    In production, replace with actual ML model inference.
    """
    text = request.text.lower()
    
    # Simple rule-based classification (stub)
    priority = "medium"
    category = "general"
    confidence = 0.75
    
    # Priority detection based on keywords
    if any(word in text for word in ["urgent", "asap", "critical", "emergency", "wichtig"]):
        priority = "high"
        confidence = 0.90
    elif any(word in text for word in ["low priority", "when possible", "eventually"]):
        priority = "low"
        confidence = 0.85
    
    # Category detection
    if any(word in text for word in ["bug", "error", "issue", "problem", "fehler"]):
        category = "bug"
    elif any(word in text for word in ["feature", "enhancement", "request", "funktion"]):
        category = "feature"
    elif any(word in text for word in ["question", "help", "how to", "frage", "hilfe"]):
        category = "question"
    elif any(word in text for word in ["meeting", "call", "schedule", "termin", "besprechung"]):
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

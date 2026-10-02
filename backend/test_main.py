from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "ok"

def test_analyze_empty_input():
    response = client.post("/api/analyze", json={"content": "", "language": "English"})
    assert response.status_code == 400

def test_analyze_oversized_input():
    oversized_content = "A" * 5001
    response = client.post("/api/analyze", json={"content": oversized_content, "language": "English"})
    assert response.status_code == 400

def test_analyze_demo_mode():
    response = client.post("/api/analyze", json={"content": "Test content", "language": "English", "mode": "demo"})
    assert response.status_code == 200
    data = response.json()
    assert "risk_level" in data
    assert "DEMO MODE" in data["disclaimer"]

def test_analyze_live_mode():
    response = client.post("/api/analyze", json={"content": "This is a free laptop.", "language": "English", "mode": "live"})
    assert response.status_code == 200
    data = response.json()
    assert data["analysis_source"] == "gemini"

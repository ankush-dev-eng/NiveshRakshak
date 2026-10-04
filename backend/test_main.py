"""
NiveshRakshak — Backend test suite
====================================
All Gemini API calls are mocked. No real API key is required.
"""
import os
import json
import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient

# ---------------------------------------------------------------------------
# Patch environment BEFORE importing main so module-level code uses mocks
# ---------------------------------------------------------------------------
_base_env = {"GEMINI_API_KEY": "test-key-valid", "GEMINI_MODEL": "gemini-2.0-flash"}


def _make_mock_model(name="models/gemini-2.0-flash", methods=None):
    """Return a mock object resembling a google.genai Model."""
    m = MagicMock()
    m.name = name
    m.supportedGenerationMethods = methods if methods is not None else ["generateContent"]
    m.supported_actions = None  # rely on supportedGenerationMethods
    return m


# ---------------------------------------------------------------------------
# Re-usable client fixture so every test gets a fresh import state
# ---------------------------------------------------------------------------
@pytest.fixture()
def api_client(monkeypatch):
    """Provide a TestClient with a mocked Gemini client."""
    monkeypatch.setenv("GEMINI_API_KEY", "test-key-valid")
    monkeypatch.setenv("GEMINI_MODEL", "gemini-2.0-flash")

    mock_genai_client = MagicMock()
    mock_genai_client.models.list.return_value = [_make_mock_model()]
    mock_generate = MagicMock()
    mock_generate.text = "OK"
    mock_genai_client.models.generate_content.return_value = mock_generate

    import main
    monkeypatch.setattr(main, "GEMINI_API_KEY", "test-key-valid")
    monkeypatch.setattr(main, "GEMINI_MODEL", "gemini-2.0-flash")
    monkeypatch.setattr(main, "client", mock_genai_client)

    yield TestClient(main.app), mock_genai_client


# ===========================================================================
# ─── EXISTING TESTS (preserved) ────────────────────────────────────────────
# ===========================================================================

def test_health_check():
    from main import app
    c = TestClient(app)
    response = c.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    # 14. Health endpoint: model must come from config, not hardcoded
    assert "model" in data
    assert data["model"] != ""


def test_analyze_empty_input():
    from main import app
    c = TestClient(app)
    response = c.post("/api/analyze", json={"content": "", "language": "English"})
    assert response.status_code == 400


def test_analyze_oversized_input():
    from main import app
    c = TestClient(app)
    oversized_content = "A" * 5001
    response = c.post("/api/analyze", json={"content": oversized_content, "language": "English"})
    assert response.status_code == 400


@patch("main.client.models.generate_content")
def test_analyze_demo_mode(mock_generate_content):
    from main import app
    c = TestClient(app)
    response = c.post("/api/analyze", json={"content": "Test content", "language": "English", "mode": "demo"})
    mock_generate_content.assert_not_called()
    assert response.status_code == 200
    data = response.json()
    assert "risk_level" in data
    assert "DEMO MODE" in data["disclaimer"]
    assert data["analysis_source"] == "demo"


@patch("main.client.models.generate_content")
def test_analyze_live_mode(mock_generate_content):
    mock_response = MagicMock()
    mock_response.text = json.dumps({
        "risk_level": "LOW", "risk_score": 0, "summary": "test",
        "red_flags": [], "claims": [], "recommended_actions": [],
        "verification_steps": [], "disclaimer": "test", "analysis_source": "gemini"
    })
    mock_generate_content.return_value = mock_response
    from main import app
    c = TestClient(app)
    response = c.post("/api/analyze", json={"content": "This is a free laptop.", "language": "Hindi", "mode": "live"})
    mock_generate_content.assert_called_once()
    assert response.status_code == 200
    assert response.json()["analysis_source"] == "gemini"


@patch("main.client.models.generate_content")
def test_analyze_live_mode_gemini_failure(mock_generate_content):
    mock_generate_content.side_effect = Exception("API Quota Exceeded")
    from main import app
    c = TestClient(app)
    response = c.post("/api/analyze", json={"content": "Test fail", "language": "English", "mode": "live"})
    assert response.status_code == 502
    assert "Gemini analysis unavailable" in response.json()["detail"]


# ===========================================================================
# ─── SYSTEM STATUS TESTS ───────────────────────────────────────────────────
# ===========================================================================

# ── Test 1: Valid API key + valid model → all CONNECTED / AVAILABLE ─────────
def test_system_status_valid_api(api_client):
    client, _ = api_client
    response = client.get("/api/system-status")
    assert response.status_code == 200
    data = response.json()
    assert data["api_key_status"] == "CONNECTED"
    assert data["model_status"] == "AVAILABLE"
    # live_test NOT_RUN by default (no ?live_test=true)
    assert data["live_test"] in ("NOT_RUN", "PASSED", "UNAVAILABLE")
    assert "verified_at" in data


# ── Test 2: Missing API key → NOT_CONNECTED ──────────────────────────────────
def test_system_status_missing_api_key(monkeypatch):
    import main
    monkeypatch.setattr(main, "GEMINI_API_KEY", None)
    monkeypatch.setattr(main, "client", None)
    c = TestClient(main.app)
    response = c.get("/api/system-status")
    assert response.status_code == 200
    data = response.json()
    assert data["api_key_status"] == "NOT_CONNECTED"
    assert data["model_status"] == "UNVERIFIED"
    assert data["live_test"] == "UNAVAILABLE"


# ── Test 3: Invalid API key → INVALID ───────────────────────────────────────
def test_system_status_invalid_api_key(monkeypatch):
    import main

    mock_client = MagicMock()
    mock_client.models.list.side_effect = Exception("403 permission denied invalid api_key")
    monkeypatch.setattr(main, "GEMINI_API_KEY", "bad-key")
    monkeypatch.setattr(main, "GEMINI_MODEL", "gemini-2.0-flash")
    monkeypatch.setattr(main, "client", mock_client)

    c = TestClient(main.app)
    response = c.get("/api/system-status")
    assert response.status_code == 200
    data = response.json()
    assert data["api_key_status"] == "INVALID"
    assert data["model_status"] == "UNVERIFIED"


# ── Test 4: Model not in available list → NOT_AVAILABLE ─────────────────────
def test_system_status_unavailable_model(monkeypatch):
    import main

    # Return a different model, not the configured one
    other_model = _make_mock_model(name="models/gemini-1.5-pro")
    mock_client = MagicMock()
    mock_client.models.list.return_value = [other_model]
    monkeypatch.setattr(main, "GEMINI_API_KEY", "valid-key")
    monkeypatch.setattr(main, "GEMINI_MODEL", "gemini-2.0-flash")
    monkeypatch.setattr(main, "client", mock_client)

    c = TestClient(main.app)
    response = c.get("/api/system-status")
    assert response.status_code == 200
    data = response.json()
    assert data["api_key_status"] == "CONNECTED"
    assert data["model_status"] == "NOT_AVAILABLE"


# ── Test 5: Live generation test succeeds ───────────────────────────────────
def test_system_status_live_test_passed(api_client):
    client, mock_genai_client = api_client
    mock_response = MagicMock()
    mock_response.text = "OK"
    mock_genai_client.models.generate_content.return_value = mock_response

    response = client.get("/api/system-status?live_test=true")
    assert response.status_code == 200
    data = response.json()
    assert data["api_key_status"] == "CONNECTED"
    assert data["live_test"] == "PASSED"


# ── Test 6: Live generation test fails ──────────────────────────────────────
def test_system_status_live_test_failed(api_client):
    client, mock_genai_client = api_client
    # models.list succeeds but generate_content fails
    mock_genai_client.models.generate_content.side_effect = Exception("Service unavailable 503")

    response = client.get("/api/system-status?live_test=true")
    assert response.status_code == 200
    data = response.json()
    assert data["api_key_status"] == "CONNECTED"
    assert data["live_test"] in ("FAILED", "RATE_LIMITED")


# ── Test 7: Model name comes from configuration (GEMINI_MODEL env var) ───────
def test_system_status_model_from_config(monkeypatch):
    import main

    mock_client = MagicMock()
    mock_client.models.list.return_value = [_make_mock_model("models/gemini-1.5-pro")]
    monkeypatch.setattr(main, "GEMINI_API_KEY", "valid-key")
    monkeypatch.setattr(main, "GEMINI_MODEL", "gemini-1.5-pro")
    monkeypatch.setattr(main, "client", mock_client)

    c = TestClient(main.app)
    response = c.get("/api/system-status")
    data = response.json()
    assert data["model_id"] == "gemini-1.5-pro"
    assert "Gemini" in data["model_name"]
    assert "1.5" in data["model_name"]


# ── Test 8: API key is NEVER returned in the response ───────────────────────
def test_system_status_no_api_key_in_response(api_client):
    client, _ = api_client
    response = client.get("/api/system-status?live_test=true")
    assert response.status_code == 200
    response_text = response.text
    # "test-key-valid" must not appear anywhere in the JSON body
    assert "test-key-valid" not in response_text
    assert "GEMINI_API_KEY" not in response_text
    data = response.json()
    assert "api_key" not in data


# ── Test 9: Dashboard /api/analyze and /api/system-status use same model ────
def test_dashboard_and_system_status_same_model(api_client):
    client, mock_genai_client = api_client
    # System status exposes model_id
    status_resp = client.get("/api/system-status")
    status_model = status_resp.json()["model_id"]

    # Health also exposes the model
    health_resp = client.get("/api/health")
    health_model = health_resp.json()["model"]

    assert status_model == health_model

    # Verify analyze uses same model (captured from mock call args)
    mock_response = MagicMock()
    mock_response.text = json.dumps({
        "risk_level": "LOW", "risk_score": 0, "summary": "ok",
        "red_flags": [], "claims": [], "recommended_actions": [],
        "verification_steps": [], "disclaimer": "ok", "analysis_source": "gemini"
    })
    mock_genai_client.models.generate_content.return_value = mock_response

    analyze_resp = client.post("/api/analyze", json={"content": "Test message", "language": "English", "mode": "live"})
    assert analyze_resp.status_code == 200

    call_kwargs = mock_genai_client.models.generate_content.call_args
    called_model = call_kwargs[1].get("model") or call_kwargs[0][0]
    assert called_model == status_model


# ── Test 10: Health endpoint remains functional and includes model ────────────
def test_health_endpoint_functional(api_client):
    client, _ = api_client
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "model" in data
    assert data["model"] != ""
    # Must NOT expose API key
    assert "api_key" not in str(data).lower() or "api_key_configured" in data  # configured flag is OK

# ── Test 11: End-to-end model consistency check with custom model ─────────────
def test_end_to_end_model_consistency(monkeypatch):
    import main
    custom_model = "gemini-4.0-test"
    mock_client = MagicMock()
    mock_client.models.list.return_value = [_make_mock_model(f"models/{custom_model}")]
    
    # Mock generation to verify it gets called with correct model
    mock_response = MagicMock()
    mock_response.text = json.dumps({
        "risk_level": "LOW", "risk_score": 0, "summary": "ok",
        "red_flags": [], "claims": [], "recommended_actions": [],
        "verification_steps": [], "disclaimer": "ok", "analysis_source": "gemini"
    })
    mock_client.models.generate_content.return_value = mock_response

    monkeypatch.setattr(main, "GEMINI_API_KEY", "valid-key")
    monkeypatch.setattr(main, "GEMINI_MODEL", custom_model)
    monkeypatch.setattr(main, "client", mock_client)

    c = TestClient(main.app)
    
    # Check status endpoint
    status_resp = c.get("/api/system-status")
    status_model = status_resp.json()["model_id"]
    assert status_model == custom_model
    
    # Check analyze endpoint
    analyze_resp = c.post("/api/analyze", json={"content": "Test message", "language": "English", "mode": "live"})
    assert analyze_resp.status_code == 200
    
    call_kwargs = mock_client.models.generate_content.call_args
    called_model = call_kwargs[1].get("model") or call_kwargs[0][0]
    assert called_model == custom_model

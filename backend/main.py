import sys
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
import os
import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="NiveshRakshak API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Single source of truth for model configuration ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")

client = None

if GEMINI_API_KEY:
    try:
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Warning: Could not initialize Gemini client: {e}")
        client = None


def _model_display_name(model_id: str) -> str:
    """Convert model ID to human-readable display name.
    e.g. gemini-2.0-flash -> Gemini 2.0 Flash
    Preserves numeric/version parts as-is (no capitalise).
    """
    parts = model_id.split("-")
    return " ".join(p if p[0].isdigit() else p.capitalize() for p in parts if p)


def _bare_model_id(model_name: str) -> str:
    """Strip 'models/' prefix returned by the Google SDK.
    e.g. 'models/gemini-2.0-flash' -> 'gemini-2.0-flash'
    """
    return model_name.removeprefix("models/").strip()


class AnalyzeRequest(BaseModel):
    content: str
    language: str = "English"
    mode: str = "live"


class RedFlag(BaseModel):
    title: str
    severity: str
    evidence: str
    explanation: str


class ClaimAssessment(BaseModel):
    claim: str
    assessment: str
    reason: str


class AnalysisResult(BaseModel):
    risk_level: str
    risk_score: int
    summary: str
    red_flags: List[RedFlag]
    claims: List[ClaimAssessment]
    recommended_actions: List[str]
    verification_steps: List[str]
    disclaimer: str
    analysis_source: str


def get_demo_response(content: str, language: str) -> dict:
    """Return a deterministic demo response based on content heuristics."""
    content_lower = content.lower()
    
    # Identify if it's one of the exact demo examples
    is_phishing = "http://bit.ly/update-kyc-now" in content_lower
    is_fake_mentor = "secret algorithm" in content_lower
    is_fake_reg = "sebi-approved trading platform offering 10%" in content_lower
    is_legitimate = "mutual funds through sips" in content_lower
    
    scam_keywords = [
        "guaranteed", "double", "triple", "otp", "advance", "pay now",
        "sebi registered", "join now", "limited spots", "telegram", "whatsapp group",
        "fixed returns", "monthly return", "risk-free", "kyc pending", "click here",
        "bit.ly", "secret algorithm", "inner circle", "multibagger"
    ]
    
    score = sum(1 for kw in scam_keywords if kw in content_lower)
    
    base_response = {
        "risk_level": "LOW",
        "risk_score": 0,
        "summary": "Insufficient context for financial risk analysis. Please provide a financial message or claim.",
        "red_flags": [],
        "claims": [],
        "recommended_actions": [],
        "verification_steps": [],
        "disclaimer": "⚠️ DEMO MODE — This is a deterministic sample analysis.",
        "analysis_source": "demo"
    }

    if is_phishing:
        base_response = {
            "risk_level": "CRITICAL",
            "risk_score": 95,
            "summary": "This message is a classic phishing attempt to steal banking credentials via a fake KYC link.",
            "red_flags": [
                {"title": "Fake Link", "severity": "HIGH", "evidence": "http://bit.ly/update-kyc-now", "explanation": "Legitimate banks do not use shortened URLs for KYC."}
            ],
            "claims": [
                {"claim": "Account will be blocked", "assessment": "UNVERIFIED", "reason": "Standard pressure tactic used by scammers."}
            ],
            "recommended_actions": ["Do not click the link.", "Contact your broker directly."],
            "verification_steps": ["Check your official trading app for KYC alerts."],
            "disclaimer": "⚠️ DEMO MODE — This is a deterministic sample analysis.",
            "analysis_source": "demo"
        }
    elif is_fake_mentor:
        base_response = {
            "risk_level": "HIGH",
            "risk_score": 85,
            "summary": "This message uses unrealistic claims of wealth generation to sell likely fraudulent mentorship or bot access.",
            "red_flags": [
                {"title": "Unrealistic Returns", "severity": "HIGH", "evidence": "₹10,000 into ₹1 Crore in 6 months", "explanation": "Statistically impossible consistent returns."}
            ],
            "claims": [
                {"claim": "Secret algorithm/bot trades for you", "assessment": "UNVERIFIED", "reason": "No verifiable proof provided."}
            ],
            "recommended_actions": ["Ignore the message.", "Do not pay for VIP access."],
            "verification_steps": ["Ask for audited P&L statements."],
            "disclaimer": "⚠️ DEMO MODE — This is a deterministic sample analysis.",
            "analysis_source": "demo"
        }
    elif is_fake_reg:
        base_response = {
            "risk_level": "CRITICAL",
            "risk_score": 90,
            "summary": "This message falsely claims SEBI approval while offering illegal fixed returns on deposits.",
            "red_flags": [
                {"title": "Guaranteed Returns", "severity": "HIGH", "evidence": "10% monthly fixed returns", "explanation": "SEBI prohibits guaranteed returns in trading."}
            ],
            "claims": [
                {"claim": "Official SEBI-approved", "assessment": "UNVERIFIED", "reason": "Fake claim to build trust."}
            ],
            "recommended_actions": ["Do not transfer funds.", "Report to SEBI."],
            "verification_steps": ["Verify SEBI registration number on sebi.gov.in"],
            "disclaimer": "⚠️ DEMO MODE — This is a deterministic sample analysis.",
            "analysis_source": "demo"
        }
    elif score >= 2:
        base_response = {
            "risk_level": "CRITICAL",
            "risk_score": 92,
            "summary": "This message displays multiple hallmarks of a financial investment scam: guaranteed returns, manufactured urgency, advance payment demands.",
            "red_flags": [
                {"title": "Guaranteed High Returns", "severity": "HIGH", "evidence": "guaranteed returns", "explanation": "No regulated financial product can legally guarantee such returns."}
            ],
            "claims": [
                {"claim": "SEBI registered", "assessment": "UNVERIFIED", "reason": "No registration number was provided."}
            ],
            "recommended_actions": ["Do not transfer any money."],
            "verification_steps": ["Verify the organization's SEBI registration."],
            "disclaimer": "⚠️ DEMO MODE — This is a deterministic sample analysis.",
            "analysis_source": "demo"
        }
    elif is_legitimate:
        base_response = {
            "risk_level": "LOW",
            "risk_score": 8,
            "summary": "This message appears to be standard, factual financial education content with appropriate risk disclosures.",
            "red_flags": [],
            "claims": [
                {"claim": "Mutual fund investments subject to market risks", "assessment": "SUPPORTED", "reason": "Standard mandatory disclaimer."}
            ],
            "recommended_actions": ["Consult a registered advisor if needed."],
            "verification_steps": ["Read scheme related documents."],
            "disclaimer": "⚠️ DEMO MODE — This is a deterministic sample analysis.",
            "analysis_source": "demo"
        }

    # Simulate translation for non-English demo requests
    if language.lower() == "hindi" and base_response["risk_level"] != "LOW":
        base_response["summary"] = "यह संदेश एक वित्तीय घोटाले का संकेत देता है। कृपया सावधान रहें।"
    elif language.lower() == "marathi" and base_response["risk_level"] != "LOW":
        base_response["summary"] = "हा संदेश आर्थिक फसवणुकीचा संकेत देतो. कृपया सावधगिरी बाळगा."
    elif language.lower() == "hinglish" and base_response["risk_level"] != "LOW":
        base_response["summary"] = "Ye message financial scam ho sakta hai. Savdhaan rahein."

    return base_response


def parse_gemini_response(response_text: str) -> dict:
    """Safely parse Gemini's JSON response, stripping markdown fences if present."""
    text = response_text.strip()
    text = re.sub(r'^```(?:json)?\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return json.loads(text)


SYSTEM_PROMPT = """You are NiveshRakshak, an AI risk analysis engine that helps Indian retail investors identify potentially fraudulent or misleading financial messages.

STRICT RULES:
1. DO NOT claim to definitively detect or prove fraud.
2. DO NOT provide personalized investment advice.
3. DO NOT recommend specific stocks, mutual funds, crypto, or financial products.
4. DO NOT fabricate SEBI registrations, laws, or statistics.
5. Analyze ONLY the observable characteristics in the provided message. If the message does not contain any financial claims, advice, or requests (e.g. "free", "hi", "hello", "My laptop battery is draining"), you MUST set risk_level to "LOW", risk_score to 0, and state "Insufficient context for financial risk analysis." in the summary. Do not invent claims about SIPs or mutual funds if they are not in the text.
6. The disclaimer MUST state this is AI-assisted risk assessment, not legal or investment advice.
7. Respond entirely in the requested language.

Return a JSON object with this exact structure:
{
  "risk_level": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "risk_score": integer 0-100,
  "summary": "brief summary of the risk assessment",
  "red_flags": [
    {
      "title": "name of the red flag",
      "severity": "LOW" | "MEDIUM" | "HIGH",
      "evidence": "exact text or phrase from the user's message that triggered this",
      "explanation": "why this is a risk indicator"
    }
  ],
  "claims": [
    {
      "claim": "the specific claim made in the message",
      "assessment": "SUPPORTED" | "QUESTIONABLE" | "UNVERIFIED",
      "reason": "explanation of the assessment"
    }
  ],
  "recommended_actions": ["action 1", "action 2", "action 3"],
  "verification_steps": ["step 1", "step 2", "step 3"],
  "disclaimer": "NiveshRakshak provides informational risk analysis, not investment advice or legal advice. Please independently verify all claims through official regulatory sources."
}"""


@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_content(request: AnalyzeRequest):
    """Analyze financial content for risk indicators."""
    content = request.content.strip()
    
    if not content:
        raise HTTPException(status_code=400, detail="Input cannot be empty.")
    
    if len(content) > 5000:
        raise HTTPException(status_code=400, detail="Input too long. Max 5000 characters.")
    
    if request.mode == "demo":
        return get_demo_response(content, request.language)
        
    if not client:
        raise HTTPException(status_code=502, detail="Gemini analysis unavailable. API key not configured.")
    
    user_prompt = f"""Analyze the following financial message. Respond ONLY in {request.language}, except keep financial/regulatory terms (SEBI, RBI, OTP, SIP, etc.) in their standard forms.

Message to analyze:
---
{content}
---

Return only valid JSON matching the specified schema. No markdown formatting."""

    max_attempts = 2
    last_error = None

    for attempt in range(1, max_attempts + 1):
        try:
            print(f"GEMINI REQUEST START (attempt {attempt}/{max_attempts})\nMODEL = {GEMINI_MODEL}")
            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=[
                    {"role": "user", "parts": [{"text": SYSTEM_PROMPT + "\n\n" + user_prompt}]}
                ],
            )
            print("GEMINI RESPONSE RECEIVED\nSOURCE = GEMINI")
            result = parse_gemini_response(response.text)
            
            result.setdefault("risk_level", "MEDIUM")
            result.setdefault("risk_score", 50)
            result.setdefault("summary", "Analysis complete.")
            result.setdefault("red_flags", [])
            result.setdefault("claims", [])
            result.setdefault("recommended_actions", ["Independently verify all claims before taking action."])
            result.setdefault("verification_steps", ["Verify the sender's identity through official channels."])
            result.setdefault("disclaimer", "NiveshRakshak provides informational risk analysis, not investment advice or legal advice.")
            result["analysis_source"] = "gemini"
            
            if result["risk_level"] not in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]:
                result["risk_level"] = "MEDIUM"
            
            try:
                result["risk_score"] = max(0, min(100, int(result["risk_score"])))
            except (ValueError, TypeError):
                result["risk_score"] = 50
                
            return result
            
        except json.JSONDecodeError as e:
            print(f"JSON parse error from Gemini (attempt {attempt}): {e}")
            last_error = e
            break
        except Exception as e:
            print(f"Gemini API error (attempt {attempt}): {e}")
            last_error = e
            if attempt < max_attempts:
                time.sleep(1.5)
                continue
            break

    error_type = "JSON parse error" if isinstance(last_error, json.JSONDecodeError) else "API error"
    print(f"Gemini {error_type} after {max_attempts} attempts: {last_error}")
    raise HTTPException(status_code=502, detail=f"Gemini analysis unavailable. {error_type}. Please retry.")


@app.get("/api/health")
def health_check():
    """Check API health and demo mode status."""
    return {
        "status": "ok",
        "demo_mode": client is None,
        "api_configured": GEMINI_API_KEY is not None and GEMINI_API_KEY != "",
        "version": "1.0.0",
        "model": GEMINI_MODEL
    }


@app.get("/api/system-status")
async def system_status(live_test: bool = False):
    """
    Perform a live check of API key validity, model availability, and optionally
    run a lightweight generateContent test. Never exposes the API key.

    Query param:
      live_test=true  →  also run a real generateContent call
    """
    verified_at = datetime.now(timezone.utc).isoformat()

    # ── 1. API key present? ──────────────────────────────────────────────────
    if not GEMINI_API_KEY:
        return {
            "api_key_status": "NOT_CONNECTED",
            "api_key_message": "GEMINI_API_KEY is not set in the backend environment.",
            "model_id": GEMINI_MODEL,
            "model_name": _model_display_name(GEMINI_MODEL),
            "model_status": "UNVERIFIED",
            "model_message": "Cannot verify model without API key.",
            "live_test": "UNAVAILABLE",
            "live_test_message": "API key required for live generation test.",
            "verified_at": verified_at,
        }

    if not client:
        return {
            "api_key_status": "ERROR",
            "api_key_message": "Gemini client could not be initialized.",
            "model_id": GEMINI_MODEL,
            "model_name": _model_display_name(GEMINI_MODEL),
            "model_status": "UNVERIFIED",
            "model_message": "Client initialization failed.",
            "live_test": "UNAVAILABLE",
            "live_test_message": "Client initialization failed.",
            "verified_at": verified_at,
        }

    # ── 2. Validate key + check model availability via models.list() ─────────
    api_key_status = "ERROR"
    api_key_message = "Unknown error during API validation."
    model_status = "UNVERIFIED"
    model_message = "Model availability not checked."
    model_supports_generate = False

    try:
        models_pager = client.models.list()
        # Collect all models (pager may be a list or a pager object)
        try:
            all_models = list(models_pager)
        except Exception:
            all_models = [models_pager] if models_pager else []

        api_key_status = "CONNECTED"
        api_key_message = "Gemini API authentication successful."

        # Find configured model — Google SDK returns names like "models/gemini-2.0-flash"
        configured_model_found = False
        for m in all_models:
            m_name = getattr(m, "name", "") or ""
            bare = _bare_model_id(m_name)
            if bare == GEMINI_MODEL or m_name == GEMINI_MODEL:
                configured_model_found = True
                # Check supported generation methods / actions
                supported = (
                    getattr(m, "supported_actions", None)
                    or getattr(m, "supportedGenerationMethods", None)
                    or []
                )
                actions_str = " ".join(str(a) for a in supported).lower()
                # Accept if: list explicitly includes generateContent, OR list is empty (assume supported)
                if "generatecontent" in actions_str or "generate_content" in actions_str or not supported:
                    model_supports_generate = True
                break

        if configured_model_found and model_supports_generate:
            model_status = "AVAILABLE"
            model_message = f"Model {GEMINI_MODEL} is available and supports generateContent."
        elif configured_model_found:
            model_status = "NOT_AVAILABLE"
            model_message = f"Model {GEMINI_MODEL} found but does not support generateContent."
        else:
            model_status = "NOT_AVAILABLE"
            model_message = f"Model {GEMINI_MODEL} not found in available models for this API key."

    except Exception as e:
        err_str = str(e).lower()
        if "403" in err_str or "permission" in err_str or "invalid" in err_str or "api_key" in err_str or "authentication" in err_str:
            api_key_status = "INVALID"
            api_key_message = "API key rejected by Gemini (authentication/permission error)."
        elif "429" in err_str or "quota" in err_str or "rate" in err_str:
            api_key_status = "RATE_LIMITED"
            api_key_message = "Rate limit or quota exceeded. Key is likely valid."
        else:
            api_key_status = "ERROR"
            api_key_message = "Unexpected error during API validation."

        model_status = "UNVERIFIED"
        model_message = "Cannot verify model availability due to API error."

    # ── 3. Optional live generateContent test ────────────────────────────────
    live_test_status = "NOT_RUN"
    live_test_message = "Live test not requested. Click 'Verify Connection' to run."

    if live_test and api_key_status in ("CONNECTED", "RATE_LIMITED"):
        try:
            test_response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=[{"role": "user", "parts": [{"text": "Respond with the single word OK."}]}],
            )
            output = (test_response.text or "").strip().upper()
            if output:
                live_test_status = "PASSED"
                live_test_message = "generateContent test passed. Model is fully operational."
            else:
                live_test_status = "FAILED"
                live_test_message = "generateContent returned an empty response."
        except Exception as e:
            err_str = str(e).lower()
            if "429" in err_str or "quota" in err_str:
                live_test_status = "RATE_LIMITED"
                live_test_message = "Rate limit hit during live test. Try again later."
            elif "503" in err_str or "unavailable" in err_str:
                live_test_status = "FAILED"
                live_test_message = "Gemini service temporarily unavailable."
            else:
                live_test_status = "FAILED"
                live_test_message = "generateContent test failed."

    return {
        "api_key_status": api_key_status,
        "api_key_message": api_key_message,
        "model_id": GEMINI_MODEL,
        "model_name": _model_display_name(GEMINI_MODEL),
        "model_status": model_status,
        "model_message": model_message,
        "live_test": live_test_status,
        "live_test_message": live_test_message,
        "verified_at": verified_at,
    }

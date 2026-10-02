import sys
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
import os
import json
import re
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

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-3.5-flash"
client = None

if GEMINI_API_KEY:
    try:
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Warning: Could not initialize Gemini client: {e}")
        client = None


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
        "guaranteed", "double", "triple", "otÐ¿", "otp", "advance", "pay now",
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
        "disclaimer": "âš  DEMO MODE â€” This is a deterministic sample analysis.",
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
            "disclaimer": "âš  DEMO MODE â€” This is a deterministic sample analysis.",
            "analysis_source": "demo"
        }
    elif is_fake_mentor:
        base_response = {
            "risk_level": "HIGH",
            "risk_score": 85,
            "summary": "This message uses unrealistic claims of wealth generation to sell likely fraudulent mentorship or bot access.",
            "red_flags": [
                {"title": "Unrealistic Returns", "severity": "HIGH", "evidence": "â‚¹10,000 into â‚¹1 Crore in 6 months", "explanation": "Statistically impossible consistent returns."}
            ],
            "claims": [
                {"claim": "Secret algorithm/bot trades for you", "assessment": "UNVERIFIED", "reason": "No verifiable proof provided."}
            ],
            "recommended_actions": ["Ignore the message.", "Do not pay for VIP access."],
            "verification_steps": ["Ask for audited P&L statements."],
            "disclaimer": "âš  DEMO MODE â€” This is a deterministic sample analysis.",
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
            "disclaimer": "âš  DEMO MODE â€” This is a deterministic sample analysis.",
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
            "disclaimer": "âš  DEMO MODE â€” This is a deterministic sample analysis.",
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
            "disclaimer": "âš  DEMO MODE â€” This is a deterministic sample analysis.",
            "analysis_source": "demo"
        }

    # Simulate translation for non-English demo requests
    if language.lower() == "hindi" and base_response["risk_level"] != "LOW":
        base_response["summary"] = "à¤¯à¤¹ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤à¤• à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤˜à¥‹à¤Ÿà¤¾à¤²à¥‡ à¤•à¤¾ à¤¸à¤‚à¤•à¥‡à¤¤ à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¸à¤¾à¤µà¤§à¤¾à¤¨ à¤°à¤¹à¥‡à¤‚à¥¤"
    elif language.lower() == "marathi" and base_response["risk_level"] != "LOW":
        base_response["summary"] = "à¤¹à¤¾ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤†à¤°à¥à¤¥à¤¿à¤• à¤«à¤¸à¤µà¤£à¥à¤•à¥€à¤šà¤¾ à¤¸à¤‚à¤•à¥‡à¤¤ à¤¦à¥‡à¤¤à¥‹. à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¸à¤¾à¤µà¤§à¤—à¤¿à¤°à¥€ à¤¬à¤¾à¤³à¤—à¤¾."
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

    try:
        print(f"GEMINI REQUEST START\nMODEL = {GEMINI_MODEL}")
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
        print(f"JSON parse error from Gemini: {e}")
        raise HTTPException(status_code=502, detail="Gemini analysis unavailable. Invalid JSON.")
    except Exception as e:
        print(f"Gemini API error: {e}")
        raise HTTPException(status_code=502, detail="Gemini analysis unavailable. API Error.")


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


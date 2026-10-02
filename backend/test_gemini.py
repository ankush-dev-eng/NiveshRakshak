import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print(f"GEMINI_API_KEY_PRESENT = {bool(GEMINI_API_KEY)}")
print(f"ENV_PATH = {env_path}")

try:
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("GEMINI CONNECTION: PASS")
    GEMINI_MODEL = "gemini-3.5-flash"
    print(f"MODEL: {GEMINI_MODEL}")
    
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents="Analyze this synthetic financial-risk message: 'Guaranteed 40% return in 7 days if I transfer ₹5000 today.'"
    )
    print("RESPONSE RECEIVED: YES")
    print(response.text)
except Exception as e:
    print(f"FAILED: {type(e).__name__} - {e}")

export interface RedFlag {
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  evidence: string;
  explanation: string;
}

export interface ClaimAssessment {
  claim: string;
  assessment: "SUPPORTED" | "QUESTIONABLE" | "UNVERIFIED";
  reason: string;
}

export interface AnalysisResult {
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  risk_score: number;
  summary: string;
  red_flags: RedFlag[];
  claims: ClaimAssessment[];
  recommended_actions: string[];
  verification_steps: string[];
  disclaimer: string;
  analysis_source: "gemini" | "demo";
}

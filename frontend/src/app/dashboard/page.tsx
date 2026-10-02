"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, ShieldAlert, ArrowRight, Loader2, Flag, FileSearch, ArrowUpRight, ChevronDown } from "lucide-react";

interface RedFlag {
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  evidence: string;
  explanation: string;
}

interface ClaimAssessment {
  claim: string;
  assessment: "SUPPORTED" | "QUESTIONABLE" | "UNVERIFIED";
  reason: string;
}

interface AnalysisResult {
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

const DEMO_TEXTS = [
  "GUARANTEED RETURNS!! 🚀🚀 Double your money in 30 days! Join our premium Telegram group for daily multibagger stock tips. Pay ₹5000 advance to our account to secure your spot. Act now, only 5 spots left!",
  "We are an official SEBI-approved trading platform offering 10% monthly fixed returns on your deposit. Transfer funds to our secure nodal officer account (HDFC Acc: 123456789) to begin your risk-free investment journey.",
  "Dear Customer, your trading account KYC is pending. Your account will be blocked in 24 hours. Click this link: http://bit.ly/update-kyc-now to update immediately. Never share your OTP with anyone.",
  "I turned ₹10,000 into ₹1 Crore in 6 months using my secret algorithm! I am selecting 10 people to mentor personally. DM me to join my VIP inner circle. You don't need to know anything about the market, my bot trades for you.",
  "Investing in mutual funds through SIPs (Systematic Investment Plans) can be a good way to build wealth over the long term through the power of compounding. Note: Mutual fund investments are subject to market risks, read all scheme related documents carefully."
];

export default function Dashboard() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const demoId = searchParams.get("demo");
      if (demoId && !isNaN(Number(demoId))) {
        const idx = Number(demoId) - 1;
        if (idx >= 0 && idx < DEMO_TEXTS.length) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setTimeout(() => setContent(DEMO_TEXTS[idx]), 0);
        }
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8080/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, language })
      });

      if (!response.ok) {
        throw new Error("Failed to analyze content");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred during analysis.");
      } else {
        setError("An error occurred during analysis.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = () => {
    const randomIdx = Math.floor(Math.random() * DEMO_TEXTS.length);
    setContent(DEMO_TEXTS[randomIdx]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Input Section */}
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="font-heading text-5xl md:text-6xl uppercase tracking-wider mb-6">Analyze</h1>
            <div className="h-px w-24 bg-accent mb-8"></div>
            <p className="text-muted-foreground text-lg mb-8">Paste a financial message below to evaluate its risk and detect potential fraud.</p>
            
            <div className="space-y-6">
              <div className="relative" ref={dropdownRef}>
                <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-3">Output Language</label>
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full bg-surface border border-line-strong px-4 py-4 text-foreground font-medium focus:outline-none focus:border-accent appearance-none rounded-none cursor-pointer flex justify-between items-center"
                >
                  {language}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {isLangOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-surface border border-line-strong shadow-xl">
                    {["English", "Hindi", "Marathi", "Hinglish"].map((lang) => (
                      <div 
                        key={lang}
                        className="px-4 py-3 hover:bg-background cursor-pointer text-foreground border-b border-line-strong last:border-0"
                        onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-3">Message or Claim</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste a WhatsApp message, SMS, investment offer, social media post, email, or financial claim..."
                  className="w-full h-64 bg-surface/50 border border-line-strong p-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none font-sans text-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleAnalyze} 
                  disabled={loading || !content} 
                  className="group flex-1 bg-accent text-white h-14 flex items-center justify-center font-mono text-xs tracking-widest uppercase hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-3" /> : <ShieldAlert className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />}
                  {loading ? "Analyzing..." : "Analyze Content"}
                </button>
                <button 
                  onClick={loadDemo} 
                  className="h-14 px-8 border border-line-strong text-foreground font-mono text-xs tracking-widest uppercase hover:border-foreground hover:bg-surface transition-colors"
                >
                  Load Demo
                </button>
                <button 
                  onClick={() => setContent("")} 
                  className="h-14 px-8 border border-transparent text-muted-foreground font-mono text-xs tracking-widest uppercase hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex flex-col relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {!result && !loading && !error && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 border border-line-strong border-dashed flex flex-col items-center justify-center p-12 text-muted-foreground"
              >
                <FileSearch className="h-12 w-12 mb-6 opacity-30 stroke-[1]" />
                <p className="font-heading text-2xl uppercase tracking-widest text-center">Awaiting Input</p>
                <p className="text-sm mt-4 max-w-xs text-center">The analysis results will appear here once processed.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-surface/30 border border-line-strong flex flex-col items-center justify-center p-12"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
                  <Loader2 className="h-12 w-12 text-accent animate-spin relative z-10 stroke-[1]" />
                </div>
                <p className="font-heading text-2xl uppercase tracking-widest text-foreground">Processing</p>
                <p className="text-sm text-muted-foreground mt-4 font-mono uppercase tracking-widest">Running Risk Engine</p>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 border border-accent/50 bg-accent/5 p-8 flex flex-col items-center justify-center"
              >
                <AlertTriangle className="h-12 w-12 text-accent mb-6 stroke-[1]" />
                <h3 className="font-heading text-3xl uppercase tracking-widest text-accent mb-4">Analysis Failed</h3>
                <p className="text-center text-foreground">{error}</p>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 relative"
              >
                {/* Risk Score Card */}
                <div className="border-t-2 border-b-2 border-line-strong py-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
                    <div>
                      <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2">Assessment</h3>
                      <div className={`font-heading text-5xl uppercase tracking-widest ${
                        result.risk_level === 'CRITICAL' ? 'text-accent border-b-4 border-accent inline-block' : 
                        result.risk_level === 'HIGH' ? 'text-accent border-b-4 border-accent inline-block' : 
                        result.risk_level === 'MEDIUM' ? 'text-amber-500 border-b-4 border-amber-500 inline-block' : 
                        'text-foreground'
                      }`}>
                        {result.risk_level} RISK
                      </div>
                    </div>
                    <div>
                      <span className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border ${
                        result.analysis_source === 'gemini' 
                          ? 'border-green-500/50 text-green-500 bg-green-500/10' 
                          : 'border-amber-500/50 text-amber-500 bg-amber-500/10'
                      }`}>
                        {result.analysis_source === 'gemini' ? 'LIVE GEMINI ANALYSIS' : 'DEMO MODE'}
                      </span>
                    </div>
                  </div>
                  <p className="text-foreground text-xl leading-relaxed">{result.summary}</p>
                </div>

                {/* Red Flags */}
                {result.red_flags.length > 0 && (
                  <div>
                    <h3 className="font-heading text-3xl uppercase tracking-widest mb-8 flex items-center gap-4">
                      <Flag className="h-6 w-6 text-accent stroke-[1.5]" />
                      Red Flags
                    </h3>
                    <div className="space-y-6">
                      {result.red_flags.map((flag, idx) => (
                        <div key={idx} className="bg-surface p-6 border-l-2 border-accent">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <h4 className="font-medium text-foreground text-lg uppercase tracking-wide">
                              {flag.title}
                            </h4>
                            <span className="font-mono text-[10px] tracking-widest uppercase bg-background px-3 py-1 text-muted-foreground border border-line-strong">
                              Severity: {flag.severity}
                            </span>
                          </div>
                          <div className="bg-background text-muted-foreground p-4 text-sm font-mono mb-4 border border-line-strong">
                            &quot;{flag.evidence}&quot;
                          </div>
                          <p className="text-foreground">{flag.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Claims */}
                {result.claims.length > 0 && (
                  <div>
                    <h3 className="font-heading text-3xl uppercase tracking-widest mb-8 flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-foreground stroke-[1.5]" />
                      Claims
                    </h3>
                    <div className="space-y-6">
                      {result.claims.map((claim, idx) => (
                        <div key={idx} className="border-b border-line-strong pb-6 last:border-0 last:pb-0">
                          <p className="font-medium text-foreground text-lg mb-3">&quot;{claim.claim}&quot;</p>
                          <div className="mb-3">
                            <span className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 border ${
                              claim.assessment === 'SUPPORTED' ? 'border-foreground text-foreground' :
                              claim.assessment === 'QUESTIONABLE' ? 'border-amber-500 text-amber-500' :
                              'border-accent text-accent bg-accent/10'
                            }`}>
                              {claim.assessment}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{claim.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions & Verification */}
                <div className="bg-surface p-8 border border-line-strong">
                  <h3 className="font-heading text-3xl uppercase tracking-widest mb-8 flex items-center gap-4">
                    <ShieldAlert className="h-6 w-6 text-foreground stroke-[1.5]" />
                    Action Plan
                  </h3>
                  
                  <div className="mb-8">
                    <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-6">Recommendations</h4>
                    <ul className="space-y-4">
                      {result.recommended_actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <ArrowUpRight className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-6">Verification Checklist</h4>
                    <ul className="space-y-4">
                      {result.verification_steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="h-5 w-5 rounded-none border border-foreground flex-shrink-0 mt-0.5 relative after:content-[''] after:absolute after:inset-1 after:bg-foreground opacity-30"></div>
                          <span className="text-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-line-strong">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center leading-relaxed">
                    {result.disclaimer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

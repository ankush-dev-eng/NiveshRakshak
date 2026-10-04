"use client";

import { useEffect, useState, useCallback } from "react";
import { ShieldCheck, Server, BrainCircuit, Lock, RefreshCw, Key, Box, Zap } from "lucide-react";

type SystemStatus = {
  api_key_status: "CONNECTED" | "NOT_CONNECTED" | "INVALID" | "ERROR" | "RATE_LIMITED";
  api_key_message: string;
  model_id: string;
  model_name: string;
  model_status: "AVAILABLE" | "NOT_AVAILABLE" | "UNVERIFIED";
  model_message: string;
  live_test: "NOT_RUN" | "PASSED" | "FAILED" | "UNAVAILABLE" | "RATE_LIMITED";
  live_test_message: string;
  verified_at: string;
};

export default function Architecture() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async (runLiveTest = false) => {
    setIsChecking(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";
      const url = `${baseUrl}/api/system-status${runLiveTest ? "?live_test=true" : ""}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      console.error("Failed to fetch system status:", err);
      setError("BACKEND UNREACHABLE");
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus(false);
  }, [fetchStatus]);

  const handleVerify = () => {
    fetchStatus(false);
  };

  const getStatusColor = (state: string) => {
    if (state === "CONNECTED" || state === "AVAILABLE" || state === "PASSED") return "text-green-500";
    if (state === "INVALID" || state === "ERROR" || state === "FAILED" || state === "NOT_AVAILABLE" || state === "RATE_LIMITED") return "text-accent";
    return "text-muted-foreground"; // NOT_CONNECTED, UNVERIFIED, NOT_RUN
  };

  const formatTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return "--:--:--";
    }
  };

  const modelNameDisplay = status?.model_name || "LOADING...";

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      <div className="text-center mb-16 lg:mb-24">
        <h1 className="font-heading text-5xl md:text-7xl uppercase tracking-wider mb-8">Architecture</h1>
        <div className="h-px w-24 bg-accent mx-auto mb-8"></div>
        <p className="text-xl text-muted-foreground font-light">How NiveshRakshak analyzes and protects.</p>
      </div>

      {/* SYSTEM STATUS PANEL */}
      <div className="bg-surface border border-line-strong p-8 mb-24 rounded-sm relative">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-line-strong">
          <h2 className="font-heading text-2xl uppercase tracking-widest text-foreground">Gemini Connection</h2>
          <button
            onClick={handleVerify}
            disabled={isChecking}
            className="flex items-center gap-2 px-4 py-2 border border-line-strong bg-background text-sm font-mono uppercase tracking-wider hover:bg-surface-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
            {isChecking ? "CHECKING..." : "VERIFY CONNECTION"}
          </button>
        </div>

        {error ? (
          <div className="text-accent font-mono text-center py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm tracking-wide">
            
            {/* API KEY */}
            <div className="flex flex-col gap-2 p-4 border border-line-strong bg-background">
              <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs mb-2">
                <Key className="w-4 h-4" /> API CONNECTION
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${isChecking ? "bg-muted" : status?.api_key_status === "CONNECTED" ? "bg-green-500" : "bg-accent"}`}></span>
                <span className={`uppercase font-bold ${getStatusColor(status?.api_key_status || "")}`}>
                  {isChecking ? "CHECKING..." : status?.api_key_status?.replace("_", " ")}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-2 line-clamp-2" title={status?.api_key_message}>
                {status?.api_key_message || "Checking backend connection..."}
              </div>
            </div>

            {/* MODEL */}
            <div className="flex flex-col gap-2 p-4 border border-line-strong bg-background">
              <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs mb-2">
                <Box className="w-4 h-4" /> ACTIVE MODEL
              </div>
              <div className="text-foreground uppercase mb-1">{modelNameDisplay}</div>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${isChecking ? "bg-muted" : status?.model_status === "AVAILABLE" ? "bg-green-500" : "bg-accent"}`}></span>
                <span className={`uppercase font-bold ${getStatusColor(status?.model_status || "")}`}>
                  {isChecking ? "CHECKING..." : status?.model_status?.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* LIVE TEST */}
            <div className="flex flex-col gap-2 p-4 border border-line-strong bg-background justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs mb-2">
                  <Zap className="w-4 h-4" /> LIVE GENERATION
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${isChecking ? "bg-muted" : status?.live_test === "PASSED" ? "bg-green-500" : status?.live_test === "NOT_RUN" ? "bg-muted" : "bg-accent"}`}></span>
                  <span className={`uppercase font-bold ${getStatusColor(status?.live_test || "")}`}>
                    {isChecking ? "CHECKING..." : status?.live_test === "PASSED" ? "READY" : status?.live_test === "NOT_RUN" ? "NOT TESTED" : status?.live_test?.replace("_", " ")}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2 line-clamp-2" title={status?.live_test_message}>
                  {status?.live_test_message || "Test status."}
                </div>
              </div>
              <button
                onClick={() => fetchStatus(true)}
                disabled={isChecking}
                className="mt-4 px-4 py-2 border border-line-strong bg-surface text-xs font-mono uppercase tracking-wider hover:bg-surface-2 transition-colors disabled:opacity-50 w-full text-center"
              >
                {isChecking ? "TESTING..." : "TEST LIVE GENERATION"}
              </button>
            </div>
            
          </div>
        )}
        
        <div className="mt-6 text-right text-xs font-mono text-muted-foreground uppercase">
          LAST VERIFIED: {status?.verified_at ? formatTime(status.verified_at) : "--:--:--"}
        </div>
      </div>

      <div className="bg-surface border border-line-strong p-12 md:p-24 mb-24 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>
        
        <div className="flex flex-col items-center relative z-10">
          
          {/* User */}
          <div className="bg-foreground text-background font-mono text-xs tracking-widest uppercase py-4 px-12 z-10 w-64 text-center">
            User Input
          </div>
          <div className="h-16 w-px bg-line-strong relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent animate-ping"></div>
          </div>
          
          {/* Frontend */}
          <div className="bg-background border border-line-strong text-foreground py-6 px-12 z-10 w-72 text-center flex items-center justify-center gap-4">
            <GlobeIcon />
            <span className="font-heading text-xl uppercase tracking-widest">Next.js UI</span>
          </div>
          <div className="h-16 w-px bg-line-strong relative"></div>

          {/* Backend */}
          <div className="bg-background border border-line-strong text-foreground py-6 px-12 z-10 w-72 text-center flex items-center justify-center gap-4">
            <Server className="h-6 w-6 text-muted-foreground stroke-[1.5]" />
            <span className="font-heading text-xl uppercase tracking-widest">FastAPI</span>
          </div>
          <div className="h-16 w-px bg-line-strong relative"></div>

          {/* Engine */}
          <div className="bg-background border border-accent p-8 z-10 w-full max-w-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-surface px-4 py-1 text-accent font-mono text-[10px] uppercase tracking-widest border border-accent">Core</div>
            
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <BrainCircuit className="h-12 w-12 text-accent stroke-[1]" />
              <span className="font-heading text-3xl uppercase tracking-widest">AI Risk Engine</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center font-mono text-xs tracking-widest uppercase">
              <div className="bg-surface p-4 border border-line-strong text-muted-foreground">Input Sanitization</div>
              <div className="bg-accent/10 text-accent p-4 border border-accent/30">{modelNameDisplay}</div>
              <div className="bg-surface p-4 border border-line-strong text-muted-foreground">Structured JSON</div>
              <div className="bg-surface p-4 border border-line-strong text-muted-foreground">Localized Output</div>
            </div>
          </div>
          <div className="h-16 w-px bg-line-strong"></div>

          {/* Output */}
          <div className="bg-accent text-white font-mono text-xs tracking-widest uppercase py-4 px-12 z-10 w-80 text-center flex items-center justify-center gap-4">
            <ShieldCheck className="h-5 w-5" />
            Safety Recommendations
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background border border-line-strong p-10">
          <h2 className="flex items-center text-foreground font-heading text-3xl uppercase tracking-widest mb-6">
            <Lock className="h-8 w-8 mr-4 stroke-[1.5]" /> 
            Privacy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            NiveshRakshak does not store sensitive user inputs permanently. All data sent to the Gemini API is processed transiently for analysis and not used to train global models. API keys are secured server-side.
          </p>
        </div>
        
        <div className="bg-background border border-line-strong p-10">
          <h2 className="flex items-center text-foreground font-heading text-3xl uppercase tracking-widest mb-6">
            <Server className="h-8 w-8 mr-4 stroke-[1.5]" /> 
            Stack
          </h2>
          <ul className="space-y-4 font-mono text-sm text-muted-foreground">
            <li className="flex items-center gap-4">
              <div className="h-px w-4 bg-accent"></div>
              Frontend: Next.js, Tailwind, TS
            </li>
            <li className="flex items-center gap-4">
              <div className="h-px w-4 bg-accent"></div>
              Backend: FastAPI (Python)
            </li>
            <li className="flex items-center gap-4">
              <div className="h-px w-4 bg-accent"></div>
              AI: {modelNameDisplay}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  )
}

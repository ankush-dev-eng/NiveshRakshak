"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Server, BrainCircuit, Lock } from "lucide-react";

export default function Architecture() {
  const [modelName, setModelName] = useState("LOADING...");

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/health` : "http://127.0.0.1:8080/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.model) {
          // E.g., gemini-3.5-flash -> GEMINI 3.5 FLASH
          setModelName(data.model.replace(/-/g, " ").toUpperCase());
        }
      })
      .catch((err) => {
        console.error("Failed to fetch model info:", err);
        setModelName("UNAVAILABLE");
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      <div className="text-center mb-16 lg:mb-24">
        <h1 className="font-heading text-5xl md:text-7xl uppercase tracking-wider mb-8">Architecture</h1>
        <div className="h-px w-24 bg-accent mx-auto mb-8"></div>
        <p className="text-xl text-muted-foreground font-light">How NiveshRakshak analyzes and protects.</p>
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
              <div className="bg-accent/10 text-accent p-4 border border-accent/30">{modelName}</div>
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
              AI: {modelName}
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

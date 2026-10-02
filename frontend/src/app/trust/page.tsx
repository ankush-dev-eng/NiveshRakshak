"use client";

import { Shield, ShieldAlert, CheckCircle, Info } from "lucide-react";

export default function TrustCenter() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
      <div className="text-center mb-16 lg:mb-24">
        <h1 className="font-heading text-5xl md:text-7xl uppercase tracking-wider mb-8">Trust & Safety</h1>
        <div className="h-px w-24 bg-accent mx-auto mb-8"></div>
        <p className="text-xl text-muted-foreground font-light">How we protect you and the limitations of our system.</p>
      </div>

      <div className="space-y-16">
        <section>
          <div className="flex items-center gap-6 mb-8">
            <Shield className="h-8 w-8 text-foreground stroke-[1.5]" />
            <h2 className="font-heading text-4xl uppercase tracking-widest">Our Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-line-strong p-8">
              <h3 className="font-mono text-xs tracking-widest text-foreground uppercase mb-4">No Investment Advice</h3>
              <p className="text-muted-foreground leading-relaxed">We do not provide personalized financial advice, stock tips, or promote any financial products.</p>
            </div>
            <div className="bg-background border border-line-strong p-8">
              <h3 className="font-mono text-xs tracking-widest text-foreground uppercase mb-4">Advisory Info Only</h3>
              <p className="text-muted-foreground leading-relaxed">AI analysis is for informational risk assessment, not definitive proof of fraud or legitimacy.</p>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-line-strong"></div>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <CheckCircle className="h-8 w-8 text-foreground stroke-[1.5]" />
            <h2 className="font-heading text-4xl uppercase tracking-widest">What The AI Can Detect</h2>
          </div>
          <ul className="space-y-6">
            <ListItem text="Language indicating extreme urgency or pressure tactics" />
            <ListItem text="Promises of guaranteed, abnormally high, or risk-free returns" />
            <ListItem text="Requests for sensitive credentials (OTPs, PINs, passwords)" />
            <ListItem text="Suspicious payment routing instructions (e.g., personal accounts for corporate investments)" />
            <ListItem text="Common linguistic patterns used by known financial scammers" />
          </ul>
        </section>

        <div className="h-px w-full bg-line-strong"></div>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <ShieldAlert className="h-8 w-8 text-accent stroke-[1.5]" />
            <h2 className="font-heading text-4xl uppercase tracking-widest text-accent">Limitations</h2>
          </div>
          <ul className="space-y-6 mb-8">
            <ListItem text="Whether a specific company is legally registered with SEBI/RBI in real-time" />
            <ListItem text="The actual identity of the person sending you a message" />
            <ListItem text="Whether a linked website is a perfect clone of a legitimate site" />
            <ListItem text="The current market validity of a stock or investment tip" />
          </ul>
          
          <div className="bg-surface border-l-4 border-accent p-6 text-foreground font-mono text-sm leading-relaxed">
            <span className="text-accent uppercase tracking-widest mr-2">Important:</span> 
            You must always independently verify registration numbers on official regulatory websites (like SEBI or RBI) and confirm contact details through official channels.
          </div>
        </section>

        <div className="h-px w-full bg-line-strong"></div>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <Info className="h-8 w-8 text-foreground stroke-[1.5]" />
            <h2 className="font-heading text-4xl uppercase tracking-widest">Data Handling</h2>
          </div>
          <div className="bg-background border border-line-strong p-8">
            <p className="text-muted-foreground leading-relaxed mb-6">
              NiveshRakshak is designed to analyze text snippets safely. We process the text you submit through the Gemini API solely to return a risk assessment. 
              We do not store your personal messages permanently in our databases.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please remove highly sensitive personal information (like your full bank account number) before pasting messages for analysis.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className="h-px w-6 bg-foreground mt-3 flex-shrink-0"></div>
      <span className="text-muted-foreground text-lg">{text}</span>
    </li>
  );
}

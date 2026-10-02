"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, ArrowRight, ShieldAlert, BookOpen, AlertTriangle } from "lucide-react";

const DEMO_EXAMPLES = [
  {
    id: 1,
    type: "scam",
    title: "Guaranteed Return Scam",
    description: "Promises impossible returns with high urgency.",
    content: "GUARANTEED RETURNS!! 🚀🚀 Double your money in 30 days! Join our premium Telegram group for daily multibagger stock tips. Pay ₹5000 advance to our account to secure your spot. Act now, only 5 spots left!",
    icon: <AlertTriangle className="h-5 w-5 text-accent stroke-[1.5]" />
  },
  {
    id: 2,
    type: "scam",
    title: "Fake Regulatory Approval",
    description: "Uses fake authority claims to build trust.",
    content: "We are an official SEBI-approved trading platform offering 10% monthly fixed returns on your deposit. Transfer funds to our secure nodal officer account (HDFC Acc: 123456789) to begin your risk-free investment journey.",
    icon: <ShieldAlert className="h-5 w-5 text-accent stroke-[1.5]" />
  },
  {
    id: 3,
    type: "phishing",
    title: "Credential/OTP Phishing",
    description: "Attempts to steal sensitive banking information.",
    content: "Dear Customer, your trading account KYC is pending. Your account will be blocked in 24 hours. Click this link: http://bit.ly/update-kyc-now to update immediately. Never share your OTP with anyone.",
    icon: <ShieldAlert className="h-5 w-5 text-accent stroke-[1.5]" />
  },
  {
    id: 4,
    type: "scam",
    title: "Fake Trading Mentor",
    description: "Sells fake mentorship and 'insider' tips.",
    content: "I turned ₹10,000 into ₹1 Crore in 6 months using my secret algorithm! I am selecting 10 people to mentor personally. DM me to join my VIP inner circle. You don't need to know anything about the market, my bot trades for you.",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500 stroke-[1.5]" />
  },
  {
    id: 5,
    type: "legitimate",
    title: "Educational Financial Message",
    description: "A normal, risk-free educational message about markets.",
    content: "Investing in mutual funds through SIPs (Systematic Investment Plans) can be a good way to build wealth over the long term through the power of compounding. Note: Mutual fund investments are subject to market risks, read all scheme related documents carefully.",
    icon: <BookOpen className="h-5 w-5 text-foreground stroke-[1.5]" />
  }
];

export default function DemoCenter() {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="text-center mb-16 lg:mb-24">
        <h1 className="font-heading text-5xl md:text-7xl uppercase tracking-wider mb-8">Demo Center</h1>
        <div className="h-px w-24 bg-accent mx-auto mb-8"></div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          Try analyzing these synthetic examples of common financial messages. All data here is for demonstration purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEMO_EXAMPLES.map((example) => (
          <div key={example.id} className="group bg-background border border-line-strong flex flex-col h-full hover:border-foreground transition-colors">
            <div className="p-8 border-b border-line-strong flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-6">
                {example.icon}
                <span className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 border ${
                  example.type === 'legitimate' ? 'border-foreground text-foreground' : 
                  example.type === 'phishing' ? 'border-accent text-accent' :
                  'border-amber-500 text-amber-500'
                }`}>
                  {example.type}
                </span>
              </div>
              <h2 className="font-heading text-2xl uppercase tracking-wide text-foreground mb-3">{example.title}</h2>
              <p className="text-muted-foreground text-sm mb-6">{example.description}</p>
              
              <div className="bg-surface p-6 font-mono text-xs text-muted-foreground mt-auto border border-line-strong leading-relaxed">
                "{example.content}"
              </div>
            </div>
            <div className="flex border-t border-line-strong">
              <button 
                className="flex-1 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-surface transition-colors flex items-center justify-center gap-2 border-r border-line-strong"
                onClick={() => handleCopy(example.id, example.content)}
              >
                {copiedId === example.id ? "Copied!" : <><Copy className="w-3 h-3" /> Copy Text</>}
              </button>
              <button 
                className="flex-1 py-4 font-mono text-xs uppercase tracking-widest bg-foreground text-background hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
                onClick={() => router.push('/dashboard?demo=' + example.id)}
              >
                Analyze <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

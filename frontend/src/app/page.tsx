"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate preloader
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {loading && (
            <motion.div 
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
              exit={{ y: "-100%" }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            >
              <div className="text-center space-y-4">
                <h1 className="font-heading text-4xl md:text-6xl tracking-widest text-foreground">
                  NIVESHRAKSHAK
                </h1>
                <div className="font-mono text-muted-foreground text-sm">
                  {Math.min(progress, 100)}%
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>

      <div className="min-h-screen bg-background overflow-hidden selection:bg-accent/30 text-foreground">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
          {/* Abstract Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
            {/* Giant Background Text */}
            <div className="absolute text-[20vw] font-heading text-surface-2 leading-none opacity-40 select-none text-center whitespace-nowrap">
              NIVESH<br/>RAKSHAK
            </div>
            {/* Grid & Glow */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(243,241,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,241,234,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[120px]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="inline-block mb-6 px-4 py-1.5 border border-line-strong bg-surface/50 backdrop-blur-md rounded-full text-xs font-mono tracking-widest uppercase text-muted-foreground"
            >
              AI-Powered Financial Safety
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading uppercase max-w-5xl leading-[0.9] mb-6"
            >
              Analyze suspicious investment messages before you act.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 font-sans"
            >
              Identify suspicious claims, pressure tactics and financial red flags with AI-assisted analysis.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link href="/dashboard" className="group flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-sans font-medium uppercase tracking-wide transition-all hover:bg-accent-2">
                Analyze a message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/demo" className="group flex items-center gap-3 border border-line-strong bg-surface text-foreground px-8 py-4 font-sans font-medium uppercase tracking-wide transition-all hover:border-muted-foreground">
                Try a demo
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-8 text-xs font-mono uppercase tracking-widest text-muted-foreground flex flex-col gap-2"
          >
            <div className="w-[1px] h-12 bg-line-strong mx-auto mb-2" />
            Scroll to explore
          </motion.div>
        </section>

        {/* MARQUEE */}
        <section className="py-8 border-y border-line-strong overflow-hidden bg-surface relative">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-4">
                {["DETECT RED FLAGS", "VERIFY BEFORE YOU TRUST", "THINK BEFORE YOU TRANSFER", "QUESTION GUARANTEED RETURNS", "PROTECT YOUR MONEY"].map((text, j) => (
                  <div key={j} className="flex items-center gap-8 font-heading text-4xl text-foreground">
                    {text}
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section className="py-32 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="text-accent text-sm font-mono tracking-widest uppercase mb-6">The Problem</div>
              <h2 className="text-4xl md:text-6xl font-heading leading-none mb-8">
                Financial scams move faster than people can verify them.
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Retail investors and first-time participants are increasingly targeted by sophisticated scams on WhatsApp, Telegram, and social media. NiveshRakshak helps you pause and analyze before transferring funds.
              </p>
            </div>
            
            <div className="flex flex-col gap-0 border-t border-line-strong">
              {[
                { num: "01", title: "QUESTION GUARANTEED RETURNS" },
                { num: "02", title: "VERIFY THE SOURCE" },
                { num: "03", title: "NEVER SHARE CREDENTIALS" },
                { num: "04", title: "SLOW DOWN BEFORE YOU TRANSFER" }
              ].map((item, i) => (
                <div key={i} className="group border-b border-line-strong py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-colors hover:bg-surface/50">
                  <span className="font-mono text-muted-foreground">{item.num}</span>
                  <h3 className="font-heading text-2xl md:text-3xl m-0">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BY THE NUMBERS */}
        <section className="py-32 bg-surface border-y border-line-strong">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-heading text-center mb-24">BUILT FOR SAFER DECISIONS.</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { num: "5", label: "Demo Scenarios" },
                { num: "4", label: "Supported Languages" },
                { num: "5000", label: "Max Input Characters" },
                { num: "0", label: "Investment Recommendations" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-5xl md:text-7xl font-heading text-accent mb-4">{stat.num}</div>
                  <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground max-w-[120px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 container mx-auto px-6 text-center flex flex-col items-center">
          <div className="text-accent text-sm font-mono tracking-widest uppercase mb-6">BEFORE YOU ACT</div>
          <h2 className="text-5xl md:text-7xl font-heading mb-8">
            Got a financial message you don't trust?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            Paste it into NiveshRakshak. Understand the red flags before you make a decision.
          </p>
          <Link href="/dashboard" className="group inline-flex items-center gap-4 text-3xl md:text-5xl font-heading hover:text-accent transition-colors">
            ANALYZE A MESSAGE
            <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-line-strong py-12">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-heading text-2xl">NIVESHRAKSHAK</div>
            <div className="text-muted-foreground text-sm font-mono">AI-ASSISTED FINANCIAL SAFETY.</div>
            <div className="text-muted-foreground font-mono">2026</div>
          </div>
        </footer>
      </div>
    </>
  );
}

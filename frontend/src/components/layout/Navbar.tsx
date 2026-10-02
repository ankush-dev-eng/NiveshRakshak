"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "ANALYZE" },
    { href: "/demo", label: "DEMO" },
    { href: "/trust", label: "TRUST" },
    { href: "/architecture", label: "ARCHITECTURE" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-line-strong">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-line-strong flex items-center justify-center font-heading text-sm group-hover:border-accent transition-colors">
            NR
          </div>
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase group-hover:text-foreground transition-colors">
            NiveshRakshak
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`font-mono text-[0.8125rem] tracking-[0.2em] uppercase relative py-2 transition-colors ${pathname === link.href ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
            >
              {link.label}
              {pathname === link.href && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent" />
              )}
              {pathname !== link.href && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-line-strong p-6 flex flex-col gap-6">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-heading text-2xl tracking-widest uppercase transition-colors ${pathname === link.href ? 'text-accent' : 'text-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

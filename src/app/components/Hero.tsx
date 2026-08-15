import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Copy, Check, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArchitectureConstellation } from './craft/ArchitectureConstellation';
import { sounds } from '../utils/soundEffects';

export function Hero() {
  const revealRef = useScrollReveal();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      sounds.playClick();
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('binodbishwakarama@gmail.com');
    setCopiedEmail(true);
    sounds.playChime();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="hero"
      className="min-h-[92svh] relative flex flex-col justify-center pt-28 sm:pt-32 pb-12 sm:pb-16 bg-background transition-colors duration-500 overflow-hidden"
    >
      <div
        className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10 my-auto"
        ref={revealRef}
      >
        {/* Narrative Hero Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Storytelling Headline & Bio */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono tracking-[0.2em] text-blue-500 dark:text-blue-400 uppercase font-semibold">
                AI/ML & FULL-STACK ENGINEERING
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-foreground leading-[1.08] font-display">
                Building & scaling intelligent web products.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              I am <strong className="text-foreground font-semibold">Binod Bishwakarma</strong> — a Full-Stack Developer and AI Engineer based in Bengaluru. I design and build production web applications, LLM-powered systems, and high-performance backends with Next.js, React, FastAPI, Python, and PostgreSQL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-7 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-full border border-foreground/[0.12] text-foreground font-semibold text-sm hover:border-foreground/25 hover:bg-foreground/[0.03] transition-all flex items-center gap-2 cursor-pointer"
                title="Copy Direct Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">Copied Email</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full border border-foreground/[0.08] text-muted-foreground hover:text-foreground font-semibold text-sm hover:border-foreground/20 hover:bg-foreground/[0.02] transition-all flex items-center gap-1.5"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Right Column: High-DPI Topology Constellation */}
          <div className="lg:col-span-6">
            <ArchitectureConstellation />
          </div>
        </div>

        {/* Bottom Highlights */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 pt-10 mt-10 border-t border-foreground/[0.06] text-xs text-muted-foreground font-mono tracking-wide">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              NEXT.JS & REACT
            </span>
            <span className="flex items-center gap-2 text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              FASTAPI & PYTHON
            </span>
            <span className="flex items-center gap-2 text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              LLMS & VECTOR RAG
            </span>
          </div>

          <div className="text-foreground/40 font-mono text-[11px]">
            BENGALURU, INDIA
          </div>
        </div>
      </div>
    </section>
  );
}

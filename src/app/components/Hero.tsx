import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Hero() {
  const revealRef = useScrollReveal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[100svh] flex items-center justify-center pt-24 sm:pt-20 bg-background transition-colors duration-300"
    >
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28" ref={revealRef}>
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] bg-card/10 backdrop-blur-3xl text-xs sm:text-sm font-medium text-muted-foreground mb-6 sm:mb-8 text-center">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Web Engineering + AI Product Building
          </div>

          <h1 className="sr-only">Binod Bishwakarama - Software Developer Portfolio</h1>

          <div className="text-[2.85rem] sm:text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-6 sm:mb-8 text-foreground leading-[1.02] sm:leading-[1.05] drop-shadow-sm" aria-hidden="true">
            Binod Bishwakarama{" "}
            <span className="px-2 sm:px-3 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
              Portfolio
            </span>
          </div>

          <div className="max-w-3xl mb-8 sm:mb-10 space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 font-semibold tracking-tight">
              AI Systems Engineer & Full-Stack Developer
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-medium bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background cursor-pointer"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full font-medium border border-border text-foreground hover:bg-foreground/5 transition-colors duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background cursor-pointer"
              >
                Download Resume
              </a>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
              I build production-grade AI systems, combining full-stack engineering with vector retrieval, semantic search, and structured agent workflows. Currently pursuing Computer Science at Dayananda Sagar University, my focus is bridging the gap between research models and deployed software.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
              From architecting MindFlow (an AI study platform utilizing pgvector RAG) to offline-first PWAs, I build systems optimized for latency, reliability, and measurable product impact.
            </p>
          </div>

          <div className="max-w-3xl w-full mb-10 sm:mb-12 rounded-[2rem] border border-white/10 dark:border-white/5 bg-card/10 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.02)] px-6 sm:px-8 py-5 sm:py-6 text-left hover:border-white/15 dark:hover:border-white/8 transition-colors duration-300">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-accent mb-2.5">
              HOW I BUILD
            </p>
            <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed font-medium">
              First principles over patterns. Leverage over effort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

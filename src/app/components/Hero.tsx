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
      className="min-h-screen flex items-center justify-center pt-20 bg-background transition-colors duration-300"
    >
      <div className="max-w-[1440px] w-full mx-auto px-8 py-24" ref={revealRef}>
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] bg-card/10 backdrop-blur-3xl text-sm font-medium text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Web Engineering + AI Product Building
          </div>

          <h1 className="sr-only">BuildWithBinod - Software Developer Portfolio</h1>

          <div className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-8 text-foreground leading-[1.05] drop-shadow-sm" aria-hidden="true">
            BuildWithBinod{" "}
            <span className="px-2 sm:px-3 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
              Portfolio
            </span>
          </div>

          <div className="max-w-3xl mb-10">
            <p className="text-xl md:text-2xl mb-4 text-foreground/80 font-medium">
              Full-Stack Developer and AI Product Builder
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I am Binod Bishwakarma, a Computer Science student at Dayananda Sagar University building real products where web engineering meets artificial intelligence. My work includes AI study tools, healthcare PWAs, data dashboards, and product-focused web apps designed to solve practical problems.
            </p>
          </div>

          <div className="max-w-3xl w-full mb-12 rounded-[2rem] border border-white/10 dark:border-white/5 bg-card/10 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] px-6 py-5 text-left">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-accent mb-2">
              Brand Statement
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              I turn ideas into intelligent web products by combining full-stack engineering with AI-driven features and a product builder's approach to problem solving.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-foreground/5"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-medium transition-all hover:bg-card border border-border text-foreground hover:border-foreground/30"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

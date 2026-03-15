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
          {/* Subtle pre-heading pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Elevating Digital Experiences
          </div>

          <h1 className="sr-only">BuildWithBinod – Software Developer Portfolio</h1>
          
          <div className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter mb-8 text-foreground leading-[1.05] drop-shadow-sm" aria-hidden="true">
            BuildWithBinod{" "}
            <span className="px-2 sm:px-3 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
              Portfolio
            </span>
          </div>

          <div className="max-w-2xl mb-12">
            <p className="text-xl md:text-2xl mb-4 text-foreground/80 font-medium">
              Software Developer Portfolio
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I am Binod, building high-performance web apps, tools, and startup products. Using React, Node, Python, and robust Cloud Architecture, I craft the next generation of scalable digital applications. Dive into BuildWithBinod to explore my technical journey.
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

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";

const personalHighlights = [
  {
    title: "Who I Am",
    description:
      "An AI Engineer and Full-Stack Developer focused on building production-ready systems, not demo-only concepts.",
  },
  {
    title: "What I Build",
    description:
      "AI study tools, healthcare PWAs, dashboards, and web products shaped around practical problems and usable workflows.",
  },
  {
    title: "What I Enjoy",
    description:
      "Turning rough ideas into working software, solving product problems step by step, and experimenting with new AI-driven experiences.",
  },
];

export function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="about" className="py-20 sm:py-24 bg-card transition-colors duration-300 scroll-mt-28">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-tight text-foreground">
            About Binod
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-[18rem] sm:max-w-md">
                <div
                  className="absolute inset-0 rounded-[2rem] bg-accent/20 blur-xl group-hover:bg-accent/30 transition-all duration-500"
                  style={{ transform: "translate(16px, 16px)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-[2rem] border border-white/10 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] bg-card/10 backdrop-blur-3xl group-hover:translate-x-[14px] group-hover:translate-y-[14px] transition-all duration-500"
                  style={{ transform: "translate(12px, 12px)" }}
                ></div>
                <ImageWithFallback
                  src="/profile.jpeg"
                  alt="Binod Bishwakarama - Software Developer"
                  className="relative rounded-[2rem] w-full max-w-md object-cover shadow-2xl border border-white/10 dark:border-white/5 transition-all duration-500 group-hover:scale-[1.01] group-hover:shadow-3xl"
                  style={{ aspectRatio: "4/5", objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
                  I build products where <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">web engineering</span> and <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">artificial intelligence</span> work together.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-foreground/80 dark:text-foreground/75 font-normal tracking-wide">
                  I'm an AI Engineer and Full-Stack Developer focused on building intelligent products that solve real problems. I learn by shipping, not by collecting tutorials. Every project is an opportunity to design, build, deploy, and improve software that people actually use.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-foreground/80 dark:text-foreground/75 font-normal tracking-wide">
                  I've built products including <strong className="font-semibold text-foreground">MindFlow</strong>, an AI-powered study assistant, an <strong className="font-semibold text-foreground">AI Health PWA</strong>, a <strong className="font-semibold text-foreground">Smart News App</strong>, and a <strong className="font-semibold text-foreground">Class Attendance Tracker</strong>. Across these projects, I've worked on AI agents, LLM integrations, retrieval-augmented generation (RAG), machine learning workflows, and modern full-stack applications, taking ideas from architecture to production.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-foreground/80 dark:text-foreground/75 font-normal tracking-wide">
                  My core stack includes Python, Java, JavaScript/TypeScript, React, Next.js, Node.js, FastAPI, and modern AI tooling. I enjoy designing scalable systems, integrating foundation models, and creating clean user experiences where AI adds genuine value instead of unnecessary complexity.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-foreground/80 dark:text-foreground/75 font-normal tracking-wide">
                  I'm currently focused on building AI-first products, exploring autonomous agent workflows, and deepening my expertise in machine learning systems, with the goal of creating software that's both technically robust and genuinely useful.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-border/30">
                {personalHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 dark:border-white/5 bg-background/40 backdrop-blur-2xl p-4 sm:p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out hover:border-accent/25 hover:bg-background/60 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="text-sm font-semibold tracking-[0.18em] uppercase text-accent mb-3">
                      {item.title}
                    </p>
                    <p className="text-sm sm:text-[0.95rem] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Brain, Layout, Server, Sparkles } from "lucide-react";
import { SpotlightCard } from "./ui/SpotlightCard";

export function About() {
  const revealRef = useScrollReveal();

  const focusAreas = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      desc: "Developing intelligent RAG pipelines, LLM-powered tools, semantic vector search, and automated AI agents with Python & FastAPI.",
      accent: "text-blue-500 dark:text-blue-400",
      spotlight: "rgba(59, 130, 246, 0.15)",
      bg: "bg-blue-500/10",
      skills: ["Python", "FastAPI", "LLMs", "RAG", "LangChain", "Vector Embeddings"],
    },
    {
      icon: Layout,
      title: "Full-Stack & Frontend",
      desc: "Crafting intuitive, high-performance web applications and Progressive Web Apps with Next.js, React, TypeScript, and modern UI systems.",
      accent: "text-cyan-500 dark:text-cyan-400",
      spotlight: "rgba(6, 182, 212, 0.15)",
      bg: "bg-cyan-500/10",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PWA", "Framer Motion"],
    },
    {
      icon: Server,
      title: "Backend & Systems",
      desc: "Designing resilient REST APIs, relational database schemas with PostgreSQL and Supabase, webhook pipelines, and Dockerized deployments.",
      accent: "text-indigo-500 dark:text-indigo-400",
      spotlight: "rgba(99, 102, 241, 0.15)",
      bg: "bg-indigo-500/10",
      skills: ["PostgreSQL", "Supabase", "Docker", "Node.js", "REST APIs", "Redis"],
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-background transition-colors duration-500 scroll-mt-28 relative">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12" ref={revealRef}>
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase mb-4">
            [02] // ABOUT ME
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground font-display max-w-3xl">
            Taking ideas from concept to production with modern AI & scalable systems.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Education Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0 group">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative bg-muted shadow-2xl">
                <ImageWithFallback
                  src="/profile.jpeg"
                  alt="Binod Bishwakarma"
                  className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="text-white font-bold text-base block font-display">Binod Bishwakarma</span>
                    <span className="text-white/70 text-xs font-mono">AI/ML & Full-Stack Engineer</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>

              {/* Offset decorative frame */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl sm:rounded-3xl border border-foreground/[0.1] -z-10" />
            </div>

            {/* Education Info Card */}
            <div className="p-5 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.015] max-w-sm mx-auto lg:mx-0 space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                EDUCATION & STATUS
              </span>
              <span className="text-sm font-semibold text-foreground block font-display">
                Dayananda Sagar University
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                B.Tech in Computer Science & Engineering · Bengaluru, India
              </p>
              <div className="pt-2 border-t border-foreground/[0.06] flex items-center justify-between text-xs font-mono text-emerald-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Seeking AI & Full-Stack Internships
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Focus Areas */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p className="text-xl sm:text-2xl text-foreground font-semibold leading-snug tracking-tight font-display">
                I design scalable systems, build intuitive user experiences, integrate modern AI models, and ship software that delivers real value.
              </p>
              <p>
                My work spans healthcare, education, business automation, and news intelligence. Products I have built include <strong className="text-foreground font-semibold">HealthLens</strong> (AI healthcare guidance for rural access), <strong className="text-foreground font-semibold">ReplySync</strong> (multi-tenant WhatsApp business automation), <strong className="text-foreground font-semibold">MindFlow</strong> (AI learning platform with adaptive quizzes and flashcards), and <strong className="text-foreground font-semibold">SmartNews</strong> (NLP-driven news intelligence).
              </p>
              <p>
                Outside the classroom at Dayananda Sagar University, I spend most of my time building products, exploring challenging engineering problems, and learning from real users. I believe the best way to grow as an engineer is to build ambitious software and iterate quickly.
              </p>
            </div>

            {/* Core Competencies Cards */}
            <div className="space-y-3 pt-4 border-t border-foreground/[0.06]">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                Core Competencies & Stack
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {focusAreas.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SpotlightCard
                      key={item.title}
                      spotlightColor={item.spotlight}
                      className="p-5 flex flex-col justify-between group/card"
                    >
                      <div>
                        <div className={`p-2 rounded-lg ${item.bg} w-fit mb-3`}>
                          <Icon className={`w-4 h-4 ${item.accent}`} />
                        </div>
                        <h4 className="text-sm font-bold text-foreground mb-1.5 font-display">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2 border-t border-foreground/[0.06]">
                        {item.skills.slice(0, 3).map((sk) => (
                          <span key={sk} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-foreground/[0.04] text-foreground/75">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

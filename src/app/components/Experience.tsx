import { Briefcase, GraduationCap, CheckCircle2, Terminal } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './ui/SpotlightCard';

const experiences = [
  {
    type: 'work',
    title: 'Founder & AI Systems Architect',
    company: 'Independent Contractor / BuildWithBinod',
    period: '2025 — Present',
    description:
      'Architecting and deploying production-ready full-stack applications with a focus on AI integrations, vector retrieval systems, and high-performance user interfaces.',
    achievements: [
      'Built ReplySync: Multi-tenant WhatsApp CRM platform with encrypted tenant secrets and webhook idempotency',
      'Developed MindFlow: AI study platform leveraging pgvector RAG and automated flashcard generation',
      'Engineered AI Healthcare PWA: Mobile-first offline-capable PWA with real-time voice synthesis and text-to-speech',
    ],
    spotlight: 'rgba(59, 130, 246, 0.15)',
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science and Engineering',
    company: 'Dayananda Sagar University',
    period: 'Aug 2025 — Present',
    description:
      'Pursuing advanced studies in Computer Science, Artificial Intelligence, and Distributed Systems, translating foundational research into practical web products.',
    achievements: [
      'Deep focus on vector databases, semantic search algorithms, and full-stack software engineering',
      'Designing utility-driven Progressive Web Applications and high-throughput APIs',
    ],
    spotlight: 'rgba(99, 102, 241, 0.15)',
  },
  {
    type: 'education',
    title: '12th Grade (PCMC)',
    company: 'Narayana Junior College',
    period: 'Mar 2024 — May 2025',
    description:
      'Completed higher secondary education with a rigorous focus on Physics, Chemistry, Mathematics, and Computer Science.',
    achievements: [
      'Captain of the Narayana Cricket Club',
      'Established foundational problem-solving and algorithmic logic competencies',
    ],
    spotlight: 'rgba(139, 92, 246, 0.15)',
  },
];

export function Experience() {
  const revealRef = useScrollReveal();

  return (
    <section id="experience" className="py-24 sm:py-32 bg-background transition-colors duration-500 scroll-mt-28 relative">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12" ref={revealRef}>
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase mb-4">
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            <span>[05] // TIMELINE & ROLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground font-display max-w-2xl">
            Experience & Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Animated vertical line */}
          <div className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-foreground/[0.06]" />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, index) => {
              const Icon = exp.type === 'work' ? Briefcase : GraduationCap;

              return (
                <div key={index} className="stagger-child relative pl-14 sm:pl-16 group">
                  {/* Timeline node icon */}
                  <div className="absolute left-2 sm:left-3 top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-background border-2 border-blue-500 dark:border-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10 shadow-sm">
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 dark:text-cyan-400" />
                  </div>

                  {/* Spotlight Card */}
                  <SpotlightCard
                    spotlightColor={exp.spotlight}
                    className="p-6 sm:p-7"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight font-display">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-semibold text-blue-500 dark:text-cyan-400 mt-0.5 font-mono">
                          {exp.company}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-foreground/[0.04] text-muted-foreground whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

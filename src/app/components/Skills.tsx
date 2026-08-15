import { usePortfolio } from '../context/PortfolioContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Brain, Layout, Server, Cloud, GraduationCap, Terminal } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';

const domainConfig: Record<string, { icon: any; accent: string; glow: string; spotlight: string }> = {
  'AI Engineering': { icon: Brain, accent: 'text-violet-500 dark:text-violet-400', glow: 'bg-violet-500/10', spotlight: 'rgba(139, 92, 246, 0.18)' },
  'Frontend': { icon: Layout, accent: 'text-cyan-500 dark:text-cyan-400', glow: 'bg-cyan-500/10', spotlight: 'rgba(6, 182, 212, 0.18)' },
  'Backend': { icon: Server, accent: 'text-blue-500 dark:text-blue-400', glow: 'bg-blue-500/10', spotlight: 'rgba(59, 130, 246, 0.18)' },
  'Cloud & DevOps': { icon: Cloud, accent: 'text-emerald-500 dark:text-emerald-400', glow: 'bg-emerald-500/10', spotlight: 'rgba(16, 185, 129, 0.18)' },
  'Currently Learning': { icon: GraduationCap, accent: 'text-amber-500 dark:text-amber-400', glow: 'bg-amber-500/10', spotlight: 'rgba(245, 158, 11, 0.18)' },
};

export function Skills() {
  const { data, isLoading } = usePortfolio();
  const revealRef = useScrollReveal();

  // Flattened skill list for marquee
  const allSkills = data.skills.flatMap(cat => cat.skills);

  return (
    <section id="skills" className="py-24 sm:py-32 bg-background transition-colors duration-500 scroll-mt-28 relative">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12" ref={revealRef}>
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase mb-4">
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>[03] // CAPABILITY MATRIX</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground font-display max-w-2xl">
              Technical Stack & Tooling
            </h2>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Curated around low-latency execution, high retrieval accuracy, and modular distributed architectures.
            </p>
          </div>
        </div>

        {/* Infinite marquee banner with tech tags */}
        <div className="relative mb-14 -mx-6 sm:-mx-8 lg:-mx-12 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap py-3">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="mx-2.5 px-4 py-2 rounded-full text-xs font-mono font-medium border border-foreground/[0.08] text-foreground/80 bg-foreground/[0.02] whitespace-nowrap hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.05] transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bento Grid with Spotlight Effect */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {data.skills.map((cat, idx) => {
              const config = domainConfig[cat.category] || domainConfig['AI Engineering'];
              const Icon = config.icon;

              return (
                <SpotlightCard
                  key={cat.id}
                  spotlightColor={config.spotlight}
                  className={`p-6 sm:p-7 flex flex-col justify-between ${
                    idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${config.glow} transition-transform duration-300`}>
                          <Icon className={`w-5 h-5 ${config.accent}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold tracking-tight text-foreground font-display">
                            {cat.category}
                          </h3>
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {cat.skills.length} core technologies
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/60 font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-foreground/[0.04] text-foreground/85 border border-foreground/[0.04] hover:bg-foreground/[0.08] hover:border-foreground/[0.1] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </SpotlightCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

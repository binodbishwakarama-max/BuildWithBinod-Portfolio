import { usePortfolio } from '../context/PortfolioContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight, Github, Sparkles, Terminal, Layers, Shield, Zap } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { sounds } from '../utils/soundEffects';

export function Projects() {
  const { data, isLoading } = usePortfolio();
  const projects = data.projects;
  const revealRef = useScrollReveal();

  if (isLoading) {
    return (
      <section id="projects" className="py-24 sm:py-32 bg-background scroll-mt-28">
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
        </div>
      </section>
    );
  }

  const heroProject = projects[0];
  const gridProjects = projects.slice(1);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-background transition-colors duration-500 scroll-mt-28 relative">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12" ref={revealRef}>
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase mb-4">
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            <span>[04] // FEATURED ENGINEERING</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground font-display">
              Production Case Studies
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Architected for high throughput, sub-100ms vector lookups, and uncompromising reliability.
            </p>
          </div>
        </div>

        {/* Hero Spotlight Project */}
        {heroProject && (
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.16)"
            className="mb-12 sm:mb-16 group p-0 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Image with Browser Mockup Header */}
              <div className="lg:col-span-6 relative flex flex-col bg-muted/40 border-b lg:border-b-0 lg:border-r border-foreground/[0.08]">
                {/* Browser Mockup Chrome Header */}
                <div className="px-4 py-3 bg-foreground/[0.03] border-b border-foreground/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="px-3 py-1 rounded-md bg-foreground/[0.04] text-[11px] font-mono text-muted-foreground truncate">
                    replysync.cloud/dashboard
                  </div>
                  <div className="w-8" />
                </div>

                <div className="relative aspect-[16/10] lg:aspect-auto flex-1 overflow-hidden">
                  <img
                    src={heroProject.image}
                    alt={heroProject.title}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out min-h-[320px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Case Study Details */}
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-foreground/[0.06] border border-foreground/[0.08] font-bold text-foreground">
                      FEATURED // 01
                    </span>
                    {heroProject.liveUrl && (
                      <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        PRODUCTION LIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-display">
                    {heroProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
                    {heroProject.description}
                  </p>

                  {/* Architecture Specs Highlights */}
                  <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-foreground/[0.06]">
                    <div className="flex items-start gap-2 text-xs">
                      <Shield className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground block">Zero-Knowledge Vault</span>
                        <span className="text-muted-foreground text-[11px]">AES-256 encrypted tenant secrets</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Zap className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground block">Webhook Idempotency</span>
                        <span className="text-muted-foreground text-[11px]">Zero message duplication</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {heroProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-foreground/[0.04] text-foreground/80 border border-foreground/[0.04]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {heroProject.liveUrl && (
                      <a
                        href={heroProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <span>Launch App</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {heroProject.githubUrl && (
                      <a
                        href={heroProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="px-5 py-3 rounded-full border border-foreground/[0.1] text-foreground font-semibold text-sm hover:border-foreground/25 hover:bg-foreground/[0.03] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        )}

        {/* 2-Column Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gridProjects.map((project, idx) => (
            <SpotlightCard
              key={project.id}
              spotlightColor="rgba(99, 102, 241, 0.15)"
              className="p-0 flex flex-col justify-between group overflow-hidden"
            >
              {/* Browser Chrome Header */}
              <div className="relative">
                <div className="px-4 py-2.5 bg-foreground/[0.03] border-b border-foreground/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-foreground/20" />
                    <span className="w-2 h-2 rounded-full bg-foreground/20" />
                    <span className="w-2 h-2 rounded-full bg-foreground/20" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-foreground/[0.03] text-[10px] font-mono text-muted-foreground truncate max-w-[180px]">
                    {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground font-bold">
                    0{idx + 2}
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                    <span className="text-cyan-500 font-semibold">{project.tags[0]}</span>
                    {project.liveUrl && (
                      <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors font-display">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tags & Action Links */}
                <div className="space-y-4 pt-2 border-t border-foreground/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-foreground/[0.04] text-foreground/75 border border-foreground/[0.04]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-sm font-semibold">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="text-foreground flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : <span />}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="text-muted-foreground flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

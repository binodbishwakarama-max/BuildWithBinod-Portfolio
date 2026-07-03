import { useScrollReveal } from '../hooks/useScrollReveal';

const MOCK_POSTS = [
  {
    title: 'Advanced React Patterns',
    category: 'React & Performance',
    description: 'Exploring dynamic imports, code splitting, and Suspense for optimal, production-grade load speeds.',
  },
  {
    title: 'Orchestrating AI Agents',
    category: 'AI Engineering',
    description: 'Integrating large language models with vector databases to design structured agent memory.',
  },
  {
    title: 'Offline-First Web Products',
    category: 'Web Engineering',
    description: 'Leveraging Service Workers, background sync, and IndexedDB for zero-latency local caching.',
  },
];

export function Blog() {
  const revealRef = useScrollReveal();

  return (
    <section id="blog" className="py-20 sm:py-24 bg-muted/50 transition-colors duration-300 scroll-mt-28">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-foreground">
              Blog & Insights
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and deep-dives on full-stack web engineering and artificial intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {MOCK_POSTS.map((post, idx) => (
              <div
                key={idx}
                className="group relative bg-card rounded-[1.5rem] p-6 sm:p-8 border border-border/80 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:border-accent/20 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="w-full h-44 bg-accent/5 dark:bg-white/3 border border-border/30 rounded-xl mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-accent/10 transition-colors duration-500">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full shadow-sm">
                      Coming Soon
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent mb-2.5 block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-card-foreground mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

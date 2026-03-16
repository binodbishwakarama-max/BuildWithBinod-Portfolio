import { useScrollReveal } from '../hooks/useScrollReveal';

export function Blog() {
  const revealRef = useScrollReveal();

  return (
    <section id="blog" className="py-20 sm:py-24 bg-muted/50 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-foreground">
            Blog
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 sm:mb-16">
            Thoughts, tutorials, and insights on software engineering, AI, and full-stack development coming soon.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm opacity-60 sm:col-start-1">
              <div className="w-full h-40 bg-accent/10 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-accent/50 text-sm font-medium">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3 text-left">Advanced React Patterns</h3>
              <p className="text-muted-foreground text-left text-sm">Exploring dynamic imports, code splitting, and Suspense for optimal performance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ImageWithFallback } from './figma/ImageWithFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="about" className="py-24 bg-card transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-8" ref={revealRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight text-foreground">
            About Binod
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-[2rem] bg-accent/20 blur-xl group-hover:bg-accent/30 transition-colors duration-500"
                  style={{ transform: 'translate(16px, 16px)' }}
                ></div>
                <div className="absolute inset-0 rounded-[2rem] border border-border bg-card/50 backdrop-blur-sm" style={{ transform: 'translate(12px, 12px)' }}></div>
                <ImageWithFallback
                  src="/profile.jpeg"
                  alt="Binod Bishwakarma - Software Developer"
                  className="relative rounded-[2rem] w-full max-w-md object-cover shadow-2xl border border-border/50 hover:border-accent/50 transition-colors duration-500"
                  style={{ aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-snug">
                  I engineer platforms at the intersection of <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Web</span> and <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">AI</span>.
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I am a first-year Computer Science & Engineering student at Dayananda Sagar University. However, my ambition extends far beyond the classroom. I am driven by an intense passion for architecting software solutions that are not only highly scalable, but deeply intelligent.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My technical foundation spans C, Python, Java, and modern Full-Stack Web Development, heavily grounded in Data Structures and Algorithms. Whether I'm tackling algorithmic complexities on HackerRank or building production-ready apps like my Class Attendance PWA, I approach every line of code as an opportunity to solve a complex puzzle.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Currently, my focus is shifting towards the frontier of technology: integrating Machine Learning models into highly responsive, performant user interfaces.
                </p>
              </div>

              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/30">
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-1">Full Stack</span>
                  <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Engineering</span>
                </div>
                <div className="w-px bg-border/40 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-1">AI/ML</span>
                  <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Focused Engineer</span>
                </div>
                <div className="w-px bg-border/40 hidden sm:block"></div>
                <div className="flex flex-col relative">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-accent mb-1 flex items-baseline">
                    100<span className="text-3xl ml-0.5">%</span>
                  </span>
                  <span className="text-sm font-semibold tracking-wider text-accent uppercase">Driven by Impact</span>
                  <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

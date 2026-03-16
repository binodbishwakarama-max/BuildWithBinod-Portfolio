import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";

const personalHighlights = [
  {
    title: "Who I Am",
    description:
      "A first-year Computer Science student and builder focused on real full-stack and AI products, not demo-only concepts.",
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
                  style={{ transform: "translate(16px, 16px)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-[2rem] border border-white/10 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] bg-card/10 backdrop-blur-3xl"
                  style={{ transform: "translate(12px, 12px)" }}
                ></div>
                <ImageWithFallback
                  src="/profile.jpeg"
                  alt="Binod Bishwakarma - Software Developer"
                  className="relative rounded-[2rem] w-full max-w-md object-cover shadow-2xl border border-white/10 dark:border-white/5 transition-colors duration-500"
                  style={{ aspectRatio: "4/5", objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-snug">
                  I build products where <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">web engineering</span> and <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">artificial intelligence</span> work together.
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I am a first-year Computer Science and Engineering student at Dayananda Sagar University, and I learn best by shipping. Projects like MindFlow AI Study Assistant, AI Health PWA, Smart News App, and my Class Attendance Tracker reflect the kind of work I like most: taking a real need, shaping the product, and turning it into something people can actually use.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My foundation spans C, Python, Java, JavaScript, and modern web development, with a growing focus on AI and machine learning. What keeps me interested is the product thinking behind the code: understanding the problem, choosing the right workflow, and building software that feels purposeful from the first interaction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border/30">
                {personalHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 dark:border-white/5 bg-background/40 backdrop-blur-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                  >
                    <p className="text-sm font-semibold tracking-[0.18em] uppercase text-accent mb-3">
                      {item.title}
                    </p>
                    <p className="text-sm leading-7 text-muted-foreground">
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

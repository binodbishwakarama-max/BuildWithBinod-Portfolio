import { Briefcase, GraduationCap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const experiences = [
  {
    type: 'work',
    title: 'Founder of BWB & AI Engineer',
    company: 'Independent Contractor / Freelance',
    period: '2025 - Present',
    description:
      'Architecting and deploying production-ready full-stack applications with a focus on AI integrations, LLM orchestration, and high-performance user interfaces.',
    achievements: [
      'Developed MindFlow, an AI-powered study assistant using semantic search and retrieval-augmented generation (RAG)',
      'Built a mobile-first AI Healthcare PWA with voice-to-text input and spoken text-to-speech output',
      'Designed and deployed responsive data dashboards and real-time visualization tools using Docker',
    ],
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science and Engineering',
    company: 'Dayananda Sagar University',
    period: 'Aug 2025 - Present',
    description:
      'Pursuing advanced studies in Computer Science, Artificial Intelligence, and Machine Learning, translating academic research into practical web products.',
    achievements: [
      'Focusing on advanced algorithms, data structures, and software engineering principles',
      'Building utility-driven Progressive Web Applications and full-stack systems',
    ],
  },
  {
    type: 'education',
    title: '12th Grade (PCMC)',
    company: 'Narayana Junior College',
    period: 'Mar 2024 - May 2025',
    description:
      'Completed higher secondary education with a focus on Physics, Chemistry, Mathematics, and Computer Science.',
    achievements: [
      'Captain of the Narayana Cricket Club',
      'Developed foundational knowledge in problem solving and logic',
    ],
  },
];


export function Experience() {
  const revealRef = useScrollReveal();

  return (
    <section id="experience" className="py-20 sm:py-24 bg-muted transition-colors duration-300 scroll-mt-28">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 tracking-tight text-foreground">
            Experience & Education
          </h2>
          <p className="text-center text-base sm:text-lg mb-12 sm:mb-16 text-muted-foreground">
            My professional journey
          </p>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-0.5 bg-accent/20"></div>

            {experiences.map((exp, index) => {
              const Icon = exp.type === 'work' ? Briefcase : GraduationCap;
              return (
                <div key={index} className="relative mb-8 sm:mb-12 pl-14 sm:pl-20 group">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 sm:top-2 p-2.5 sm:p-3 rounded-full shadow-md bg-accent text-accent-foreground transition-transform duration-300 ease-out group-hover:scale-110">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Content card */}
                  <div className="bg-card rounded-[1.5rem] p-5 sm:p-6 shadow-sm border border-border/80 hover:border-accent/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-300 ease-out">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-card-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-base sm:text-lg font-semibold mt-0.5 text-accent">
                          {exp.company}
                        </p>
                      </div>
                      <span className="w-full sm:w-auto px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-accent/8 text-card-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-foreground/80 dark:text-foreground/75">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

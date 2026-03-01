import { Briefcase, GraduationCap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const experiences = [
  {
    type: 'education',
    title: 'B.Tech in Computer Science and Engineering',
    company: 'Dayananda Sagar University',
    period: 'Aug 2025 - Present',
    description:
      'Undergraduate student focusing on core computer science subjects, programming methodologies, Artificial Intelligence, and Machine Learning. Actively learning data structures, algorithms, and practical software development aiming towards a career in AI, ML, and Full Stack Engineering.',
    achievements: [
      'Focusing on Python, Java, and C',
      'Solving competitive programming challenges on HackerRank',
      'Building responsive Progressive Web Applications',
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
    <section id="experience" className="py-24 bg-muted transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-8" ref={revealRef}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 tracking-tight text-foreground">
            Experience & Education
          </h2>
          <p className="text-center text-lg mb-16 text-muted-foreground">
            My professional journey
          </p>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent/20"></div>

            {experiences.map((exp, index) => {
              const Icon = exp.type === 'work' ? Briefcase : GraduationCap;
              return (
                <div key={index} className="relative mb-12 pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-0 p-3 rounded-full shadow-lg bg-accent text-accent-foreground">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content card */}
                  <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-card-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-lg font-medium mt-1 text-accent">
                          {exp.company}
                        </p>
                      </div>
                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-card-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent"></span>
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

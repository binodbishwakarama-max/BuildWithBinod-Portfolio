import { Globe, Layout, Server, Smartphone, Database, Code2, Plus, X, Trash2 } from 'lucide-react';
import { usePortfolio, SkillCategory } from '../context/PortfolioContext';
import { TiltCard } from './ui/TiltCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const iconMap: Record<string, any> = {
  Layout,
  Server,
  Database,
  Smartphone,
  Code2,
  Globe
};

export function Skills() {
  const { data, isAdmin, addSkillCategory, deleteSkillCategory, addSkillToCategory, removeSkillFromCategory, isLoading } = usePortfolio();
  const revealRef = useScrollReveal();

  const handleAddCategory = () => {
    const category = window.prompt('Category Name:');
    if (!category) return;

    // Default to Code2 if they don't pick one, or we could ask for an icon name
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      category,
      iconName: 'Code2',
      skills: []
    };
    addSkillCategory(newCat);
  };

  const handleAddSkill = (categoryId: string) => {
    const skill = window.prompt('Enter new skill name:');
    if (skill) {
      addSkillToCategory(categoryId, skill.trim());
    }
  };

  return (
    <section id="skills" className="py-32 bg-background transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-8" ref={revealRef}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The core technologies and tools I leverage to engineer robust, scalable solutions.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
              {data.skills.map((category, index) => {
                const Icon = iconMap[category.iconName as keyof typeof iconMap] || Code2;

                // Create a bento layout pattern
                const getColSpan = (i: number) => {
                  switch (i % 5) {
                    case 0: return "md:col-span-8 lg:col-span-7";
                    case 1: return "md:col-span-4 lg:col-span-5";
                    case 2: return "md:col-span-4 lg:col-span-5";
                    case 3: return "md:col-span-8 lg:col-span-7";
                    case 4: return "md:col-span-12 lg:col-span-12";
                    default: return "md:col-span-6";
                  }
                };

                return (
                  <TiltCard key={category.id} className={`${getColSpan(index)} h-full`}>
                    <div className="group bg-card/10 backdrop-blur-md rounded-[2rem] p-8 shadow-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all duration-500 border border-border/40 hover:border-accent/40 relative h-full flex flex-col justify-between overflow-hidden">
                      {/* Subtle ambient background glow */}
                      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500"></div>

                      {isAdmin && (
                        <button
                          onClick={() => { if (window.confirm('Delete this category?')) deleteSkillCategory(category.id); }}
                          className="absolute top-6 right-6 z-10 text-destructive/50 hover:text-destructive p-2 transition-colors bg-card/50 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 group-hover:scale-110 transition-transform duration-500">
                            <Icon className="w-8 h-8 text-accent" />
                          </div>
                          <h3 className="text-2xl font-bold tracking-tight text-foreground">
                            {category.category}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-background/50 hover:bg-background border border-border/50 text-foreground/80 transition-colors group/skill cursor-default"
                            >
                              {skill}
                              {isAdmin && (
                                <button
                                  onClick={() => removeSkillFromCategory(category.id, skill)}
                                  className="text-muted-foreground hover:text-destructive opacity-0 group-hover/skill:opacity-100 transition-opacity ml-1"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </span>
                          ))}

                          {isAdmin && (
                            <button
                              onClick={() => handleAddSkill(category.id)}
                              className="px-4 py-2 rounded-xl text-sm border border-dashed border-border/50 text-muted-foreground hover:border-accent hover:text-accent flex items-center gap-1 transition-colors bg-transparent"
                            >
                              <Plus size={14} /> Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          )}

          {isAdmin && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleAddCategory}
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-dashed border-border/50 hover:border-accent hover:text-accent transition-colors text-muted-foreground font-medium"
              >
                <Plus size={20} />
                Add Skill Domain
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

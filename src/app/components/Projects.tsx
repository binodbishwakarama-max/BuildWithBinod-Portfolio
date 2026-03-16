import { useState } from 'react';
import { ExternalLink, Github, Plus, Trash2, Edit } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { usePortfolio, Project } from '../context/PortfolioContext';
import { TiltCard } from './ui/TiltCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Projects() {
  const { data, isAdmin, addProject, deleteProject, updateProject, isLoading } = usePortfolio();
  const projects = data.projects;
  const revealRef = useScrollReveal();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  const handleAddNew = () => {
    const title = window.prompt('Project Title:');
    if (!title) return;
    const desc = window.prompt('Project Description:');
    const tagsInput = window.prompt('Tags (comma separated):', 'React, TypeScript');
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title,
      description: desc || 'New Project Description',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1080',
      tags,
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com'
    };
    addProject(newProject);
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
  };

  const saveEdit = () => {
    if (editingId && formData.title) {
      updateProject(editingId, formData as Project);
    }
    setEditingId(null);
  };

  const getArtworkBackdrop = (i: number) => {
    switch (i % 5) {
      case 0:
        return 'from-cyan-400/20 via-blue-500/10 to-background';
      case 1:
        return 'from-emerald-400/20 via-teal-500/10 to-background';
      case 2:
        return 'from-fuchsia-400/20 via-violet-500/10 to-background';
      case 3:
        return 'from-rose-400/20 via-indigo-500/10 to-background';
      case 4:
        return 'from-sky-400/20 via-emerald-500/10 to-background';
      default:
        return 'from-accent/20 via-accent/10 to-background';
    }
  };

  return (
    <section id="projects" className="py-32 bg-background transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-8" ref={revealRef}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A curated selection of my recent projects, showcasing scalable architecture and refined user experiences.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[380px] sm:auto-rows-[420px] lg:auto-rows-[450px]">
              {projects.map((project, index) => {
                const getLayout = (i: number) => {
                  switch (i % 5) {
                    case 0: return "md:col-span-6 lg:col-span-8";
                    case 1: return "md:col-span-6 lg:col-span-4";
                    case 2: return "md:col-span-4 lg:col-span-4";
                    case 3: return "md:col-span-4 lg:col-span-4";
                    case 4: return "md:col-span-4 lg:col-span-4";
                    default: return "md:col-span-6 lg:col-span-4";
                  }
                };

                return (
                  <TiltCard key={project.id} className={getLayout(index)}>
                    <div className="group relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 dark:border-white/5 transition-all duration-500 hover:border-white/20 dark:hover:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] bg-card/10 backdrop-blur-3xl">
                      {isAdmin && (
                        <div className="absolute top-4 right-4 z-50 flex gap-2">
                          <button onClick={() => startEdit(project)} className="p-2 bg-accent text-accent-foreground rounded-md shadow"><Edit size={16} /></button>
                          <button onClick={() => { if (window.confirm('Delete project?')) deleteProject(project.id); }} className="p-2 bg-destructive text-destructive-foreground rounded-md shadow"><Trash2 size={16} /></button>
                        </div>
                      )}

                      {editingId === project.id ? (
                        <div className="p-8 flex flex-col gap-4 text-card-foreground absolute inset-0 z-40 bg-card overflow-auto">
                          <label className="font-bold">Title</label>
                          <input className="border border-border bg-input p-2 rounded text-foreground" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                          <label className="font-bold">Description</label>
                          <textarea className="border border-border bg-input p-2 rounded h-24 text-foreground" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                          <label className="font-bold">Tags (comma separated)</label>
                          <input className="border border-border bg-input p-2 rounded text-foreground" value={formData.tags?.join(', ')} onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })} />
                          <label className="font-bold">Image URL</label>
                          <input className="border border-border bg-input p-2 rounded text-foreground" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                          <div className="flex gap-2 mt-4">
                            <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                            <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={`absolute inset-0 z-0 bg-gradient-to-br ${getArtworkBackdrop(index)} dark:from-background dark:via-background/30 dark:to-background`}>
                            <ImageWithFallback
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-contain object-center p-6 sm:p-4 md:p-0 md:object-cover opacity-95 md:opacity-90 dark:opacity-70 md:dark:opacity-40 transition-transform duration-700 md:group-hover:scale-105 md:group-hover:opacity-100 md:dark:group-hover:opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/10 md:from-background/90 md:via-background/40 dark:from-background dark:via-background/80 md:to-transparent"></div>
                          </div>

                          <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end">
                            <div className="transform transition-transform duration-300 md:translate-y-4 md:group-hover:-translate-y-4">
                              <h3 className="text-3xl font-bold mb-3 tracking-tighter text-foreground drop-shadow-md">
                                {project.title}
                              </h3>
                              <p className="mb-6 leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-3 md:group-hover:line-clamp-none transition-all duration-300">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag) => (
                                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-foreground/90 backdrop-blur-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                {project.githubUrl && project.githubUrl !== "#" && (
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all border border-border/50 text-foreground hover:bg-white/10 backdrop-blur-md font-medium text-sm">
                                    <Github className="w-4 h-4" /> Code
                                  </a>
                                )}
                                {project.liveUrl && project.liveUrl !== "#" && (
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-foreground/5 font-medium text-sm">
                                    <ExternalLink className="w-4 h-4" /> Live Demo
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          )}

          {isAdmin && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-dashed border-border/50 hover:border-accent hover:text-accent transition-colors text-muted-foreground font-medium"
              >
                <Plus size={20} />
                Add New Project
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

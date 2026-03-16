import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const PORTFOLIO_DATA_VERSION = '2026-03-16-project-polish';

// Define the Data Types
export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
}

export interface SkillCategory {
    id: string;
    category: string;
    iconName: string; // Storing string name to dynamically load Lucide icons
    skills: string[];
}

export interface PortfolioData {
    projects: Project[];
    skills: SkillCategory[];
}

export interface PortfolioContextType {
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
    data: PortfolioData;
    isLoading: boolean;
    error: string | null;
    // Methods for Projects
    addProject: (project: Project) => void;
    updateProject: (id: string, updatedProject: Project) => void;
    deleteProject: (id: string) => void;
    // Methods for Skills
    addSkillCategory: (category: SkillCategory) => void;
    deleteSkillCategory: (id: string) => void;
    addSkillToCategory: (categoryId: string, skill: string) => void;
    removeSkillFromCategory: (categoryId: string, skillToRemove: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PortfolioData>({ projects: [], skills: [] });

    // Initial Fetch & LocalStorage Hydration
    useEffect(() => {
        const initializeData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/data/portfolio.json');
                if (!response.ok) throw new Error('Failed to fetch portfolio data: ' + response.statusText);

                const jsonData = await response.json();
                const savedData = localStorage.getItem('portfolioData');
                const savedVersion = localStorage.getItem('portfolioDataVersion');

                // Only reuse saved edits when they match the current portfolio data version.
                if (savedData && savedVersion === PORTFOLIO_DATA_VERSION) {
                    setData(JSON.parse(savedData) as PortfolioData);
                    setIsLoading(false);
                    return;
                }

                setData(jsonData);
                localStorage.setItem('portfolioData', JSON.stringify(jsonData));
                localStorage.setItem('portfolioDataVersion', PORTFOLIO_DATA_VERSION);
            } catch (err: any) {
                console.error('Data loading error:', err);
                setError(err.message || 'Error loading data');
            } finally {
                setIsLoading(false);
            }
        };

        initializeData();
    }, []);

    const syncToStorage = (newData: PortfolioData) => {
        setData(newData);
        localStorage.setItem('portfolioData', JSON.stringify(newData));
        localStorage.setItem('portfolioDataVersion', PORTFOLIO_DATA_VERSION);
    };

    // Check admin session on load
    useEffect(() => {
        const isSessionAdmin = sessionStorage.getItem('portfolioAdmin') === 'true';
        if (isSessionAdmin) {
            setIsAdmin(true);
        }
    }, []);

    // Sync session storage on admin change
    useEffect(() => {
        if (isAdmin) {
            sessionStorage.setItem('portfolioAdmin', 'true');
        } else {
            sessionStorage.removeItem('portfolioAdmin');
        }
    }, [isAdmin]);

    // Project Actions
    const addProject = (project: Project) => {
        syncToStorage({ ...data, projects: [...data.projects, project] });
    };

    const updateProject = (id: string, updatedProject: Project) => {
        syncToStorage({
            ...data,
            projects: data.projects.map(p => p.id === id ? updatedProject : p)
        });
    };

    const deleteProject = (id: string) => {
        syncToStorage({
            ...data,
            projects: data.projects.filter(p => p.id !== id)
        });
    };

    // Skill Actions
    const addSkillCategory = (category: SkillCategory) => {
        syncToStorage({ ...data, skills: [...data.skills, category] });
    };

    const deleteSkillCategory = (id: string) => {
        syncToStorage({ ...data, skills: data.skills.filter(c => c.id !== id) });
    };

    const addSkillToCategory = (categoryId: string, skill: string) => {
        syncToStorage({
            ...data,
            skills: data.skills.map(cat => {
                if (cat.id === categoryId && !cat.skills.includes(skill)) {
                    return { ...cat, skills: [...cat.skills, skill] };
                }
                return cat;
            })
        });
    };

    const removeSkillFromCategory = (categoryId: string, skillToRemove: string) => {
        syncToStorage({
            ...data,
            skills: data.skills.map(cat => {
                if (cat.id === categoryId) {
                    return { ...cat, skills: cat.skills.filter(s => s !== skillToRemove) };
                }
                return cat;
            })
        });
    };

    return (
        <PortfolioContext.Provider value={{
            isAdmin, setIsAdmin,
            data, isLoading, error,
            addProject, updateProject, deleteProject,
            addSkillCategory, deleteSkillCategory, addSkillToCategory, removeSkillFromCategory
        }}>
            {children}
        </PortfolioContext.Provider>
    );
}


export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
}

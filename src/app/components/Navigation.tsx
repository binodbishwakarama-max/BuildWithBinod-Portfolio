import { useState, useEffect } from 'react';
import { Menu, X, User, Code2, Briefcase, Mail, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'About', icon: User, id: 'about' },
  { label: 'Skills', icon: Code2, id: 'skills' },
  { label: 'Projects', icon: Briefcase, id: 'projects' },
  { label: 'Experience', icon: Briefcase, id: 'experience' },
  { label: 'Contact', icon: Mail, id: 'contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 rounded-full border ${isScrolled
          ? 'bg-background/60 backdrop-blur-2xl border-border/50 shadow-2xl shadow-black/20 py-3 px-8'
          : 'bg-background/20 backdrop-blur-xl border-border/10 py-4 px-8'
          }`}
      >
        <div className="flex items-center justify-between gap-8 md:gap-12 w-full">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-lg lg:text-xl font-bold tracking-tighter text-foreground transition-opacity hover:opacity-80"
          >
            BuildWithBinod
          </button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="p-1.5 rounded-full transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-foreground transition-opacity hover:opacity-80"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-2 text-sm font-medium tracking-tight transition-all text-muted-foreground hover:text-foreground"
                >
                  <Icon size={16} className="opacity-70" />
                  {item.label}
                </button>
              );
            })}

            <div className="w-px h-5 bg-border mx-2"></div>

            <button
              onClick={toggleDark}
              className="p-1.5 rounded-full transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 p-4 rounded-2xl bg-background/95 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-black/20 flex flex-col gap-4 md:hidden">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left font-medium tracking-tight transition-all text-foreground hover:bg-muted"
                >
                  <Icon size={18} className="text-accent" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </div>
  );
}

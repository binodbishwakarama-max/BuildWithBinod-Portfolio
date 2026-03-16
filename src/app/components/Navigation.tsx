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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-3 sm:top-4 lg:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-300 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between overflow-hidden border border-white/20 dark:border-white/10 rounded-[24px] sm:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.05)] ${isScrolled
          ? 'bg-white/10 dark:bg-black/20 backdrop-blur-[24px] hover:bg-white/20 dark:hover:bg-black/30'
          : 'bg-white/5 dark:bg-black/10 backdrop-blur-[30px] hover:bg-white/10 dark:hover:bg-black/20'
          }`}
        style={{ WebkitBackdropFilter: 'blur(24px)' }}
      >
        <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <button
            onClick={() => {
              scrollToSection('hero');
              setIsMobileMenuOpen(false);
            }}
            className="text-base sm:text-lg lg:text-xl font-bold tracking-tighter text-foreground transition-all duration-300 hover:opacity-80 hover:-translate-y-[1px] truncate"
          >
            BuildWithBinod
          </button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleDark}
              className="p-1.5 rounded-full transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-white/10 hover:-translate-y-[1px]"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-foreground transition-all duration-300 hover:opacity-80 hover:-translate-y-[1px]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-2 text-[13px] lg:text-[14px] font-medium tracking-tight transition-all duration-300 text-foreground/80 hover:text-foreground hover:-translate-y-[2px]"
                >
                  <Icon size={16} className="opacity-70 group-hover:opacity-100 group-hover:text-accent transition-colors duration-300" />
                  {item.label}
                </button>
              );
            })}

            <div className="w-px h-5 bg-white/20 dark:bg-white/10 mx-2"></div>

            <button
              onClick={toggleDark}
              className="p-1.5 rounded-full transition-all duration-300 text-foreground/80 hover:text-foreground hover:bg-white/10 hover:-translate-y-[2px]"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`w-full overflow-hidden transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 sm:px-6 py-4 flex flex-col gap-2 bg-black/5 dark:bg-white/5 backdrop-blur-[40px]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl text-left font-medium tracking-tight transition-all duration-300 text-foreground/90 hover:bg-white/10 hover:translate-x-1"
                >
                  <Icon size={18} className="text-accent" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

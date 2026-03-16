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
        className={`pointer-events-auto relative isolate transition-all duration-500 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between overflow-hidden border rounded-[28px] sm:rounded-[36px] ${
          isScrolled
            ? 'border-white/28 dark:border-white/12 bg-white/[0.1] dark:bg-white/[0.04] backdrop-blur-[34px] shadow-[0_20px_72px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(255,255,255,0.05)] dark:shadow-[0_22px_80px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)]'
            : 'border-white/24 dark:border-white/10 bg-white/[0.07] dark:bg-white/[0.025] backdrop-blur-[38px] shadow-[0_18px_66px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-1px_0_rgba(255,255,255,0.04)] dark:shadow-[0_18px_72px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]'
          }`}
        style={{ WebkitBackdropFilter: isScrolled ? 'blur(34px)' : 'blur(38px)' }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.1)_18%,rgba(255,255,255,0.03)_46%,rgba(255,255,255,0.1)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_18%,rgba(255,255,255,0.01)_46%,rgba(255,255,255,0.03)_100%)] opacity-85"></div>
        <div className="pointer-events-none absolute inset-[1px] rounded-[26px] sm:rounded-[34px] bg-[radial-gradient(circle_at_16%_0%,rgba(255,255,255,0.55),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(255,255,255,0.14),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_36%,rgba(255,255,255,0.07)_72%,rgba(255,255,255,0.14)_100%)] dark:bg-[radial-gradient(circle_at_16%_0%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_86%_16%,rgba(255,255,255,0.04),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)_36%,rgba(255,255,255,0.02)_72%,rgba(255,255,255,0.04)_100%)]"></div>
        <div className="pointer-events-none absolute -top-8 left-[16%] h-24 w-44 rotate-[8deg] rounded-full bg-white/18 blur-2xl dark:bg-white/5"></div>
        <div className="pointer-events-none absolute inset-y-0 left-[24%] hidden w-24 -skew-x-[18deg] bg-white/7 blur-2xl md:block dark:bg-white/3"></div>
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/24"></div>

        <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <button
            onClick={() => {
              scrollToSection('hero');
              setIsMobileMenuOpen(false);
            }}
            className="relative flex items-center gap-3 rounded-full border border-white/22 bg-white/[0.04] px-2.5 py-1.5 text-base sm:text-lg lg:text-xl font-bold tracking-tighter text-foreground transition-all duration-300 hover:-translate-y-[1px] hover:bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.025] truncate"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.82),rgba(255,255,255,0.16)_34%,rgba(255,255,255,0.05)_74%)] text-[11px] font-semibold tracking-[0.18em] text-foreground/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_20px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/12 dark:bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.12),rgba(255,255,255,0.06)_36%,rgba(255,255,255,0.02)_74%)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_22px_rgba(0,0,0,0.14)]">
              BB
            </span>
            <span>BuildWithBinod</span>
          </button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleDark}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/22 bg-white/[0.04] text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/[0.08] hover:-translate-y-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.025]"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/22 bg-white/[0.04] text-foreground transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.025]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 rounded-full border border-white/22 bg-white/[0.04] px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.025]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-2 rounded-full border border-transparent px-3.5 py-2 text-[13px] lg:text-[14px] font-medium tracking-tight transition-all duration-300 text-foreground/78 hover:text-foreground hover:-translate-y-[2px] hover:border-white/16 hover:bg-white/[0.08] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:border-white/10 dark:hover:bg-white/[0.04]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:bg-white/[0.12] group-hover:text-accent dark:border-white/8 dark:bg-white/[0.04] dark:group-hover:bg-white/[0.06]">
                    <Icon size={14} className="transition-colors duration-300" />
                  </span>
                  {item.label}
                </button>
              );
            })}

            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-white/14 mx-1"></div>

            <button
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-white/[0.05] transition-all duration-300 text-foreground/80 hover:text-foreground hover:bg-white/[0.09] hover:-translate-y-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] dark:border-white/10 dark:bg-white/[0.03]"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`w-full overflow-hidden transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 border-t border-white/12 dark:border-white/8' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="relative px-4 sm:px-6 py-4 flex flex-col gap-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.014))] backdrop-blur-[42px]">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20"></div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl text-left font-medium tracking-tight transition-all duration-300 text-foreground/90 border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] hover:translate-x-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:border-white/8 dark:bg-white/[0.03]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] dark:border-white/8 dark:bg-white/[0.04]">
                    <Icon size={16} className="text-accent" />
                  </span>
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

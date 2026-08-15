import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/soundEffects';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { isDark, toggleDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map(item => item.id)];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: '-70px 0px -45% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      sounds.playClick();
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      {/* Apple-Grade Ultra-Transparent Liquid Glass Floating Pill */}
      <nav
        className={`pointer-events-auto relative w-full max-w-3xl rounded-full transition-all duration-500 ease-out px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between ${
          isScrolled
            ? 'bg-black/[0.12] dark:bg-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.15)] border border-white/25 dark:border-white/12'
            : 'bg-black/[0.04] dark:bg-white/[0.025] shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 dark:border-white/10'
        } backdrop-blur-3xl [backdrop-filter:blur(36px)_saturate(200%)]`}
      >
        {/* Specular Light Highlight on Top Border */}
        <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/25 to-transparent pointer-events-none" />

        {/* Brand Pill */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-white/15 dark:hover:bg-white/5 transition-all duration-300 active:scale-95 cursor-pointer group"
        >
          <img
            src="/bb-v2.png"
            alt="Binod Logo"
            className="w-6 h-6 rounded-lg object-contain shadow-sm group-hover:scale-105 transition-transform"
          />
          <span className="font-bold text-sm tracking-tight text-foreground font-display hidden sm:inline">
            Binod
          </span>
        </button>

        {/* Gliding Liquid Capsule Links */}
        <div
          className="hidden md:flex items-center gap-0.5 relative p-0.5 rounded-full bg-white/[0.04] dark:bg-white/[0.02] border border-white/10 dark:border-white/5"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = (hoveredSection ? hoveredSection === item.id : activeSection === item.id);

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => {
                  setHoveredSection(item.id);
                  sounds.playHover();
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer select-none ${
                  isActive ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Smooth Liquid Capsule Glider */}
                {isActive && (
                  <motion.div
                    layoutId="liquid-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white/30 dark:bg-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30 dark:border-white/15 -z-10 backdrop-blur-md"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Controls: Theme Toggle & Contact Pill */}
        <div className="flex items-center gap-1.5">
          {/* Transparent Theme Switcher */}
          <button
            onClick={() => {
              toggleDark();
              sounds.playClick();
            }}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-200 active:scale-90 cursor-pointer"
            title="Toggle Appearance"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Liquid Glass Contact Pill */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-foreground text-background font-semibold text-xs transition-all duration-300 hover:opacity-90 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMobileOpen(!isMobileOpen);
              sounds.playClick();
            }}
            className="md:hidden p-2 rounded-full text-foreground hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Ultra-Transparent Liquid Glass Drawer */}
      {isMobileOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-3xl border border-foreground/[0.1] dark:border-white/15 bg-background/90 dark:bg-card/85 backdrop-blur-3xl [backdrop-filter:blur(40px)_saturate(200%)] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] flex flex-col gap-1 md:hidden animate-in slide-in-from-top-4 duration-300">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMobileOpen(false);
              }}
              className={`p-3 text-left font-semibold text-sm rounded-2xl transition-all cursor-pointer flex items-center justify-between ${
                activeSection === item.id
                  ? 'text-foreground bg-foreground/[0.08] dark:bg-white/15 shadow-sm font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]'
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </button>
          ))}

          {/* Drawer CTA */}
          <div className="pt-2 mt-2 border-t border-foreground/[0.08]">
            <button
              onClick={() => {
                scrollToSection('contact');
                setIsMobileOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-foreground text-background font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

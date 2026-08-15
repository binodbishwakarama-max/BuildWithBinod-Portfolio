import { Suspense, lazy, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { LiquidBackground } from './components/LiquidBackground';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/ui/CommandPalette';

const Hero = lazy(() => import('./components/Hero').then(module => ({ default: module.Hero })));
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Experience = lazy(() => import('./components/Experience').then(module => ({ default: module.Experience })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PortfolioProvider>
          <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Film Grain & Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.018] dark:opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <LiquidBackground />
            <CustomCursor />
            <ScrollProgress />
            <Navigation onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
            <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
            
            <main className="relative z-10">
              <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-muted-foreground font-display text-lg tracking-tight">Initializing systems...</div>}>
                <Hero onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </Suspense>
            </main>
            <Footer />
          </div>
        </PortfolioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

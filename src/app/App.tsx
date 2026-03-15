import { Suspense, lazy } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { ParticleBackground } from './components/ParticleBackground';

const Hero = lazy(() => import('./components/Hero').then(module => ({ default: module.Hero })));
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Experience = lazy(() => import('./components/Experience').then(module => ({ default: module.Experience })));
const Blog = lazy(() => import('./components/Blog').then(module => ({ default: module.Blog })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
          <ParticleBackground />
          <Navigation />
          <main>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading section...</div>}>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Blog />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

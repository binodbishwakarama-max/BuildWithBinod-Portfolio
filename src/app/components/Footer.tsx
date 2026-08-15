import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 sm:py-12 bg-background border-t border-foreground/[0.06] transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand & copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
            <span className="font-display font-bold text-foreground text-base">
              Binod Bishwakarma
            </span>
            <span className="hidden sm:inline text-foreground/20">·</span>
            <span>© {currentYear} All rights reserved.</span>
          </div>

          {/* Right: Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/binodbishwakarama-max"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/binodbishwakarama"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:binodbishwakarama@gmail.com"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

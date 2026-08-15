import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
  Search,
  ArrowRight,
  Copy,
  Check,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../utils/soundEffects';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { isDark, toggleDark } = useTheme();
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        onOpenChange(!open);
        sounds.playClick();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (callback: () => void) => {
    callback();
    onOpenChange(false);
    sounds.playClick();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('binodbishwakarama@gmail.com');
    setCopied(true);
    sounds.playChime();
    setTimeout(() => {
      setCopied(false);
      onOpenChange(false);
    }, 1200);
  };

  const handleToggleAudio = () => {
    const newMuted = sounds.toggleMute();
    setIsMuted(newMuted);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-foreground/[0.12] bg-background/95 p-2 shadow-2xl backdrop-blur-2xl text-foreground ring-1 ring-foreground/5 animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full">
          <div className="flex items-center gap-3 px-3.5 py-3 border-b border-foreground/[0.08]">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type to search or jump to section..."
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground text-foreground"
            />
            <kbd className="hidden sm:inline-flex items-center rounded border border-foreground/[0.1] bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-72 overflow-y-auto p-1 text-sm scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <Command.Empty className="py-8 text-center text-xs text-muted-foreground">
              No matching results.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-[10px] font-mono text-muted-foreground/80 px-2.5 py-1.5 uppercase tracking-wider">
              <Command.Item
                onSelect={() => handleSelect(() => scrollTo('hero'))}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors group"
              >
                <span className="font-medium text-xs sm:text-sm">Hero // Overview</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => scrollTo('about'))}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors group"
              >
                <span className="font-medium text-xs sm:text-sm">About // Architecture & Principles</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => scrollTo('skills'))}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors group"
              >
                <span className="font-medium text-xs sm:text-sm">Skills // Capability Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => scrollTo('projects'))}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors group"
              >
                <span className="font-medium text-xs sm:text-sm">Work // Selected Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => scrollTo('experience'))}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors group"
              >
                <span className="font-medium text-xs sm:text-sm">Experience // Roles & Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => scrollTo('contact'))}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors group"
              >
                <span className="font-medium text-xs sm:text-sm">Contact // Direct Transmission</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions" className="text-[10px] font-mono text-muted-foreground/80 px-2.5 py-1.5 uppercase tracking-wider mt-1.5 border-t border-foreground/[0.06]">
              <Command.Item
                onSelect={copyEmail}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                  <span className="font-medium text-xs sm:text-sm">{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">binodbishwakarama@gmail.com</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(toggleDark)}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  {isDark ? <Sun className="w-3.5 h-3.5 text-muted-foreground" /> : <Moon className="w-3.5 h-3.5 text-muted-foreground" />}
                  <span className="font-medium text-xs sm:text-sm">Toggle Theme ({isDark ? 'Light' : 'Dark'})</span>
                </div>
                <kbd className="text-[10px] font-mono text-muted-foreground">T</kbd>
              </Command.Item>

              <Command.Item
                onSelect={handleToggleAudio}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-muted-foreground" /> : <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />}
                  <span className="font-medium text-xs sm:text-sm">Toggle Sound FX ({isMuted ? 'Muted' : 'On'})</span>
                </div>
                <kbd className="text-[10px] font-mono text-muted-foreground">M</kbd>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => window.open('/resume.pdf', '_blank'))}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-foreground/[0.06] aria-selected:bg-foreground/[0.06] text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-medium text-xs sm:text-sm">View Resume (PDF)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between px-3 py-2 border-t border-foreground/[0.06] text-[10px] font-mono text-muted-foreground">
            <span>Navigate: ↑↓</span>
            <span>Select: ↵</span>
          </div>
        </Command>
      </div>
    </div>
  );
}

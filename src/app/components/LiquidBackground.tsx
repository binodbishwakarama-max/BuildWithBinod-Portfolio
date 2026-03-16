import { useTheme } from '../context/ThemeContext';

export function LiquidBackground() {
  useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden sm:block">
      {/* Container for blobs */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-35 lg:opacity-60 dark:opacity-20 lg:dark:opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[34vw] h-[34vw] max-w-[520px] max-h-[520px] bg-accent/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[90px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] max-w-[420px] max-h-[420px] bg-blue-400/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[90px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[38vw] h-[38vw] max-w-[580px] max-h-[580px] bg-cyan-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[110px] animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}

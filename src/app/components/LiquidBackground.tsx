export function LiquidBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Primary ambient blob — top center */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] h-[600px] rounded-full blur-[160px] animate-blob opacity-50 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.15) 40%, transparent 70%)',
        }}
      />

      {/* Secondary blob — right side */}
      <div
        className="absolute top-[40%] -right-[15%] w-[40vw] max-w-[500px] h-[500px] rounded-full blur-[150px] animate-blob animation-delay-4000 opacity-40 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)',
        }}
      />

      {/* Tertiary blob — bottom left */}
      <div
        className="absolute top-[70%] -left-[10%] w-[45vw] max-w-[550px] h-[550px] rounded-full blur-[150px] animate-blob animation-delay-6000 opacity-40 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)',
        }}
      />
    </div>
  );
}

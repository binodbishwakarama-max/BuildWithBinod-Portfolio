import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  accent: boolean;
  label?: string;
}

/**
 * ArchitectureConstellation — Ultra-High-Definition (Retina Scaled) Interactive Neural Vector Grid.
 * Razor-sharp 2D Canvas rendering with devicePixelRatio optimization, luminous vector edge gradients,
 * kinetic mouse wave physics, and anti-aliased geometry.
 */
export function ArchitectureConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    // Node network generation
    const nodeCount = Math.min(Math.floor((width * height) / 8500), 38);
    const nodes: Node[] = [];
    const labels = [
      'pgvector', 'HNSW::1536', 'P99 < 35ms', 'AES-256',
      'Cohere-Rerank', 'Edge-Runtime', 'FastAPI-Core', 'Tenant-Vault'
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1.8,
        pulsePhase: Math.random() * Math.PI * 2,
        accent: i < labels.length || Math.random() < 0.25,
        label: i < labels.length ? labels[i] : undefined,
      });
    }

    // Interactive mouse state
    const mouse = { x: -2000, y: -2000, targetX: -2000, targetY: -2000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.active = false;
    };

    window.addEventListener('resize', () => {
      setupCanvasSize();
    });

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const maxDist = 130;
    const mouseInfluenceRadius = 160;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const primaryBlue = isDark ? '59, 130, 246' : '37, 99, 235';
      const cyanAccent = isDark ? '56, 189, 248' : '2, 132, 199';
      const nodeFill = isDark ? '255, 255, 255' : '10, 10, 10';

      // 1. Draw High-Precision Connecting Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.24 : 0.16);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${primaryBlue}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Interactive Dynamic Mouse Tethering
      if (mouse.active) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceRadius) {
            const alpha = (1 - dist / mouseInfluenceRadius) * 0.55;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${cyanAccent}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.stroke();

            // Subtle smooth magnetic displacement
            nodes[i].x -= (dx / dist) * 0.35;
            nodes[i].y -= (dy / dist) * 0.35;
          }
        }
      }

      // 3. Draw Nodes with Crisp Luminous Glow
      const time = performance.now() * 0.002;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        // Boundary reflection
        if (node.x <= 15 || node.x >= width - 15) node.vx *= -1;
        if (node.y <= 15 || node.y >= height - 15) node.vy *= -1;

        const pulse = Math.sin(time + node.pulsePhase) * 0.6 + 1;
        const currentRadius = node.radius * (node.accent ? pulse : 1);

        // Ambient node glow
        if (node.accent) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(${cyanAccent}, 0.08)` : `rgba(${primaryBlue}, 0.06)`;
          ctx.fill();
        }

        // Crisp inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.accent
          ? `rgb(${cyanAccent})`
          : `rgba(${nodeFill}, ${isDark ? 0.7 : 0.6})`;
        ctx.fill();

        // Technical crisp monospace label
        if (node.label) {
          ctx.font = '500 9px "JetBrains Mono", "Plus Jakarta Sans", monospace';
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 10, 10, 0.55)';
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[490px] rounded-2xl border border-foreground/[0.08] bg-foreground/[0.015] dark:bg-card/40 overflow-hidden backdrop-blur-xl group"
    >
      {/* High-Resolution Retina Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block" />

      {/* Subtle Top & Bottom Minimalist Monospace Technical Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-foreground/75 font-semibold">VECTOR TOPOLOGY</span>
        </span>
        <span className="text-foreground/45">HNSW // &lt;35MS</span>
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono text-muted-foreground border-t border-foreground/[0.05] pt-2">
        <span className="text-foreground/50">38 NODES ACTIVE</span>
        <span className="text-foreground/50">INTERACTIVE CANVAS</span>
      </div>
    </div>
  );
}

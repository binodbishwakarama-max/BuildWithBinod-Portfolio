import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isDark } = useTheme();

    // Ref to hold the current mouse position so the animation loop can see it
    const mousePos = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        // Disable on mobile/touch screens
        if (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window)) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Spawn a few particles at mouse position
            for (let i = 0; i < 2; i++) {
                particles.push({
                    x: e.clientX + (Math.random() * 20 - 10),
                    y: e.clientY + (Math.random() * 20 - 10),
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5 - 0.5, // Slight upward drift
                    life: 0,
                    maxLife: Math.random() * 60 + 40,
                    size: Math.random() * 2 + 0.5
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const parseAccent = () => {
            // Get the current computed --accent variable
            const root = document.documentElement;
            const accent = getComputedStyle(root).getPropertyValue('--accent').trim();
            return accent || (isDark ? '#3b82f6' : '#2563EB');
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const accentColor = parseAccent();

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life++;
                p.x += p.vx;
                p.y += p.vy;

                const lifeRatio = p.life / p.maxLife;
                // Fade in quickly, fade out slowly
                const opacity = lifeRatio < 0.2 ? lifeRatio * 5 : 1 - ((lifeRatio - 0.2) / 0.8);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Convert hex/rgb to rgba wrapper for opacity
                // Since --accent might be a hex string or name, we'll try to just set globalAlpha
                ctx.fillStyle = accentColor;
                ctx.globalAlpha = Math.max(0, opacity * 0.4); // Max 40% opacity for subtlety
                ctx.fill();
                ctx.globalAlpha = 1;

                if (p.life >= p.maxLife) {
                    particles.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40 block md:block"
            style={{ opacity: 0.6 }} // Master opacity control
        />
    );
}

import React, { useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export function TiltCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    const { is3dMode } = useTheme();
    const cardRef = useRef<HTMLDivElement>(null);

    const [style, setStyle] = useState<React.CSSProperties>({
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!is3dMode || !cardRef.current) return;

        // Disable on small screens to prevent weird touch interactions
        if (window.innerWidth < 768) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to the center of the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Max rotation is 8 degrees
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setStyle({
            transition: 'none', // Remove transition while moving for instant follow
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            boxShadow: `0 20px 40px -20px rgba(0,0,0,0.3)`
        });
    };

    const handleMouseLeave = () => {
        if (!is3dMode) return;

        setStyle({
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s',
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: 'none'
        });
    };

    return (
        <div
            ref={cardRef}
            className={`relative will-change-transform ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={is3dMode ? style : {}}
        >
            {children}
        </div>
    );
}

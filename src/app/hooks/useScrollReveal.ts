import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Optional: wait a tiny bit to ensure initial paint doesn't instantly trigger
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add('reveal-visible');
                } else {
                    element.classList.remove('reveal-visible');
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        element.classList.add('reveal-hidden');
        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold]);

    return ref;
}

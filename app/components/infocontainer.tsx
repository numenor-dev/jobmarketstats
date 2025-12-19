'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MoreInfo from './moreinfo';

export default function InfoContainer() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 1 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="
                xl:max-w-7xl
                lg:max-w-5xl lg:px-10
                md:max-w-3xl md:px-4 md:py-6
                sm:max-w-xl
                w-screen
                bg-slate-200
                py-6
                rounded-xl
                shadow-lg
                mb-14
                mx-auto
            "
        >
            {isVisible && <MoreInfo visible={isVisible} />}
        </motion.div>
    );
}
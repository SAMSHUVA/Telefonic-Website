import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
    const [counter, setCounter] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsExiting(true), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // Simulated loading for smoother experience

        return () => clearInterval(interval);
    }, []);

    const brand = "TELEFONIC";

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={isExiting ? { y: "-100%" } : { opacity: 1 }}
            transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.5 }}
            onAnimationComplete={() => isExiting && onComplete()}
            className="fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col items-center justify-center pointer-events-auto"
        >
            <div className="relative overflow-hidden mb-8">
                <div className="flex gap-[0.2em]">
                    {brand.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: i * 0.1,
                                ease: [0.33, 1, 0.68, 1]
                            }}
                            className="font-serif text-3xl md:text-5xl tracking-[0.2em] text-white"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-12 right-1/2 translate-x-1/2 md:translate-x-0 md:right-12 flex flex-col items-center md:items-end w-full md:w-auto">
                <span className="font-sans text-[10px] tracking-[0.5em] text-white/30 mb-2 uppercase">System Preflight</span>
                <span className="font-serif text-3xl md:text-6xl text-white/10 tabular-nums">
                    {counter.toString().padStart(3, '0')}%
                </span>
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: counter / 100 }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left"
            />
        </motion.div>
    );
}

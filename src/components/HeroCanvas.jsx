import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useCanvasVideo } from '../hooks/useCanvasVideo';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

export default function HeroCanvas({ scrollTrackRef, isLoaded }) {
    const canvasRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const textRef3 = useRef(null);
    const textRef4 = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const magneticContactRef = useMagnetic();

    // Use the hook to get the image drawing function
    const { drawFrame, isLoading, progress } = useCanvasVideo(canvasRef, 80, {
        imageFolder: "/frames/",
        imagePrefix: "frame (",
        imageExtension: ").jpg",
        usePadding: false
    });

    // EFFECT 1: INITIAL DRAW (Runs immediately and repeatedly during load)
    // Stops immediately once isLoaded is true to prevent conflict with ScrollTrigger.
    useEffect(() => {
        if (isLoaded) return;

        const drawInitial = () => {
            const fitMode = window.innerWidth < 768 ? 'contain' : 'cover';
            drawFrame(0, fitMode);
        };

        drawInitial();
        const interval = setInterval(drawInitial, 100);
        window.addEventListener('resize', drawInitial);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', drawInitial);
        };
    }, [drawFrame, isLoaded]);

    // EFFECT 2: SCROLL ANIMATION (Runs only when fully loaded)
    useEffect(() => {
        if (isLoading || !isLoaded) return;

        const getFitMode = () => window.innerWidth < 768 ? 'contain' : 'cover';
        drawFrame(0, getFitMode());

        const handleResize = () => {
            const st = ScrollTrigger.getById("hero-scroll");
            if (st) drawFrame(st.progress * 79, getFitMode());
        };
        window.addEventListener('resize', handleResize);

        // Guard against null refs before creating timeline and animations
        if (!textRef2.current || !scrollIndicatorRef.current || !textRef3.current || !textRef4.current) {
            // If refs are not ready, we still need to clean up the resize listener
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "hero-scroll",
                trigger: scrollTrackRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0,
                onUpdate: (self) => {
                    const frameIndex = Math.floor(self.progress * 79);
                    drawFrame(frameIndex, getFitMode());
                }
            }
        });

        // FORCE INITIAL DRAW & REFRESH
        const forceRefresh = () => {
            const st = ScrollTrigger.getById("hero-scroll");
            if (st) {
                drawFrame(st.progress * 79, getFitMode());
                ScrollTrigger.refresh();
            } else {
                drawFrame(0, getFitMode());
            }
        };

        forceRefresh();
        const timers = [
            setTimeout(forceRefresh, 100),
            setTimeout(forceRefresh, 500)
        ];

        // TEXT ANIMATIONS
        // Sync these to the timeline (0 to 1 progress of the container)
        // Scene 0: Scroll Down Indicator (0% - 10%)
        tl.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.05,
            ease: "power2.in"
        }, 0);

        // Scene 2: FINANCING PLANS (30% - 60%)
        tl.fromTo(textRef2.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, ease: 'power2.out', duration: 0.1 }, 0.3
        );
        tl.to(textRef2.current,
            { opacity: 0, x: -50, ease: 'power2.in', duration: 0.05 }, 0.55
        );

        // Scene 2.5: DEFINED BY EXCELLENCE (0.55 - 0.8)
        tl.fromTo(textRef4.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, ease: 'power2.out', duration: 0.1 }, 0.55
        );
        tl.to(textRef4.current,
            { opacity: 0, x: 50, ease: 'power2.in', duration: 0.05 }, 0.75
        );

        // Scene 3: YOU DESERVE IT (80% - 100%)
        tl.fromTo(textRef3.current,
            { opacity: 0, scale: 0.9, y: 50 },
            { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.1 }, 0.8
        );

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getById("hero-scroll")?.kill();
            tl.kill();
        };
    }, [isLoading, isLoaded, drawFrame, scrollTrackRef]);

    // PRELOADER HANDLING replaced with direct render
    // We allow the canvas to exist (opacity 0 or visible) behind the preloader
    // But we still overlay the black screen if strictly needed, or let App.jsx handle it.
    // Removing the early return block allows the canvas JSX below to render!

    return (
        <div className="relative w-full h-full bg-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-[90vh] md:h-full object-contain md:object-cover filter contrast-[1.15] saturate-[1.2] brightness-[1.05] md:contrast-[1.25]"
                style={{ objectPosition: 'center' }}
            />
            {/* Cinematic Vignette Overlay to add depth and clarity */}
            <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

            {/* Text Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">

                {/* Text 2: Bottom Left - Main Headline */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-start pb-40 md:pb-32 pl-6 md:pl-20 text-left overflow-x-clip w-full">
                    <div className="overflow-hidden py-2 max-w-[90vw] md:max-w-full">
                        <div ref={textRef2} style={{ opacity: 0 }}>
                            <motion.h1
                                initial={{ y: "110%" }}
                                animate={isLoaded ? { y: 0 } : { y: "110%" }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
                                className="font-serif text-[clamp(1.5rem,8vw,3.5rem)] text-white leading-[1.1] md:leading-none drop-shadow-2xl uppercase"
                            >
                                Premium<br />Tech &<br />Luxury.
                            </motion.h1>
                        </div>
                        <Link to="/contact">
                            <motion.button
                                ref={magneticContactRef}
                                initial={{ opacity: 0 }}
                                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 1, delay: 1.5 }}
                                className="hidden md:block mt-9 md:mt-8 px-6 md:px-8 py-1 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-sans tracking-widest uppercase text-[5px] md:text-xs hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-travel-white/20 pointer-events-auto"
                            >
                                Contact Us
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Text 4: Bottom Right - Defined by Excellence */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-end pb-40 md:pb-32 pr-6 md:pr-20 text-right overflow-x-clip w-full">
                    <div className="overflow-hidden py-2 max-w-[90vw] md:max-w-full">
                        <div ref={textRef4} style={{ opacity: 0 }}>
                            <motion.h1
                                initial={{ y: "110%" }}
                                animate={isLoaded ? { y: 0 } : { y: "110%" }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                                className="font-serif text-[clamp(1.5rem,8vw,3.5rem)] text-white leading-[1.1] md:leading-none drop-shadow-2xl uppercase"
                            >
                                Defined<br />by<br />Excellence.
                            </motion.h1>
                        </div>
                    </div>
                </div>

                {/* Text 3: Center - Elegance */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-15 md:pb-0 px-4 overflow-x-clip w-full">
                    <div className="overflow-hidden py-4 max-w-[90vw] md:max-w-full">
                        <div ref={textRef3} style={{ opacity: 0 }}>
                            <motion.h1
                                initial={{ y: "110%" }}
                                animate={isLoaded ? { y: 0 } : { y: "110%" }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
                                className="font-serif text-[clamp(2.5rem,4vw,5rem)] text-white text-center leading-[0.9] drop-shadow-2xl uppercase tracking-tighter"
                            >
                                ELEGANCE IN<br className="md:hidden" /> EVERY PIXEL
                            </motion.h1>
                        </div>
                    </div>
                </div>

                {/* Watermark Mask */}
                <div className="absolute bottom-0 right-0 md:bottom-0 md:right-0 z-40 pointer-events-none w-full md:w-auto flex justify-center md:block pb-6 md:pb-0">
                    <div className="bg-black/95 backdrop-blur-md px-4 py-2 border-l border-t border-white/10 shadow-2xl rounded-t-xl md:rounded-none">
                        <span className="font-sans text-[0.45rem] md:text-[0.55rem] text-white/50 tracking-[0.4em] uppercase whitespace-nowrap">
                            Est. 2020 — Telefonic Essentials
                        </span>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-12 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
                >
                    <span className="font-sans text-[0.65rem] text-white/80 tracking-[0.2em] md:tracking-[0.5em] uppercase font-medium whitespace-nowrap">
                        <span className="md:hidden">Scroll up to explore</span>
                        <span className="hidden md:inline">Scroll down to Explore</span>
                    </span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line" />
                    </div>
                </div>
            </div>
        </div>
    );
}

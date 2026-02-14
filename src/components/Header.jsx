import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReservationForm from './ReservationForm';
import MobileMenu from './MobileMenu';
import { useMagnetic } from '../hooks/useMagnetic';
import { supabase } from '../lib/supabaseClient';

export default function Header({ isLoaded }) {
    const [scrolled, setScrolled] = useState(false);
    const [showReserve, setShowReserve] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const magneticBuyRef = useMagnetic();
    const magneticMenuRef = useMagnetic();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Auth Listener
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Phones', path: '/phones' },
        { name: 'Watches', path: '/watches' },
        { name: 'Bags', path: '/bags' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
        { name: 'Support', path: '/support' }
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className={classNames(
                    "fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out glass-panel rounded-full flex items-center justify-between backdrop-blur-md border border-white/10",
                    {
                        "w-[98%] md:w-[95%] max-w-7xl py-3 md:py-4 px-4 md:px-8 bg-black/20": !scrolled,
                        "w-[90%] md:w-[80%] max-w-5xl py-2 md:py-3 px-4 md:px-6 bg-black/60": scrolled
                    }
                )}
            >
                <div className="flex items-center gap-6 md:gap-12 h-12">
                    <Link to="/" className="flex items-center group">
                        <span className={classNames(
                            "font-serif text-white uppercase whitespace-nowrap transition-all duration-500",
                            {
                                "text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.4em]": !scrolled,
                                "text-[9px] md:text-xs tracking-[0.15em] md:tracking-[0.2em]": scrolled
                            }
                        )}>
                            Telefonic Essentials
                        </span>
                    </Link>
                    <nav className={classNames(
                        "hidden lg:flex font-sans text-white/80 transition-all duration-500",
                        {
                            "gap-8 text-sm": !scrolled,
                            "gap-4 text-xs": scrolled
                        }
                    )}>
                        {navItems.map(item => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={classNames(
                                    "hover:text-white transition-colors uppercase tracking-wide relative group",
                                    {
                                        "text-white font-semibold": location.pathname === item.path,
                                        "text-xs": !scrolled,
                                        "text-[10px]": scrolled
                                    }
                                )}
                            >
                                {item.name}
                                {location.pathname === item.path && (
                                    <span className="absolute -bottom-1 left-0 w-full h-px bg-white"></span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hidden md:block text-white text-[10px] uppercase tracking-widest font-bold opacity-60 hover:opacity-100 transition-opacity"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden md:block text-white text-[10px] uppercase tracking-widest font-bold hover:text-travel-white transition-colors"
                        >
                            Login
                        </Link>
                    )}

                    {/* Desktop Buy Now */}
                    <motion.button
                        ref={magneticBuyRef}
                        onClick={() => setShowReserve(true)}
                        className="hidden md:block bg-white text-black px-6 py-2 rounded-full font-sans text-sm font-semibold hover:bg-travel-accent transition-colors border border-transparent"
                    >
                        Buy Now
                    </motion.button>

                    {/* Mobile Hamburger */}
                    <motion.button
                        ref={magneticMenuRef}
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
                    >
                        <span className="w-6 h-px bg-white block"></span>
                        <span className="w-6 h-px bg-white block"></span>
                    </motion.button>
                </div>
            </motion.header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navItems={navItems}
                onReserve={() => setShowReserve(true)}
            />

            <AnimatePresence>
                {showReserve && <ReservationForm onClose={() => setShowReserve(false)} />}
            </AnimatePresence>
        </>
    );
}

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ReservationForm from './ReservationForm';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [showReserve, setShowReserve] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Phones', path: '/private-jets' },
        { name: 'Watches', path: '/experiences' },
        { name: 'Bags', path: '/concierge' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
        { name: 'Support', path: '/support' }
    ];

    return (
        <>
            <header
                className={classNames(
                    "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out glass-panel rounded-full flex items-center justify-between backdrop-blur-md border border-white/10",
                    {
                        "w-[95%] max-w-7xl py-4 px-8 bg-black/20": !scrolled,
                        "w-[80%] max-w-5xl py-3 px-6 bg-black/60": scrolled
                    }
                )}
            >
                <div className="flex items-center gap-4 md:gap-12 relative h-12">
                    <div className="relative w-24 md:w-32 h-full">
                        <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 group">
                            <img
                                src="/logo.png"
                                alt="Telefonic Essentials Logo"
                                className="w-24 h-24 md:w-56 md:h-56 object-contain transition-all duration-300 pointer-events-none"
                                style={{ filter: 'brightness(0)' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </Link>
                    </div>
                    <nav className="hidden lg:flex gap-8 text-sm font-sans text-white/80">
                        {navItems.map(item => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={classNames(
                                    "hover:text-white transition-colors uppercase tracking-wide text-xs relative group",
                                    { "text-white font-semibold": location.pathname === item.path }
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
                    <Link to="/contact" className="hidden md:block text-white text-sm font-semibold hover:text-brand-gold transition-colors">Login</Link>
                    <button
                        onClick={() => setShowReserve(true)}
                        className="bg-white text-black px-6 py-2 rounded-full font-sans text-sm font-semibold hover:scale-105 transition-transform hover:bg-brand-gold hover:text-white"
                    >
                        Buy Now
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {showReserve && <ReservationForm onClose={() => setShowReserve(false)} />}
            </AnimatePresence>
        </>
    );
}

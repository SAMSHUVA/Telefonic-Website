import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';

export default function MobileMenu({ isOpen, onClose, navItems, onReserve }) {
    const magneticCloseRef = useMagnetic();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-[#0c0c0c]/95 backdrop-blur-xl border-l border-white/10 z-[70] md:hidden p-8 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-serif text-white text-xs tracking-[0.2em] uppercase">
                                Menu
                            </span>
                            <motion.button
                                ref={magneticCloseRef}
                                onClick={onClose}
                                aria-label="Close Menu"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Links */}
                        <nav className="flex flex-col gap-6 flex-1">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={onClose}
                                    className="group flex items-center gap-4"
                                >
                                    <span className="font-serif text-2xl text-white/50 group-hover:text-white transition-colors">
                                        0{index + 1}
                                    </span>
                                    <span className="font-sans text-3xl font-light text-white group-hover:pl-2 transition-all duration-300">
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Section */}
                        <div className="mt-auto pt-8 border-t border-white/10">
                            <button
                                onClick={() => {
                                    onClose();
                                    onReserve();
                                }}
                                className="w-full py-4 bg-white text-black font-sans text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Buy Now
                            </button>

                            <div className="mt-8 flex justify-center gap-6">
                                {/* Socials or extra links here if needed */}
                                <span className="font-sans text-[0.6rem] text-white/30 uppercase tracking-[0.2em]">
                                    © 2024 Telefonic
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

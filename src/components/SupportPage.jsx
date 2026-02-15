import { motion } from 'framer-motion';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-[#0c0c0c] text-white pt-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative h-[60vh] rounded-[40px] overflow-hidden mb-16">
                    <img
                        src="/phones/MGF44_AV2.jpg"
                        alt="Telefonic Support"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="font-serif text-6xl md:text-8xl mb-4 text-white drop-shadow-2xl uppercase"
                            >
                                Support
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="font-sans text-xl tracking-[0.3em] uppercase opacity-90"
                            >
                                Service Excellence
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {/* Order Tracking */}
                    <div className="bg-white/5 p-8 rounded-[30px] border border-white/10 hover:border-white/20 transition-all group">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-black transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-2xl mb-4 uppercase">Order Tracking</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
                            Monitor your premium delivery in real-time. Enter your order ID to see the current status of your shipment.
                        </p>
                        <a href="https://wa.me/919655206555" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
                            Track Order &rarr;
                        </a>
                    </div>

                    {/* Technical Support */}
                    <div className="bg-white/5 p-8 rounded-[30px] border border-white/10 hover:border-white/20 transition-all group">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-black transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-2xl mb-4 uppercase">Tech Help</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
                            Having trouble with your new device? Our specialists are ready to guide you through setup and troubleshooting.
                        </p>
                        <a href="https://wa.me/919655206555" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
                            Get Assistance &rarr;
                        </a>
                    </div>

                    {/* Warranty & Returns */}
                    <div className="bg-white/5 p-8 rounded-[30px] border border-white/10 hover:border-white/20 transition-all group">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-black transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-2xl mb-4 uppercase">Reliability</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
                            Every Telefonic Essential is backed by our comprehensive warranty. Learn more about our protection plans and returns.
                        </p>
                        <a href="https://wa.me/919655206555" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
                            Warranty Info &rarr;
                        </a>
                    </div>
                </div>

                {/* FAQ or Contact CTA */}
                <div className="bg-white text-black p-12 md:p-20 rounded-[40px] text-center mb-32">
                    <h2 className="font-serif text-4xl md:text-6xl mb-8 uppercase">Still need assistance?</h2>
                    <p className="font-sans text-lg opacity-60 mb-10 max-w-2xl mx-auto">
                        Our concierge team is available 24/7 to ensure your experience with Telefonic remains unparalleled.
                    </p>
                    <a href="https://wa.me/919655206555" target="_blank" rel="noopener noreferrer">
                        <button className="px-10 py-4 bg-black text-white rounded-full font-sans tracking-[0.2em] uppercase text-xs hover:bg-black/80 transition-all active:scale-95">
                            Chat on WhatsApp
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import ReservationForm from './ReservationForm';
import { supabase } from '../lib/supabaseClient';

export default function ServicePage({ title, subtitle, heroImage, description, category, features = [] }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalOffer, setGlobalOffer] = useState({ active: false, label: '' });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { scrollY } = useScroll();
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    useEffect(() => {
        if (category) {
            fetchCategoryProducts();
        }
    }, [category]);

    async function fetchCategoryProducts() {
        setLoading(true);

        // Fetch Settings for global offer
        const { data: settingsData } = await supabase
            .from('settings')
            .select('*')
            .eq('key', 'global_offer')
            .single();

        if (settingsData) setGlobalOffer(settingsData.value);

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .eq('is_active', true)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching category products:', error);
        } else {
            setProducts(data);
        }
        setLoading(false);
    }

    return (
        <section className="min-h-screen w-full bg-[#0c0c0c] text-white">
            {/* Parallax Hero */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <motion.div style={{ y: y2 }} className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt={title}
                        className="w-full h-[120%] object-cover opacity-60"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c0c]/20 to-[#0c0c0c]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-mono text-travel-white text-sm tracking-[0.3em] uppercase mb-4"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-none mb-8"
                    >
                        {title}
                    </motion.h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
                    <div>
                        <h2 className="font-serif text-4xl text-white mb-6">Unrivaled <span className="text-travel-white">Excellence.</span></h2>
                        <p className="text-white/60 font-sans leading-relaxed text-lg mb-8">
                            {description}
                        </p>

                        {features.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                                        <h3 className="font-serif text-lg mb-1 text-white">{feature.title}</h3>
                                        <p className="text-[10px] text-white/50 font-sans uppercase tracking-wide">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:sticky lg:top-32">
                        <div className="glass-panel p-8 rounded-[32px] border border-white/10">
                            <h3 className="font-serif text-2xl mb-4">Personalized Curation</h3>
                            <p className="text-white/40 text-sm mb-6 leading-relaxed">
                                Our collection represents the pinnacle of luxury and technical achievement. Each piece is hand-selected and verified by our experts.
                            </p>
                            <button
                                onClick={() => setSelectedProduct({ name: title, price: 0, category: category })}
                                className="w-full py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-travel-accent transition-colors"
                            >
                                General Inquiry
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {category && (
                    <div className="pb-20">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="font-serif text-3xl md:text-4xl text-white whitespace-nowrap">Current <span className="text-travel-white">Collection</span></h2>
                            <div className="h-px w-full bg-white/10"></div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedProduct(item)}
                                        className={`group relative rounded-[32px] overflow-hidden transition-all duration-700 hover:scale-[1.02] cursor-pointer shadow-2xl flex flex-col h-full
                                            ${item.is_dark ? 'bg-[#141414]' : 'bg-[#f5f5f5]'}
                                        `}
                                    >
                                        <div className="aspect-[4/5] w-full overflow-hidden">
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                            />
                                            {(item.offer_label || (globalOffer.active && globalOffer.label)) && (
                                                <div className="absolute top-6 left-6 z-20">
                                                    <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
                                                        {item.offer_label || globalOffer.label}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`p-6 flex flex-col justify-between flex-grow ${item.is_dark ? 'text-white' : 'text-black'}`}>
                                            <div>
                                                <h4 className="font-serif text-2xl mb-1">{item.name}</h4>
                                                <div className="flex items-baseline gap-2 mb-3">
                                                    <p className="font-mono tracking-wide text-sm font-bold">
                                                        ₹{item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className="font-sans text-xs opacity-60 leading-relaxed line-clamp-2">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                                                    ${item.is_dark ? 'border-white/20 group-hover:bg-white group-hover:text-black' : 'border-black/10 group-hover:bg-black group-hover:text-white'}
                                                `}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-white/40 font-mono text-sm uppercase tracking-widest bg-white/5 rounded-3xl border border-dashed border-white/10">
                                New items arriving shortly
                            </div>
                        )}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <ReservationForm
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

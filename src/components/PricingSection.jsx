import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ReservationForm from './ReservationForm';

export default function PricingSection() {
    const [products, setProducts] = useState([]);
    const [globalOffer, setGlobalOffer] = useState({ active: false, label: '' });
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const categories = [
        { name: "Smartphones", id: "phones" },
        { name: "Luxury Timepieces", id: "watches" },
        { name: "Bespoke Leather Bags", id: "bags" }
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        // Fetch Settings
        const { data: settingsData } = await supabase
            .from('settings')
            .select('*')
            .eq('key', 'global_offer')
            .single();

        if (settingsData) setGlobalOffer(settingsData.value);

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
        }
        setLoading(false);
    }

    const getItemsByCategory = (categoryId) => {
        return products.filter(p => p.category === categoryId);
    };

    return (
        <section className="relative z-10 w-full bg-[#0c0c0c] py-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-white text-5xl md:text-7xl mb-12 text-center tracking-tight">Exclusive Catalog</h2>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                ) : (
                    categories.map((category) => {
                        const items = getItemsByCategory(category.id);
                        if (items.length === 0) return null;

                        return (
                            <div key={category.id} className="mb-24 last:mb-0">
                                <div className="flex items-baseline gap-4 mb-10 border-b border-white/10 pb-4">
                                    <h3 className="font-serif text-white text-3xl md:text-4xl uppercase tracking-widest">{category.name}</h3>
                                    <div className="h-px flex-grow bg-white/10"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {items.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            onClick={() => setSelectedProduct(item)}
                                            className={`group relative rounded-[32px] overflow-hidden transition-all duration-700 hover:scale-[1.02] cursor-pointer shadow-2xl flex flex-col h-full
                                                ${item.is_dark ? 'bg-[#141414]' : 'bg-[#f5f5f5]'}
                                                ${item.is_accent ? 'border border-travel-accent/30' : ''}
                                            `}
                                        >
                                            {/* Base Image */}
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

                                            {/* Content */}
                                            <div className={`p-6 flex flex-col justify-between flex-grow ${item.is_dark ? 'text-white' : 'text-black'}`}>
                                                <div>
                                                    <h4 className="font-serif text-2xl mb-1">{item.name}</h4>
                                                    <div className="flex items-baseline gap-2 mb-3">
                                                        <p className={`font-mono tracking-wide text-sm font-bold ${item.is_accent ? 'text-travel-accent' : ''}`}>
                                                            ₹{item.price.toLocaleString()}
                                                        </p>
                                                        {item.mrp && item.mrp > item.price && (
                                                            <p className="font-mono text-[10px] opacity-40 line-through">
                                                                ₹{item.mrp.toLocaleString()}
                                                            </p>
                                                        )}
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
                            </div>
                        );
                    })
                )}
            </div>

            {selectedProduct && (
                <ReservationForm
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
}

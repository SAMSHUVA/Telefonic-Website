import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * ReservationForm (Version 4.0)
 * Now accepts a dynamic 'product' object from the database.
 */
export default function ReservationForm({ product, onClose }) {
    // Map database fields to display fields
    const displayInfo = {
        title: product?.name || "Secure Your Device",
        price: product?.price ? `₹${product.price.toLocaleString()}` : "Tailored Tech",
        image: product?.image_url || "/phones/iphone_17pro__0s6piftg70ym_large.jpg",
        offer: product?.offer_label || ""
    };

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkUser();
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        model: displayInfo.title,
        quantity: '1 Device',
        deliveryDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const offerLine = displayInfo.offer ? `%0A*Offer:* ${displayInfo.offer}` : "";
        const message = `*New Order Reservation (Telefonic)*%0A%0A` +
            `*Product:* ${displayInfo.title}%0A` +
            `*Price:* ${displayInfo.price}${offerLine}%0A%0A` +
            `*Customer Details:*%0A` +
            `- Name: ${formData.firstName} ${formData.lastName}%0A` +
            `- Phone: ${formData.phone}%0A` +
            `- Email: ${formData.email}%0A` +
            `- Quantity: ${formData.quantity}%0A` +
            `- Target Delivery: ${formData.deliveryDate || 'Not specified'}`;

        const whatsappUrl = `https://wa.me/919655206555?text=${message}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-[95%] md:w-full md:max-w-lg bg-[#111] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header Image */}
                <div className="h-28 md:h-40 w-full relative">
                    <img
                        src={displayInfo.image}
                        alt={displayInfo.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                    <button
                        onClick={onClose}
                        aria-label="Close Reservation Form"
                        className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                        ✕
                    </button>
                    <div className="absolute bottom-3 left-4 md:bottom-4 md:left-6">
                        <h3 className="font-serif text-2xl md:text-3xl text-white">{displayInfo.title}</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-travel-accent text-xs md:text-sm font-mono uppercase tracking-widest">{displayInfo.price}</p>
                            {displayInfo.offer && (
                                <span className="text-[8px] bg-white text-black px-1.5 py-0.5 rounded font-bold uppercase">{displayInfo.offer}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Overlay based on Auth State */}
                {!user ? (
                    <div className="p-8 md:p-12 text-center space-y-6">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-60">
                                <path d="M12 15V17M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4 className="font-serif text-2xl text-white">Exclusive Access Only</h4>
                        <p className="text-white/40 text-sm leading-relaxed max-w-[280px] mx-auto">
                            To ensure the highest level of service, reservations are reserved for our registered members.
                        </p>
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/login');
                            }}
                            aria-label="Sign In to Reserve"
                            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-travel-accent transition-all"
                        >
                            Sign In to Reserve
                        </button>
                        <p className="text-[10px] text-white/20 uppercase tracking-widest"> Joining takes less than 30 seconds </p>
                    </div>
                ) : (
                    /* Form Fields */
                    <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-3 md:space-y-6">
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1 md:space-y-2">
                                <label className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">First Name</label>
                                <input
                                    required
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white/40 transition-colors"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-1 md:space-y-2">
                                <label className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">Last Name</label>
                                <input
                                    required
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white/40 transition-colors"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 md:space-y-2">
                            <label className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">Email Address</label>
                            <input
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white/40 transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-1 md:space-y-2">
                            <label className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">Phone Number</label>
                            <input
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white/40 transition-colors"
                                placeholder="+91 00000 00000"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1 md:space-y-2">
                                <label className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">Quantity</label>
                                <select
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white/40 transition-colors"
                                >
                                    <option>1 Device</option>
                                    <option>2 Devices</option>
                                    <option>3-5 Devices</option>
                                    <option>Bulk Order (5+)</option>
                                </select>
                            </div>
                            <div className="space-y-1 md:space-y-2">
                                <label className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">Delivery Target</label>
                                <input
                                    name="deliveryDate"
                                    value={formData.deliveryDate}
                                    onChange={handleChange}
                                    type="date"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white/80 focus:outline-none focus:border-white/40 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="pt-2 md:pt-4">
                            <button
                                type="submit"
                                className="w-full py-3 md:py-4 bg-white text-black font-sans font-bold uppercase tracking-widest rounded-lg hover:bg-white/90 active:scale-[0.98] transition-all duration-300 text-sm md:text-base shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                Confirm Reservation
                            </button>
                            <p className="text-center text-white/40 text-[10px] mt-2 md:mt-3 uppercase tracking-wider">
                                Order finalized via Secure WhatsApp Channel.
                            </p>
                        </div>
                    </form>
                )}
            </motion.div>
        </motion.div>
    );
}

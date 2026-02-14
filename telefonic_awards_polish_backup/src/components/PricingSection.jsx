export default function PricingSection() {
    const cards = [
        {
            title: "iPhone 16 Pro",
            price: "From $999",
            description: "The ultimate iPhone. Built for Apple Intelligence and professional-grade photography.",
            image: "https://images.unsplash.com/photo-1727282035222-26cb91e0a299?q=80&w=2670&auto=format&fit=crop",
            dark: false
        },
        {
            title: "Grand Tech Watch",
            price: "From $2,500",
            description: "Precision-engineered Swiss movements meeting next-gen connectivity.",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop",
            dark: true
        },
        {
            title: "Premium Leather",
            price: "Inquire for Bespoke",
            description: "Handcrafted accessories for your most valuable technology.",
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2670&auto=format&fit=crop",
            dark: false,
            accent: true
        }
    ];

    return (
        <section className="relative z-10 w-full bg-[#0c0c0c] py-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-white text-5xl md:text-7xl mb-6 text-center">Exclusive Tech</h2>
                <p className="text-white/60 text-center max-w-2xl mx-auto mb-20 font-sans text-lg">
                    Discover our collection of world-class technology and luxury goods, curated for the modern elite.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[80vh]">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`group relative rounded-[40px] overflow-hidden transition-all duration-700 hover:scale-[1.02] cursor-pointer shadow-2xl
                                ${card.dark ? 'bg-[#1a1a1a]' : 'bg-white'}
                                ${card.accent ? 'border border-brand-gold/30' : ''}
                            `}
                        >
                            {/* Base Image */}
                            <div className="h-[60%] w-full overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className={`p-8 h-[40%] flex flex-col justify-between ${card.dark ? 'text-white' : 'text-black'}`}>
                                <div>
                                    <h3 className="font-serif text-3xl mb-3">{card.title}</h3>
                                    <p className={`font-sans tracking-wide text-sm opacity-80 mb-4 ${card.accent ? 'text-brand-gold' : ''}`}>
                                        {card.price}
                                    </p>
                                    <p className="font-sans text-sm opacity-60 leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300
                                        ${card.dark ? 'border-white/20 group-hover:bg-white group-hover:text-black' : 'border-black/10 group-hover:bg-black group-hover:text-white'}
                                    `}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

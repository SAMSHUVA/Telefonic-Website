import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function LegalPage({ title, lastUpdated, sections }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16 border-b border-white/10 pb-8">
                    <h1 className="font-serif text-5xl md:text-7xl mb-4 text-white">{title}</h1>
                    <p className="font-mono text-xs uppercase tracking-widest opacity-40">Last Updated: {lastUpdated}</p>
                </div>

                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="font-serif text-2xl mb-4 text-white/90">{section.title}</h2>
                            <div className="space-y-4 font-sans text-lg opacity-70 leading-relaxed">
                                {section.content.map((paragraph, pIndex) => (
                                    <p key={pIndex}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 text-center">
                    <p className="font-sans text-sm opacity-40">
                        &copy; {new Date().getFullYear()} Telefonic Essentials. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

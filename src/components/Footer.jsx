import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative w-full bg-black text-white pt-32 pb-10 px-6 md:px-12 border-t border-white/10">
            <div className="max-w-[1920px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-40">
                    {/* SERVICES */}
                    <div>
                        <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] text-white/40 mb-8 uppercase">Services</h4>
                        <ul className="space-y-4 font-sans text-sm text-white/80">
                            <li><Link to="/private-jets" className="hover:text-white cursor-pointer transition-colors">iPhones</Link></li>
                            <li><Link to="/villas" className="hover:text-white cursor-pointer transition-colors">Smartphones</Link></li>
                            <li><Link to="/experiences" className="hover:text-white cursor-pointer transition-colors">Watches</Link></li>
                            <li><Link to="/concierge" className="hover:text-white cursor-pointer transition-colors">Bags</Link></li>
                        </ul>
                    </div>

                    {/* GET IN TOUCH */}
                    <div>
                        <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] text-white/40 mb-8 uppercase">Get in Touch</h4>
                        <ul className="space-y-4 font-sans text-sm text-white/80">
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li className="text-white/60">
                                159/347 TH Road (opp our lady school)<br />
                                Kaladipet, Thiruvottiyur,<br />
                                Chennai, India 600019
                            </li>
                            <li className="text-white/60">+91 96552 06555</li>
                        </ul>
                    </div>

                    {/* CONNECT */}
                    <div>
                        <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] text-white/40 mb-8 uppercase">Connect</h4>
                        <ul className="space-y-4 font-sans text-sm text-white/80">
                            <li><a href="https://www.instagram.com/telefonic_essentials_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                            <li className="hover:text-white cursor-pointer">LinkedIn</li>
                            <li className="hover:text-white cursor-pointer">Twitter</li>
                        </ul>
                    </div>

                    {/* PAY SAFELY */}
                    <div>
                        <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] text-white/40 mb-8 uppercase">Pay Safely</h4>
                        <div className="flex gap-2">
                            <div className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-sm">VISA</div>
                            <div className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-sm">MC</div>
                            <div className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-sm">AMEX</div>
                            <div className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-sm">PAYPAL</div>
                        </div>
                    </div>
                </div>

                {/* BIG FOOTER TEXT */}
                <div className="w-full overflow-hidden border-t border-white/10 pt-20 pb-8 flex flex-col items-center">
                    <h1 className="font-serif text-[clamp(2rem,7.5vw,12rem)] leading-none text-center tracking-tighter text-white opacity-90 select-none uppercase whitespace-nowrap px-4">
                        TELEFONIC ESSENTIALS
                    </h1>
                </div>

                {/* BOTTOM UTILS */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-[10px] text-white/40 font-sans uppercase tracking-widest">
                    <p>© 2026 Telefonic Essentials. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white">Terms</span>
                        <span className="cursor-pointer hover:text-white">Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

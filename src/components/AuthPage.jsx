import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if already logged in
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) navigate('/');
        };
        checkUser();
    }, [navigate]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                navigate(-1); // Go back to where they were
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/login`
                    }
                });
                if (error) throw error;
                setMessage('Check your email for the confirmation link!');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}`
                }
            });
            if (error) throw error;
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-travel-accent/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass-panel p-8 md:p-12 rounded-[40px] border border-white/10 z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl text-white mb-2">Telefonic <span className="text-travel-white">Membership</span></h1>
                    <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Access the Exclusive Collection</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/60 ml-4">Email Address</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/60 ml-4">Password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {message && (
                        <p className={`text-xs text-center ${message.includes('Check') ? 'text-green-400' : 'text-red-400'}`}>
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-travel-accent transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                    <div className="h-px flex-grow bg-white/10"></div>
                    <span className="text-[10px] text-white/20 uppercase tracking-widest whitespace-nowrap">Or continue with</span>
                    <div className="h-px flex-grow bg-white/10"></div>
                </div>

                {/* Social Login Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleSocialLogin('google')}
                        className="flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
                        <span className="text-[10px] font-bold text-white uppercase">Google</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('apple')}
                        className="flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-4 h-4 invert" alt="Apple" />
                        <span className="text-[10px] font-bold text-white uppercase">Apple</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('facebook')}
                        className="flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <img src="https://www.svgrepo.com/show/506482/facebook.svg" className="w-4 h-4" alt="Facebook" />
                        <span className="text-[10px] font-bold text-white uppercase">Facebook</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('instagram')}
                        className="flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <img src="https://www.svgrepo.com/show/521711/instagram.svg" className="w-4 h-4 invert" alt="Instagram" />
                        <span className="text-[10px] font-bold text-white uppercase">Instagram</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[10px] text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

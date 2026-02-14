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
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-[10px] font-bold text-white uppercase">Google</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('apple')}
                        className="flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.96.95-2.04 1.78-3.1 1.78s-1.35-.61-2.55-.61c-1.21 0-1.57.61-2.55.61s-2.06-.76-3.14-1.87c-2.31-2.37-3.96-6.83-1.58-10.87.96-1.63 2.61-2.66 4.41-2.66 1.37 0 2.44.82 3.19.82.74 0 2.05-.98 3.61-.82 1.4.1 2.39.69 2.94 1.31-2.69 1.61-2.25 5.25.43 6.35-.6 1.54-1.37 3.01-2.51 4.15zM12.03 6.3c-.06-3.32 2.72-5.91 5.48-6.3.31 3.25-2.73 6.12-5.48 6.3z" />
                        </svg>
                        <span className="text-[10px] font-bold text-white uppercase">Apple</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('facebook')}
                        className="flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="text-[10px] font-bold text-white uppercase">Facebook</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('instagram')}
                        className="flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
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

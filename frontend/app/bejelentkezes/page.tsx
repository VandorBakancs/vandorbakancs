"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mountain, Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email.trim(), 
                    password: formData.password  
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log('Sikeres belépés!', data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                if (data.user.role === 'admin') {
                    window.location.href = '/admin'; 
                } else {
                    window.location.href = '/'; 
                }
            } else {
                setError(data.error || 'Helytelen adatok!');
            }
        } catch (err) {
            console.error('Hiba a kérés során:', err);
            setError('A szerver nem válaszol! Indítsd el a backendet az 5000-es porton.');
        } finally {
            setLoading(false);
        }
    };

    return (
        //sötét módban a képernyő hattere sötétszürke lesz (dark:bg-zinc-900)
        <div className="min-h-screen bg-[#f0fdf4] dark:bg-zinc-900 flex items-center justify-center p-6 transition-colors duration-300">
            <div className="bg-white dark:bg-zinc-800 w-full max-w-md p-10 rounded-[3.5rem] shadow-2xl border border-green-50 dark:border-zinc-700 transition-colors duration-300">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-green-50 dark:bg-zinc-700 rounded-3xl text-green-600 dark:text-green-400 mb-4 transition-colors">
                        <Mountain size={48}/>
                    </div>
                    <h1 className="text-3xl font-black text-green-900 dark:text-white uppercase italic">Bejelentkezés</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <p className="text-red-500 font-bold bg-red-50 dark:bg-red-900/30 p-3 rounded-2xl text-center text-sm">
                            {error}
                        </p>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-5 text-green-600 dark:text-green-400" size={20}/>
                        <input 
                            type="email" 
                            placeholder="Email cím" 
                            required
                            className="w-full p-5 pl-12 rounded-2xl bg-green-50 dark:bg-zinc-700 border-none outline-none font-bold text-gray-900 dark:text-white placeholder:text-green-800/40 dark:placeholder:text-gray-400 transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-5 text-green-600 dark:text-green-400" size={20}/>
                        <input 
                            type="password" 
                            placeholder="Jelszó" 
                            required
                            className="w-full p-5 pl-12 rounded-2xl bg-green-50 dark:bg-zinc-700 border-none outline-none font-bold text-gray-900 dark:text-white placeholder:text-green-800/40 dark:placeholder:text-gray-400 transition-colors"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'} text-white p-5 rounded-2xl font-black uppercase shadow-lg transition-all flex items-center justify-center gap-2`}
                    >
                        {loading ? 'Folyamatban...' : (
                            <>Belépés <LogIn size={20} /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-green-800/40 dark:text-gray-400 font-bold text-sm">
                        Még nincs fiókod? <Link href="/regisztracio" className="text-green-600 dark:text-green-400 underline">Hozz létre egyet!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
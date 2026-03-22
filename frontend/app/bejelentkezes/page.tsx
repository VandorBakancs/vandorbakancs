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
            // A backend a 3000-es porton fut
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,      
                    password: formData.password  
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log('Sikeres belépés!', data.user);
                
                // Felhasználó mentése 
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Átirányítás az admin felületre
                router.push('/admin'); 
            } else {
                setError(data.error || 'Helytelen adatok!');
            }
        } catch (err) {
            console.error('Hiba a kérés során:', err);
            setError('A szerver nem válaszol! Indítsd el a backendet a 3000-es porton.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md p-10 rounded-[3.5rem] shadow-2xl border border-green-50">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-green-50 rounded-3xl text-green-600 mb-4">
                        <Mountain size={48}/>
                    </div>
                    <h1 className="text-3xl font-black text-green-900 uppercase italic">Bejelentkezés</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <p className="text-red-500 font-bold bg-red-50 p-3 rounded-2xl text-center text-sm">
                            {error}
                        </p>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-5 text-green-600" size={20}/>
                        <input 
                            type="email" 
                            placeholder="Email cím" 
                            required
                            className="w-full p-5 pl-12 rounded-2xl bg-green-50 border-none outline-none font-bold text-gray-900 placeholder:text-green-800/40"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-5 text-green-600" size={20}/>
                        <input 
                            type="password" 
                            placeholder="Jelszó" 
                            required
                            className="w-full p-5 pl-12 rounded-2xl bg-green-50 border-none outline-none font-bold text-gray-900 placeholder:text-green-800/40"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white p-5 rounded-2xl font-black uppercase shadow-lg transition-all flex items-center justify-center gap-2`}
                    >
                        {loading ? 'Folyamatban...' : (
                            <>Belépés <LogIn size={20} /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-green-800/40 font-bold text-sm">
                        Még nincs fiókod? <Link href="/regisztracio" className="text-green-600 underline">Hozz létre egyet!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
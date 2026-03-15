"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mountain, Mail, Lock, User, UserPlus } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ nev: '', email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) { router.push('/bejelentkezes'); }
            else { setError("Hiba a regisztráció során."); }
        } catch (e) { setError("Szerver hiba."); }
    };

    return (
        <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md p-10 rounded-[3.5rem] shadow-2xl border border-green-50">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-green-50 rounded-3xl text-green-600 mb-4"><Mountain size={48}/></div>
                    <h1 className="text-3xl font-black text-green-900 uppercase italic">Csatlakozz</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 font-bold bg-red-50 p-3 rounded-2xl text-center text-sm">{error}</p>}
                    <div className="relative">
                        <User className="absolute left-4 top-5 text-green-600" size={20}/>
                        <input 
                            type="text" placeholder="Teljes név" required
                            className="w-full p-5 pl-12 rounded-2xl bg-green-50 border-none outline-none font-bold text-gray-900 placeholder:text-green-800/40"
                            onChange={(e) => setFormData({...formData, nev: e.target.value})}
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-5 text-green-600" size={20}/>
                        <input 
                            type="email" placeholder="Email cím" required
                            className="w-full p-5 pl-12 rounded-2xl bg-green-50 border-none outline-none font-bold text-gray-900 placeholder:text-green-800/40"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-5 text-green-600" size={20}/>
                        <input 
                            type="password" placeholder="Jelszó" required
                            className="w-full p-5 pl-12 rounded-2xl bg-green-50 border-none outline-none font-bold text-gray-900 placeholder:text-green-800/40"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white p-5 rounded-2xl font-black uppercase shadow-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                        Regisztráció <UserPlus size={20} />
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-green-800/40 font-bold text-sm">Van már fiókod? <Link href="/bejelentkezes" className="text-green-600 underline">Lépj be!</Link></p>
                </div>
            </div>
        </div>
    );
}
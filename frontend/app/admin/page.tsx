"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mountain, Trash2, LogOut, Plus, MapPin, X } from 'lucide-react';

interface User {
    nev: string;
    role: string;
}

export default function AdminPage() {
    const [turak, setTurak] = useState<any[]>([]); 
    const [user, setUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [newTura, setNewTura] = useState({ nev: '', helyszin: '' });
    const router = useRouter();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (!loggedInUser || loggedInUser.role !== 'admin') {
            router.push('/bejelentkezes');
        } else {
            setUser(loggedInUser);
            fetchTurak();
        }
    }, [router]);

    const fetchTurak = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/turak');
        const result = await res.json();
        if (result.success) {
            setTurak(result.data); // Fontos: a 'result.data'-ban van a tömb!
}
    } catch (e) {
        console.error("Hiba a lekérésnél", e);
    }
};

// Törlés hívása is változik kicsit:
const deleteTura = async (id: number) => {
    if (confirm("Biztosan törlöd?")) {
        const res = await fetch(`http://localhost:5000/api/turak/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) fetchTurak();
    }
};

    if (!user) return <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center font-black text-green-800 uppercase italic text-2xl">Betöltés...</div>;

    return (
        <div className="min-h-screen bg-[#f0fdf4] p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-green-50 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-50 rounded-3xl text-green-600"><Mountain size={32}/></div>
                        <div>
                            <h1 className="text-2xl font-black text-green-900 uppercase italic leading-none">Admin Felület</h1>
                            <p className="text-green-800/40 font-bold text-sm italic">Szia, {user.nev}!</p>
                        </div>
                    </div>
                    <button onClick={() => { localStorage.removeItem('user'); router.push('/bejelentkezes'); }} className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all flex items-center gap-2 font-bold">
                        Kijelentkezés <LogOut size={20}/>
                    </button>
                </div>

                <div className="bg-white rounded-[3.5rem] shadow-2xl border border-green-50 overflow-hidden">
                    <div className="p-8 bg-green-50/30 border-b border-green-50 font-black text-green-900 uppercase italic flex items-center justify-between">
                        <span className="flex items-center gap-2"><MapPin size={20} className="text-green-600"/> Túrák listája</span>
                        <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-1 hover:bg-green-700 transition-all">
                            <Plus size={16}/> Új hozzáadása
                        </button>
                    </div>
                    <div className="p-6">
                        {turak.map((t) => (
                            <div key={t.id} className="flex items-center justify-between p-5 mb-3 bg-green-50/40 rounded-3xl hover:bg-green-50 transition-all">
                                <div>
                                    <div className="font-black text-gray-900 uppercase italic">{t.nev}</div>
                                    <div className="text-green-700/60 font-bold text-sm">{t.helyszin}</div>
                                </div>
                                <button className="p-3 bg-white text-red-500 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={18}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal marad az előző verzióból... */}
        </div>
    );
}
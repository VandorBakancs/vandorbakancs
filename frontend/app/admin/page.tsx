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
    
    // Itt hozzáadtuk az idotartam és nehezseg mezőket a statebe
    const [newTura, setNewTura] = useState({ nev: '', helyszin: '', idotartam: '', nehezseg: '' });
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
                setTurak(result.data);
            }
        } catch (e) {
            console.error("Hiba a lekérésnél", e);
        }
    };

    const addTura = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/turak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTura) // ez most már elküldi a 4 adatot
            });
            const result = await res.json();
            if (result.success) {
                setShowModal(false);
                // Mentés után lenullázzuk a mezőket
                setNewTura({ nev: '', helyszin: '', idotartam: '', nehezseg: '' });
                fetchTurak();
            }
        } catch (e) {
            console.error("Hiba a hozzáadásnál", e);
        }
    };

    const deleteTura = async (id: number) => {
        if (confirm("Biztosan törlöd a túrát?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/turak/${id}`, { method: 'DELETE' });
                const result = await res.json();
                if (result.success) fetchTurak();
            } catch (e) {
                console.error("Hiba a törlésnél", e);
            }
        }
    };

    if (!user) return <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center font-black text-green-800 uppercase italic text-2xl">Betöltés...</div>;

    return (
        <div className="min-h-screen bg-[#f0fdf4] p-6 md:p-12 relative">
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
                        {turak.length === 0 ? (
                            <p className="text-center font-bold text-gray-400 italic">Nincsenek túrák.</p>
                        ) : (
                            turak.map((t) => (
                                <div key={t.id} className="flex items-center justify-between p-5 mb-3 bg-green-50/40 rounded-3xl hover:bg-green-50 transition-all">
                                    <div>
                                        <div className="font-black text-gray-900 uppercase italic">{t.nev}</div>
                                        <div className="text-green-700/60 font-bold text-sm">{t.helyszin}</div>
                                    </div>
                                    <button 
                                        onClick={() => deleteTura(t.id)} 
                                        className="p-3 bg-white text-red-500 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL - ÚJ TÚRA HOZZÁADÁSA */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-[3rem] w-full max-w-md shadow-2xl border border-green-50">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-green-900 uppercase italic">Új túra létrehozása</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24}/>
                            </button>
                        </div>
                        <form onSubmit={addTura} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Túra neve</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={newTura.nev}
                                    onChange={(e) => setNewTura({ ...newTura, nev: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-green-500 font-bold"
                                    placeholder="Pl. Kéktúra"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Helyszín</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={newTura.helyszin}
                                    onChange={(e) => setNewTura({ ...newTura, helyszin: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-green-500 font-bold"
                                    placeholder="Pl. Bükk"
                                />
                            </div>

                            {/*beviteli mezők! */}
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Időtartam</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={newTura.idotartam}
                                        onChange={(e) => setNewTura({ ...newTura, idotartam: e.target.value })}
                                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-green-500 font-bold"
                                        placeholder="Pl. 4 óra"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nehézség</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={newTura.nehezseg}
                                        onChange={(e) => setNewTura({ ...newTura, nehezseg: e.target.value })}
                                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-green-500 font-bold"
                                        placeholder="Pl. Közepes"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-green-600 text-white p-4 rounded-2xl font-black uppercase italic hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                                <Plus size={20}/> Mentés
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
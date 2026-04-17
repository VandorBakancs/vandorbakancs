"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mountain, Trash2, LogOut, Plus, MapPin, X, MessageSquare, MessageCircle, Camera } from 'lucide-react';

interface User {
    nev: string;
    role: string;
}

export default function AdminPage() {
    const [turak, setTurak] = useState<any[]>([]); 
    const [temak, setTemak] = useState<any[]>([]); 
    const [valasztottTemaKommentjei, setValasztottTemaKommentjei] = useState<any[]>([]); 
    const [aktivTemaId, setAktivTemaId] = useState<number | null>(null); 
    const [kepek, setKepek] = useState<any[]>([]);

    const [user, setUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [newTura, setNewTura] = useState({ nev: '', helyszin: '', idotartam: '', nehezseg: '' });
    const router = useRouter();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (!loggedInUser || loggedInUser.role !== 'admin') {
            router.push('/bejelentkezes');
        } else {
            setUser(loggedInUser);
            fetchTurak();
            fetchTemak(); 
            fetchKepek(); 
        }
    }, [router]);

    // --- ADATOK LEKÉRÉSE ---

    const fetchTurak = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/turak`);
            if (!res.ok) return console.error("Hiba a túrák lekérésekor");
            const result = await res.json();
            if (result.success) setTurak(result.data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchTemak = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/temak`);
            if (!res.ok) return console.error("Hiba a témák lekérésekor");
            const result = await res.json();
            if (result.success) setTemak(result.data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchKommentek = async (temaId: number) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/kommentek/${temaId}`);
            if (!res.ok) return console.error("Hiba a kommentek lekérésekor");
            const result = await res.json();
            if (result.success) {
                setValasztottTemaKommentjei(result.data);
                setAktivTemaId(temaId);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchKepek = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galeria`);
            if (!res.ok) return console.error("Hiba a galéria lekérésekor");
            const result = await res.json();
            if (result.success) setKepek(result.data);
        } catch (e) {
            console.error(e);
        }
    };

    // --- TÖRLÉSI FUNKCIÓK ---

    const deleteTura = async (id: number) => {
        if (confirm("Biztosan törlöd a túrát?")) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/turak/${id}`, { method: 'DELETE' });
                if (!res.ok) return alert("Szerver hiba történt törléskor!");
                const result = await res.json();
                if (result.success) fetchTurak();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const deleteTema = async (id: number) => {
        if (confirm("Biztosan törlöd?")) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/temak/${id}`, { method: 'DELETE' });
                if (!res.ok) return alert("Szerver hiba történt törléskor!");
                const result = await res.json();
                if (result.success) {
                    fetchTemak();
                    setAktivTemaId(null);
                    setValasztottTemaKommentjei([]);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    const deleteKomment = async (kommentId: number) => {
        if (confirm("Biztosan törlöd?")) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/kommentek/${kommentId}`, { method: 'DELETE' });
                if (!res.ok) return alert("Szerver hiba történt törléskor!");
                const result = await res.json();
                if (result.success && aktivTemaId) fetchKommentek(aktivTemaId);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const deleteKep = async (kepId: number) => {
        if (confirm("Biztosan törlöd ezt a képet? A fájl is véglegesen törlődik a szerverről!")) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galeria/${kepId}`, { method: 'DELETE' });
                if (!res.ok) return alert("Szerver hiba: Lehet, hogy nem fut a backend?");
                const result = await res.json();
                if (result.success) {
                    fetchKepek(); 
                } else {
                    alert("Hiba: " + result.error);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    // --- HOZZÁADÁS ---

    const addTura = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/turak`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTura)
            });
            if (!res.ok) return alert("Szerver hiba mentéskor!");
            const result = await res.json();
            if (result.success) {
                setShowModal(false);
                setNewTura({ nev: '', helyszin: '', idotartam: '', nehezseg: '' });
                fetchTurak();
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!user) return <div className="min-h-screen bg-background flex items-center justify-center font-black text-green-800 dark:text-green-500 uppercase italic text-2xl transition-colors duration-300">Betöltés...</div>;

    return (
        <div className="min-h-screen bg-background p-6 md:p-12 relative transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* FEJLÉC */}
                <div className="bg-card p-8 rounded-[3rem] shadow-xl border border-card-border flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-3xl text-green-600 dark:text-green-500"><Mountain size={32}/></div>
                        <div>
                            <h1 className="text-2xl font-black text-green-900 dark:text-green-400 uppercase italic leading-none">Admin Felület</h1>
                        </div>
                    </div>
                    <button onClick={() => { localStorage.removeItem('user'); router.push('/bejelentkezes'); }} className="p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-all flex items-center gap-2 font-bold">
                        Kijelentkezés <LogOut size={20}/>
                    </button>
                </div>

                {/* --- 🖼️ KÉPEK / GALÉRIA SZEKCIÓ --- */}
                <div className="bg-card rounded-[3.5rem] shadow-2xl border border-card-border overflow-hidden transition-colors duration-300">
                    <div className="p-8 bg-green-50/30 dark:bg-neutral-800/50 border-b border-card-border font-black text-green-900 dark:text-green-400 uppercase italic flex items-center justify-between">
                        <span className="flex items-center gap-2"><Camera size={20} className="text-green-600 dark:text-green-500"/> Galéria Moderálása</span>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {kepek.length === 0 ? (
                            <p className="col-span-full text-center font-bold text-gray-400 dark:text-neutral-500 italic">Nincsenek feltöltött képek.</p>
                        ) : (
                            kepek.map((k) => (
                                <div key={k.id} className="flex items-center gap-4 p-4 bg-green-50/40 dark:bg-neutral-800 rounded-3xl hover:bg-green-50 dark:hover:bg-neutral-700 transition-all">
                                    <img 
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${k.kep_url}`} 
                                        alt={k.turaNev} 
                                        className="w-16 h-16 object-cover rounded-2xl border-2 border-green-200 dark:border-neutral-600 shadow-sm"
                                    />
                                    <div className="flex-1 overflow-hidden">
                                        <div className="font-bold text-sm text-foreground truncate">{k.feltolto}</div>
                                        <div className="text-xs text-green-700/60 dark:text-green-500/60 truncate">{k.turaNev}</div>
                                    </div>
                                    <button onClick={() => deleteKep(k.id)} className="p-3 bg-card text-red-500 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all shrink-0">
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- 🏔️ TÚRÁK SZEKCIÓ --- */}
                <div className="bg-card rounded-[3.5rem] shadow-2xl border border-card-border overflow-hidden transition-colors duration-300">
                    <div className="p-8 bg-green-50/30 dark:bg-neutral-800/50 border-b border-card-border font-black text-green-900 dark:text-green-400 uppercase italic flex items-center justify-between">
                        <span className="flex items-center gap-2"><MapPin size={20} className="text-green-600 dark:text-green-500"/> Túrák listája</span>
                        <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-1 hover:bg-green-700 transition-all">
                            <Plus size={16}/> Új hozzáadása
                        </button>
                    </div>
                    <div className="p-6">
                        {turak.length === 0 ? (
                            <p className="text-center font-bold text-gray-400 dark:text-neutral-500 italic">Nincsenek túrák.</p>
                        ) : (
                            turak.map((t) => (
                                <div key={t.id} className="flex items-center justify-between p-5 mb-3 bg-green-50/40 dark:bg-neutral-800 rounded-3xl hover:bg-green-50 dark:hover:bg-neutral-700 transition-all">
                                    <div>
                                        <div className="font-black text-foreground uppercase italic">{t.nev}</div>
                                        <div className="text-green-700/60 dark:text-green-500/60 font-bold text-sm">{t.helyszin}</div>
                                    </div>
                                    <button onClick={() => deleteTura(t.id)} className="p-3 bg-card text-red-500 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- 💬 FÓRUM TÉMÁK SZEKCIÓ --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Témák listája */}
                    <div className="bg-card rounded-[3.5rem] shadow-2xl border border-card-border overflow-hidden h-fit transition-colors duration-300">
                        <div className="p-8 bg-green-50/30 dark:bg-neutral-800/50 border-b border-card-border font-black text-green-900 dark:text-green-400 uppercase italic flex items-center gap-2">
                            <MessageSquare size={20} className="text-green-600 dark:text-green-500"/> Fórum témák
                        </div>
                        <div className="p-6 space-y-3">
                            {temak.length === 0 ? (
                                <p className="text-center font-bold text-gray-400 dark:text-neutral-500 italic">Nincsenek fórum témák.</p>
                            ) : (
                                temak.map((tema) => (
                                    <div key={tema.id} className={`flex items-center justify-between p-4 bg-green-50/40 dark:bg-neutral-800 rounded-3xl hover:bg-green-50 dark:hover:bg-neutral-700 transition-all cursor-pointer ${aktivTemaId === tema.id ? 'border-2 border-green-500 bg-card' : ''}`} onClick={() => fetchKommentek(tema.id)}>
                                        <div className="flex-1">
                                            <div className="font-black text-foreground uppercase italic text-sm">{tema.cim}</div>
                                            <div className="text-green-700/60 dark:text-green-500/60 font-bold text-xs">Szerző: {tema.szerzo}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">{tema.hszSzam} db</span>
                                            <button onClick={(e) => { e.stopPropagation(); deleteTema(tema.id); }} className="p-2 bg-card text-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all">
                                                <Trash2 size={16}/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Kommentek listája */}
                    <div className="bg-card rounded-[3.5rem] shadow-2xl border border-card-border overflow-hidden h-fit transition-colors duration-300">
                        <div className="p-8 bg-green-50/30 dark:bg-neutral-800/50 border-b border-card-border font-black text-green-900 dark:text-green-400 uppercase italic flex items-center gap-2">
                            <MessageCircle size={20} className="text-green-600 dark:text-green-500"/> Kommentek moderálása
                        </div>
                        <div className="p-6 space-y-3">
                            {!aktivTemaId ? (
                                <p className="text-center font-bold text-gray-400 dark:text-neutral-500 italic">Kattints egy témára bal oldalon!</p>
                            ) : valasztottTemaKommentjei.length === 0 ? (
                                <p className="text-center font-bold text-gray-400 dark:text-neutral-500 italic">Nincsenek kommentek.</p>
                            ) : (
                                valasztottTemaKommentjei.map((komment) => (
                                    <div key={komment.id} className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-3xl flex items-start justify-between">
                                        <div className="flex-1 mr-2">
                                            <div className="font-bold text-sm text-foreground">{komment.szerzo}</div>
                                            <p className="text-xs text-text-muted mt-1">{komment.szoveg}</p>
                                        </div>
                                        <button onClick={() => deleteKomment(komment.id)} className="p-2 bg-card text-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all self-center">
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- 📝 ÚJ TÚRA MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card p-8 rounded-[3rem] shadow-2xl border border-card-border w-full max-w-md transition-colors duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-green-900 dark:text-green-400 uppercase italic">Új túra hozzáadása</h2>
                            <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={addTura} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-text-muted mb-1">Túra neve</label>
                                <input type="text" required value={newTura.nev} onChange={e => setNewTura({...newTura, nev: e.target.value})} className="w-full bg-background border border-card-border text-foreground rounded-xl p-3 focus:outline-none focus:border-green-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-muted mb-1">Helyszín</label>
                                <input type="text" required value={newTura.helyszin} onChange={e => setNewTura({...newTura, helyszin: e.target.value})} className="w-full bg-background border border-card-border text-foreground rounded-xl p-3 focus:outline-none focus:border-green-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-muted mb-1">Időtartam</label>
                                <input type="text" required value={newTura.idotartam} onChange={e => setNewTura({...newTura, idotartam: e.target.value})} className="w-full bg-background border border-card-border text-foreground rounded-xl p-3 focus:outline-none focus:border-green-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-muted mb-1">Nehézség</label>
                                <input type="text" required value={newTura.nehezseg} onChange={e => setNewTura({...newTura, nehezseg: e.target.value})} className="w-full bg-background border border-card-border text-foreground rounded-xl p-3 focus:outline-none focus:border-green-500 transition-colors" />
                            </div>
                            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl mt-4 transition-colors">
                                Mentés
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
"use client";
import React, { useEffect, useState } from 'react';
import { ImageIcon, MapPin, User, Upload } from 'lucide-react';

export default function GaleriaPage() {
    const [kepek, setKepek] = useState<any[]>([]);
    const [turak, setTurak] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedTura, setSelectedTura] = useState("");
    const [leiras, setLeiras] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
        fetchAdatok();
    }, []);

    const fetchAdatok = async () => {
        try {
            const [kepekRes, turakRes] = await Promise.all([
                fetch('http://localhost:5000/api/galeria'),
                fetch('http://localhost:5000/api/turak')
            ]);
            const kepekData = await kepekRes.json();
            const turakData = await turakRes.json();

            setKepek(kepekData.data || []);
            setTurak(turakData.data || []);
        } catch (err) {
            console.error("Hiba az adatok letöltésekor:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !selectedTura || !user) return alert("Válassz képet és túrát is!");

        setUploading(true);
        const formData = new FormData();
        
        // JAVÍTVA: 'image' helyett 'kep', mert a backend upload.single('kep')-et vár!
        formData.append('kep', selectedFile);
        formData.append('tura_id', selectedTura);
        formData.append('user_id', user.id);
        formData.append('leiras', leiras);

        try {
            // JAVÍTVA: A '/feltoltes' lekerült a végéről, mert a backend a sima '/' útvonalon várja a POST kérést!
            const res = await fetch('http://localhost:5000/api/galeria', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setLeiras("");
                setSelectedFile(null);
                setSelectedTura("");
                fetchAdatok();
                alert("Szuper! A kép feltöltve, és ha ez volt az első, megkaptad a Fotós jelvényt! 📸");
            } else {
                alert("Szerver hiba: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Hiba a feltöltésnél!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-10 transition-colors duration-300 text-foreground">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Fejléc */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-black text-green-900 dark:text-green-400 uppercase italic tracking-tighter">
                        Túra Galéria
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm">
                        Oszd meg a legszebb pillanataidat
                    </p>
                </div>

                {/* Feltöltő szekció */}
                {user && (
                    <div className="bg-card border border-card-border p-8 rounded-[3rem] shadow-sm max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 mb-6 text-green-700 dark:text-green-400 font-black uppercase italic text-xl">
                            <Upload size={24} /> <span>Új emlék feltöltése</span>
                        </div>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <select 
                                    className="bg-background border border-card-border dark:border-zinc-700 rounded-2xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500 text-zinc-900 dark:text-zinc-100"
                                    value={selectedTura}
                                    onChange={(e) => setSelectedTura(e.target.value)}
                                    required
                                >
                                    <option value="">Melyik túra?</option>
                                    {turak.map(t => <option key={t.id} value={t.id}>{t.nev}</option>)}
                                </select>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    className="text-sm font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-black file:bg-green-100 dark:file:bg-green-900 file:text-green-700 dark:file:text-green-300 hover:file:bg-green-200 cursor-pointer text-zinc-600 dark:text-zinc-400"
                                    required
                                />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Írj egy rövid leírást..."
                                className="w-full bg-background border border-card-border dark:border-zinc-700 rounded-2xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500 text-zinc-900 dark:text-zinc-100"
                                value={leiras}
                                onChange={(e) => setLeiras(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                disabled={uploading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl uppercase italic transition-all disabled:opacity-50"
                            >
                                {uploading ? "Feltöltés..." : "Kép megosztása"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Kép rács */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {kepek.map((kep) => (
                        <div key={kep.id} className="group bg-card rounded-[2.5rem] overflow-hidden border border-card-border dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500">
                            {/* Kép konténer */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={`http://localhost:5000${kep.kep_url}`} 
                                    alt={kep.leiras}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black uppercase italic text-green-800 dark:text-green-400 shadow-sm border border-black/5 dark:border-white/10">
                                    <MapPin size={12} /> {kep.turaNev}
                                </div>
                            </div>
                            
                            {/* Tartalom */}
                            <div className="p-6 space-y-4">
                                <p className="text-zinc-800 dark:text-zinc-200 font-bold text-sm leading-relaxed line-clamp-2 italic">
                                    "{kep.leiras || "Nincs leírás..."}"
                                </p>
                                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                                        <User size={12} className="text-green-600" /> {kep.feltolto}
                                    </span>
                                    <span className="text-zinc-400 dark:text-zinc-500">
                                        {new Date(kep.datum).toLocaleDateString('hu-HU')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {kepek.length === 0 && !loading && (
                    <div className="text-center py-20 text-zinc-400 dark:text-zinc-600">
                        <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                        <p className="font-black uppercase italic tracking-widest">Még nincsenek feltöltött emlékek.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
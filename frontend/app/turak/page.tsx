"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, ChevronRight, Mountain, Info, CheckCircle, Heart } from 'lucide-react';

export default function TurakPage() {
  const [turak, setTurak] = useState<any[]>([]);
  const [hiba, setHiba] = useState(false);
  const [nyitottId, setNyitottId] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [kedvencek, setKedvencek] = useState<number[]>([]);

  // A server.js-hez igazított alap URL
  const API_URL = "http://localhost:5000/api/turak";

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      
      // Kedvencek lekérése a helyes úton (/api/turak/kedvencek)
      fetch(`${API_URL}/kedvencek/${u.id}`)
        .then(res => {
          if (!res.ok) throw new Error("Hiba a kedvencek betöltésekor");
          return res.json();
        })
        .then(data => {
          if (data.success && data.data) {
            const ids = data.data.map((t: any) => t.id || t.tura_id);
            setKedvencek(ids);
          }
        })
        .catch(() => {
          const saved = localStorage.getItem('kedvenc_turak');
          if (saved) setKedvencek(JSON.parse(saved));
        });
    }

    // Összes túra lekérése a listához
    fetch(API_URL)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setTurak(data.data || []))
      .catch(() => setHiba(true));
  }, []);

  // Helyi mentés frissítése
  useEffect(() => {
    if (kedvencek.length > 0) {
      localStorage.setItem('kedvenc_turak', JSON.stringify(kedvencek));
    }
  }, [kedvencek]);

  // Szűrők állapota
  const [keresoNev, setKeresoNev] = useState("");
  const [szuroHelyszin, setSzuroHelyszin] = useState("");
  const [szuroNehezseg, setSzuroNehezseg] = useState("");
  const [szuroIdotartam, setSzuroIdotartam] = useState("");

  // Szűrő opciók generálása
  const egyediHelyszinek = Array.from(new Set(turak.map(t => t.helyszin).filter(Boolean)));
  const egyediNehezsegek = Array.from(new Set(turak.map(t => t.nehezseg).filter(Boolean)));
  const egyediIdotartamok = Array.from(new Set(turak.map(t => t.idotartam).filter(Boolean)));

  // Szűrési logika
  const szurtTurak = turak.filter(t => {
    const nev = (t.nev || "").trim().toLowerCase();
    const helyszin = (t.helyszin || "").trim().toLowerCase();
    return nev.includes(keresoNev.trim().toLowerCase()) &&
      (szuroHelyszin === "" || helyszin === szuroHelyszin.trim().toLowerCase()) &&
      (szuroNehezseg === "" || (t.nehezseg || "").trim().toLowerCase() === szuroNehezseg.trim().toLowerCase()) &&
      (szuroIdotartam === "" || (t.idotartam || "").trim().toLowerCase() === szuroIdotartam.trim().toLowerCase());
  });

  // Kedvenc funkció (POST hívás a szerverre)
  const toggleKedvenc = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!user) return;

    const isFav = kedvencek.includes(id);
    const ujKedvencek = isFav ? kedvencek.filter(k => k !== id) : [...kedvencek, id];
    setKedvencek(ujKedvencek);

    try {
      await fetch(`${API_URL}/kedvencek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, tura_id: id })
      });
    } catch (err) {
      console.error("Hiba a kedvenc mentésekor:", err);
    }
  };

  return (
    <main className="p-10 max-w-5xl w-full mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-green-900 dark:text-white uppercase italic tracking-tighter">Túrák</h1>
      </div>

      {/* Szűrő rész */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-green-100 dark:border-zinc-800 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" size={18} />
          <input onChange={(e) => setKeresoNev(e.target.value)} type="text" placeholder="Keresés..." className="w-full pl-12 pr-4 py-3 rounded-2xl border border-green-50 dark:border-zinc-800 bg-green-50/50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-green-400 font-bold text-sm dark:text-gray-200" />
        </div>
        <select onChange={(e) => setSzuroHelyszin(e.target.value)} className="w-full p-3 rounded-2xl border border-green-50 dark:border-zinc-800 bg-green-50/50 dark:bg-zinc-800/50 font-bold text-sm dark:text-gray-200 outline-none">
          <option value="">Összes helyszín</option>
          {egyediHelyszinek.map((h: any, i) => <option key={i} value={h}>{h}</option>)}
        </select>
        <select onChange={(e) => setSzuroNehezseg(e.target.value)} className="w-full p-3 rounded-2xl border border-green-50 dark:border-zinc-800 bg-green-50/50 dark:bg-zinc-800/50 font-bold text-sm dark:text-gray-200 outline-none">
          <option value="">Összes nehézség</option>
          {egyediNehezsegek.map((n: any, i) => <option key={i} value={n}>{n}</option>)}
        </select>
        <select onChange={(e) => setSzuroIdotartam(e.target.value)} className="w-full p-3 rounded-2xl border border-green-50 dark:border-zinc-800 bg-green-50/50 dark:bg-zinc-800/50 font-bold text-sm dark:text-gray-200 outline-none">
          <option value="">Összes időtartam</option>
          {egyediIdotartamok.map((id: any, i) => <option key={i} value={id}>{id}</option>)}
        </select>
      </div>

      {/* Túra lista megjelenítése */}
      <div className="grid gap-6">
        {hiba ? (
          <div className="text-center p-10 bg-red-50 rounded-3xl text-red-600 font-bold">Hiba történt a túrák betöltésekor. Kérlek indítsd el a backend szervert!</div>
        ) : szurtTurak.map((t: any) => (
          <div key={t.id} className="flex flex-col gap-2">
            <div onClick={() => setNyitottId(nyitottId === t.id ? null : t.id)} className={`bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border transition-all cursor-pointer flex justify-between items-center shadow-sm ${nyitottId === t.id ? 'border-green-500' : 'border-green-50 dark:border-zinc-800'}`}>
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${nyitottId === t.id ? 'bg-green-600 text-white' : 'bg-green-50 dark:bg-zinc-800 text-green-600'}`}>
                  <Mountain size={24} />
                </div>
                <div>
                  <h3 className="font-black text-green-900 dark:text-white text-xl uppercase italic tracking-tight">{t.nev}</h3>
                  <div className="flex flex-wrap gap-4 text-[10px] font-black text-green-600/70 uppercase mt-1 tracking-widest">
                    <span className="flex items-center gap-1 bg-green-50 dark:bg-zinc-800 px-2 py-1 rounded-lg"><MapPin size={12}/> {t.helyszin}</span>
                    <span className="flex items-center gap-1 bg-green-50 dark:bg-zinc-800 px-2 py-1 rounded-lg"><Clock size={12}/> {t.idotartam}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={(e) => toggleKedvenc(e, t.id)} className={`p-3 rounded-full transition-all ${kedvencek.includes(t.id) ? 'bg-red-50 text-red-500' : 'text-gray-300 hover:text-red-400'}`}>
                  <Heart size={24} fill={kedvencek.includes(t.id) ? "currentColor" : "none"} />
                </button>
                <ChevronRight className={`text-green-300 transition-all ${nyitottId === t.id ? 'rotate-90 text-green-600' : ''}`} size={28} />
              </div>
            </div>
            {/* Részletek szekció */}
            {nyitottId === t.id && (
              <div className="mx-4 p-8 bg-white dark:bg-zinc-900 border-x border-b border-green-100 dark:border-zinc-800 rounded-b-[2.5rem] -mt-8 pt-12 shadow-inner grid md:grid-cols-2 gap-8">
                <div className="space-y-3 font-medium">
                  <div className="flex items-center gap-2 text-green-600 font-black uppercase italic text-xs tracking-widest"><Info size={18} /> Leírás</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t.leiras || "Nincs leírás megadva ehhez a túrához."}</p>
                </div>
                <div className="bg-green-50/50 dark:bg-green-900/10 p-6 rounded-3xl space-y-3">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-black uppercase italic text-xs tracking-widest"><CheckCircle size={18} /> Kinek ajánljuk?</div>
                  <p className="text-green-900/80 dark:text-gray-300 text-sm font-bold italic">{t.kinek_ajanljuk || "Mindenkinek, aki szereti a természetet!"}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
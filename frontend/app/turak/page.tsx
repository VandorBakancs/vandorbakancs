"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, ChevronRight, Mountain, BarChart } from 'lucide-react';

export default function TurakPage() {
  const [turak, setTurak] = useState<any[]>([]);
  const [hiba, setHiba] = useState(false);
  
  // 🔍 Szűrő állapotok
  const [keresoNev, setKeresoNev] = useState("");
  const [szuroHelyszin, setSzuroHelyszin] = useState("");
  const [szuroNehezseg, setSzuroNehezseg] = useState("");
  const [szuroIdotartam, setSzuroIdotartam] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/turak')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setTurak(data.data || []))
      .catch(() => setHiba(true));
  }, []);

  // 🛠️ Egyedi listák kinyerése az adatbázisból (automatikusan kezeli az ékezeteket)
  const egyediHelyszinek = Array.from(new Set(turak.map(t => t.helyszin).filter(Boolean)));
  const egyediNehezsegek = Array.from(new Set(turak.map(t => t.nehezseg).filter(Boolean)));
  const egyediIdotartamok = Array.from(new Set(turak.map(t => t.idotartam).filter(Boolean)));

  // 🧠 Atombiztos, ékezet-kompatibilis szűrés
  const szurtTurak = turak.filter(t => {
    // Minden szöveget kisbetűssé teszünk és levágjuk a felesleges szóközöket a biztos egyezésért
    const nev = (t.nev || "").trim().toLowerCase();
    const helyszin = (t.helyszin || "").trim().toLowerCase();
    const nehezseg = (t.nehezseg || "").trim().toLowerCase();
    const idotartam = (t.idotartam || "").trim().toLowerCase();

    const keresettNev = keresoNev.trim().toLowerCase();

    return (
      nev.includes(keresettNev) &&
      (szuroHelyszin === "" || helyszin === szuroHelyszin.trim().toLowerCase()) &&
      (szuroNehezseg === "" || nehezseg === szuroNehezseg.trim().toLowerCase()) &&
      (szuroIdotartam === "" || idotartam === szuroIdotartam.trim().toLowerCase())
    );
  });

  return (
    <main className="p-10 max-w-5xl w-full mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-green-900 uppercase italic tracking-tighter">Túrák</h1>
        <p className="text-sm font-bold text-green-700/60 mt-1">Böngéssz az ékezetes, pontos szűrőkkel!</p>
      </div>

      {/* 🔽 LENYÍLÓS ÉS KERESŐS BLOKK 🔽 */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-green-100 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        
        {/* Név kereső */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" size={18} />
          <input 
            onChange={(e) => setKeresoNev(e.target.value)}
            type="text" 
            placeholder="Keresés név alapján..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-green-50 bg-green-50/50 outline-none focus:ring-2 focus:ring-green-400 font-bold text-sm text-gray-800 placeholder:text-green-800/30"
          />
        </div>

        {/* Helyszín Lenyíló */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" size={18} />
          <select 
            onChange={(e) => setSzuroHelyszin(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-green-50 bg-green-50/50 outline-none focus:ring-2 focus:ring-green-400 font-bold text-sm text-gray-800 appearance-none cursor-pointer"
          >
            <option value="">Összes helyszín</option>
            {egyediHelyszinek.map((h, index) => <option key={index} value={h}>{h}</option>)}
          </select>
        </div>

        {/* Nehézség Lenyíló */}
        <div className="relative">
          <BarChart className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" size={18} />
          <select 
            onChange={(e) => setSzuroNehezseg(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-green-50 bg-green-50/50 outline-none focus:ring-2 focus:ring-green-400 font-bold text-sm text-gray-800 appearance-none cursor-pointer"
          >
            <option value="">Összes nehézség</option>
            {egyediNehezsegek.map((n, index) => <option key={index} value={n}>{n}</option>)}
          </select>
        </div>

        {/* Időtartam Lenyíló */}
        <div className="relative">
          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" size={18} />
          <select 
            onChange={(e) => setSzuroIdotartam(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-green-50 bg-green-50/50 outline-none focus:ring-2 focus:ring-green-400 font-bold text-sm text-gray-800 appearance-none cursor-pointer"
          >
            <option value="">Összes időtartam</option>
            {egyediIdotartamok.map((i, index) => <option key={index} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      {/* 🏔️ TÚRÁK LISTÁJA */}
      <div className="grid gap-4">
        {hiba ? (
          <div className="bg-white p-10 rounded-[2.5rem] text-center border border-red-100 text-red-600 font-bold shadow-sm">
            ❌ Szerver hiba! Ellenőrizd a backend futását a 5000-es porton.
          </div>
        ) : szurtTurak.length > 0 ? (
          szurtTurak.map((t: any) => (
            <div key={t.id} className="bg-white p-6 rounded-[2.5rem] border border-green-50 flex justify-between items-center shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all flex-shrink-0">
                  <Mountain size={24} />
                </div>
                <div>
                  <h3 className="font-black text-green-900 text-xl">{t.nev}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-green-600/70 uppercase mt-1">
                    <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                      <MapPin size={14}/> {t.helyszin}
                    </span>
                    <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                      <Clock size={14}/> {t.idotartam}
                    </span>
                    <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                      <BarChart size={14}/> {t.nehezseg}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-green-300 group-hover:translate-x-1 transition-transform" size={24} />
            </div>
          ))
        ) : (
          <div className="bg-white p-24 rounded-[3rem] text-center border border-green-50 shadow-sm flex flex-col items-center justify-center">
            <Mountain size={48} className="text-green-200 mb-4" />
            <h2 className="text-green-300 font-black uppercase tracking-widest text-xl">Nincs találat</h2>
            <p className="text-sm text-green-700/50 font-bold mt-1">Próbálkozz más szűrők beállításával!</p>
          </div>
        )}
      </div>
    </main>
  );
}
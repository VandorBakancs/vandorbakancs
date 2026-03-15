"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, ChevronRight, Mountain, BarChart } from 'lucide-react';

export default function TurakPage() {
  const [turak, setTurak] = useState<any[]>([]);
  const [hiba, setHiba] = useState(false);
  const [kereso, setKereso] = useState("");

  useEffect(() => {
    // Használjuk a 127.0.0.1-et a localhost hiba elkerülésére
    fetch('http://127.0.0.1:5000/api/turak')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setTurak(data))
      .catch(() => setHiba(true));
  }, []);

  const szurtTurak = turak.filter(t => 
    (t.nev || "").toLowerCase().includes(kereso.toLowerCase())
  );

  return (
    <main className="p-10 max-w-5xl w-full mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-black text-green-900 uppercase italic tracking-tighter">Túrák</h1>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" size={18} />
          <input 
            onChange={(e) => setKereso(e.target.value)}
            type="text" 
            placeholder="Keresés..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-100 shadow-sm outline-none focus:ring-2 focus:ring-green-400 font-bold"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {hiba ? (
          <div className="bg-white p-10 rounded-[2.5rem] text-center border border-red-100 text-red-600 font-bold shadow-sm">
            Szerver hiba! Ellenőrizd a backend futását és az adatbázis kapcsolatot.
          </div>
        ) : szurtTurak.length > 0 ? (
          szurtTurak.map((t: any) => (
            <div key={t.id} className="bg-white p-6 rounded-[2.5rem] border border-green-50 flex justify-between items-center shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Mountain size={24} />
                </div>
                <div>
                  <h3 className="font-black text-green-900 text-xl">{t.nev}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-green-500 uppercase mt-1">
                    <span className="flex items-center gap-1"><MapPin size={14}/> {t.helyszin}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {t.idotartam}</span>
                    <span className="flex items-center gap-1"><BarChart size={14}/> {t.nehezseg}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-green-200" size={24} />
            </div>
          ))
        ) : (
          <div className="bg-white p-24 rounded-[3rem] text-center border border-green-50 shadow-sm">
            <h2 className="text-green-300 font-black uppercase tracking-widest text-xl">Nincs találat</h2>
          </div>
        )}
      </div>
    </main>
  );
}
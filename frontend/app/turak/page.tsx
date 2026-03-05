"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
// FONTOS: Az összes ikon importálása, hogy eltűnjön a piros vonal
import { 
  MapPin, 
  Mountain, 
  Clock, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  AlertCircle 
} from 'lucide-react';

export default function TurakPage() {
  const [turak, setTurak] = useState<any[]>([]);
  const [szuroNyitva, setSzuroNyitva] = useState(false);
  const [nehezsegSzuro, setNehezsegSzuro] = useState("Összes");
  const [keresoSzo, setKeresoSzo] = useState("");
  const [hiba, setHiba] = useState(false);

  useEffect(() => {
    // Kapcsolódás a backendhez az 5000-es porton
    fetch('http://localhost:5000/api/turak')
      .then(res => {
        if (!res.ok) throw new Error("Hiba a lekérés során"); //
        return res.json();
      })
      .then(data => {
        setTurak(Array.isArray(data) ? data : []);
        setHiba(false);
      })
      .catch(err => {
        console.error("Szerver hiba:", err);
        setHiba(true); // Ekkor jelenik meg a piros hibaüzenet
      });
  }, []);

  // Szűrési logika
  const szurtTurak = turak.filter(t => {
    const nev = (t.Megnevezes || t.megnevezes || "").toLowerCase();
    const nehezseg = t.Nehezseg || t.nehezseg || "";
    const egyezikKereses = nev.includes(keresoSzo.toLowerCase());
    const egyezikNehezseg = nehezsegSzuro === "Összes" || nehezseg === nehezsegSzuro;
    return egyezikKereses && egyezikNehezseg;
  });

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="p-8 max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-4xl font-black text-green-900 uppercase italic">Túrák</h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            {/* Nehézség választó */}
            <div className="relative">
              <button 
                onClick={() => setSzuroNyitva(!szuroNyitva)}
                className="flex items-center gap-2 bg-white px-6 py-4 rounded-2xl border border-green-100 font-bold text-green-900 shadow-sm"
              >
                {nehezsegSzuro} <ChevronDown size={20} />
              </button>
              
              {szuroNyitva && (
                <div className="absolute top-full mt-2 w-full bg-white border border-green-100 rounded-2xl shadow-xl z-20 overflow-hidden">
                  {["Összes", "Könnyű", "Közepes", "Nehéz"].map((szint) => (
                    <button 
                      key={szint}
                      onClick={() => { setNehezsegSzuro(szint); setSzuroNyitva(false); }}
                      className="w-full text-left px-6 py-3 hover:bg-green-50 font-bold text-green-800 transition-colors"
                    >
                      {szint}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Keresőmező */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300" size={20} />
              <input 
                type="text" 
                placeholder="Keresés..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-green-100 shadow-sm outline-none font-bold"
                onChange={(e) => setKeresoSzo(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Szerverhiba kijelzése */}
        {hiba ? (
          <div className="bg-red-50 border-2 border-red-100 p-10 rounded-[3rem] text-center space-y-4">
            <AlertCircle className="mx-auto text-red-400" size={48} />
            <h2 className="text-red-900 font-black uppercase">Szerverhiba!</h2>
            <p className="text-red-600 font-bold text-sm italic">Ellenőrizd, hogy fut-e az adatbázis szerver az 5000-es porton!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {szurtTurak.length > 0 ? (
              szurtTurak.map((t: any) => (
                <div key={t.Id || t.id} className="bg-white p-6 rounded-[2.5rem] border border-green-50 flex justify-between items-center shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-green-50 rounded-[2rem] overflow-hidden border border-green-100 flex items-center justify-center text-green-600">
                      {/* Ha van kép az adatbázisban, azt jelenítjük meg */}
                      {t.Kep || t.kep ? (
                        <img 
                          src={`/images/${t.Kep || t.kep}`} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg ...></svg>'; }} 
                        />
                      ) : (
                        <Mountain size={40} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-green-900 text-2xl">{t.Megnevezes || t.megnevezes}</h3>
                      <div className="flex gap-4 text-xs font-bold text-green-400 uppercase mt-1">
                        <span className="flex items-center gap-1.5"><MapPin size={16}/> {t.Helyszin || t.helyszin}</span>
                        <span className="flex items-center gap-1.5"><Clock size={16}/> {t.Idotartam || t.idotartam}</span>
                        <span className="text-green-600 font-black">{t.Nehezseg || t.nehezseg}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-50 text-green-600 p-5 rounded-3xl hover:bg-green-600 hover:text-white transition-all">
                    <ChevronRight size={24} />
                  </button>
                </div>
              ))
            ) : (
              /* Nincs találat állapot */
              <div className="bg-white p-20 rounded-[3rem] text-center font-black text-green-300 uppercase tracking-widest border border-green-50 shadow-sm">
                Nincs találat
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
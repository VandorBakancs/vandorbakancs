"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, ChevronRight, Mountain, Info, CheckCircle, Heart, Map } from 'lucide-react';

export default function TurakPage() {
  const [turak, setTurak] = useState<any[]>([]);
  const [hiba, setHiba] = useState(false);
  const [nyitottId, setNyitottId] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [kedvencek, setKedvencek] = useState<number[]>([]);

  const API_URL = "http://localhost:5000/api/turak";

  // Pontos összerendelés a túra neve és a képfájl neve között
  const kepMap: Record<string, string> = {
    "Szent Anna-tó körüli séta": "szentannato",
    "Gyilkos-tó és Békás-szoros": "gyilkosto", // Frissítve a gyilkosto.jpg-hez
    "Tordai-hasadék túra": "tordaihasadek",
    "Madarasi Hargita csúcstúra": "madarasi",
    "Fogarasi-havasok: Bilea-tó": "bileato",
    "Királykő-hegység gerinctúra": "kiralyko",
    "Medve-barlang látogatás": "medvebarlang",
    "Torockó: Székelykő mászás": "szekelyko",
    "Parajdi Sóbánya és Sószoros": "parajdi",
    "Vargyas-szoros barlangtúra": "vargyas",
    "Kékes-tető csúcstámadás": "kekesteto",
    "Rám-szakadék kaland": "ramszakadek",
    "Prédikálószék kilátó": "predikaloszek",
    "Badacsony bazaltorgonák": "badacsonybazal",
    "Dobogókő kilátás": "dobogoko",
    "Szalajka-völgy séta": "szalajka",
    "Nagy-Eged hegy": "nagyeged",
    "Csóványos kilátó": "csovanyos",
    "Megyer-hegyi Tengerszem": "tengerszem", // Frissítve a tengerszem.jpg-hez
    "Hollókő vár túra": "holloko",
    "Bakony: Cuha-völgy": "cuhavolgy",
    "Zengő csúcstúra": "zengo",
    "Velencei-hegység: Ingókövek": "velenceihegyseg"
  };

  // Térkép URL-ek összerendelése a túrák nevével
  const terkepMap: Record<string, string> = {
    "Szent Anna-tó körüli séta": "https://www.google.com/maps/d/u/0/embed?mid=1BZvLVtYkCBUjFwEsr33_MQOLBoLp1U0&ehbc=2E312F&noprof=1",
    "Gyilkos-tó és Békás-szoros": "https://www.google.com/maps/d/u/0/embed?mid=1PrqY-cw872JJkJtaiqOIsDzLI8yyPfA&ehbc=2E312F&noprof=1",
    "Tordai-hasadék túra": "https://www.google.com/maps/d/u/0/embed?mid=1C0sVXBWca2SVh1LHIVz0Cka5yhUnsf8&ehbc=2E312F&noprof=1",
    "Madarasi Hargita csúcstúra": "https://www.google.com/maps/d/u/0/embed?mid=1Tj5E_hUm4G8q1rEPTGPOmplNIL00mvs&ehbc=2E312F&noprof=1",
    "Fogarasi-havasok: Bilea-tó": "https://www.google.com/maps/d/u/0/embed?mid=1WFUfq79nX4Diw3MQKZ7aKpgZsZXcPGo&ehbc=2E312F&noprof=1",
    "Királykő-hegység gerinctúra": "https://www.google.com/maps/d/u/0/embed?mid=1tBvfzyvtM1AgCbtJ-aCiDQ-8XkXAhbc&ehbc=2E312F&noprof=1",
    "Medve-barlang látogatás": "https://www.google.com/maps/d/u/0/embed?mid=1UaNIm0SYHOuh5zgUwrq7zR4P2987PVs&ehbc=2E312F&noprof=1",
    "Torockó: Székelykő mászás": "https://www.google.com/maps/d/u/0/embed?mid=1FNQWkkODrIGphxvaATze559vICJoXAg&ehbc=2E312F&noprof=1",
    "Parajdi Sóbánya és Sószoros": "https://www.google.com/maps/d/u/0/embed?mid=1xXqu4QfT2I5RMs2MLf6sb2sI3GZbClU&ehbc=2E312F&noprof=1",
    "Kékes-tető csúcstámadás": "https://www.google.com/maps/d/u/0/embed?mid=12AbVFVMjU4vdNTcApnTXRTPgC9jjjxs&ehbc=2E312F&noprof=1",
    "Rám-szakadék kaland": "https://www.google.com/maps/d/u/0/embed?mid=1pzOFFJ6PHPTB3SGJw3mzZSTLyNrSph8&ehbc=2E312F&noprof=1",
    "Prédikálószék kilátó": "https://www.google.com/maps/d/u/0/embed?mid=1zK58b_zh7tfVyMmqAUI2ozDIDhFw_Kw&ehbc=2E312F&noprof=1",
    "Badacsony bazaltorgonák": "https://www.google.com/maps/d/u/0/embed?mid=17f74QetLgsSwqjctIHFfVtNfy3tK-6Y&ehbc=2E312F&noprof=1",
    "Dobogókő kilátás": "https://www.google.com/maps/d/u/0/embed?mid=1D-Z9HPIUArE1ObDyWH9FrpGRMA_sKdg&ehbc=2E312F&noprof=1",
    "Szalajka-völgy séta": "https://www.google.com/maps/d/u/0/embed?mid=1eAxbiOFeE32s2aw_OUSLieN67ZGMUv8&ehbc=2E312F&noprof=1",
    "Nagy-Eged hegy": "https://www.google.com/maps/d/u/0/embed?mid=1heaAiBhbnT3k_-7Sg_Vk7vKE-0g8dLI&ehbc=2E312F&noprof=1",
    "Csóványos kilátó": "https://www.google.com/maps/d/u/0/embed?mid=1kqyjEuUN3vZoF6e4eVlMgnpJUjT88Ew&ehbc=2E312F&noprof=1",
    "Megyer-hegyi Tengerszem": "https://www.google.com/maps/d/u/0/embed?mid=1AWo8YTH9Idcsi8NrPh6tOiMOSbV6yCE&ehbc=2E312F&noprof=1",
    "Hollókő vár túra": "https://www.google.com/maps/d/u/0/embed?mid=1r4xzlfVXtOtf0kRmaxG2zXUy0K4zNLs&ehbc=2E312F&noprof=1",
    "Bakony: Cuha-völgy": "https://www.google.com/maps/d/u/0/embed?mid=1qOGNwrLjyH0GdcQnsJJkcMrSwnCJKjU&ehbc=2E312F&noprof=1",
    "Zengő csúcstúra": "https://www.google.com/maps/d/u/0/embed?mid=1BrjcTWY8ZwUVNQZ-4BHzMhSpIHd47MY&ehbc=2E312F&noprof=1",
    "Velencei-hegység: Ingókövek": "https://www.google.com/maps/d/u/0/embed?mid=1xiPimu9ZKLK3K-SAhgBc6X3daXbLn9c&ehbc=2E312F&noprof=1"
  };

  const getKepNev = (turaNev: string): string => {
    if (!turaNev) return "slideshow1";
    if (kepMap[turaNev]) return kepMap[turaNev];

    return turaNev
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .trim();
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      
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

    fetch(API_URL)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setTurak(data.data || []))
      .catch(() => setHiba(true));
  }, []);

  const [keresoNev, setKeresoNev] = useState("");
  const [szuroHelyszin, setSzuroHelyszin] = useState("");
  const [szuroNehezseg, setSzuroNehezseg] = useState("");
  const [szuroIdotartam, setSzuroIdotartam] = useState("");

  const egyediHelyszinek = Array.from(new Set(turak.map(t => t.helyszin).filter(Boolean)));
  const egyediNehezsegek = Array.from(new Set(turak.map(t => t.nehezseg).filter(Boolean)));
  const egyediIdotartamok = Array.from(new Set(turak.map(t => t.idotartam).filter(Boolean)));

  const szurtTurak = turak.filter(t => {
    const nev = (t.nev || "").trim().toLowerCase();
    const helyszin = (t.helyszin || "").trim().toLowerCase();
    return nev.includes(keresoNev.trim().toLowerCase()) &&
      (szuroHelyszin === "" || helyszin === szuroHelyszin.trim().toLowerCase()) &&
      (szuroNehezseg === "" || (t.nehezseg || "").trim().toLowerCase() === szuroNehezseg.trim().toLowerCase()) &&
      (szuroIdotartam === "" || (t.idotartam || "").trim().toLowerCase() === szuroIdotartam.trim().toLowerCase());
  });

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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="p-6 md:p-10 max-w-5xl w-full mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-green-900 dark:text-green-400 uppercase italic tracking-tighter">Túrák</h1>
        </div>

        {/* Szűrő rész */}
        <div className="bg-card p-6 rounded-[2.5rem] border border-card-border shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center transition-colors duration-300">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-500" size={18} />
            <input 
              onChange={(e) => setKeresoNev(e.target.value)} 
              type="text" 
              placeholder="Keresés..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-card-border bg-background outline-none focus:ring-2 focus:ring-green-400 font-bold text-sm text-foreground placeholder:text-text-muted transition-colors" 
            />
          </div>
          <select 
            onChange={(e) => setSzuroHelyszin(e.target.value)} 
            className="w-full p-3 rounded-2xl border border-card-border bg-background font-bold text-sm text-foreground outline-none cursor-pointer transition-colors"
          >
            <option value="">Összes helyszín</option>
            {egyediHelyszinek.map((h: any, i) => <option key={i} value={h}>{h}</option>)}
          </select>
          <select 
            onChange={(e) => setSzuroNehezseg(e.target.value)} 
            className="w-full p-3 rounded-2xl border border-card-border bg-background font-bold text-sm text-foreground outline-none cursor-pointer transition-colors"
          >
            <option value="">Összes nehézség</option>
            {egyediNehezsegek.map((n: any, i) => <option key={i} value={n}>{n}</option>)}
          </select>
          <select 
            onChange={(e) => setSzuroIdotartam(e.target.value)} 
            className="w-full p-3 rounded-2xl border border-card-border bg-background font-bold text-sm text-foreground outline-none cursor-pointer transition-colors"
          >
            <option value="">Összes időtartam</option>
            {egyediIdotartamok.map((id: any, i) => <option key={i} value={id}>{id}</option>)}
          </select>
        </div>

        {/* Túra lista */}
        <div className="grid gap-6">
          {hiba ? (
            <div className="text-center p-10 bg-red-50 dark:bg-red-900/20 rounded-3xl text-red-600 dark:text-red-400 font-bold border border-red-100 dark:border-red-900/30 transition-colors">
              Hiba történt a túrák betöltésekor. Kérlek próbáld újra később!
            </div>
          ) : szurtTurak.map((t: any) => (
            <div key={t.id} className="flex flex-col gap-2 relative">
              <div 
                onClick={() => setNyitottId(nyitottId === t.id ? null : t.id)} 
                className={`bg-card p-6 rounded-[2.5rem] border transition-all duration-300 cursor-pointer flex justify-between items-center shadow-sm hover:border-green-500 z-10 ${
                  nyitottId === t.id ? 'border-green-500 shadow-md' : 'border-card-border'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <div className={`w-14 h-14 rounded-2xl transition-colors flex shrink-0 items-center justify-center ${
                    nyitottId === t.id ? 'bg-green-600 text-white' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500'
                  }`}>
                    <Mountain size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-green-900 dark:text-green-400 text-xl uppercase italic tracking-tight">{t.nev}</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] font-black text-green-700 dark:text-green-500 uppercase mt-2 tracking-widest">
                      <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg transition-colors"><MapPin size={12}/> {t.helyszin}</span>
                      <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg transition-colors"><Clock size={12}/> {t.idotartam}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-4">
                  <button 
                    onClick={(e) => toggleKedvenc(e, t.id)} 
                    className={`p-3 rounded-full transition-all duration-300 ${
                      kedvencek.includes(t.id) 
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40' 
                      : 'text-gray-300 dark:text-zinc-600 hover:text-red-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Heart size={24} fill={kedvencek.includes(t.id) ? "currentColor" : "none"} />
                  </button>
                  <ChevronRight className={`text-green-300 dark:text-green-700/50 transition-all duration-300 ${nyitottId === t.id ? 'rotate-90 text-green-600 dark:text-green-500' : ''}`} size={28} />
                </div>
              </div>

              {/* Részletek képpel, leírással és térképpel */}
              {nyitottId === t.id && (
                <div className="mx-4 p-6 md:p-8 bg-card border-x border-b border-card-border rounded-b-[2.5rem] -mt-8 pt-12 shadow-inner flex flex-col gap-8 animate-in slide-in-from-top-4 duration-300 relative z-0">
                  
                  {/* Felső rész: Kép és infók */}
                  <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                    {/* Kép szekció */}
                    <div className="w-full h-48 md:h-full rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg bg-background flex items-center justify-center transition-colors">
                      <img 
                        src={`/images/${getKepNev(t.nev)}.jpg`} 
                        alt={t.nev}
                        className="w-full h-full object-cover object-center"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = "/images/slideshow1.jpg";
                        }}
                      />
                    </div>

                    {/* Szöveges tartalom */}
                    <div className="space-y-6">
                      <div className="space-y-3 font-medium">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black uppercase italic text-xs tracking-widest"><Info size={18} /> Leírás</div>
                        <p className="text-text-muted text-sm leading-relaxed">{t.leiras || "Nincs leírás megadva ehhez a túrához."}</p>
                      </div>
                      
                      <div className="bg-green-50/50 dark:bg-green-900/10 p-6 rounded-3xl space-y-3 border border-card-border transition-colors">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-500 font-black uppercase italic text-xs tracking-widest"><CheckCircle size={18} /> Kinek ajánljuk?</div>
                        <p className="text-green-900/80 dark:text-green-300/80 text-sm font-bold italic">{t.kinek_ajanljuk || "Mindenkinek, aki szereti a természetet!"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Alsó rész: Google Térkép Iframe (Csak akkor jelenik meg, ha van hozzá URL a szótárban) */}
                  {terkepMap[t.nev] && (
                    <div className="space-y-3 mt-4">
                       <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black uppercase italic text-xs tracking-widest"><Map size={18} /> Útvonal / Helyszín</div>
                       <div className="w-full h-[350px] rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg bg-background transition-colors">
                        <iframe 
                          src={terkepMap[t.nev]}
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
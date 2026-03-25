"use client";
import React, { useState, useEffect } from 'react';
import { User, Calendar, MessageCircle, Send, Plus, ArrowLeft, Loader2, Lock } from 'lucide-react';

export default function ForumPage() {
  const [bejelentkezettUser, setBejelentkezettUser] = useState<any>(null);
  const [temak, setTemak] = useState<any[]>([]);
  const [aktivTema, setAktivTema] = useState<any>(null);
  const [kommentek, setKommentek] = useState<any[]>([]);
  
  const [betöltés, setBetöltés] = useState(true);
  const [ujTemaModal, setUjTemaModal] = useState(false);
  const [ujTemaCim, setUjTemaCim] = useState("");
  const [ujKommentSzoveg, setUjKommentSzoveg] = useState("");

  // 1. Felhasználó és Témák betöltése indításkor
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setBejelentkezettUser(JSON.parse(user));
    fetchTemak();
  }, []);

  // 2. Kommentek betöltése, ha egy témát megnyitunk
  useEffect(() => {
    if (aktivTema) {
      fetchKommentek(aktivTema.id);
    }
  }, [aktivTema]);

  const fetchTemak = async () => {
    try {
      setBetöltés(true);
      const res = await fetch('http://localhost:5000/api/forum/temak', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      const json = await res.json();
      if (json.success) setTemak(json.data);
    } catch (err) {
      console.error("Hiba a témák lekérésekor:", err);
    } finally {
      setBetöltés(false);
    }
  };

  const fetchKommentek = async (temaId: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/forum/kommentek/${temaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      const json = await res.json();
      if (json.success) setKommentek(json.data);
    } catch (err) {
      console.error("Hiba a kommentek lekérésekor:", err);
    }
  };

  // ➕ Új téma mentése az adatbázisba
  const handleUjTema = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ujTemaCim.trim() || !bejelentkezettUser) return;

    try {
      const res = await fetch('http://localhost:5000/api/forum/temak', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        mode: 'cors',
        body: JSON.stringify({
          cim: ujTemaCim,
          szerzo: bejelentkezettUser.nev
        })
      });

      if (res.ok) {
        setUjTemaCim("");
        setUjTemaModal(false);
        fetchTemak(); // Lista frissítése
      }
    } catch (err) {
      console.error("Hiba a mentéskor:", err);
    }
  };

  // 💬 Új hozzászólás mentése az adatbázisba
  const handleUjKomment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ujKommentSzoveg.trim() || !aktivTema || !bejelentkezettUser) return;

    try {
      const res = await fetch('http://localhost:5000/api/forum/kommentek', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        mode: 'cors',
        body: JSON.stringify({
          tema_id: aktivTema.id,
          szerzo: bejelentkezettUser.nev,
          szoveg: ujKommentSzoveg
        })
      });

      if (res.ok) {
        setUjKommentSzoveg("");
        fetchKommentek(aktivTema.id); // Kommentek frissítése
      }
    } catch (err) {
      console.error("Hiba a komment küldésekor:", err);
    }
  };

  const formázottDátum = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('hu-HU');
  };

  return (
    <main className="p-10 max-w-5xl mx-auto space-y-10">
      
      {/* 🟢 TÉMA LISTA */}
      {!aktivTema && !ujTemaModal && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-black text-green-900 uppercase italic tracking-tighter">Fórum</h1>
            {bejelentkezettUser ? (
              <button 
                onClick={() => setUjTemaModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs shadow-md hover:bg-green-700 flex items-center gap-2"
              >
                <Plus size={16} /> Új téma indítása
              </button>
            ) : (
              <div className="text-xs font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-xl flex items-center gap-2">
                <Lock size={14} /> Jelentkezz be az indításhoz!
              </div>
            )}
          </div>

          {betöltés ? (
            <div className="flex justify-center p-20 text-green-600"><Loader2 className="animate-spin" size={48} /></div>
          ) : (
            <div className="space-y-4">
              {temak.map((tema) => (
                <div 
                  key={tema.id} 
                  onClick={() => setAktivTema(tema)}
                  className="bg-white p-8 rounded-[2.5rem] border border-green-50 flex justify-between items-center shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-green-900 text-xl group-hover:text-green-600 transition-colors">{tema.cim}</h3>
                      <div className="flex gap-4 text-xs font-bold text-green-500 uppercase mt-1">
                        <span className="flex items-center gap-1"><User size={14}/> {tema.szerzo}</span>
                        <span className="flex items-center gap-1"><Calendar size={14}/> {formázottDátum(tema.datum)}</span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-50 text-green-600 px-4 py-2 rounded-xl font-black text-sm">
                    {tema.hszSzam || 0} hsz
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 🟡 ÚJ TÉMA MODAL */}
      {ujTemaModal && (
        <div className="bg-white p-10 rounded-[3rem] border border-green-100 shadow-sm space-y-6 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-4">
            <button onClick={() => setUjTemaModal(false)} className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-all">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-3xl font-black text-green-900 uppercase italic">Új téma indítása</h2>
          </div>
          <form onSubmit={handleUjTema} className="space-y-4">
            <input 
              autoFocus
              type="text" 
              placeholder="Mi legyen a téma címe?" 
              value={ujTemaCim}
              onChange={(e) => setUjTemaCim(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-green-100 bg-green-50/50 outline-none focus:ring-2 focus:ring-green-400 font-bold text-gray-800"
            />
            <div className="flex justify-end gap-3">
              <button type="submit" className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-green-700 transition-all">Téma mentése</button>
            </div>
          </form>
        </div>
      )}

      {/* 🔴 TÉMA BELSŐ NÉZET */}
      {aktivTema && (
        <div className="space-y-8 animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-4">
            <button onClick={() => setAktivTema(null)} className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-3xl font-black text-green-900 uppercase italic">{aktivTema.cim}</h2>
              <p className="text-xs font-bold text-green-600 uppercase mt-1">Indította: {aktivTema.szerzo} • {formázottDátum(aktivTema.datum)}</p>
            </div>
          </div>

          <div className="space-y-4">
            {kommentek.map((h: any) => (
              <div key={h.id} className="bg-white p-6 rounded-[2.5rem] border border-green-50 shadow-sm">
                <div className="flex justify-between items-center border-b border-green-50 pb-2 mb-2">
                  <span className="font-black text-green-900 text-sm flex items-center gap-1"><User size={14} className="text-green-600" /> {h.szerzo}</span>
                  <span className="text-[10px] font-bold text-green-300 uppercase">{formázottDátum(h.datum)}</span>
                </div>
                <p className="text-green-800 font-medium text-sm">{h.szoveg}</p>
              </div>
            ))}
          </div>

          {bejelentkezettUser ? (
            <form onSubmit={handleUjKomment} className="bg-white p-4 rounded-[2.5rem] border border-green-100 shadow-xl flex items-center gap-4">
              <input 
                type="text" 
                placeholder="Írd meg a véleményed..." 
                value={ujKommentSzoveg}
                onChange={(e) => setUjKommentSzoveg(e.target.value)}
                className="flex-1 px-6 py-4 rounded-2xl border-none bg-green-50/30 outline-none font-bold text-sm"
              />
              <button type="submit" className="bg-green-600 text-white p-4 rounded-2xl hover:bg-green-700 transition-all"><Send size={20} /></button>
            </form>
          ) : (
            <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 text-center font-bold text-amber-700 text-sm italic">
                🔒 A hozzászóláshoz be kell jelentkezned!
            </div>
          )}
        </div>
      )}
    </main>
  );
}
"use client";
import React, { useState, useEffect } from 'react';
import { User, Calendar, MessageCircle, Send, Plus, ArrowLeft, Loader2, Lock, Heart } from 'lucide-react';

export default function ForumPage() {
  const [bejelentkezettUser, setBejelentkezettUser] = useState<any>(null);
  const [temak, setTemak] = useState<any[]>([]);
  const [aktivTema, setAktivTema] = useState<any>(null);
  const [kommentek, setKommentek] = useState<any[]>([]);
  const [likedTemak, setLikedTemak] = useState<number[]>([]); 
  
  const [betöltés, setBetöltés] = useState(true);
  const [ujTemaModal, setUjTemaModal] = useState(false);
  const [ujTemaCim, setUjTemaCim] = useState("");
  const [ujKommentSzoveg, setUjKommentSzoveg] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setBejelentkezettUser(user);
      fetchUserLikes(user.id); 
    }
    fetchTemak();
  }, []);

  useEffect(() => {
    if (aktivTema) {
      fetchKommentek(aktivTema.id);
    }
  }, [aktivTema]);

  const fetchTemak = async () => {
    try {
      setBetöltés(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/temak`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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

  const fetchUserLikes = async (userId: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/likes/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      });
      const json = await res.json();
      if (json.success) setLikedTemak(json.data);
    } catch (err) {
      console.error("Hiba a likeok lekérésekor:", err);
    }
  };

  const fetchKommentek = async (temaId: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/kommentek/${temaId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      });
      const json = await res.json();
      if (json.success) setKommentek(json.data);
    } catch (err) {
      console.error("Hiba a kommentek lekérésekor:", err);
    }
  };

  const handleLikeToggle = async (e: React.MouseEvent, temaId: number) => {
    e.stopPropagation(); 
    if (!bejelentkezettUser) return alert("A lájkoláshoz be kell jelentkezned!");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          tema_id: temaId,
          user_id: bejelentkezettUser.id
        })
      });
      const json = await res.json();
      
      if (json.success) {
        if (json.liked) {
          setLikedTemak([...likedTemak, temaId]);
        } else {
          setLikedTemak(likedTemak.filter(id => id !== temaId));
        }
        fetchTemak(); 
      }
    } catch (err) {
      console.error("Hiba a lájkolásnál:", err);
    }
  };

  const handleUjTema = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ujTemaCim.trim() || !bejelentkezettUser) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/temak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ cim: ujTemaCim, user_id: bejelentkezettUser.id })
      });

      if (res.ok) {
        setUjTemaCim("");
        setUjTemaModal(false);
        fetchTemak();
      }
    } catch (err) {
      console.error("Hiba a mentéskor:", err);
    }
  };

  const handleUjKomment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ujKommentSzoveg.trim() || !aktivTema || !bejelentkezettUser) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/kommentek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          tema_id: aktivTema.id,
          user_id: bejelentkezettUser.id,
          szoveg: ujKommentSzoveg
        })
      });

      if (res.ok) {
        setUjKommentSzoveg("");
        fetchKommentek(aktivTema.id);
        fetchTemak(); 
      }
    } catch (err) {
      console.error("Hiba a komment küldésekor:", err);
    }
  };

  const formázottDátum = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('hu-HU');
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
        
        {!aktivTema && !ujTemaModal && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-black text-green-900 dark:text-green-400 uppercase italic tracking-tighter">Fórum</h1>
              {bejelentkezettUser ? (
                <button 
                  onClick={() => setUjTemaModal(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs shadow-md hover:bg-green-700 flex items-center gap-2 transition-all"
                >
                  <Plus size={16} /> Új téma indítása
                </button>
              ) : (
                <div className="text-xs font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 rounded-xl flex items-center gap-2">
                  <Lock size={14} /> Jelentkezz be az indításhoz!
                </div>
              )}
            </div>

            {betöltés ? (
              <div className="flex justify-center p-20 text-green-600 dark:text-green-500"><Loader2 className="animate-spin" size={48} /></div>
            ) : (
              <div className="space-y-4">
                {temak.map((tema) => (
                  <div 
                    key={tema.id} 
                    onClick={() => setAktivTema(tema)}
                    className="bg-card p-8 rounded-[2.5rem] border border-card-border flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-all group cursor-pointer gap-4 md:gap-0"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex shrink-0 items-center justify-center text-green-600 dark:text-green-500 group-hover:bg-green-600 group-hover:text-white dark:group-hover:bg-green-500 dark:group-hover:text-white transition-all">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <h3 className="font-black text-foreground text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{tema.cim}</h3>
                        <div className="flex flex-wrap gap-4 text-xs font-bold text-green-600/70 dark:text-green-500/70 uppercase mt-1">
                          <span className="flex items-center gap-1"><User size={14}/> {tema.szerzo}</span>
                          <span className="flex items-center gap-1"><Calendar size={14}/> {formázottDátum(tema.datum)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <button 
                        onClick={(e) => handleLikeToggle(e, tema.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-sm transition-all border ${
                          likedTemak.includes(tema.id) 
                            ? 'bg-red-50 border-red-100 text-red-500 dark:bg-red-950/30 dark:border-red-900/30' 
                            : 'bg-background border-card-border text-text-muted hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30'
                        }`}
                      >
                        <Heart size={16} className={likedTemak.includes(tema.id) ? "fill-current" : ""} />
                        {tema.likeSzam || 0}
                      </button>

                      <span className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl font-black text-sm">
                        {tema.hszSzam || 0} hsz
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {ujTemaModal && (
          <div className="bg-card p-8 md:p-10 rounded-[3rem] border border-card-border shadow-sm space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-4">
              <button onClick={() => setUjTemaModal(false)} className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-900/40 transition-all">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-green-900 dark:text-green-400 uppercase italic">Új téma indítása</h2>
            </div>
            <form onSubmit={handleUjTema} className="space-y-4">
              <input 
                autoFocus
                type="text" 
                placeholder="Mi legyen a téma címe?" 
                value={ujTemaCim}
                onChange={(e) => setUjTemaCim(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-card-border bg-background outline-none focus:ring-2 focus:ring-green-400 font-bold text-foreground placeholder:text-text-muted transition-colors"
              />
              <div className="flex justify-end gap-3">
                <button type="submit" className="w-full md:w-auto bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-green-700 transition-all">
                  Téma mentése
                </button>
              </div>
            </form>
          </div>
        )}

        {aktivTema && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setAktivTema(null)} className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-900/40 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-green-900 dark:text-green-400 uppercase italic">{aktivTema.cim}</h2>
                  <p className="text-xs font-bold text-green-600 dark:text-green-500 uppercase mt-1">Indította: {aktivTema.szerzo} • {formázottDátum(aktivTema.datum)}</p>
                </div>
              </div>
              
              <button 
                onClick={(e) => handleLikeToggle(e, aktivTema.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all border ${
                  likedTemak.includes(aktivTema.id) 
                    ? 'bg-red-50 border-red-100 text-red-500 dark:bg-red-950/30 dark:border-red-900/30' 
                    : 'bg-background border-card-border text-text-muted hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30'
                }`}
              >
                <Heart size={18} className={likedTemak.includes(aktivTema.id) ? "fill-current" : ""} />
                Lájk
              </button>
            </div>

            <div className="space-y-4">
              {kommentek.map((h: any) => (
                <div key={h.id} className="bg-card p-6 rounded-[2.5rem] border border-card-border shadow-sm transition-colors">
                  <div className="flex justify-between items-center border-b border-card-border pb-2 mb-3">
                    <span className="font-black text-foreground text-sm flex items-center gap-1">
                      <User size={14} className="text-green-600 dark:text-green-500" /> {h.szerzo}
                    </span>
                    <span className="text-[10px] font-bold text-text-muted uppercase">{formázottDátum(h.datum)}</span>
                  </div>
                  <p className="text-text-muted font-medium text-sm whitespace-pre-wrap">{h.szoveg}</p>
                </div>
              ))}
            </div>

            {bejelentkezettUser ? (
              <form onSubmit={handleUjKomment} className="bg-card p-4 rounded-[2.5rem] border border-card-border shadow-xl flex items-center gap-4 transition-colors">
                <input 
                  type="text" 
                  placeholder="Írd meg a véleményed..." 
                  value={ujKommentSzoveg}
                  onChange={(e) => setUjKommentSzoveg(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-2xl border-none bg-background outline-none font-bold text-sm text-foreground placeholder:text-text-muted transition-colors"
                />
                <button type="submit" className="bg-green-600 text-white p-4 rounded-2xl hover:bg-green-700 transition-all">
                  <Send size={20} />
                </button>
              </form>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/50 text-center font-bold text-amber-700 dark:text-amber-500 text-sm italic transition-colors">
                🔒 A hozzászóláshoz be kell jelentkezned!
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
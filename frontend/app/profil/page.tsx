"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// az összes szükséges ikon importja
import { User, LogOut, Heart, Award, Mountain, BarChart } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [turak, setTurak] = useState<any[]>([]);
  const [kedvencIds, setKedvencIds] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setUser(u);
        
        // ÚTVONAL: Biztosítjuk, hogy a szerver portja és címe pontos
        fetch(`http://localhost:5000/api/turak/kedvencek/${u.id}`)
          .then(res => {
            if (!res.ok) throw new Error("404 vagy Szerver hiba");
            return res.json();
          })
          .then(data => {
            if (data.success && data.data) {
              const ids = data.data.map((k: any) => k.id || k.tura_id);
              setKedvencIds(ids);
              localStorage.setItem('kedvenc_turak', JSON.stringify(ids));
            }
          })
          .catch(err => console.error("Hiba:", err));
      } else {
        router.push('/bejelentkezes');
      }
    }

    fetch('http://localhost:5000/api/turak')
      .then(res => res.json())
      .then(data => setTurak(data.data || []))
      .catch(console.error);
  }, [router]);

  const kedvencTurak = turak.filter(t => kedvencIds.includes(t.id));

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/bejelentkezes');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4]">Betöltés...</div>;

  return (
    <main className="flex-1 p-10 max-w-4xl mx-auto space-y-10 mt-6">
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-green-50 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 bg-green-100 dark:bg-zinc-800 rounded-[2.5rem] flex items-center justify-center text-green-600">
          <User size={64} />
        </div>
        <div className="space-y-2 text-center md:text-left flex-1">
          <h1 className="text-4xl font-black text-green-900 dark:text-white uppercase italic">{user.nev}</h1>
          <p className="text-green-700/60 font-bold text-sm">📧 {user.email}</p>
          <button onClick={handleLogout} className="mt-4 flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={18} /> Kijelentkezés
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-green-50 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-red-500 font-black uppercase italic">
            <Heart size={24} fill="currentColor" /> <span>Kedvenc túráim</span>
          </div>
          <div className="space-y-3">
            {kedvencTurak.length > 0 ? kedvencTurak.map(t => (
              <div key={t.id} className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl flex items-center gap-4 border border-transparent hover:border-green-100 transition-all">
                <div className="w-10 h-10 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                  <Mountain size={20} />
                </div>
                <div>
                  <p className="font-black text-green-900 dark:text-white text-sm leading-tight">{t.nev}</p>
                  <p className="text-[10px] font-bold text-green-600/50 uppercase tracking-widest">{t.helyszin}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-400 font-bold italic py-4">Még nincsenek kedvenc túráid.</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-green-50 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-green-600 font-black uppercase italic">
            <BarChart size={24} /> <span>Eredményeim</span>
          </div>
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-yellow-100 dark:border-yellow-900/30">🏅</div>
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-blue-100 dark:border-blue-900/30">🏔️</div>
          </div>
        </div>
      </div>
    </main>
  );
}
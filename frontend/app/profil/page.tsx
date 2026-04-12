"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// JELVÉNYEK MODOSÍTÁS: Új ikonok importálása
import { User, LogOut, Heart, Mountain, BarChart, Award, Camera, MessageSquare, UserPlus, HelpCircle } from 'lucide-react';

// Segédfüggvény az ikonok dinamikus megjelenítéséhez
const IconRenderer = ({ name, size = 24 }: { name: string, size?: number }) => {
  const icons: any = {
    Award, Mountain, MessageSquare, Camera, UserPlus
  };
  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent size={size} />;
};

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [turak, setTurak] = useState<any[]>([]);
  const [kedvencIds, setKedvencIds] = useState<number[]>([]);
  // JELVÉNYEK MODOSÍTÁS: Új state a jelvényeknek
  const [jelvenyek, setJelvenyek] = useState<any[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setUser(u);
        
        // Kedvencek lekérése
        fetch(`http://localhost:5000/api/turak/kedvencek/${u.id}`)
          .then(res => res.ok ? res.json() : Promise.reject())
          .then(data => {
            if (data.success && data.data) {
              const ids = data.data.map((k: any) => k.id || k.tura_id);
              setKedvencIds(ids);
            }
          })
          .catch(err => console.error("Hiba:", err));

        // JELVÉNYEK MODOSÍTÁS: Jelvények lekérése a backendről
        fetch(`http://localhost:5000/api/jelvenyek/user/${u.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) setJelvenyek(data.data);
          })
          .catch(err => console.error("Jelvény hiba:", err));

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

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-background text-green-900 dark:text-green-500 uppercase italic text-2xl font-black">Betöltés...</div>;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-10 mt-6">
        
        {/* Profil Kártya */}
        <div className="bg-card p-8 md:p-10 rounded-[3rem] shadow-sm border border-card-border flex flex-col md:flex-row items-center gap-8 transition-colors duration-300">
          <div className="w-32 h-32 bg-green-50 dark:bg-green-900/20 rounded-[2.5rem] flex shrink-0 items-center justify-center text-green-600 dark:text-green-500 transition-colors">
            <User size={64} />
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-green-900 dark:text-green-400 uppercase italic">{user.nev}</h1>
            <p className="text-text-muted font-bold text-sm">📧 {user.email}</p>
            <button onClick={handleLogout} className="mt-4 mx-auto md:mx-0 flex items-center justify-center md:justify-start gap-2 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-xl px-4 py-3 md:py-2 font-bold text-sm hover:bg-red-500 hover:text-white transition-all">
              <LogOut size={18} /> Kijelentkezés
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Kedvencek Kártya */}
          <div className="bg-card p-8 rounded-[2.5rem] border border-card-border shadow-sm space-y-4 transition-colors duration-300">
            <div className="flex items-center gap-3 text-red-500 dark:text-red-400 font-black uppercase italic">
              <Heart size={24} fill="currentColor" /> <span>Kedvenc túráim</span>
            </div>
            <div className="space-y-3">
              {kedvencTurak.length > 0 ? kedvencTurak.map(t => (
                <div key={t.id} className="p-4 bg-background border border-card-border rounded-2xl flex items-center gap-4 hover:border-green-500 dark:hover:border-green-500 transition-all">
                  <div className="w-10 h-10 bg-card rounded-xl flex shrink-0 items-center justify-center text-green-600 dark:text-green-500 shadow-sm transition-colors">
                    <Mountain size={20} />
                  </div>
                  <div>
                    <p className="font-black text-foreground text-sm leading-tight">{t.nev}</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-0.5">{t.helyszin}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-text-muted font-bold italic py-4">Még nincsenek kedvenc túráid.</p>
              )}
            </div>
          </div>

          {/* JELVÉNYEK MODOSÍTÁS: Frissített Eredmények/Jelvények Kártya */}
          <div className="bg-card p-8 rounded-[2.5rem] border border-card-border shadow-sm space-y-4 transition-colors duration-300 h-fit">
            <div className="flex items-center gap-3 text-green-600 dark:text-green-400 font-black uppercase italic">
              <Award size={24} /> <span>Eredményeim</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {jelvenyek.length > 0 ? (
                jelvenyek.map((j, index) => (
                  <div key={index} className="group relative flex flex-col items-center">
                    <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center text-yellow-600 dark:text-yellow-500 shadow-sm border border-yellow-100 dark:border-yellow-900/30 transition-all hover:scale-110">
                      <IconRenderer name={j.ikon} size={28} />
                    </div>
                    {/* Kis tooltip vagy felirat a névnek */}
                    <p className="text-[10px] font-bold text-center mt-2 uppercase text-text-muted">{j.nev}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-muted font-bold italic py-4 col-span-3">Még nincsenek jelvényeid.</p>
              )}
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
}
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut, Map, Award } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Ha nincs belépve, visszadobjuk a loginra
        router.push('/bejelentkezes');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/bejelentkezes');
  };

  // Amíg töltődik a localStorage kiolvasása
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4]">
        <p className="font-bold text-green-800 text-lg animate-pulse">Profil betöltése...</p>
      </div>
    );
  }

  return (
    <main className="flex-1 p-10 max-w-4xl mx-auto space-y-10 mt-6">
      
      {/* 👤 FELHASZNÁLÓI KÁRTYA */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-green-50 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 bg-green-100 rounded-[2.5rem] flex items-center justify-center text-green-600 flex-shrink-0">
          <User size={64} />
        </div>
        
        <div className="space-y-2 text-center md:text-left flex-1">
          <h1 className="text-4xl font-black text-green-900 uppercase italic">
            {user.nev} {/*  Valódi név kiírása */}
          </h1>
          <p className="text-green-700/60 font-bold text-sm">
            📧 {user.email || "Nincs megadott email"}
          </p>
          <p className="text-green-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-1">
            <Award size={14} /> 
            {user.role === 'admin' ? 'Rendszergazda' : 'Vándor Túrázó'}
          </p>
          
          <div className="flex justify-center md:justify-start gap-4 pt-2">
            <button className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white transition-all">
              <Settings size={18} /> Beállítások
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut size={18} /> Kijelentkezés
            </button>
          </div>
        </div>
      </div>

      {/* 📊 STATISZTIKA ÉS KITÜNTETÉSEK */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Túrák */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-green-50 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-green-600 font-black uppercase italic">
            <Map size={24} /> <span>Legutóbbi túráim</span>
          </div>
          <ul className="space-y-3 font-bold text-green-800/60">
            <li className="p-4 bg-green-50/30 rounded-2xl flex justify-between items-center">
              <span>Prédikálószék</span> 
              <span className="text-green-400 text-xs bg-white px-2 py-1 rounded-lg">2025.10.12.</span>
            </li>
            <li className="p-4 bg-green-50/30 rounded-2xl flex justify-between items-center">
              <span>Szalajka-völgy</span> 
              <span className="text-green-400 text-xs bg-white px-2 py-1 rounded-lg">2025.08.15.</span>
            </li>
          </ul>
        </div>

        {/* Eredmények */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-green-50 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-green-600 font-black uppercase italic">
            <Award size={24} /> <span>Eredményeim</span>
          </div>
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-yellow-100" title="Új tag!">🏅</div>
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-blue-100" title="Természetjáró">🏔️</div>
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-green-100" title="Első bejelentkezés">💬</div>
          </div>
        </div>
      </div>
    </main>
  );
}
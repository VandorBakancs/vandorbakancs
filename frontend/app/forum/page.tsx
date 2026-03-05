"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { MessageSquare, User, Clock, ChevronRight, Mountain, Layers, Map, BookOpen, Plus } from 'lucide-react';

export default function ForumPage() {
  const temak = [
    { id: 1, cim: "Börzsönyi tippek kezdőknek", szerzo: "TúraElek", hsz: 12, ido: "2 órája" },
    { id: 2, cim: "Erdélyi túraútvonalak tapasztalatok", szerzo: "HegyiVandor", hsz: 45, ido: "5 órája" },
    { id: 3, cim: "Milyen bakancsot ajánlotok?", szerzo: "KovácsPéter", hsz: 8, ido: "1 napja" },
  ];

  return (
    <div className="min-h-screen flex bg-[#f0fdf4]">
      {/* SIDEBAR - Ugyanaz mint a főoldalon */}
      <aside className="w-72 bg-white border-r border-green-100 p-8 hidden lg:block sticky top-0 h-screen shadow-sm">
        <div className="mb-16 px-2 text-2xl font-black text-green-600 flex items-center gap-2">
            <Mountain size={32} />
            <span>VándorBakancs</span>
        </div>
        <div className="mb-12 px-2">
          <h2 className="text-sm font-black text-green-800 uppercase tracking-widest mb-6">Menü</h2>
          <nav className="space-y-3 font-bold">
            <Link href="/" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><Layers size={20}/> Fórum</Link>
            <Link href="/rolunk" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><BookOpen size={20}/> Rólunk</Link>
            <Link href="/turak" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><Map size={20}/> Túrák</Link>
            <Link href="/forum" className="flex items-center gap-4 p-4 rounded-2xl bg-green-600 text-white shadow-lg"><MessageSquare size={20}/> Fórum</Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
        <Navbar />
        <div className="p-8 max-w-5xl mx-auto space-y-10">
          <header className="flex justify-between items-center mt-6">
            <h1 className="text-4xl font-black text-green-900 uppercase italic">Fórum</h1>
            <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-2 shadow-lg hover:bg-green-700 transition-all">
              <Plus size={18} /> Új téma
            </button>
          </header>

          <div className="grid gap-4">
            {temak.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-[2.5rem] border border-green-50 flex justify-between items-center shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-green-900 text-xl group-hover:text-green-600 transition-colors">{t.cim}</h3>
                    <div className="flex gap-4 text-[10px] font-bold text-green-400 uppercase tracking-widest mt-1">
                      <span className="flex items-center gap-1.5"><User size={14}/> {t.szerzo}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14}/> {t.ido}</span>
                      <span className="text-green-600">{t.hsz} hozzászólás</span>
                    </div>
                  </div>
                </div>
                <button className="bg-green-50 text-green-600 p-4 rounded-2xl hover:bg-green-600 hover:text-white transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
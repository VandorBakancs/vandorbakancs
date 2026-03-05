"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { User, Settings, LogOut, Map, Mountain, Layers, MessageSquare, BookOpen, Award } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex bg-[#f0fdf4]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-green-100 p-8 hidden lg:block sticky top-0 h-screen shadow-sm">
        <div className="mb-16 px-2 text-2xl font-black text-green-600 flex items-center gap-2">
            <Mountain size={32} />
            <span>VándorBakancs</span>
        </div>
        <div className="mb-12 px-2">
          <h2 className="text-sm font-black text-green-800 uppercase tracking-widest mb-6">Menü</h2>
          <nav className="space-y-3 font-bold">
            <Link href="/" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><Layers size={20}/> Főoldal</Link>
            <Link href="/rolunk" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><BookOpen size={20}/> Rólunk</Link>
            <Link href="/turak" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><Map size={20}/> Túrák</Link>
            <Link href="/forum" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><MessageSquare size={20}/> Fórum</Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
        <Navbar />
        <div className="p-10 max-w-4xl mx-auto space-y-10 mt-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-green-50 flex items-center gap-8">
            <div className="w-32 h-32 bg-green-100 rounded-[2.5rem] flex items-center justify-center text-green-600">
              <User size={64} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-green-900 uppercase italic">Túra Elek</h1>
              <p className="text-green-400 font-bold uppercase tracking-widest text-xs">Aranyfokozatú vándor</p>
              <div className="flex gap-4 pt-2">
                <button className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white transition-all">
                  <Settings size={18} /> Beállítások
                </button>
                <button className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all">
                  <LogOut size={18} /> Kijelentkezés
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-green-50 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-green-600 font-black uppercase italic">
                <Map size={24} /> <span>Legutóbbi túráim</span>
              </div>
              <ul className="space-y-3 font-bold text-green-800/60">
                <li className="p-4 bg-green-50/30 rounded-2xl flex justify-between"><span>Prédikálószék</span> <span className="text-green-400 text-xs">2024.03.01.</span></li>
                <li className="p-4 bg-green-50/30 rounded-2xl flex justify-between"><span>Börzsöny-csúcs</span> <span className="text-green-400 text-xs">2024.02.15.</span></li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-green-50 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-green-600 font-black uppercase italic">
                <Award size={24} /> <span>Eredményeim</span>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600" title="10+ túra">🏅</div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600" title="Erdélyi kalandor">🏔️</div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600" title="Fórum tag">💬</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
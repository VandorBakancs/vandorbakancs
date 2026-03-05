"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { Mountain, Layers, Map, MessageSquare, BookOpen, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex bg-[#f0fdf4]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-green-100 p-8 hidden lg:block sticky top-0 h-screen shadow-sm">
        <div className="mb-16 px-2 text-2xl font-black text-green-600 flex items-center gap-2">
            <Mountain size={32} />
            <span>VándorBakancs</span>
        </div>
        <div className="mb-12 px-2">
          <h2 className="text-sm font-black text-green-800 uppercase tracking-widest mb-6 font-bold">Menü</h2>
          <nav className="space-y-3 font-bold">
            <Link href="/" className="flex items-center gap-4 p-4 rounded-2xl bg-green-600 text-white shadow-lg transition-all">
                <Layers size={20}/> Főoldal
            </Link>
            <Link href="/rolunk" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all">
                <BookOpen size={20}/> Rólunk
            </Link>
            <Link href="/turak" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all">
                <Map size={20}/> Túrák
            </Link>
            <Link href="/forum" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all">
                <MessageSquare size={20}/> Fórum
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
        <Navbar />
        <div className="p-10 max-w-5xl mx-auto space-y-16 mt-20">
          <section className="text-center space-y-4">
            <h1 className="text-6xl font-black text-green-900 uppercase italic">Üdvözlünk!</h1>
            <p className="text-xl text-green-700 max-w-2xl mx-auto font-medium leading-relaxed">
              Fedezd fel a legszebb túraútvonalakat! Csatlakozz hozzánk, és járd be Magyarország, illetve Erdély legcsodálatosabb tájait.
            </p>
            <Link href="/turak" className="inline-block bg-green-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-xl hover:bg-green-700 transition-all">
              Túrák böngészése
            </Link>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-green-50 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-green-900">Rólunk</h2>
              <p className="text-green-800/60 font-medium">Ismerd meg a VándorBakancs történetét és céljait.</p>
              <Link href="/rolunk" className="inline-block bg-green-50 text-green-600 px-8 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-600 hover:text-white transition-all">Tovább</Link>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-green-50 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-green-900">Fórum</h2>
              <p className="text-green-800/60 font-medium">Beszélgess más túrázókkal és oszd meg az élményeid.</p>
              <Link href="/forum" className="inline-block bg-green-50 text-green-600 px-8 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-600 hover:text-white transition-all">Tovább</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
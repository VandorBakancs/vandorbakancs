"use client";
import React from 'react';
import Link from 'next/link';
import { Compass, Map, MessageSquare, ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="p-10 max-w-6xl mx-auto space-y-16">
      {/* Hero szekció */}
      <section className="text-center pt-10 space-y-6">
        <h1 className="text-7xl font-black text-green-900 italic uppercase tracking-tighter">
          Üdvözlünk!
        </h1>
        <p className="text-xl text-green-800/60 font-bold max-w-2xl mx-auto leading-relaxed">
          Fedezd fel a legszebb túraútvonalakat! Csatlakozz hozzánk, és járd be Magyarország, illetve Erdély legcsodálatosabb tájait.
        </p>
        <Link href="/turak" className="inline-block bg-green-600 text-white px-10 py-5 rounded-3xl font-black uppercase text-sm shadow-xl shadow-green-200 hover:scale-105 transition-all">
          Túrák böngészése
        </Link>
      </section>

      {/* Kártyák */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-green-50 space-y-6 group">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
            <Compass size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-green-900 italic uppercase">Rólunk</h2>
            <p className="text-green-800/50 font-bold mt-2">Ismerj meg minket jobban és tudd meg, miért szeretünk túrázni.</p>
          </div>
          <Link href="/rolunk" className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-100 transition-all">
            Tovább <ChevronRight size={14} />
          </Link>
        </div>

        <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-green-50 space-y-6 group">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
            <MessageSquare size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-green-900 italic uppercase">Fórum</h2>
            <p className="text-green-800/50 font-bold mt-2">Beszélgess más túrázókkal és oszd meg az élményeidet.</p>
          </div>
          <Link href="/forum" className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-100 transition-all">
            Tovább <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
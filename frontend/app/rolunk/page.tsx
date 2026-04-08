"use client";
import React from 'react';
import { Target, Heart, Users, Mail } from 'lucide-react';

export default function RolunkPage() {
  return (
    /* JAVÍTVA: A fő háttér fix halványzöld, sötétben is (bg-[#f0fdf4]). Nincs sötét mód. */
    <main className="min-h-screen p-10 max-w-5xl mx-auto space-y-12 transition-colors duration-300 bg-[#f0fdf4]">
      
      {/* Cím fix mélyzöld (text-green-900). */}
      <h1 className="text-4xl font-black text-green-900 uppercase italic tracking-tighter">
        Rólunk
      </h1>
      
      {/* JAVÍTVA: A nagy kártya háttere fehér, kapott vékony halványzöld keretet (border border-green-100), finom shadow-t. Nincs sötét mód. */ }
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-green-100 space-y-10 transition-colors duration-300">
        
        {/* 1. CÉLUNK */}
        <div className="flex items-start gap-6">
          <div className="bg-green-50 p-4 rounded-2xl text-green-600 shrink-0">
            <Target size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 uppercase italic">Célunk</h2>
            <p className="text-green-800/70 font-bold mt-2 leading-relaxed">
              Szeretnénk egy olyan központi platformot biztosítani a természetjárók számára, ahol bárki könnyen megtalálhatja a számára ideális túraútvonalat, legyen szó kezdőről vagy profi hegymászóról.
            </p>
          </div>
        </div>

        {/* 2. SZENVEDÉLYÜNK */}
        <div className="flex items-start gap-6 border-t border-green-50 pt-8">
          <div className="bg-green-50 p-4 rounded-2xl text-green-600 shrink-0">
            <Heart size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 uppercase italic">Szenvedélyünk</h2>
            <p className="text-green-800/70 font-bold mt-2 leading-relaxed">
              Hisszük, hogy a természetben töltött idő nem csupán kikapcsolódás, hanem lehetőség a fejlődésre és a feltöltődésre. A VándorBakancsot azért hoztuk létre, hogy ezt az élményt mindenki számára elérhetővé tegyük.
            </p>
          </div>
        </div>

        {/* 3. KÖZÖSSÉG */}
        <div className="flex items-start gap-6 border-t border-green-50 pt-8">
          <div className="bg-green-50 p-4 rounded-2xl text-green-600 shrink-0">
            <Users size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 uppercase italic">Közösség</h2>
            <p className="text-green-800/70 font-bold mt-2 leading-relaxed">
              Oldalunk motorja a segítőkész túrázó társadalom. Platformunkon a tapasztalt vándorok tanácsokkal láthatják el az újonnan érkezőket, megoszthatják történeteiket, and a fórumon keresztül valódi kapcsolatokat építhetnek más természetbarátokkal.
            </p>
          </div>
        </div>

        {/* 4. ELÉRHETŐSÉG */}
        <div className="flex items-start gap-6 border-t border-green-50 pt-8">
          <div className="bg-green-50 p-4 rounded-2xl text-green-600 shrink-0">
            <Mail size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 uppercase italic">Kapcsolat</h2>
            <p className="text-green-800/70 font-bold mt-2 leading-relaxed">
              Észrevételed van, vagy szívesen csatlakoznál a fejlesztői munkához? Vedd fel velünk a kapcsolatot az alábbi címen:
            </p>
            {/* Kapcsolati doboz fix halványzöld háttér, sötétzöld felirat. */}
            <div className="mt-4 p-5 bg-green-50 rounded-3xl border-2 border-dashed border-green-200 flex items-center justify-center">
               <span className="text-green-700 font-black tracking-widest uppercase text-xl text-center">
                 majd ide
               </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
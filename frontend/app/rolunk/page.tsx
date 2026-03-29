"use client";
import React from 'react';
import { Target, Heart, Users, Mail } from 'lucide-react';

export default function RolunkPage() {
  return (
    <main className="p-10 max-w-5xl mx-auto space-y-12 transition-colors duration-300">
      <h1 className="text-4xl font-black text-green-900 dark:text-white uppercase italic tracking-tighter">
        Rólunk
      </h1>
      
      <div className="bg-white dark:bg-zinc-800 p-12 rounded-[3.5rem] shadow-sm border border-green-50 dark:border-zinc-700 space-y-10 transition-colors duration-300">
        
        {/* 1. CÉLUNK */}
        <div className="flex items-start gap-6">
          <div className="bg-green-50 dark:bg-zinc-700 p-4 rounded-2xl text-green-600 dark:text-green-400 shrink-0">
            <Target size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 dark:text-white uppercase italic">Célunk</h2>
            <p className="text-green-800/60 dark:text-gray-400 font-bold mt-2 leading-relaxed">
              Szeretnénk egy olyan központi platformot biztosítani a természetjárók számára, ahol bárki könnyen megtalálhatja a számára ideális túraútvonalat, legyen szó kezdőről vagy profi hegymászóról.
            </p>
          </div>
        </div>

        {/* 2. SZENVEDÉLYÜNK */}
        <div className="flex items-start gap-6 border-t border-green-50 dark:border-zinc-700 pt-8">
          <div className="bg-green-50 dark:bg-zinc-700 p-4 rounded-2xl text-green-600 dark:text-green-400 shrink-0">
            <Heart size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 dark:text-white uppercase italic">Szenvedélyünk</h2>
            <p className="text-green-800/60 dark:text-gray-400 font-bold mt-2 leading-relaxed">
              Hisszük, hogy a természetben töltött idő nem csupán kikapcsolódás, hanem lehetőség a fejlődésre és a feltöltődésre. A VándorBakancsot azért hoztuk létre, hogy ezt az élményt mindenki számára elérhetővé tegyük.
            </p>
          </div>
        </div>

        {/* 3. KÖZÖSSÉG */}
        <div className="flex items-start gap-6 border-t border-green-50 dark:border-zinc-700 pt-8">
          <div className="bg-green-50 dark:bg-zinc-700 p-4 rounded-2xl text-green-600 dark:text-green-400 shrink-0">
            <Users size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 dark:text-white uppercase italic">Közösség</h2>
            <p className="text-green-800/60 dark:text-gray-400 font-bold mt-2 leading-relaxed">
              Oldalunk motorja a segítőkész túrázó társadalom. Platformunkon a tapasztalt vándorok tanácsokkal láthatják el az újonnan érkezőket, megoszthatják történeteiket, és a fórumon keresztül valódi kapcsolatokat építhetnek más természetbarátokkal.
            </p>
          </div>
        </div>

        {/* 4. ELÉRHETŐSÉG */}
        <div className="flex items-start gap-6 border-t border-green-50 dark:border-zinc-700 pt-8">
          <div className="bg-green-50 dark:bg-zinc-700 p-4 rounded-2xl text-green-600 dark:text-green-400 shrink-0">
            <Mail size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 dark:text-white uppercase italic">Kapcsolat</h2>
            <p className="text-green-800/60 dark:text-gray-400 font-bold mt-2 leading-relaxed">
              Észrevételed van, vagy szívesen csatlakoznál a fejlesztői munkához? Vedd fel velünk a kapcsolatot az alábbi címen:
            </p>
            <div className="mt-4 p-5 bg-green-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-green-200 dark:border-zinc-700 flex items-center justify-center">
               <span className="text-green-700 dark:text-green-400 font-black tracking-widest uppercase text-xl text-center">
                 majd ide
               </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
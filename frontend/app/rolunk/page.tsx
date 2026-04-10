"use client";
import React from 'react';
import { Target, Heart, Users, Mail } from 'lucide-react';

export default function RolunkPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-12 transition-colors duration-300">
        
        <h1 className="text-3xl md:text-4xl font-black text-green-900 dark:text-green-400 uppercase italic tracking-tighter">
          Rólunk
        </h1>
        
        <div className="bg-card p-8 md:p-12 rounded-[3.5rem] shadow-sm border border-card-border space-y-10 transition-colors duration-300">
          
          {/* 1. CÉLUNK */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-green-600 dark:text-green-500 shrink-0 transition-colors">
              <Target size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-green-900 dark:text-green-400 uppercase italic">Célunk</h2>
              <p className="text-text-muted font-bold mt-2 leading-relaxed">
                Szeretnénk egy olyan központi platformot biztosítani a természetjárók számára, ahol bárki könnyen megtalálhatja a számára ideális túraútvonalat, legyen szó kezdőről vagy profi hegymászóról.
              </p>
            </div>
          </div>

          {/* 2. SZENVEDÉLYÜNK */}
          <div className="flex flex-col md:flex-row items-start gap-6 border-t border-card-border pt-8 transition-colors">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-green-600 dark:text-green-500 shrink-0 transition-colors">
              <Heart size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-green-900 dark:text-green-400 uppercase italic">Szenvedélyünk</h2>
              <p className="text-text-muted font-bold mt-2 leading-relaxed">
                Hisszük, hogy a természetben töltött idő nem csupán kikapcsolódás, hanem lehetőség a fejlődésre és a feltöltődésre. A VándorBakancsot azért hoztuk létre, hogy ezt az élményt mindenki számára elérhetővé tegyük.
              </p>
            </div>
          </div>

          {/* 3. KÖZÖSSÉG */}
          <div className="flex flex-col md:flex-row items-start gap-6 border-t border-card-border pt-8 transition-colors">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-green-600 dark:text-green-500 shrink-0 transition-colors">
              <Users size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-green-900 dark:text-green-400 uppercase italic">Közösség</h2>
              <p className="text-text-muted font-bold mt-2 leading-relaxed">
                Oldalunk motorja a segítőkész túrázó társadalom. Platformunkon a tapasztalt vándorok tanácsokkal láthatják el az újonnan érkezőket, megoszthatják történeteiket, és a fórumon keresztül valódi kapcsolatokat építhetnek más természetbarátokkal.
              </p>
            </div>
          </div>

          {/* 4. ELÉRHETŐSÉG */}
          <div className="flex flex-col md:flex-row items-start gap-6 border-t border-card-border pt-8 transition-colors">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-green-600 dark:text-green-500 shrink-0 transition-colors">
              <Mail size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-green-900 dark:text-green-400 uppercase italic">Kapcsolat</h2>
              <p className="text-text-muted font-bold mt-2 leading-relaxed">
                Észrevételed van, vagy szívesen csatlakoznál a fejlesztői munkához? Vedd fel velünk a kapcsolatot az alábbi címen:
              </p>
              <div className="mt-4 p-5 bg-green-50 dark:bg-green-900/10 rounded-3xl border-2 border-dashed border-green-200 dark:border-green-900/50 flex items-center justify-center transition-colors">
                 <span className="text-green-700 dark:text-green-500 font-black tracking-widest uppercase text-xl text-center">
                   majd ide
                 </span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
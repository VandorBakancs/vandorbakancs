"use client";
import React from 'react';
import { BookOpen, Target, Heart } from 'lucide-react';

export default function RolunkPage() {
  return (
    <main className="p-10 max-w-5xl mx-auto space-y-12">
      <h1 className="text-4xl font-black text-green-900 uppercase italic tracking-tighter">Rólunk</h1>
      
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-green-50 space-y-8">
        <div className="flex items-start gap-6">
          <div className="bg-green-50 p-4 rounded-2xl text-green-600">
            <Target size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 uppercase italic">Célunk</h2>
            <p className="text-green-800/60 font-bold mt-2 leading-relaxed">
              Szeretnénk közösséget építeni a természetjárók számára, ahol bárki könnyen megtalálhatja a számára ideális túraútvonalat, legyen szó kezdőről vagy profi hegymászóról.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6 border-t border-green-50 pt-8">
          <div className="bg-green-50 p-4 rounded-2xl text-green-600">
            <Heart size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-green-900 uppercase italic">Szenvedélyünk</h2>
            <p className="text-green-800/60 font-bold mt-2 leading-relaxed">
              Hisszük, hogy a természetben töltött idő feltölt és inspirál. Projektünkkel a Kárpát-medence rejtett kincseit szeretnénk közelebb hozni mindenkihez.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
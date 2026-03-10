"use client";
import React from 'react';
import { MessageSquare, User, Calendar, MessageCircle } from 'lucide-react';

export default function ForumPage() {
  // Példa adatok a fórumhoz
  const temak = [
    { id: 1, cim: "Túrafelszerelés kezdőknek", szerzo: "TúraElek", hsz: 12, datum: "2024.03.01" },
    { id: 2, cim: "Erdélyi túraútvonalak tapasztalatok", szerzo: "HegyiKecske", hsz: 45, datum: "2024.02.28" },
    { id: 3, cim: "Mátra vagy Bükk ezen a hétvégén?", szerzo: "ErdoJaro", hsz: 8, datum: "2024.03.05" }
  ];

  return (
    <main className="p-10 max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-green-900 uppercase italic tracking-tighter">Fórum</h1>
        <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs shadow-lg shadow-green-100 transition-all hover:bg-green-700">
          Új téma indítása
        </button>
      </div>

      <div className="space-y-4">
        {temak.map((tema) => (
          <div key={tema.id} className="bg-white p-8 rounded-[2.5rem] border border-green-50 flex justify-between items-center shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-black text-green-900 text-xl group-hover:text-green-600 transition-colors cursor-pointer">
                  {tema.cim}
                </h3>
                <div className="flex gap-4 text-xs font-bold text-green-500 uppercase mt-1">
                  <span className="flex items-center gap-1"><User size={14}/> {tema.szerzo}</span>
                  <span className="flex items-center gap-1"><Calendar size={14}/> {tema.datum}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-green-50 text-green-600 px-4 py-2 rounded-xl font-black text-sm">
                {tema.hsz} hsz
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
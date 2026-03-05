"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import { Mountain, Layers, Map, MessageSquare, BookOpen, Heart, Shield, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/rolunk" className="flex items-center gap-4 p-4 rounded-2xl bg-green-600 text-white shadow-lg"><BookOpen size={20}/> Rólunk</Link>
            <Link href="/turak" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><Map size={20}/> Túrák</Link>
            <Link href="/forum" className="flex items-center gap-4 p-4 rounded-2xl text-green-800/50 hover:bg-green-50 transition-all"><MessageSquare size={20}/> Fórum</Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
        <Navbar />
        <div className="p-10 max-w-5xl mx-auto space-y-16 mt-6">
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-black text-green-900 uppercase italic">Rólunk</h1>
            <p className="text-lg text-green-700 max-w-3xl mx-auto font-medium leading-relaxed">
              A Vándor Bakancs weboldal azért jött létre, hogy összehozza azokat az embereket, akiknek a természet nem csak egy hely, hanem egy életérzés.
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { ikon: <Heart />, cim: "Szenvedély", leiras: "Minden túrát szívvel-lélekkel szervezünk." },
              { ikon: <Shield />, cim: "Biztonság", leiras: "Nálunk a biztonság és a felkészültség az első." },
              { ikon: <Users />, cim: "Közösség", leiras: "Több mint túrázók, mi barátok vagyunk." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-green-50 shadow-sm space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 mx-auto">
                  {item.ikon}
                </div>
                <h2 className="text-xl font-black text-green-900 uppercase italic">{item.cim}</h2>
                <p className="text-green-800/50 font-bold text-sm leading-relaxed">{item.leiras}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
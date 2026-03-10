"use client";
import React from 'react';
import Link from 'next/link';
import { Mountain, Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[3.5rem] shadow-2xl border border-green-50">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-green-50 rounded-3xl text-green-600 mb-4"><Mountain size={40}/></div>
          <h1 className="text-3xl font-black text-green-900 uppercase italic">Bejelentkezés</h1>
        </div>
        <form className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-green-600" size={20}/>
            <input type="email" placeholder="Email cím" className="w-full p-4 pl-12 rounded-2xl bg-green-50 border-none outline-none font-bold placeholder:text-green-800/60" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-green-600" size={20}/>
            <input type="password" placeholder="Jelszó" className="w-full p-4 pl-12 rounded-2xl bg-green-50 border-none outline-none font-bold placeholder:text-green-800/60" />
          </div>
          <button className="w-full bg-green-600 text-white p-5 rounded-2xl font-black uppercase shadow-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
            Belépés <LogIn size={20} />
          </button>
        </form>
        <p className="mt-6 text-center text-green-800/40 font-bold text-sm">
          Még nincs fiókod? <Link href="/regisztracio" className="text-green-600 underline">Regisztrálj!</Link>
        </p>
      </div>
    </div>
  );
}
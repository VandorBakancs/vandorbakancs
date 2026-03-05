"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mountain, User, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const [menuNyitva, setMenuNyitva] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-green-100 p-4 sticky top-0 z-50">
      <div className="max-w-[100%] mx-auto flex justify-between items-center px-4">
        {/* LOGO ÉS NÉV - BALRA TOLVA */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-green-600 rounded-xl text-white group-hover:rotate-12 transition-transform">
            <Mountain size={24} />
          </div>
          <span className="text-xl font-black text-green-900 uppercase tracking-tighter italic">VándorBakancs</span>
        </Link>

        {/* PROFIL IKON ÉS MENÜ - JOBBRA TOLVA */}
        <div className="relative">
          <button 
            onClick={() => setMenuNyitva(!menuNyitva)}
            className="p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-sm"
          >
            <User size={24} />
          </button>

          {menuNyitva && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-green-100 rounded-[2rem] shadow-2xl py-4 z-50">
              <Link href="/bejelentkezes" onClick={() => setMenuNyitva(false)} className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-green-900 hover:bg-green-50 transition-colors">
                <LogIn size={18} className="text-green-600" /> Bejelentkezés
              </Link>
              <Link href="/regisztracio" onClick={() => setMenuNyitva(false)} className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-green-900 hover:bg-green-50 transition-colors border-t border-green-50">
                <UserPlus size={18} className="text-green-600" /> Regisztráció
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
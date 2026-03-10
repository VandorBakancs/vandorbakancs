"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mountain, User, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const [menuNyitva, setMenuNyitva] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-green-50 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Bal oldal: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-green-600 p-2 rounded-lg text-white">
          <Mountain size={22} />
        </div>
        <span className="text-green-900 font-black uppercase italic tracking-tighter text-lg">
          VándorBakancs
        </span>
      </Link>

      {/* Jobb oldal: Profil ikon és Lenyíló menü */}
      <div className="relative">
        <button 
          onClick={() => setMenuNyitva(!menuNyitva)}
          className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-all outline-none"
        >
          <User size={22} />
        </button>

        {/* A Lenyíló Fül (Dropdown) */}
        {menuNyitva && (
          <>
            {/* Kattintás érzékelő a bezáráshoz */}
            <div className="fixed inset-0 z-[-1]" onClick={() => setMenuNyitva(false)}></div>
            
            <div className="absolute right-0 mt-4 w-56 bg-white border border-green-50 rounded-[2rem] shadow-xl p-3 z-50 animate-in fade-in zoom-in duration-200">
              <Link 
                href="/bejelentkezes" 
                onClick={() => setMenuNyitva(false)}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-green-800 hover:bg-green-600 hover:text-white transition-all mb-1"
              >
                <LogIn size={18} />
                Bejelentkezés
              </Link>
              <Link 
                href="/regisztracio" 
                onClick={() => setMenuNyitva(false)}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-green-800 hover:bg-green-50 hover:text-green-600 transition-all"
              >
                <UserPlus size={18} />
                Regisztráció
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
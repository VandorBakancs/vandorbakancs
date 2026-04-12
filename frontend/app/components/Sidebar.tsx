"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, BookOpen, Map, MessageSquare, ShieldCheck, Camera } from 'lucide-react'; // Beimportáltuk a Camera ikont

export default function Sidebar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Felhasználó ellenőrzése a localStorage-ból
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.role === 'admin' || user.email === 'admin@gmail.com') {
        setIsAdmin(true);
      }
    }
  }, []);

  // Alap menüpontok - Bővítve a Galériával
  const menuPontok = [
    { nev: 'Főoldal', ut: '/', ikon: <Layers size={20} /> },
    { nev: 'Rólunk', ut: '/rolunk', ikon: <BookOpen size={20} /> },
    { nev: 'Túrák', ut: '/turak', ikon: <Map size={20} /> },
    { nev: 'Fórum', ut: '/forum', ikon: <MessageSquare size={20} /> },
    { nev: 'Galéria', ut: '/galeria', ikon: <Camera size={20} /> }, // ÚJ MENÜPONT
  ];

  // Ha admin, hozzáadjuk az Admin Panelt a listához
  if (isAdmin) {
    menuPontok.push({ 
      nev: 'Admin Panel', 
      ut: '/admin', 
      ikon: <ShieldCheck size={20} className="text-yellow-500" /> 
    });
  }

  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-green-50 dark:border-zinc-800 h-screen sticky top-0 p-6 hidden lg:block transition-colors">
      <div className="mb-10 pt-4">
        <h2 className="text-green-800 dark:text-green-100 font-black uppercase tracking-widest text-sm mb-6 px-4">
          Menü
        </h2>
        <nav className="space-y-2">
          {menuPontok.map((pont) => {
            const aktiv = pathname === pont.ut;
            return (
              <Link 
                key={pont.ut} 
                href={pont.ut}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                  aktiv 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-none' 
                  : 'text-green-800/50 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-zinc-800 hover:text-green-600 dark:hover:text-white'
                }`}
              >
                {pont.ikon}
                <span className="truncate">{pont.nev}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
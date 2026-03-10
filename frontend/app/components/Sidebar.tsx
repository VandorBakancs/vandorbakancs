"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, BookOpen, Map, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuPontok = [
    { nev: 'Főoldal', ut: '/', ikon: <Layers size={20} /> },
    { nev: 'Rólunk', ut: '/rolunk', ikon: <BookOpen size={20} /> },
    { nev: 'Túrák', ut: '/turak', ikon: <Map size={20} /> },
    { nev: 'Fórum', ut: '/forum', ikon: <MessageSquare size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-green-50 h-screen sticky top-0 p-6 hidden lg:block">
      <div className="mb-10 pt-4">
        <h2 className="text-green-800 font-black uppercase tracking-widest text-sm mb-6 px-4">Menü</h2>
        <nav className="space-y-2">
          {menuPontok.map((pont) => {
            const aktiv = pathname === pont.ut;
            return (
              <Link 
                key={pont.ut} 
                href={pont.ut}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                  aktiv 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-green-800/50 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {pont.ikon}
                {pont.nev}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
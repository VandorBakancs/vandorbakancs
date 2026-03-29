"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mountain, User, LogIn, UserPlus, Sun, Moon, LogOut, Settings, Menu, X, Compass, MessageSquare, Info } from 'lucide-react';

export default function Navbar() {
  const [menuNyitva, setMenuNyitva] = useState(false);
  const [mobilMenuNyitva, setMobilMenuNyitva] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedMode);
      if (savedMode) document.documentElement.setAttribute('data-theme', 'dark');
      
      const savedUser = localStorage.getItem('user');
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    newMode ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.removeAttribute('data-theme');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMenuNyitva(false);
    setMobilMenuNyitva(false);
    router.push('/bejelentkezes');
  };

  // Ezek a linkek csak mobilon jelennek meg a hamburger gomb alatt
  const NavLinkek = [
    { nev: 'Túrák', href: '/turak', icon: <Compass size={20} /> },
    { nev: 'Fórum', href: '/forum', icon: <MessageSquare size={20} /> },
    { nev: 'Rólunk', href: '/rolunk', icon: <Info size={20} /> },
  ];

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 border-b border-green-50 dark:border-zinc-800 px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm transition-colors duration-300">
      
      {/* BAL OLDAL: LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-green-600 p-2 rounded-lg text-white">
          <Mountain size={22} />
        </div>
        <span className="text-green-900 dark:text-white font-black uppercase italic tracking-tighter text-lg">
          Vándor Bakancs
        </span>
      </Link>

      {/* JOBB OLDAL: FUNKCIÓK */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Dark Mode */}
        <button onClick={toggleDarkMode} className="p-2 bg-green-50 dark:bg-zinc-800 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 transition-all outline-none">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Felhasználói lenyíiló */}
        <div className="relative">
          <button 
            onClick={() => { setMenuNyitva(!menuNyitva); setMobilMenuNyitva(false); }}
            className={`p-2 rounded-full transition-all outline-none flex items-center gap-2 ${
              user ? 'bg-green-600 text-white px-4' : 'bg-green-50 dark:bg-zinc-800 text-green-600 dark:text-green-400'
            }`}
          >
            <User size={20} />
            {user && <span className="hidden sm:inline text-xs font-bold uppercase">{user.nev.split(" ")[0]}</span>}
          </button>

          {menuNyitva && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuNyitva(false)}></div>
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-800 border border-green-100 dark:border-zinc-700 rounded-3xl shadow-xl p-2 z-50 flex flex-col gap-1 animate-in zoom-in-95 duration-200">
                {user ? (
                  <>
                    <div className="px-4 py-3 mb-1 border-b border-green-50 dark:border-zinc-700">
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Bejelentkezve:</p>
                      <p className="font-black text-green-900 dark:text-white truncate text-sm">{user.nev}</p>
                    </div>
                    <Link href="/profil" onClick={() => setMenuNyitva(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-green-800 dark:text-gray-300 hover:bg-green-600 hover:text-white transition-all">
                      <User size={18} /> Profilom
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left">
                      <LogOut size={18} /> Kijelentkezés
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/bejelentkezes" onClick={() => setMenuNyitva(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-green-800 dark:text-gray-300 hover:bg-green-600 hover:text-white transition-all">
                      <LogIn size={18} /> Bejelentkezés
                    </Link>
                    <Link href="/regisztracio" onClick={() => setMenuNyitva(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-green-800 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-zinc-700 transition-all">
                      <UserPlus size={18} /> Regisztráció
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* MOBIL MENÜ GOMB(hamburger gomb) (csak mobilon látszik) */}
        <button 
          onClick={() => { setMobilMenuNyitva(!mobilMenuNyitva); setMenuNyitva(false); }}
          className="p-2 md:hidden bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all active:scale-95"
        >
          {mobilMenuNyitva ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBIL MENÜ PANEL (csak mobilon) */}
      {mobilMenuNyitva && (
        <div className="absolute top-[100%] left-0 w-full bg-white dark:bg-zinc-900 border-b border-green-100 dark:border-zinc-800 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {NavLinkek.map((link) => (
            <Link 
              key={link.nev} 
              href={link.href} 
              onClick={() => setMobilMenuNyitva(false)}
              className="flex items-center gap-4 text-3xl font-black uppercase italic tracking-tighter text-green-900 dark:text-white hover:text-green-600 transition-all active:translate-x-2"
            >
              <span className="text-green-600">{link.icon}</span>
              {link.nev}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
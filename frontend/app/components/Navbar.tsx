"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mountain, User, LogIn, UserPlus, Sun, Moon, LogOut, Settings } from 'lucide-react';

export default function Navbar() {
  const [menuNyitva, setMenuNyitva] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedMode);
      
      if (savedMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMenuNyitva(false);
    router.push('/bejelentkezes');
  };

  return (
    <nav className="w-full bg-white border-b border-green-50 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm transition-colors duration-300 navbar-custom">
      
      {/* Bal oldal: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-green-600 p-2 rounded-lg text-white">
          <Mountain size={22} />
        </div>
        <span className="text-green-900 font-black uppercase italic tracking-tighter text-lg logo-text">
          VándorBakancs
        </span>
      </Link>

      {/* Jobb oldal: Gombok */}
      <div className="flex items-center gap-4">
        
        {/* Dark Mode */}
        <button 
          onClick={toggleDarkMode} 
          className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-all outline-none theme-button"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Felhasználói Menü */}
        <div className="relative">
          <button 
            onClick={() => setMenuNyitva(!menuNyitva)}
            className={`p-2 rounded-full transition-all outline-none theme-button flex items-center gap-2 ${
              user ? 'bg-green-600 text-white hover:bg-green-700 px-4' : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
          >
            <User size={22} />
            {user && <span className="text-xs font-bold uppercase">{user.nev.split(" ")[0]}</span>}
          </button>

          {menuNyitva && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuNyitva(false)}></div>
              <div className="absolute right-0 md:-right-4 mt-3 w-64 bg-white border border-green-100 rounded-3xl shadow-xl p-2 z-50 flex flex-col gap-1 dropdown-custom">
                
                {user ? (
                  <>
                    <div className="px-4 py-3 mb-1 border-b border-green-50">
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Bejelentkezve:</p>
                      <p className="font-black text-green-900 truncate text-sm">{user.nev}</p>
                    </div>

                    <Link 
                      href="/profil" 
                      onClick={() => setMenuNyitva(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-green-800 hover:bg-green-600 hover:text-white transition-all"
                    >
                      <User size={18} />
                      Profilom
                    </Link>

                    {user.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        onClick={() => setMenuNyitva(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-green-800 hover:bg-green-600 hover:text-white transition-all"
                      >
                        <Settings size={18} />
                        Admin Panel
                      </Link>
                    )}

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-600 hover:bg-red-50 transition-all text-left"
                    >
                      <LogOut size={18} />
                      Kijelentkezés
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/bejelentkezes" 
                      onClick={() => setMenuNyitva(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-green-800 hover:bg-green-600 hover:text-white transition-all"
                    >
                      <LogIn size={18} />
                      Bejelentkezés
                    </Link>
                    <Link 
                      href="/regisztracio" 
                      onClick={() => setMenuNyitva(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-green-800 hover:bg-green-50 hover:text-green-600 transition-all"
                    >
                      <UserPlus size={18} />
                      Regisztráció
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
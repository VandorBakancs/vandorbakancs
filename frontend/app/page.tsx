"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, MessageSquare, ChevronRight } from 'lucide-react';

const topImages = [
  { src: '/images/borzsony.jpg', alt: 'Börzsöny' },
  { src: '/images/matra.jpg', alt: 'Mátra' },
  { src: '/images/gyilkosto.jpg', alt: 'Gyilkos-tó' },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full space-y-16 pb-16 transition-colors duration-300">
      
      {/* Képnézegető szekció */}
      <section className="relative h-[550px] w-full overflow-hidden shadow-2xl group border-b-4 border-green-600">
        {topImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover object-center" 
            />
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3 bg-black/40 px-5 py-3 rounded-full backdrop-blur-md">
          {topImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-10 space-y-24">
        
        {/* Üdvözlő szöveg */}
        <section className="text-center space-y-6">
          <h1 className="text-7xl font-black text-green-900 dark:text-white italic uppercase tracking-tighter transition-colors">
            Üdvözlünk!
          </h1>
          <p className="text-xl text-green-800/60 dark:text-gray-400 font-bold max-w-2xl mx-auto leading-relaxed">
            Fedezd fel a legszebb túraútvonalakat! Csatlakozz hozzánk, és járd be Magyarország, illetve Erdély legcsodálatosabb tájait.
          </p>
          <Link href="/turak" className="inline-block bg-green-600 dark:bg-green-500 text-white px-10 py-5 rounded-3xl font-black uppercase text-sm hover:scale-105 transition-all shadow-xl shadow-green-200 dark:shadow-none">
            Túrák böngészése
          </Link>
        </section>

        {/* Kártyák */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-800 p-12 rounded-[4rem] shadow-sm border border-green-50 dark:border-zinc-700 space-y-6 group transition-all">
            <div className="w-16 h-16 bg-green-50 dark:bg-zinc-700 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white transition-all">
              <Compass size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-green-900 dark:text-white italic uppercase">Rólunk</h2>
              <p className="text-green-800/50 dark:text-gray-400 font-bold mt-2">Ismerj meg minket jobban és tudd meg, miért szeretünk túrázni.</p>
            </div>
            <Link href="/rolunk" className="inline-flex items-center gap-2 bg-green-50 dark:bg-zinc-700 text-green-600 dark:text-green-400 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-100 dark:hover:bg-zinc-600 transition-all">
              Tovább <ChevronRight size={14} />
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-12 rounded-[4rem] shadow-sm border border-green-50 dark:border-zinc-700 space-y-6 group transition-all">
            <div className="w-16 h-16 bg-green-50 dark:bg-zinc-700 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white transition-all">
              <MessageSquare size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-green-900 dark:text-white italic uppercase">Fórum</h2>
              <p className="text-green-800/50 dark:text-gray-400 font-bold mt-2">Beszélgess más túrázókkal és oszd meg az élményeidet.</p>
            </div>
            <Link href="/forum" className="inline-flex items-center gap-2 bg-green-50 dark:bg-zinc-700 text-green-600 dark:text-green-400 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-100 dark:hover:bg-zinc-600 transition-all">
              Tovább <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* 🗺️ GOOGLE MAPS TÉRKÉP SZEKCIÓ */}
<section className="space-y-6 md:space-y-10 pt-5 md:pt-10">
  <div className="text-center px-4">
    <h2 className="text-4xl md:text-5xl font-black text-green-900 dark:text-white italic uppercase tracking-tighter transition-colors">
      Helyszíneink
    </h2>
    <p className="text-green-800/50 dark:text-gray-400 font-bold text-sm md:text-base">
      Fedezd fel a túráinkat az interaktív térképen!
    </p>
  </div>

  {/* Mobilbarát konténer: mobilon kisebb kerekítés, asztalin a nagy [4rem] */}
  <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[4rem] overflow-hidden border-2 md:border-4 border-white dark:border-zinc-700 shadow-2xl relative">
    <iframe 
      src="https://www.google.com/maps/d/u/1/embed?mid=1tIZkUnkbdihBCTwvZyqUjn8N2pizhIQ&ehbc=2E312F" 
      width="100%" 
      height="100%" 
      className="border-none"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</section>

      </div>
    </main>
  );
}
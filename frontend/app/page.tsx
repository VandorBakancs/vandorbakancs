"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, MessageSquare, ChevronRight } from 'lucide-react';

const topImages = [
  { src: '/images/slideshow1.jpg', alt: 'Túra élmény 1' },
  { src: '/images/slideshow2.jpg', alt: 'Túra élmény 2' },
  { src: '/images/slideshow3.jpg', alt: 'Túra élmény 3' },
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="w-full space-y-16 pb-16">
        
        {/* Slideshow szekció */}
        <section className="relative h-[600px] w-full overflow-hidden shadow-2xl group border-b-[6px] border-green-600 dark:border-green-500 transition-colors">
          {topImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10 scale-105" : "opacity-0 z-0 scale-100"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover object-center" 
                onError={(e: any) => {
                  // Ha nem találja a .jpg kiterjesztést, automatikusan megpróbálja .png-vel betölteni
                  if (e.target.src.includes('.jpg')) {
                    e.target.src = e.target.src.replace('.jpg', '.png');
                  }
                }}
              />
            </div>
          ))}
          
          {/* Navigációs pöttyök */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4 bg-black/30 px-6 py-3 rounded-full backdrop-blur-md border border-white/20">
            {topImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? "bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                    : "bg-white/50 hover:bg-white/90 hover:scale-125"
                }`}
                aria-label={`Ugrás a(z) ${index + 1}. képre`}
              />
            ))}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-24">
          
          {/* Üdvözlő szöveg szekció */}
          <section className="text-center space-y-6 mt-8">
            <h1 className="text-5xl md:text-7xl font-black text-green-900 dark:text-green-400 italic uppercase tracking-tighter drop-shadow-sm transition-colors">
              Üdvözlünk!
            </h1>
            <p className="text-lg md:text-xl text-text-muted font-bold max-w-2xl mx-auto leading-relaxed transition-colors">
              Fedezd fel a legszebb túraútvonalakat! Csatlakozz hozzánk, és járd be Magyarország, illetve Erdély legcsodálatosabb tájait.
            </p>
            <Link href="/turak" className="inline-block bg-green-600 text-white px-10 py-5 rounded-3xl font-black uppercase text-sm hover:bg-green-700 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-green-600/30">
              Túrák böngészése
            </Link>
          </section>

          {/* Kártyák */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-10 md:p-12 rounded-[3rem] shadow-lg hover:shadow-xl border border-card-border space-y-6 group transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-500 group-hover:bg-green-600 dark:group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                <Compass size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-green-900 dark:text-green-400 italic uppercase transition-colors">Rólunk</h2>
                <p className="text-text-muted font-bold mt-2 leading-relaxed transition-colors">Ismerj meg minket jobban és tudd meg, miért szeretünk túrázni.</p>
              </div>
              <Link href="/rolunk" className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-600 dark:hover:bg-green-500 hover:text-white dark:hover:text-white transition-colors shadow-sm">
                Tovább <ChevronRight size={14} />
              </Link>
            </div>

            <div className="bg-card p-10 md:p-12 rounded-[3rem] shadow-lg hover:shadow-xl border border-card-border space-y-6 group transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-500 group-hover:bg-green-600 dark:group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                <MessageSquare size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-green-900 dark:text-green-400 italic uppercase transition-colors">Fórum</h2>
                <p className="text-text-muted font-bold mt-2 leading-relaxed transition-colors">Beszélgess más túrázókkal és oszd meg az élményeidet.</p>
              </div>
              <Link href="/forum" className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-600 dark:hover:bg-green-500 hover:text-white dark:hover:text-white transition-colors shadow-sm">
                Tovább <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Térkép szekció */}
          <section className="space-y-10 pt-4 pb-10">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-green-900 dark:text-green-400 italic uppercase tracking-tighter transition-colors">Térkép</h2>
              <p className="text-text-muted font-bold mt-3 transition-colors">Fedezd fel a túráinkat az interaktív térképen!</p>
            </div>
            <div className="w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden border-[6px] border-white dark:border-zinc-800 shadow-2xl relative bg-background group transition-colors">
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10" />
              <iframe 
                src="https://www.google.com/maps/d/u/0/embed?mid=1tIZkUnkbdihBCTwvZyqUjn8N2pizhIQ&ehbc=2E312F&noprof=1"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
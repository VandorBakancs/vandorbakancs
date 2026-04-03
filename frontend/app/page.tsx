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
    /* Háttérszín fix: Pontosan az a halványzöld, ami a fórumon van */
    <main className="w-full space-y-16 pb-16 bg-green-50 transition-colors duration-300">
      
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
        <section className="text-center space-y-6">
          <h1 className="text-7xl font-black text-green-900 italic uppercase tracking-tighter">
            Üdvözlünk!
          </h1>
          <p className="text-xl text-green-800/70 font-bold max-w-2xl mx-auto leading-relaxed">
            Fedezd fel a legszebb túraútvonalakat! Csatlakozz hozzánk, és járd be Magyarország, illetve Erdély legcsodálatosabb tájait.
          </p>
          <Link href="/turak" className="inline-block bg-green-600 text-white px-10 py-5 rounded-3xl font-black uppercase text-sm hover:scale-105 transition-all  shadow-green-200">
            Túrák böngészése
          </Link>
        </section>

        {/* Kártyák - Fehér háttérrel, hogy jól látszódjanak a zöldön */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-green-100 space-y-6 group transition-all">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
              <Compass size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-green-900 italic uppercase">Rólunk</h2>
              <p className="text-green-800/60 font-bold mt-2">Ismerj meg minket jobban és tudd meg, miért szeretünk túrázni.</p>
            </div>
            <Link href="/rolunk" className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-600 hover:text-white transition-all shadow-sm">
              Tovább <ChevronRight size={14} />
            </Link>
          </div>

          <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-green-100 space-y-6 group transition-all">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
              <MessageSquare size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-green-900 italic uppercase">Fórum</h2>
              <p className="text-green-800/60 font-bold mt-2">Beszélgess más túrázókkal és oszd meg az élményeidet.</p>
            </div>
            <Link href="/forum" className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-green-600 hover:text-white transition-all shadow-sm">
              Tovább <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <section className="space-y-10 pt-10">
          <div className="text-center">
            <h2 className="text-5xl font-black text-green-900 italic uppercase tracking-tighter">Helyszíneink</h2>
            <p className="text-green-800/60 font-bold mt-2">Fedezd fel a túráinkat az interaktív térképen!</p>
          </div>
          <div className="w-full h-[500px] rounded-[4rem] overflow-hidden border-4 border-white shadow-2xl relative bg-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.337536284445!2d19.0402!3d47.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI5JzUyLjQiTiAxOcKwMDInMjQuNyJF!5e0!3m2!1shu!2shu!4v1620000000000!5m2!1shu!2shu"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </main>
  );
}
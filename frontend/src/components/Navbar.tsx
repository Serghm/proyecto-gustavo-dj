"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image'; 

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050b14]/95 backdrop-blur-md border-b border-gray-800 shadow-lg py-2' 
          : 'bg-[#050b14]/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGOTIPO REAL */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="relative w-30 h-30 group-hover:scale-105 transition-transform duration-300">
            {/* Aquí mandamos llamar a logo.png desde la carpeta public */}
            <Image 
              src="/logo.jpg" 
              alt="Logo Gustavo Delgadillo" 
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
          <div className="text-2xl font-bold tracking-wider hidden sm:block">
            <span className="text-[#D4AF37]">Gus</span>
            <span className="text-white">Delgadillo</span>
          </div>
        </a>
        
        {/* ENLACES ESCRITORIO */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-300">
            <li><a href="#inicio" className="hover:text-[#D4AF37] transition-colors duration-300">Inicio</a></li>
            <li><a href="#sobre-mi" className="hover:text-[#D4AF37] transition-colors duration-300">Sobre Mí</a></li>
            <li><a href="#cabinas" className="hover:text-[#D4AF37] transition-colors duration-300">Cabinas</a></li>
            <li><a href="#servicios" className="hover:text-[#D4AF37] transition-colors duration-300">Servicios</a></li>
            <li><a href="#eventos" className="hover:text-[#D4AF37] transition-colors duration-300">Eventos</a></li>
            <li>
              <a href="#contacto" className="bg-[#D4AF37] text-[#050b14] px-5 py-2.5 rounded-lg hover:bg-yellow-500 transition-all duration-300 font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                Cotizar
              </a>
            </li>
          </ul>
        </nav>

        {/* BOTÓN MÓVIL */}
        <button 
          className="md:hidden text-[#D4AF37] p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

      </div>

      {/* MENÚ MÓVIL */}
      <div className={`md:hidden absolute w-full bg-[#0a1526] border-b border-gray-800 transition-all duration-300 overflow-hidden ${isMobileOpen ? 'max-h-96 border-t border-gray-800' : 'max-h-0 border-none'}`}>
        <ul className="flex flex-col px-6 py-4 gap-4 text-center">
          <li><a href="#inicio" onClick={() => setIsMobileOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2">Inicio</a></li>
          <li><a href="#sobre-mi" onClick={() => setIsMobileOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2">Sobre Mí</a></li>
          <li><a href="#cabinas" onClick={() => setIsMobileOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2">Cabinas</a></li>
          <li><a href="#servicios" onClick={() => setIsMobileOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2">Servicios</a></li>
          <li><a href="#eventos" onClick={() => setIsMobileOpen(false)} className="block text-gray-300 hover:text-[#D4AF37] py-2">Eventos</a></li>
          <li><a href="#contacto" onClick={() => setIsMobileOpen(false)} className="block text-[#D4AF37] font-bold py-2">Cotizar</a></li>
        </ul>
      </div>
    </header>
  );
}
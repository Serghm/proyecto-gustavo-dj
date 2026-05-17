"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const imagenesFondo = [
    '/hero/dj-1.png',
    '/hero/dj-2.png',
    '/hero/dj-3.png'
  ];

  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenesFondo.length);
    }, 5000); 
    
    return () => clearInterval(intervalo);
  }, [imagenesFondo.length]);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-[#050b14] flex items-center justify-center">
      
      {/* Carrusel de Fondo Animado */}
      {imagenesFondo.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === imagenActual ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <Image
            src={img}
            alt={`GUSTAVO DELGADILLO DJ ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transform transition-transform ease-linear duration-[10000ms] ${
              index === imagenActual ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* Capa de oscurecimiento tipo Club Nocturno */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-[#050b14] z-10" />

      {/* Contenido Central (Espaciado agresivo para librar el menú) */}
      <div className="relative z-20 text-center px-6 w-full max-w-5xl mx-auto mt-48 md:mt-64 lg:mt-72">
        
        {/* Bloque de Identidad Tipográfica Completa */}
        <h1 className="flex flex-col items-center justify-center font-black mb-8 leading-none select-none">
          {/* "DJ" Grande, Eléctrico y Dominante */}
          <span className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFF5C3] tracking-[0.25em] font-extrabold uppercase drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] ml-6">
            DJ
          </span>
          
          {/* Nombre de pila con espaciado elegante */}
          <span className="text-3xl md:text-5xl text-white tracking-[0.35em] uppercase mt-4 ml-4 font-light">
            Gustavo
          </span>
          
          {/* Apellido de gran impacto visual */}
          <span className="text-5xl md:text-8xl lg:text-[7.5rem] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] via-[#D4AF37] to-[#997A15] tracking-tighter drop-shadow-[0_0_35px_rgba(212,175,55,0.35)] uppercase mt-1">
            Delgadillo
          </span>
        </h1>
        
        {/* Propuesta de valor encapsulada en cristal */}
        <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl mb-10">
          <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium mb-4 drop-shadow-lg">
            Convierte cualquier evento en una experiencia <span className="text-[#D4AF37] font-bold">inolvidable.</span>
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4"></div>
          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed hidden md:block">
            No se trata solo de poner canciones, sino de leer al público, mantener la energía en el punto exacto y lograr que cada momento tenga el impacto que merece.
          </p>
        </div>

        {/* Botones de Acción - Redirección interna hacia el formulario */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          {/* Cambiado de botón de WhatsApp a enlace de ancla hacia el formulario (#contacto) */}
          <a 
            href="#contacto"
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black uppercase tracking-wider font-extrabold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 select-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Reservar Fecha / Cotizar
          </a>
          
          <a 
            href="#servicios" 
            className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/40 text-white uppercase tracking-wider font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm select-none"
          >
            Ver Servicios
          </a>
        </div>
      </div>
      
      {/* Indicador de scroll animado */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </section>
  );
}

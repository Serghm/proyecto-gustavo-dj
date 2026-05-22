'use client'; // Necesario para manejar clics y estados en Next.js

import React, { useState, useRef } from 'react';
import Image from 'next/image';

export default function SobreMi() {
  // Lógica del reproductor de audio
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="sobre-mi" className="w-full py-24 bg-[#0a192f] relative border-t border-gray-900 overflow-hidden">
      {/* Luces de fondo sutiles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* columna Izquierda: Texto */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-2 block">
              Conoce al DJ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Soy Gustavo Delgadillo, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">
                DJ Versátil Profesional
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Con más de <strong>15 años de trayectoria</strong> en el mundo del entretenimiento y certificado por dos de las mejores academias de DJ, mi objetivo no es solo poner canciones, sino crear atmósferas.
              </p>
              <p>
                Mi especialidad es el <em>Electropop</em> y la creación de <em>Mashups</em> en vivo. Sé leer al público, mantener la energía a tope y lograr que cada momento tenga el impacto que se merece, ya sea en bodas, XV años, antros o eventos corporativos.
              </p>
              <p>
                Además, no solo llevo música; <strong>llevo un show completo</strong>. Monto una producción estructurada con pantallas, iluminación robótica, máquinas de humo, CO2 y pirotecnia que diferencia mi trabajo del resto.
              </p>
            </div>

            {/* estadisticas :) */}
            <div className="grid grid-cols-2 gap-6 mt-10 border-t border-gray-800 pt-8">
              <div>
                <h4 className="text-3xl font-black text-[#D4AF37]">15+</h4>
                <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">Años de Experiencia</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-[#D4AF37]">100%</h4>
                <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">Energía en la Pista</p>
              </div>
            </div>

            {/* NUEVO: Botón de Audio interactivo */}
            <div className="mt-8">
              {/* Aquí configuras la ruta de tu audio. Debe ir en la carpeta 'public' */}
              <audio ref={audioRef} src="/muestra_provicional.mp3" loop preload="none" />
              
              <button 
                onClick={togglePlay}
                className="flex items-center gap-4 bg-transparent border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors duration-300 px-6 py-3 rounded-full group cursor-pointer"
              >
                {/* Barras del ecualizador animadas */}
                <div className="flex items-end gap-1 h-5">
                  <div className={`w-1.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${isPlaying ? 'h-full animate-pulse' : 'h-1.5'}`}></div>
                  <div className={`w-1.5 bg-[#D4AF37] rounded-full transition-all duration-300 delay-75 ${isPlaying ? 'h-3/4 animate-pulse' : 'h-3'}`}></div>
                  <div className={`w-1.5 bg-[#D4AF37] rounded-full transition-all duration-300 delay-150 ${isPlaying ? 'h-full animate-pulse' : 'h-2'}`}></div>
                  <div className={`w-1.5 bg-[#D4AF37] rounded-full transition-all duration-300 delay-75 ${isPlaying ? 'h-1/2 animate-pulse' : 'h-4'}`}></div>
                </div>
                
                <span className="text-[#D4AF37] font-bold tracking-wider uppercase text-sm">
                  {isPlaying ? 'Pausar Mix' : 'Escuchar Demo'}
                </span>
              </button>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta de Imagen */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl p-2 bg-gradient-to-br from-[#D4AF37]/50 to-[#050b14] shadow-[0_0_40px_rgba(212,175,55,0.15)] transform hover:-translate-y-2 transition-all duration-500">
              <div className="bg-[#050b14] rounded-xl p-8 h-full flex flex-col items-center justify-center text-center min-h-[450px] border border-gray-800/50">
                
                <div className="relative w-full aspect-[3/4] max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.25)] mb-6 mx-auto group bg-[#0a192f]">
                  <Image 
                    src="/perfil/gustavo-dj.png" // se tiene que modificar y guardar una imagen real del DJ
                    alt="Gustavo Delgadillo - DJ Profesional"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 280px, 320px"
                    priority
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Ingeniero y Productor</h3>
                <p className="text-gray-400">
                  Creador de la marca <strong className="text-[#D4AF37]">Cabinas DJ</strong>, fabricando mobiliario premium para DJs en toda la República.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

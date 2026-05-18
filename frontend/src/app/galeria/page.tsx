"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Galeria() {
  const [filtro, setFiltro] = useState('todos');

  const items = [
    { id: 1, tipo: 'imagen', categoria: 'eventos', src: '/eventos/boda.jpg', titulo: 'Boda Hacienda San José' },
    { id: 2, tipo: 'imagen', categoria: 'eventos', src: '/eventos/privado.jpg', titulo: 'XV Años Temáticos Neón' },
    { id: 3, tipo: 'imagen', categoria: 'eventos', src: '/eventos/corporativo.jpg', titulo: 'Corporativo Grupo Cervecero' },
    { id: 4, tipo: 'video', categoria: 'eventos', src: '/eventos/privado.mp4', titulo: 'Evento privado' },
    { id: 5, tipo: 'video', categoria: 'eventos', src: '/eventos/evento 2.mp4', titulo: 'DJ Set en Vivo' },
    { id: 6, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_Negra_Diamante_frente.jpeg', titulo: 'Cabina Diamanete Negra (frente)' },
    { id: 7, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_Blanca_4_diamantes_frente.jpeg', titulo: 'Cabina Blanca con 4 Diamantes (frente)' },
    { id: 7, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_negra_Diamante_frente_2.jpeg', titulo: 'Cabina Negra con Diamantes (frente 2)' },
    { id: 8, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_Diamante_Plata_tipo_espejo_frente.jpeg', titulo: 'Cabina Diamante Plata tipo espejo (frente)' },
    { id: 9, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_diamante_Oro_tipo_espejo_frente.jpeg', titulo: 'Cabina Diamante Oro tipo espejo (frente)' },
    { id: 10, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_Blanca_Triangulos.jpeg', titulo: 'Cabina Blanca con Triángulos' },
    { id: 11, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_Blanca_Diamante_Lateral.jpeg', titulo: 'Cabina Blanca con Diamante (lateral)' },
    { id: 12, tipo: 'imagen', categoria: 'muebles', src: '/cabinas/Cabina_DJ_Blanca_Diamante_Frente.jpeg', titulo: 'Cabina Blanca con Diamante (frente)' },

  ];

  const filtrados = items.filter(item => {
    if (filtro === 'todos') return true;
    if (filtro === 'videos') return item.tipo === 'video';
    if (filtro === 'imagenes') return item.tipo === 'imagen' && item.categoria === 'eventos';
    if (filtro === 'muebles') return item.categoria === 'muebles';
    return true;
  });

  return (
    <main className="min-h-screen bg-[#050b14] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12">
          <Link href="/#eventos" className="text-[#D4AF37] hover:text-white flex items-center gap-2 mb-6 transition-colors w-fit font-bold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Inicio
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wide">
            Galería <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Completa</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {['todos', 'imagenes', 'videos', 'muebles'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                filtro === cat
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-transparent text-white border-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((item) => (
            <div key={item.id} className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-[#0a192f] border border-gray-800">
              {item.tipo === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-bold text-lg tracking-wide">{item.titulo}</span>
              </div>
              
              {item.tipo === 'video' && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Eventos() {
  const eventosRecientes = [
    {
      id: 1,
      titulo: "Boda en Hacienda San José",
      categoria: "Bodas",
      fecha: "10 Mayo, 2026",
      extracto: "Un evento espectacular con más de 300 invitados. Montaje de cabina de acrílico y show de pirotecnia fría para el primer baile.",
      imagen: "/eventos/boda.jpg"
    },
    {
      id: 2,
      titulo: "XV Años Temáticos Neón",
      categoria: "XV Años",
      fecha: "2 Mayo, 2026",
      extracto: "Pista iluminada, iluminación robótica y los mejores mashups de reggaetón y electrónica que mantuvieron la pista llena toda la noche.",
      imagen: "/eventos/privado.jpg"
    },
    {
      id: 3,
      titulo: "Fiesta de Fin de Año Grupo Cervecero",
      categoria: "Corporativo",
      fecha: "Diciembre, 2025",
      extracto: "Sonorización profesional Line Array y pantallas LED gigantes para la presentación de resultados y la fiesta de celebración.",
      imagen: "/eventos/corporativo.jpg"
    }
  ];

  return (
    <section id="eventos" className="w-full py-24 bg-[#0a192f] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-2 block">
              Nuestro Trabajo
            </span>
            <h2 className="text-4xl font-bold text-white">
              Últimos <span className="text-[#D4AF37]">Eventos</span>
            </h2>
          </div>
          
          <Link href="/galeria" className="text-[#D4AF37] font-bold hover:text-white transition-colors flex items-center gap-2 group">
            Ver Galería Completa
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventosRecientes.map((evento, index) => (
            <article 
              key={evento.id} 
              className="bg-[#050b14] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 transition-all duration-300 group shadow-lg flex flex-col h-full"
            >
              <div className="w-full h-56 relative overflow-hidden bg-[#0a192f]">
                <Image 
                  src={evento.imagen}
                  alt={evento.titulo}
                  fill
                  priority={index === 0}
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow-md">
                  {evento.categoria}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow relative z-10">
                <time className="text-gray-500 text-sm font-medium mb-3 block">
                  {evento.fecha}
                </time>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors leading-tight">
                  {evento.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {evento.extracto}
                </p>
                <span className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider mt-auto opacity-60">
                  Leer Más +
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
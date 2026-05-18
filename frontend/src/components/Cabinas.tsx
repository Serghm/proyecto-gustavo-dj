"use client";

import React from 'react';
import Image from 'next/image';

export default function Cabinas() {
  // Arreglo de modelos de cabinas
  const modelosCabinas = [
    {
      id: 1,
      nombre: 'Cabina DJ Negra Rayado',
      descripcion: 'Diseño ligero y resistente, ideal para DJs móviles. Montaje en menos de 2 minutos sin herramientas.',
      caracteristicas: ['Estructura de acero', 'Paneles intercambiables', 'Funda de transporte'],
      imagen: '/cabinas/CabinaDJNegra.jpeg' 
    },
    {
      id: 2,
      nombre: 'Cabina DJ Diamante Plata tipo espejo',
      descripcion: 'Presencia imponente con paneles frontales de acrílico translúcido, perfectos para retroiluminación LED.',
      caracteristicas: ['Acrílico de 6mm', 'Base reforzada', 'Espacio oculto para cables'],
      imagen: '/cabinas/CabinaDJDiamantePlata.jpeg' 
    },
    {
      id: 3,
      nombre: 'Cabina DJ diamante Oro tipo espejo',
      descripcion: 'Mobiliario ergonómico diseñado específicamente para estudios de producción en casa o cabinas fijas.',
      caracteristicas: ['Bandeja deslizable', 'Racks integrados (19")', 'Acabado en madera premium'],
      imagen: '/cabinas/CabinaDJDiamanteOro.jpeg'
    }
  ];

  // logica para abrir WhatsApp
  const abrirWhatsApp = (nombreModelo: string) => {
    const numeroGustavo = "525512345678"; // Importante: Cambiar por el teléfono real
    const mensaje = `¡Hola Gustavo! Vi tu página web y me interesa cotizar el modelo: *${nombreModelo}*. ¿Me podrías dar más información sobre precio y envío?`;
    const url = `https://wa.me/${numeroGustavo}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="cabinas" className="w-full py-24 bg-[#050b14] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="text-center mb-16 relative z-10">
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-2 block">
                Ingeniería y Diseño
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-wide">
                 Mobiliario <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Premium</span>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                 Eleva la presencia visual de tu show. Diseñamos y fabricamos muebles profesionales para DJs donde la <span className="text-white font-medium uppercase text-sm tracking-wider">estética impecable</span>, la <span className="text-white font-medium uppercase text-sm tracking-wider">resistencia</span> y la <span className="text-[#D4AF37] font-bold uppercase text-sm tracking-wider">funcionalidad absoluta</span> se fusionan para perfeccionar tu setup.
            </p>
             <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8"></div>
        </div>

        {/* Grid de Modelos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {modelosCabinas.map((cabina) => (
            <div 
              key={cabina.id} 
              className="bg-[#0a192f] rounded-2xl p-8 border border-gray-800 hover:border-[#D4AF37]/50 transform hover:-translate-y-2 transition-all duration-300 group shadow-lg flex flex-col"
            >
              {/* Contenedor condicional para la imagen */}
              <div className="w-full h-56 rounded-xl mb-6 relative overflow-hidden border border-gray-800 group-hover:border-[#D4AF37]/30 transition-colors bg-[#050b14] flex items-center justify-center">
                {cabina.imagen ? (
                  <Image 
                    src={cabina.imagen} 
                    alt={cabina.nombre}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-w-768px) 100vw, 33vw"
                    priority={cabina.id === 1}
                  />
                ) : (
                  <span className="text-gray-600 text-sm">Sin imagen</span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{cabina.nombre}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">{cabina.descripcion}</p>
              
              <ul className="space-y-2 mb-8">
                {cabina.caracteristicas.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Botón de WhatsApp por producto */}
              <button 
                onClick={() => abrirWhatsApp(cabina.nombre)}
                className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold py-3 rounded-xl transition-all duration-300 mt-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Cotizar por WhatsApp
              </button>

            </div>
          ))}
        </div>

        {/* Banner de Envíos y Bodega */}
        <div className="bg-gradient-to-r from-[#0a192f] to-[#050b14] rounded-2xl p-8 border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.05)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Envíos a toda la República
            </h4>
            <p className="text-gray-400">
              Cotiza el envío a tu ciudad de forma segura. <br className="hidden md:block" />
              <strong className="text-white">¿Estás en Jalisco?</strong> Contamos con bodega física en Guadalajara para que puedas pasar a recoger tu mobiliario directamente.
            </p>
          </div>
          <button 
            onClick={() => abrirWhatsApp('Catálogo completo y cotización de envíos')}
            className="whitespace-nowrap px-8 py-3 rounded-lg bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            Contactar Bodega
          </button>
        </div>

      </div>
    </section>
  );
}
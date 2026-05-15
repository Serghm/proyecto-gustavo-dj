export default function Eventos() {
  // Datos de prueba: Simulando lo que llegaría de Sanity/Contentful
  const eventosRecientes = [
    {
      id: 1,
      titulo: "Boda en Hacienda San José",
      categoria: "Bodas",
      fecha: "10 Mayo, 2026", // Usando la fecha actual como contexto
      extracto: "Un evento espectacular con más de 300 invitados. Montaje de cabina de acrílico y show de pirotecnia fría para el primer baile.",
    },
    {
      id: 2,
      titulo: "XV Años Temáticos Neón",
      categoria: "XV Años",
      fecha: "2 Mayo, 2026",
      extracto: "Pista iluminada, iluminación robótica y los mejores mashups de reggaetón y electrónica que mantuvieron la pista llena toda la noche.",
    },
    {
      id: 3,
      titulo: "Fiesta de Fin de Año Grupo Modelo",
      categoria: "Corporativo",
      fecha: "Diciembre, 2025",
      extracto: "Sonorización profesional Line Array y pantallas LED gigantes para la presentación de resultados y la fiesta de celebración.",
    }
  ];

  return (
    <section id="eventos" className="w-full py-24 bg-[#0a192f] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-2 block">
              Nuestro Trabajo
            </span>
            <h2 className="text-4xl font-bold text-white">
              Últimos <span className="text-[#D4AF37]">Eventos</span>
            </h2>
          </div>
          
          <button className="text-[#D4AF37] font-bold hover:text-white transition-colors flex items-center gap-2 group">
            Ver Galería Completa
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Tarjetas de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventosRecientes.map((evento) => (
            <article 
              key={evento.id} 
              className="bg-[#050b14] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 transition-all duration-300 group shadow-lg flex flex-col h-full"
            >
              {/* Contenedor de Imagen (Mockup) */}
              <div className="w-full h-56 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* Overlay oscuro al pasar el mouse */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Etiqueta de Categoría */}
                <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full z-10">
                  {evento.categoria}
                </span>
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-grow">
                <time className="text-gray-500 text-sm font-medium mb-3 block">
                  {evento.fecha}
                </time>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors leading-tight">
                  {evento.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {evento.extracto}
                </p>
                <a href="#" className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider hover:text-white transition-colors mt-auto">
                  Leer Más +
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function Servicios() {
  // Arreglo de datos: Si Gustavo quiere agregar otro servicio mañana, 
  // solo lo agregamos a esta lista.
  const listaServicios = [
    {
      id: 1,
      titulo: 'Bodas y XV Años',
      descripcion: 'El soundtrack perfecto para tu día más importante. Mezclas precisas y animación elegante para mantener la pista llena.',
      // Un SVG (ícono vectorial) integrado para no depender de librerías pesadas
      icono: (
        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 2,
      titulo: 'Eventos Corporativos',
      descripcion: 'Profesionalismo y calidad de audio superior para posadas, aniversarios y presentaciones de tu empresa.',
      icono: (
        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 3,
      titulo: 'Iluminación Arquitectónica',
      descripcion: 'Transformamos cualquier salón o jardín con bañadores LED y cabezas móviles programadas al ritmo de la música.',
      icono: (
        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 4,
      titulo: 'Sonido Line Array',
      descripcion: 'Potencia y fidelidad garantizada con sistemas de audio profesionales ideales para espacios abiertos y gran aforo.',
      icono: (
        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )
    }
  ];

  return (
    <section id="servicios" className="w-full py-24 bg-[#050b14] relative">
      {/* Línea divisoria sutil en la parte superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros <span className="text-[#D4AF37]">Servicios</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cobertura total para que tú solo te preocupes por disfrutar.
          </p>
        </div>

        {/* Grid (Cuadrícula) responsiva: 1 columna en móvil, 2 en tablet, 4 en PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {listaServicios.map((servicio) => (
            <div 
              key={servicio.id}
              className="bg-[#0a1526] p-8 rounded-xl border border-gray-800 transform hover:border-[#D4AF37]/50 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div className="mb-6 p-4 bg-[#050b14] inline-block rounded-lg group-hover:scale-110 transition-transform duration-300">
                {servicio.icono}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                {servicio.titulo}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      id="inicio" 
      className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Efecto de luz de fondo (Glow) simulando luces de DJ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Etiqueta superior */}
        <span className="mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold tracking-wide uppercase">
          Experiencia Sonora Premium
        </span>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Música, Energía y <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">
            Producción Única
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Elevamos tu evento al siguiente nivel con equipo de vanguardia, 
          mezclas en vivo y una atmósfera inolvidable. Deja que la música 
          hable por ti.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="#contacto" 
            className="px-8 py-4 rounded-md bg-[#D4AF37] text-[#050b14] font-bold text-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Cotizar mi Evento
          </Link>
          <Link 
            href="#servicios" 
            className="px-8 py-4 rounded-md bg-transparent text-white font-bold text-lg border border-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
          >
            Ver Servicios
          </Link>
        </div>

      </div>
    </section>
  );
}

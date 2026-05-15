export default function SobreMi() {
  return (
    <section id="sobre-mi" className="w-full py-24 bg-[#0a192f] relative border-t border-gray-900 overflow-hidden">
      {/* Luces de fondo sutiles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Columna Izquierda: Texto */}
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

            {/* Estadísticas / Logros */}
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
          </div>

          {/* Columna Derecha: Tarjeta de Imagen */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl p-2 bg-gradient-to-br from-[#D4AF37]/50 to-[#050b14] shadow-[0_0_40px_rgba(212,175,55,0.15)] transform hover:-translate-y-2 transition-all duration-500">
              <div className="bg-[#050b14] rounded-xl p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px] border border-gray-800/50">
                
                {/* Aquí Gustavo podrá poner su foto real después */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#D4AF37] to-yellow-600 mb-6 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Ingeniero y Productor</h3>
                <p className="text-gray-400">
                  Creador de la marca <strong className="text-[#D4AF37]">Cabinas DJ </strong>, fabricando mobiliario premium para DJs en toda la República.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

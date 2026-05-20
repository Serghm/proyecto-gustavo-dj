"use client";

import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    servicio: 'Bodas',
    fecha: '',
    hora: '',
    tipoEntrega: 'Envio',
    ubicacion: '',
    detalles: ''
  });
  const [estado, setEstado] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mensajeError, setMensajeError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado('loading');
    setMensajeError('');

    let datosFinales = { ...formData };

    if (formData.servicio === 'Cabinas/Muebles') {
      datosFinales.fecha = "N/A (Compra Mobiliario)";
      datosFinales.hora = "N/A (Compra Mobiliario)";
      
      if (formData.tipoEntrega === 'Bodega CDMX') {
        datosFinales.ubicacion = "Recoge en Bodega CDMX";
      } else if (formData.tipoEntrega === 'Bodega GDL') {
        datosFinales.ubicacion = "Recoge en Bodega Guadalajara";
      }
    }

    try {
      const respuesta = await fetch('http://localhost:5000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFinales),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setEstado('success');
        
        const numeroWhatsApp = "525522177204"; // Reemplazar por el número real
        let mensaje = `¡Hola Gustavo! se ha registrado una solicitud en la web.\n\n`;
        mensaje += `*Nombre:* ${datosFinales.nombre}\n`;
        mensaje += `*Interés:* ${datosFinales.servicio}\n`;
        
        if (formData.servicio === 'Cabinas/Muebles') {
          mensaje += `*Método de Entrega:* ${formData.tipoEntrega}\n`;
          if (formData.tipoEntrega === 'Envio') {
            mensaje += `*Dirección de Envío:* ${datosFinales.ubicacion}\n`;
          }
        } else {
          mensaje += `*Fecha:* ${datosFinales.fecha}\n`;
          mensaje += `*Hora:* ${datosFinales.hora}\n`;
          mensaje += `*Ubicación:* ${datosFinales.ubicacion}\n`;
        }
        
        mensaje += `*Correo:* ${datosFinales.correo}\n`;
        mensaje += `*WhatsApp:* ${datosFinales.telefono}\n\n`;
        mensaje += `*Detalles:* ${datosFinales.detalles || 'Sin detalles adicionales'}`;
        
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');

        setFormData({ 
          nombre: '', telefono: '', correo: '', servicio: 'Bodas', 
          fecha: '', hora: '', tipoEntrega: 'Envio', ubicacion: '', detalles: '' 
        });
        
        setTimeout(() => setEstado('idle'), 5000);
      } else {
        setEstado('error');
        setMensajeError(datos.error || 'Revisa que los datos sean correctos.');
      }
    } catch (error) {
      setEstado('error');
      setMensajeError('Error de conexión con el servidor. Intenta de nuevo.');
    }
  };

  return (
    <section id="contacto" className="w-full py-24 bg-[#050b14] relative border-t border-gray-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
      
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-2 block">Cotizaciones</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reserva tu <span className="text-[#D4AF37]">Fecha o Setup</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Completa los detalles para calcular la logística o los costos de envío ideales.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0a192f] p-8 md:p-12 rounded-3xl border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/5 blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            
            <div className="md:col-span-2">
              <label htmlFor="nombre" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Nombre Completo</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30" placeholder="Ej. Juan Pérez" />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">WhatsApp (10 dígitos)</label>
              <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required pattern="[0-9]{10}" className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30" placeholder="Ej. 5512345678" />
            </div>

            <div>
              <label htmlFor="correo" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Correo Electrónico</label>
              <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30" placeholder="tu@correo.com" />
            </div>

            <div className={formData.servicio === 'Cabinas/Muebles' ? 'md:col-span-2' : ''}>
              <label htmlFor="servicio" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">¿Qué te interesa cotizar?</label>
              <div className="relative">
                <select id="servicio" name="servicio" value={formData.servicio} onChange={handleChange} className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30 appearance-none pr-10 cursor-pointer">
                  <option value="Bodas">Servicio DJ - Bodas</option>
                  <option value="XV Años">Servicio DJ - XV Años</option>
                  <option value="Corporativo">Eventos Corporativos</option>
                  <option value="Cabinas/Muebles">Compra de Cabinas / Mobiliario</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#D4AF37]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/*  campos adicionales */}
            {formData.servicio !== 'Cabinas/Muebles' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fecha" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Fecha</label>
                    <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                  </div>
                  <div>
                    <label htmlFor="hora" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Hora Inicio</label>
                    <input type="time" id="hora" name="hora" value={formData.hora} onChange={handleChange} required className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-4 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="ubicacion" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Dirección del Evento</label>
                  <input type="text" id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30" placeholder="Ej. Salón, Municipio, Estado" />
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2">
                  <label htmlFor="tipoEntrega" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Método de Entrega</label>
                  <div className="relative">
                    <select id="tipoEntrega" name="tipoEntrega" value={formData.tipoEntrega} onChange={handleChange} className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30 appearance-none pr-10 cursor-pointer">
                      <option value="Envio">Envío a domicilio</option>
                      <option value="Bodega CDMX">Recoger en Bodega (CDMX)</option>
                      <option value="Bodega GDL">Recoger en Bodega (Guadalajara)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#D4AF37]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* direccion de envio */}
                {formData.tipoEntrega === 'Envio' && (
                  <div className="md:col-span-2">
                    <label htmlFor="ubicacion" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Dirección de Envío Completa</label>
                    <input type="text" id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30" placeholder="Calle, Número, Colonia, Código Postal y Estado" />
                  </div>
                )}

                {/* info bodega cdmx */}
                {formData.tipoEntrega === 'Bodega CDMX' && (
                  <div className="md:col-span-2 p-5 bg-[#050b14] border border-[#D4AF37]/30 rounded-xl flex gap-4 mt-2">
                    <div className="text-[#D4AF37] mt-1">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Bodega Ciudad de México (Aproximada)</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Colonia Centro, Alcaldía Cuauhtémoc, CDMX. <br/>
                        <span className="text-[#D4AF37] text-xs uppercase tracking-wider font-semibold mt-2 block">* La dirección exacta se proporcionará al confirmar el pedido.</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* info bodega guadalajara */}
                {formData.tipoEntrega === 'Bodega GDL' && (
                  <div className="md:col-span-2 p-5 bg-[#050b14] border border-[#D4AF37]/30 rounded-xl flex gap-4 mt-2">
                    <div className="text-[#D4AF37] mt-1">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div> 
                      <h4 className="text-white font-bold mb-1">Bodega Guadalajara (Aproximada)</h4>
                      <p className="text-gray-400 text-sm leading-relaxed"> 
                        Colonia Americana, Guadalajara, Jalisco. <br/> 
                        <span className="text-[#D4AF37] text-xs uppercase tracking-wider font-semibold mt-2 block">* La dirección exacta se proporcionará al confirmar el pedido.</span>
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="md:col-span-2">
              <label htmlFor="detalles" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Detalles Adicionales</label>
              <textarea id="detalles" name="detalles" value={formData.detalles} onChange={handleChange} rows={3} className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30 resize-none" placeholder="Especificaciones del mueble, Diseños persnalizados, dudas o comentarios..." ></textarea>
            </div>

            <div className="md:col-span-2">
              {estado === 'error' && <div className="p-4 bg-red-950/30 border border-red-500/50 text-red-200 rounded-xl text-sm font-medium mb-4">{mensajeError}</div>}
              {estado === 'success' && <div className="p-4 bg-green-950/30 border border-green-500/50 text-green-200 rounded-xl text-sm font-medium mb-4">¡Solicitud guardada en sistema! Redirigiendo a WhatsApp de Gustavo...</div>}

              <button type="submit" disabled={estado === 'loading'} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#f1c40f] hover:from-[#f1c40f] hover:to-[#D4AF37] text-black font-black text-lg py-5 rounded-2xl shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest">
                {estado === 'loading' ? 'Guardando en Base de Datos...' : 'Enviar Solicitud'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
"use client";

import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    servicio: 'Bodas' // <-- Añadimos el valor por defecto del nuevo campo
  });
  const [estado, setEstado] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mensajeError, setMensajeError] = useState('');

  // Ajustamos el tipo de evento para que acepte tanto inputs como selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado('loading');
    setMensajeError('');

    try {
      const respuesta = await fetch('http://localhost:5000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setEstado('success');
        
        // ---WHATSAPP ---
        const numeroWhatsApp = "5512345678"; // Importante: Cambiar esto por el número real de Gustavo
        const mensaje = `¡Hola Gustavo! Acabo de dejar mis datos en tu página web. Mi nombre es *${formData.nombre}*. Me interesa cotizar: *${formData.servicio}*. Mi correo es ${formData.correo}.`;
        
        // Formateamos el texto para que la URL lo entienda
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        
        // Abrimos WhatsApp en una nueva pestaña automáticamente
        window.open(urlWhatsApp, '_blank');
        // ----------------------------

        // Limpiamos el formulario después de enviarlo
        setFormData({ nombre: '', telefono: '', correo: '', servicio: 'Bodas' });
        
        // Regresamos el botón a su estado normal después de unos segundos
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
      {/* Decoración de fondo para que no se vea plano */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
      
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-2 block">Contacto Directo</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cotiza tu <span className="text-[#D4AF37]">Evento</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Déjanos tus datos y nos pondremos en contacto contigo para armar el paquete ideal.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-[#0a192f] p-8 md:p-12 rounded-3xl border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Sutil resplandor interno */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/5 blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 gap-8 relative z-10">
            
            {/* Campo: Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Nombre Completo</label>
              <input 
                type="text" 
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required 
                className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 placeholder:text-gray-600 focus:ring-1 focus:ring-[#D4AF37]/30"
                placeholder="Ej. Gustavo Delgadillo"
              />
            </div>

            {/* Campo: Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Teléfono (10 dígitos)</label>
              <input 
                type="tel" 
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required 
                pattern="[0-9]{10}"
                className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 placeholder:text-gray-600 focus:ring-1 focus:ring-[#D4AF37]/30"
                placeholder="Ej. 5512345678"
              />
            </div>

            {/* Campo: Correo */}
            <div>
              <label htmlFor="correo" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">Correo Electrónico</label>
              <input 
                type="email" 
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required 
                className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 placeholder:text-gray-600 focus:ring-1 focus:ring-[#D4AF37]/30"
                placeholder="tu@correo.com"
              />
            </div>

            {/* NUEVO CAMPO: Tipo de Servicio */}
            <div>
              <label htmlFor="servicio" className="block text-gray-300 font-semibold mb-3 ml-1 text-sm uppercase tracking-wider">¿Qué te interesa cotizar?</label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="w-full bg-[#050b14] text-white border border-gray-700 focus:border-[#D4AF37] rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#D4AF37]/30 appearance-none"
              >
                <option value="Bodas">Servicio DJ - Bodas</option>
                <option value="XV Años">Servicio DJ - XV Años</option>
                <option value="Corporativo">Eventos Corporativos</option>
                <option value="Cabinas/Muebles">Compra de Cabinas / Mobiliario</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Mensajes de feedback */}
            {estado === 'error' && (
              <div className="p-4 bg-red-950/30 border border-red-500/50 text-red-200 rounded-xl text-sm font-medium animate-pulse">
                 {mensajeError}
              </div>
            )}
            {estado === 'success' && (
              <div className="p-4 bg-green-950/30 border border-green-500/50 text-green-200 rounded-xl text-sm font-medium">
                 ¡Gracias por confiar en nosotros! En breve nos comunicaremos contigo.
              </div>
            )}

            {/* Botón de Enviar */}
            <button 
              type="submit" 
              disabled={estado === 'loading'}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#f1c40f] hover:from-[#f1c40f] hover:to-[#D4AF37] text-black font-black text-lg py-5 rounded-2xl shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
            >
              {estado === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Procesando...
                </span>
              ) : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
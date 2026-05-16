import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SobreMi from '@/components/SobreMi';
import Cabinas from '@/components/Cabinas'; 
import Servicios from '@/components/Servicios';
import Eventos from '@/components/Eventos'; 
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer'; 

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050b14] text-white">
      <Navbar />
      <Hero />
      <SobreMi /> 
      <Cabinas /> {/* Lo colocamos aquí */}
      <Servicios /> 
      <Eventos />
      <Contacto />
      <Footer />
    </main>
  );
}
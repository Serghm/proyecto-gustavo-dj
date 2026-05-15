import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SobreMi from '@/components/SobreMi';
import Cabinas from '@/components/Cabinas'; // Importamos el nuevo componente
import Servicios from '@/components/Servicios';
import Eventos from '@/components/Eventos'; // Importamos Eventos en lugar de InstagramFeed
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer'; // Importa el Footer

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
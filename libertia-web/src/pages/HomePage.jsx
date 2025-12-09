import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problems from '../components/Problems';
import Services from '../components/Services';
import Reasons from '../components/Reasons';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LightOrbs from '../components/LightOrbs';

export default function HomePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Light Orbs - animated background lights */}
      <LightOrbs />
      
      {/* Noise Texture - top layer for texture */}
      <div className="noise" />
      
      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <Problems />
          <Services />
          <Reasons />
          <AboutUs />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}


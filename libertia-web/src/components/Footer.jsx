import { motion } from 'framer-motion';
import { Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';
import { siteContent, navigation } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      position: 'relative', 
      paddingTop: '5rem', 
      paddingBottom: '2rem', 
      overflow: 'hidden',
      background: 'var(--bg-secondary)'
    }}>
      {/* Top Border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(6, 182, 212, 0.3), transparent)'
      }} />

      <div style={{ 
        maxWidth: '90rem', 
        margin: '0 auto', 
        padding: '0 1.5rem' 
      }}>
        {/* Main Footer */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '3rem', 
          marginBottom: '4rem' 
        }}>
          {/* Brand */}
          <div>
            <motion.a
              href="#"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1.5rem',
                textDecoration: 'none'
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/libertia_it_logo_fondos_claros-2.webp" 
                alt="Libertia IT" 
                style={{
                  height: '2.5rem',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </motion.a>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {siteContent.company.description}
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {[
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Facebook, href: 'https://facebook.com' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.75rem',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    textDecoration: 'none'
                  }}
                >
                  <social.icon style={{ width: '1.25rem', height: '1.25rem' }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1.5rem' }}>Servicios</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {siteContent.services.map((service) => (
                <li key={service.id}>
                  <a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1.5rem' }}>Empresa</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navigation.map((item) => (
                <li key={item.name}>
                  <a href={item.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1.5rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Aviso Legal', 'Política de Privacidad', 'Política de Cookies', 'Política de Seguridad'].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Libertia IT. Todos los derechos reservados.
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              background: 'var(--bg-tertiary)',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            <span>Volver arriba</span>
            <ArrowUp style={{ width: '1rem', height: '1rem' }} />
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer {
            padding-top: 3rem !important;
          }
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          footer > div > div:first-of-type > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          footer > div > div:first-of-type > div:first-child > a:first-child {
            justify-content: center;
          }
          footer > div > div:first-of-type > div:first-child p {
            max-width: 300px;
          }
          footer > div > div:last-of-type {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

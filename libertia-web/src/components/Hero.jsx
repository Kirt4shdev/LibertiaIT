import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { siteContent } from '../data/content';

export default function Hero() {
  return (
    <section id="hero" style={{ 
      minHeight: '100vh', 
      minHeight: '100dvh', // Better mobile viewport
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '5rem',
      paddingBottom: '2rem'
    }}>
      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '0 1.25rem',
        textAlign: 'center',
        width: '100%'
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            padding: '0.5rem 1.25rem', 
            marginBottom: '1.5rem' 
          }}
          className="glass-card"
        >
          <span style={{ position: 'relative', display: 'flex', width: '0.5rem', height: '0.5rem', marginRight: '0.75rem' }}>
            <span style={{
              animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
              position: 'absolute',
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#22d3ee',
              opacity: 0.75
            }}></span>
            <span style={{
              position: 'relative',
              display: 'inline-flex',
              borderRadius: '50%',
              width: '0.5rem',
              height: '0.5rem',
              background: '#06b6d4'
            }}></span>
          </span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            +20 años protegiendo empresas en Madrid
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-title"
          style={{
            fontSize: 'clamp(2.25rem, 8vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          <span style={{ color: 'var(--text-primary)' }}>Ciberseguridad</span>
          <br />
          <span className="gradient-text">y Mantenimiento</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>Informático Integral</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '42rem',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            padding: '0 0.5rem'
          }}
        >
          {siteContent.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-buttons"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '4rem'
          }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {siteContent.hero.cta}
            <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="btn-secondary"
          >
            Ver servicios
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hero-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            maxWidth: '56rem',
            margin: '0 auto'
          }}
        >
          {siteContent.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="glass-card card-hover stat-card"
              style={{ padding: '1.5rem 1rem', textAlign: 'center' }}
            >
              <div className="gradient-text" style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                fontWeight: 700, 
                marginBottom: '0.5rem',
                lineHeight: 1
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <motion.a
          href="#problems"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            gap: '0.5rem'
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll</span>
          <ChevronDown style={{ width: '1.5rem', height: '1.5rem' }} />
        </motion.a>
      </motion.div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .hero-title {
            margin-bottom: 1.25rem !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            width: 100%;
            padding: 0 1rem;
          }
          .hero-buttons a {
            width: 100%;
            justify-content: center;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
            padding: 0 0.5rem;
          }
          .stat-card {
            padding: 1.25rem 0.75rem !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }

        @media (max-width: 380px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-card {
            padding: 1rem 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

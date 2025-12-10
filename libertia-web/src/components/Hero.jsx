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
        maxWidth: '90rem', 
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
          className="glass-card hero-badge"
        >
          <span style={{ position: 'relative', display: 'flex', width: '0.625rem', height: '0.625rem', marginRight: '0.875rem' }}>
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
              width: '0.625rem',
              height: '0.625rem',
              background: '#06b6d4'
            }}></span>
          </span>
          <span className="hero-badge-text">
            +20 años protegiendo empresas en Madrid
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-title"
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
          className="hero-subtitle"
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
            gap: '1.25rem',
            marginBottom: '5rem'
          }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="btn-primary hero-btn-primary"
          >
            {siteContent.hero.cta}
            <ArrowRight className="hero-btn-icon" />
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="btn-secondary hero-btn-secondary"
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
            gap: '1.25rem',
            maxWidth: '64rem',
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
            >
              <div className="gradient-text stat-value">
                {stat.value}
              </div>
              <div className="stat-label">
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

        /* Base styles (Desktop) */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.625rem 1.5rem;
          margin-bottom: 2rem;
        }
        .hero-badge-text {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .hero-title {
          font-size: clamp(2.75rem, 10vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 2rem;
          letter-spacing: -0.03em;
        }
        .hero-subtitle {
          font-size: clamp(1.125rem, 3vw, 1.5rem);
          color: var(--text-secondary);
          max-width: 48rem;
          margin: 0 auto 3rem;
          line-height: 1.7;
          padding: 0 0.5rem;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 1.125rem;
          padding: 1rem 2rem;
        }
        .hero-btn-secondary {
          font-size: 1.125rem;
          padding: 1rem 2rem;
        }
        .hero-btn-icon {
          width: 1.375rem;
          height: 1.375rem;
        }
        .stat-card {
          padding: 2rem 1.25rem;
          text-align: center;
        }
        .stat-value {
          font-size: clamp(1.75rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 0.625rem;
          line-height: 1;
        }
        .stat-label {
          font-size: clamp(0.875rem, 1.75vw, 1rem);
          color: var(--text-muted);
          line-height: 1.3;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: clamp(2.5rem, 8vw, 4rem) !important;
          }
          .hero-subtitle {
            font-size: 1.125rem !important;
            margin-bottom: 2.5rem !important;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            font-size: 1rem !important;
            padding: 0.875rem 1.75rem !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-badge {
            padding: 0.5rem 1rem !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-badge-text {
            font-size: 0.8rem !important;
          }
          .hero-title {
            font-size: clamp(2rem, 9vw, 3rem) !important;
            margin-bottom: 1rem !important;
            line-height: 1.15 !important;
          }
          .hero-subtitle {
            font-size: 0.95rem !important;
            margin-bottom: 1.75rem !important;
            line-height: 1.6 !important;
            padding: 0 1rem !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            width: 100%;
            padding: 0 1rem;
            gap: 0.75rem !important;
            margin-bottom: 3rem !important;
          }
          .hero-buttons a {
            width: 100%;
            justify-content: center;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            font-size: 0.95rem !important;
            padding: 0.875rem 1.5rem !important;
          }
          .hero-btn-icon {
            width: 1.125rem !important;
            height: 1.125rem !important;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
            padding: 0 0.5rem;
          }
          .stat-card {
            padding: 1rem 0.75rem !important;
          }
          .stat-value {
            font-size: 1.5rem !important;
            margin-bottom: 0.375rem !important;
          }
          .stat-label {
            font-size: 0.7rem !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .hero-badge {
            padding: 0.4rem 0.875rem !important;
            margin-bottom: 1rem !important;
          }
          .hero-badge-text {
            font-size: 0.7rem !important;
          }
          .hero-title {
            font-size: clamp(1.75rem, 9vw, 2.5rem) !important;
            margin-bottom: 0.875rem !important;
          }
          .hero-subtitle {
            font-size: 0.875rem !important;
            margin-bottom: 1.5rem !important;
            padding: 0 0.5rem !important;
          }
          .hero-buttons {
            margin-bottom: 2rem !important;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            font-size: 0.875rem !important;
            padding: 0.75rem 1.25rem !important;
          }
          .stat-card {
            padding: 0.875rem 0.5rem !important;
          }
          .stat-value {
            font-size: 1.25rem !important;
          }
          .stat-label {
            font-size: 0.65rem !important;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 380px) {
          .hero-badge-text {
            font-size: 0.65rem !important;
          }
          .hero-title {
            font-size: 1.75rem !important;
          }
          .hero-subtitle {
            font-size: 0.8rem !important;
          }
          .stat-value {
            font-size: 1.125rem !important;
          }
          .stat-label {
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}

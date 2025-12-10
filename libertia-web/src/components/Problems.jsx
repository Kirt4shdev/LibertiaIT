import { motion } from 'framer-motion';
import { AlertTriangle, ShieldOff, FileX, Flame, Users, UserX } from 'lucide-react';
import { siteContent } from '../data/content';

const iconMap = {
  AlertTriangle,
  ShieldOff,
  FileX,
  Flame,
  Users,
  UserX
};

export default function Problems() {
  return (
    <section style={{ 
      position: 'relative', 
      padding: '6rem 0', 
      overflow: 'hidden' 
    }}>
      {/* Background - subtle gradient overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.06) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '90rem', 
        margin: '0 auto', 
        padding: '0 1.5rem' 
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            borderRadius: '9999px', 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#f87171', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '1rem' 
          }}>
            ¿Te sientes identificado?
          </span>
          <h2 style={{ 
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            La tecnología debería hacerte{' '}
            <span style={{ color: '#f87171' }}>más productivo</span>
            <br />en lugar de complicarte la vida
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '48rem', 
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Una gestión tecnológica sin rumbo, mal enfocada o en manos de una sola persona puede costarte mucho más de lo que imaginas.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div 
          className="problems-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '1.5rem' 
          }}
        >
          {siteContent.problems.map((problem, index) => {
            const Icon = iconMap[problem.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover"
                style={{
                  position: 'relative',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ position: 'relative', zIndex: 10 }}>
                  {/* Icon */}
                  <div style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon style={{ width: '1.75rem', height: '1.75rem', color: '#f87171' }} />
                  </div>
                  
                  {/* Content */}
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)', 
                    marginBottom: '0.75rem' 
                  }}>
                    {problem.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '1.5rem' 
          }}>
            Cada uno de estos escenarios no solo impacta en tu presupuesto:{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              erosiona la confianza de tus clientes y paraliza tu crecimiento.
            </span>
          </p>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              color: 'white',
              fontWeight: 600,
              borderRadius: '0.75rem',
              textDecoration: 'none',
              boxShadow: '0 10px 30px -10px rgba(239, 68, 68, 0.4)'
            }}
          >
            Descubre nuestra solución
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        .problems-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 1024px) {
          .problems-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .problems-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

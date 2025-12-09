import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Shield, Briefcase, Award, Check, ArrowRight } from 'lucide-react';
import { siteContent } from '../data/content';

const iconMap = {
  Server,
  Shield,
  Briefcase,
  Award
};

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" style={{ 
      position: 'relative', 
      padding: '6rem 0', 
      overflow: 'hidden' 
    }}>
      {/* Background - subtle gradient overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '80rem', 
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
            background: 'rgba(6, 182, 212, 0.1)', 
            color: '#22d3ee', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '1rem' 
          }}>
            Nuestros servicios
          </span>
          <h2 style={{ 
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Un modelo de gestión{' '}
            <span className="gradient-text">completo y seguro</span>
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '48rem', 
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Transformamos tu tecnología para que acelere tu negocio en vez de ser un obstáculo.
          </p>
        </motion.div>

        {/* Services Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(250px, 350px) 1fr', 
          gap: '2rem',
          alignItems: 'start'
        }} className="services-grid">
          {/* Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {siteContent.services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveService(index)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: activeService === index 
                      ? '1px solid rgba(6, 182, 212, 0.5)' 
                      : '1px solid var(--border-color)',
                    background: activeService === index 
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.1))' 
                      : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: activeService === index ? '#06b6d4' : 'var(--bg-tertiary)',
                    color: activeService === index ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon style={{ width: '1.5rem', height: '1.5rem' }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontWeight: 600,
                      color: activeService === index ? '#22d3ee' : 'var(--text-primary)',
                      fontSize: '1rem',
                      marginBottom: '0.25rem'
                    }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {service.subtitle}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const service = siteContent.services[activeService];
                const Icon = iconMap[service.icon];
                return (
                  <div style={{
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Background Glow */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '16rem',
                      height: '16rem',
                      background: 'linear-gradient(to bottom left, rgba(6, 182, 212, 0.15), transparent)',
                      borderRadius: '50%',
                      filter: 'blur(48px)'
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{
                          width: '4rem',
                          height: '4rem',
                          borderRadius: '1rem',
                          background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {service.title}
                          </h3>
                          <p style={{ color: '#22d3ee' }}>{service.subtitle}</p>
                        </div>
                      </div>

                      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
                        {service.description}
                      </p>

                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1rem', 
                        marginBottom: '2rem' 
                      }}>
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                          >
                            <div style={{
                              width: '1.5rem',
                              height: '1.5rem',
                              borderRadius: '50%',
                              background: 'rgba(6, 182, 212, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <Check style={{ width: '1rem', height: '1rem', color: '#22d3ee' }} />
                            </div>
                            <span style={{ color: 'var(--text-primary)' }}>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        Solicitar información
                        <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                      </motion.a>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .services-grid {
            gap: 1.5rem !important;
          }
          .services-grid > div:first-child {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
          .services-grid > div:first-child button {
            flex-direction: column !important;
            text-align: center !important;
            padding: 1rem !important;
            gap: 0.5rem !important;
          }
          .services-grid > div:first-child button > div:first-child {
            margin: 0 auto !important;
          }
          .services-grid > div:first-child button > div:last-child {
            text-align: center;
          }
          .services-grid > div:first-child button > div:last-child p {
            display: none;
          }
        }
        @media (max-width: 480px) {
          .services-grid > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Building, Calculator, Zap, TrendingUp, Lock, Heart, Clock, PiggyBank, ShieldCheck, Compass } from 'lucide-react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

const iconMap = {
  Building,
  Calculator,
  Zap,
  TrendingUp,
  Lock,
  Heart,
  Clock,
  PiggyBank,
  ShieldCheck,
  Compass
};

export default function Reasons() {
  const { theme } = useTheme();
  
  // Get number color based on theme
  const getNumberColor = () => {
    switch(theme) {
      case 'light':
        return 'rgba(8, 145, 178, 0.25)'; // Teal visible on white
      case 'dark-glass':
        return 'rgba(103, 232, 249, 0.3)'; // Bright cyan
      default: // dark
        return 'rgba(34, 211, 238, 0.2)'; // Cyan on dark
    }
  };

  return (
    <section id="reasons" style={{ 
      position: 'relative', 
      padding: '6rem 0', 
      overflow: 'hidden' 
    }}>
      {/* Background - subtle gradient overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
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
            background: 'rgba(16, 185, 129, 0.1)', 
            color: '#34d399', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '1rem' 
          }}>
            Por qué elegirnos
          </span>
          <h2 style={{ 
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            6 razones por las que{' '}
            <span className="gradient-text">nuestros clientes se quedan</span>
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '48rem', 
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            En un mercado lleno de proveedores que no se implican, decidimos hacer las cosas de otra manera.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {siteContent.reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon];
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
                {/* Number */}
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '1rem',
                  fontSize: '5rem',
                  fontWeight: 800,
                  color: getNumberColor(),
                  lineHeight: 1,
                  fontFamily: "'Clash Display', sans-serif",
                  textShadow: theme === 'dark-glass' ? '0 0 30px rgba(34, 211, 238, 0.3)' : 'none'
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div style={{
                  position: 'relative',
                  zIndex: 10,
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Icon style={{ width: '1.75rem', height: '1.75rem', color: 'white' }} />
                </div>

                {/* Content */}
                <h3 style={{ 
                  position: 'relative',
                  zIndex: 10,
                  fontSize: '1.25rem', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)', 
                  marginBottom: '0.75rem' 
                }}>
                  {reason.title}
                </h3>
                <p style={{ 
                  position: 'relative',
                  zIndex: 10,
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.6 
                }}>
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            padding: '3rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 182, 212, 0.08), rgba(59, 130, 246, 0.08))',
            border: '1px solid var(--border-color)'
          }}
        >
          <h3 style={{ 
            fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            textAlign: 'center', 
            marginBottom: '3rem' 
          }}>
            ¿Y todo esto en qué te beneficia?
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem' 
          }}>
            {siteContent.benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    margin: '0 auto 1rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon style={{ width: '2rem', height: '2rem', color: '#22d3ee' }} />
                  </div>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)', 
                    marginBottom: '0.5rem' 
                  }}>
                    {benefit.title}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

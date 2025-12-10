import { motion } from 'framer-motion';
import { Users, History, Shield, Target, Heart, Award, Building2, User } from 'lucide-react';
import { aboutUs, siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

const iconMap = {
  Shield,
  Target,
  Heart
};

export default function AboutUs() {
  const { theme } = useTheme();

  return (
    <section id="about" style={{ 
      position: 'relative', 
      padding: '6rem 0', 
      overflow: 'hidden' 
    }}>
      {/* Background */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(ellipse at 30% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)',
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
            background: 'rgba(6, 182, 212, 0.1)', 
            color: '#22d3ee', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '1rem' 
          }}>
            <Building2 style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Sobre Nosotros
          </span>
          <h2 style={{ 
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Un proyecto que nació{' '}
            <span className="gradient-text">para marcar la diferencia</span>
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '48rem', 
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            {aboutUs.subtitle}
          </p>
        </motion.div>

        {/* Timeline / History */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.75rem', 
              marginBottom: '3rem' 
            }}
          >
            <History style={{ width: '1.5rem', height: '1.5rem', color: '#22d3ee' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Nuestra Historia
            </h3>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem',
            maxWidth: '60rem',
            margin: '0 auto'
          }}>
            {aboutUs.history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card-hover"
                style={{
                  padding: '2rem',
                  borderRadius: '1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Year Badge - Background */}
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  fontSize: '4rem',
                  fontWeight: 800,
                  color: theme === 'light' ? 'rgba(8, 145, 178, 0.12)' : 'rgba(34, 211, 238, 0.12)',
                  lineHeight: 1,
                  fontFamily: "'Clash Display', sans-serif",
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}>
                  {item.year}
                </div>

                <div style={{ position: 'relative', zIndex: 10, paddingTop: '2.5rem' }}>
                  <h4 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    color: '#22d3ee', 
                    marginBottom: '0.75rem' 
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    lineHeight: 1.7,
                    fontSize: '0.95rem'
                  }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            padding: '3rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(168, 85, 247, 0.08))',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            marginBottom: '5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)'
          }} />
          
          <Award style={{ 
            width: '3rem', 
            height: '3rem', 
            color: '#22d3ee', 
            margin: '0 auto 1.5rem' 
          }} />
          
          <blockquote style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.4
          }}>
            "{aboutUs.mission}"
          </blockquote>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            En Libertia IT llevamos más de 20 años ayudando a empresas a dirigir con foco, tranquilidad y seguridad.
          </p>
        </motion.div>

        {/* Values */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.75rem', 
              marginBottom: '3rem' 
            }}
          >
            <Target style={{ width: '1.5rem', height: '1.5rem', color: '#10b981' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Nuestros Valores
            </h3>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            maxWidth: '50rem',
            margin: '0 auto'
          }}>
            {aboutUs.values.map((value, index) => {
              const Icon = iconMap[value.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-hover"
                  style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    margin: '0 auto 1.25rem',
                    borderRadius: '1rem',
                    background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <h4 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)', 
                    marginBottom: '0.75rem' 
                  }}>
                    {value.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.75rem', 
              marginBottom: '1rem' 
            }}
          >
            <Users style={{ width: '1.5rem', height: '1.5rem', color: '#a855f7' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Nuestro Equipo
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: '3rem',
              maxWidth: '40rem',
              margin: '0 auto 3rem'
            }}
          >
            El valor de Libertia IT está en las personas que hay detrás: un equipo experto, 
            comprometido y siempre un paso por delante.
          </motion.p>

          <div 
            className="team-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '1.5rem'
            }}
          >
            {aboutUs.team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-hover"
                style={{
                  borderRadius: '1.25rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
              >
                {/* Photo - Full width, rounded top only */}
                <div style={{
                  width: '100%',
                  height: '12rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                  ) : (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2))'
                    }}>
                      <User style={{ width: '3rem', height: '3rem', color: 'var(--text-muted)' }} />
                    </div>
                  )}
                  {/* Gradient overlay at bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Text content */}
                <div style={{ padding: '1.25rem' }}>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)', 
                    marginBottom: '0.375rem' 
                  }}>
                    {member.name}
                  </h4>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#22d3ee', 
                    fontWeight: 500,
                    lineHeight: 1.4
                  }}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '4rem',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)'
          }}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            {siteContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }} className="gradient-text">
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .team-grid {
          grid-template-columns: repeat(5, 1fr) !important;
        }
        @media (max-width: 1200px) {
          .team-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
